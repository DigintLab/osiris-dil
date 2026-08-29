#!/usr/bin/env node
/**
 * Builds src/app/api/dep/city-index.json — the offline gazetteer used to place
 * DEP victims at city level without a network round-trip.
 *
 * Source: GeoNames cities5000 (every populated place with population >= 5000),
 * licensed CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
 *
 * Usage:  node scripts/build-city-index.mjs [path/to/cities5000.txt]
 * Without an argument the dump is downloaded from download.geonames.org.
 *
 * Output format — a flat object, deliberately terse to keep the file small:
 *   "<normalised name>:<CC>": "<lat>,<lng>,<admin1>,<admin2>|<next candidate>"
 * Trailing empty admin fields are omitted.
 * Candidates are ordered by population, most populous first.
 */
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'app', 'api', 'dep', 'city-index.json');
const DUMP_URL = 'https://download.geonames.org/export/dump/cities5000.zip';
/** Keep at most this many same-name candidates per country. */
const MAX_CANDIDATES = 4;
/** Latin-script alternates per place; enough for the local and English forms. */
const MAX_ALTERNATES = 40;
/**
 * Only sizeable places get alternates. Exonyms are a big-city phenomenon
 * (Roma/Rome, Wien/Vienna, Praha/Prague); villages are spelled one way, and
 * indexing their transliterations would multiply the file for no gain.
 */
const ALTERNATES_MIN_POPULATION = 20000;
/**
 * Above this size, keep every Latin-script alternate rather than only near
 * variants: the classic exonyms share no prefix with their endonym
 * (Wien/Vienna, Koln/Cologne, Firenze/Florence, Den Haag/The Hague).
 */
const ALL_ALTERNATES_MIN_POPULATION = 200000;
const LATIN_NAME = /^[a-z0-9][a-z0-9 '-]*$/;

/**
 * GeoNames lists dozens of alternates per place, most of them transliterations
 * into unrelated languages ("An Roimh" for Rome). Keeping only those that open
 * with the same three letters as the real name picks up the forms that actually
 * occur in victim records — Roma/Rome, Munchen/Munich, Napoli/Naples — without
 * quadrupling the file.
 */
function isNearVariant(alt, bases) {
  return bases.some(b => b.length >= 3 && alt.slice(0, 3) === b.slice(0, 3));
}

function addKey(variant, cc, entry) {
  if (!variant) return;
  const key = `${variant}:${cc}`;
  const list = byKey.get(key);
  if (list) list.push(entry);
  else byKey.set(key, [entry]);
}

// Must stay in sync with normalizeCity() in src/app/api/dep/geocode.ts
function normalizeCity(city) {
  return city
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/^(city|town|municipality|comune|commune) of /, '')
    .replace(/[.,;]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadDump(path) {
  if (path) return readFileSync(path, 'utf8');
  const dir = mkdtempSync(join(tmpdir(), 'geonames-'));
  console.log(`downloading ${DUMP_URL} …`);
  execFileSync('curl', ['-sSL', '--max-time', '300', '-o', join(dir, 'c.zip'), DUMP_URL]);
  execFileSync('unzip', ['-o', '-q', join(dir, 'c.zip'), '-d', dir]);
  return readFileSync(join(dir, 'cities5000.txt'), 'utf8');
}

const byKey = new Map();
const rows = loadDump(process.argv[2]).split('\n');
let places = 0;

for (const line of rows) {
  if (!line) continue;
  const f = line.split('\t');
  const [, name, asciiName, , lat, lng, , , cc, , admin1, admin2, , , population] = f;
  if (!cc || !lat || !lng) continue;
  places++;

  const entry = {
    pop: parseInt(population, 10) || 0,
    primary: true,
    // 3dp ~= 110 m, far below the privacy jitter, and keeps the file small.
    // Trailing empty admin codes are trimmed for the same reason.
    v: `${(+lat).toFixed(3)},${(+lng).toFixed(3)},${admin1 || ''},${admin2 || ''}`.replace(/,+$/, ''),
  };

  // Index under the local spelling and its ASCII form ("Zürich" / "Zurich"), plus
  // Latin-script alternates — GeoNames names many places in English only, so
  // "Roma" and "München" exist solely as alternates. Alternates are secondary:
  // a name that is some other city's real name always wins over an alias.
  const primaryNames = new Set([normalizeCity(name), normalizeCity(asciiName)]);
  const bases = [...primaryNames];
  const usable = (f[3] || '')
    .split(',')
    .map(normalizeCity)
    .filter(a => LATIN_NAME.test(a) && a.length >= 2 && a.length <= 40);

  // Near variants first, then — for big cities only — the rest, shortest and
  // fewest words first. GeoNames lists alternates alphabetically, so without
  // this ranking a cap would keep "A Vienne" and drop "Wien".
  const near = usable.filter(a => isNearVariant(a, bases));
  const far = entry.pop >= ALL_ALTERNATES_MIN_POPULATION
    ? usable
        .filter(a => !isNearVariant(a, bases))
        .sort((a, b) => a.split(' ').length - b.split(' ').length || a.length - b.length)
    : [];
  const alternates = entry.pop >= ALTERNATES_MIN_POPULATION
    ? [...near, ...far].slice(0, MAX_ALTERNATES)
    : [];

  for (const variant of primaryNames) addKey(variant, cc, entry);
  for (const variant of new Set(alternates)) {
    if (primaryNames.has(variant)) continue;
    addKey(variant, cc, { ...entry, primary: false });
  }
}

const out = {};
for (const [key, list] of byKey) {
  list.sort((a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0) || b.pop - a.pop);
  const seen = new Set();
  const vals = [];
  for (const e of list) {
    if (seen.has(e.v)) continue;
    seen.add(e.v);
    vals.push(e.v);
    if (vals.length === MAX_CANDIDATES) break;
  }
  out[key] = vals.join('|');
}

writeFileSync(OUT, JSON.stringify(out));
const bytes = readFileSync(OUT).length;
console.log(`${places} places → ${Object.keys(out).length} keys, ${(bytes / 1e6).toFixed(2)} MB → ${OUT}`);
