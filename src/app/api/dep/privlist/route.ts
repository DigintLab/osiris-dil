import { NextRequest, NextResponse } from 'next/server';
import { fetchPrivlist } from '../client';
import { geocodeVictim } from '../geocode';
import { DepDataset, DepGeoPoint } from '../types';

export const dynamic = 'force-dynamic';

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
  defaultStart.setDate(today.getDate() - 30);

  const te = searchParams.get('te') || toDateString(today);
  const ts = searchParams.get('ts') || toDateString(defaultStart);
  const rawDsets = (searchParams.get('dset') || 'ext,prv,dds').split(',').map((d: string) => d.trim());
  const datasets = rawDsets.filter((d: string) => VALID_DSETS.has(d)) as DepDataset[];

  if (datasets.length === 0) {
    return NextResponse.json({ victims: [], error: 'No valid datasets specified' }, { status: 400 });
  }

  const hideIdentity = process.env.DEP_HIDE_VICTIM_NAME === 'true';

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
          console.log(`  [${i}] victim="${r.victim}" victimCC=${r.victimCC} victimCountry=${r.victimCountry} victimCity=${r.victimCity}`);
        });
      }
    }

    let fallbackId = 0;
    let dropped = 0;
    const victims: DepGeoPoint[] = [];

    for (const r of records) {
      const geo = geocodeVictim(r.victimCity, r.victimCC, r.victimCountry ?? null);
      if (!geo) { dropped++; continue; }

      victims.push({
        id: r.hashid || `dep-${fallbackId++}`,
        victim: hideIdentity ? '[REDACTED]' : r.victim,
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

    console.log(`[DEP privlist] geocoded: ${victims.length} plotted, ${dropped} dropped (no usable location)`);

    return NextResponse.json({ victims, total: victims.length, ts, te, datasets }, {
      headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
    });
  } catch (err) {
    console.error('[DEP privlist]', err);
    return NextResponse.json({ victims: [], error: 'Failed to fetch DEP data' }, { status: 500 });
  }
}
