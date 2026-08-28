import { NextRequest, NextResponse } from 'next/server';
import { fetchPrivlist } from '../client';
import { countryNameToCC, geocodeVictim, warmCityGeocodeCache } from '../geocode';
import { DepDataset, DepGeoPoint } from '../types';

export const dynamic = 'force-dynamic';

const DEP_CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours

interface DepCacheEntry {
  victims: DepGeoPoint[];
  total: number;
  ts: string;
  te: string;
  datasets: DepDataset[];
  expiresAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __depPrivlistCache: Map<string, DepCacheEntry> | undefined;
}
const depCache: Map<string, DepCacheEntry> = (globalThis.__depPrivlistCache ??= new Map());

const VALID_DSETS = new Set<string>(['ext', 'prv', 'nws', 'vnd', 'dds', 'frm']);

function toDateString(d: Date): string {
  return d.toISOString().split('T')[0];
}

export async function GET(req: NextRequest) {
  if (!process.env.DEP_API_KEY || !process.env.DEP_AUTH_ENDPOINT) {
    return NextResponse.json({ victims: [], error: 'DEP integration not configured' }, { status: 503 });
  }

  const { searchParams } = req.nextUrl;
  const today = new Date();
  const defaultStart = new Date(today);
  const depMaxDays = Math.max(1, parseInt(process.env.DEP_MAX_DAYS || '14', 10) || 14);
  defaultStart.setDate(today.getDate() - depMaxDays);

  const te = toDateString(today);
  const ts = toDateString(defaultStart);
  const enabledDsets = new Set(
    (process.env.DEP_DEFAULT_DATASETS || 'ext,prv,dds').split(',').map((d: string) => d.trim()).filter(Boolean)
  );
  const requestedDsets = searchParams.get('dset')
    ? searchParams.get('dset')!.split(',').map((d: string) => d.trim()).filter(Boolean)
    : [...enabledDsets];
  const rawDsets = requestedDsets.filter(d => enabledDsets.has(d));
  const datasets = rawDsets.filter((d: string) => VALID_DSETS.has(d)) as DepDataset[];

  if (datasets.length === 0) {
    return NextResponse.json({ victims: [], error: 'No valid datasets specified' }, { status: 400 });
  }

  const hideIdentity = process.env.DEP_HIDE_VICTIM_NAME === 'true';
  const cacheKey = `${[...datasets].sort().join(',')}|${ts}|${te}|${hideIdentity}`;

  const cached = depCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    console.log('[DEP privlist] cache HIT —', cached.total, 'victims, expires in', Math.round((cached.expiresAt - Date.now()) / 60000), 'min');
    return NextResponse.json(
      { victims: cached.victims, total: cached.total, ts: cached.ts, te: cached.te, datasets: cached.datasets, cached: true },
      { headers: { 'Cache-Control': 'public, s-maxage=14400, stale-while-revalidate=3600' } },
    );
  }

  try {
    const records = await fetchPrivlist(datasets, ts, te);

    // Diagnostic: log keys + first 3 records per dataset to verify field names and geo data
    if (records.length > 0) {
      const sample = records[0];
      console.log('[DEP privlist] sample record keys:', Object.keys(sample));

      const byDset = records.reduce((acc: Record<string, typeof records>, r) => {
        (acc[r.dset] = acc[r.dset] || []).push(r);
        return acc;
      }, {});
      for (const [dset, recs] of Object.entries(byDset)) {
        console.log(`[DEP privlist] ${dset} — first 3 geo fields:`);
        recs.slice(0, 3).forEach((r, i) => {
          console.log(`  [${i}] victim="${r.victim}" victimCC=${r.victimCC} country=${r.country} victimCity=${r.victimCity}`);
        });
      }
    }

    // Resolve cities missing from the static table before plotting, so records
    // that carry a city (e.g. "Parma, PR, IT") are not demoted to the country
    // centroid. Bounded + memoised — see warmCityGeocodeCache.
    await warmCityGeocodeCache(
      records.map(r => ({
        city: r.victimCity,
        cc: r.victimCC ?? countryNameToCC(r.country ?? null),
        state: r.victimState,
      })),
    );

    let fallbackId = 0;
    let dropped = 0;
    let countryTier = 0;
    const victims: DepGeoPoint[] = [];

    for (const r of records) {
      const id = r.hashid || `dep-${fallbackId++}`;
      const geo = geocodeVictim(r.victimCity, r.victimCC, r.country ?? null, r.victimState, id);
      if (!geo) { dropped++; continue; }

      if (geo.tier === 'country') countryTier++;

      victims.push({
        id,
        victim: hideIdentity ? null : r.victim,
        sector: r.sector,
        actor: r.actor,
        date: r.date,
        site: hideIdentity ? null : (r.site || r.victimDomain),
        dset: r.dset,
        victimCC: r.victimCC,
        victimCity: r.victimCity,
        victimState: r.victimState,
        victimAddress: hideIdentity ? null : r.victimAddress,
        lat: geo.lat,
        lng: geo.lng,
        geocodeTier: geo.tier,
      });
    }

    console.log(`[DEP privlist] geocoded: ${victims.length} plotted (${victims.length - countryTier} city-level, ${countryTier} country-level), ${dropped} dropped (no usable location)`);

    depCache.set(cacheKey, { victims, total: victims.length, ts, te, datasets, expiresAt: Date.now() + DEP_CACHE_TTL });
    console.log('[DEP privlist] cache SET — expires in 4h');

    return NextResponse.json({ victims, total: victims.length, ts, te, datasets, cached: false }, {
      headers: { 'Cache-Control': 'public, s-maxage=14400, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[DEP privlist]', err);
    return NextResponse.json({ victims: [], error: 'Failed to fetch DEP data' }, { status: 500 });
  }
}
