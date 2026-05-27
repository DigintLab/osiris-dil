import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const results: any = { threats: [], stats: {}, timestamp: new Date().toISOString() };

    // 1. CISA Known Exploited Vulnerabilities — authoritative, actively exploited in the wild
    try {
      const res = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json', {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        const recent = (data.vulnerabilities || [])
          .sort((a: any, b: any) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
          .slice(0, 15)
          .map((v: any) => ({
            id: v.cveID,
            name: v.vulnerabilityName,
            vendor: v.vendorProject,
            product: v.product,
            severity: 'CRITICAL',
            cvss: null,
            date: v.dateAdded,
            due: v.dueDate,
            source: 'CISA KEV',
            description: v.shortDescription || null,
            ransomware: v.knownRansomwareCampaignUse === 'Known',
          }));
        results.threats.push(...recent);
        results.stats.cisa_total = data.vulnerabilities?.length || 0;
      }
    } catch (e) { console.warn('[DIL] cyber-threats CISA:', e instanceof Error ? e.message : e); }

    // 2. NVD recent CVEs — last 7 days, sorted by CVSS score desc
    try {
      const pubStartDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('.')[0] + '.000';
      const pubEndDate   = new Date().toISOString().split('.')[0] + '.000';
      const nvdUrl = `https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=${pubStartDate}&pubEndDate=${pubEndDate}&resultsPerPage=20`;
      const res = await fetch(nvdUrl, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 1800 },
      });
      if (res.ok) {
        const data = await res.json();
        const nvdItems = (data.vulnerabilities || [])
          .map((item: any) => {
            const cve = item.cve;
            const metrics = cve.metrics?.cvssMetricV31?.[0] || cve.metrics?.cvssMetricV30?.[0] || cve.metrics?.cvssMetricV2?.[0];
            const score = metrics?.cvssData?.baseScore ?? null;
            const severity = score >= 9 ? 'CRITICAL' : score >= 7 ? 'HIGH' : score >= 4 ? 'MEDIUM' : score !== null ? 'LOW' : 'UNKNOWN';
            const desc = cve.descriptions?.find((d: any) => d.lang === 'en')?.value || '';
            const affected = cve.configurations?.[0]?.nodes?.[0]?.cpeMatch?.[0]?.criteria?.split(':')?.[4] || null;
            return {
              id: cve.id,
              name: desc.length > 80 ? desc.slice(0, 80) + '…' : desc,
              vendor: affected || 'Unknown',
              product: cve.id,
              severity,
              cvss: score,
              date: cve.published?.split('T')[0] || null,
              due: null,
              source: 'NVD',
              description: desc,
              ransomware: false,
            };
          })
          .filter((v: any) => v.severity === 'CRITICAL' || v.severity === 'HIGH')
          .sort((a: any, b: any) => (b.cvss ?? 0) - (a.cvss ?? 0))
          .slice(0, 15);
        results.threats.push(...nvdItems);
        results.stats.nvd_recent = data.totalResults || 0;
      }
    } catch (e) { console.warn('[DIL] cyber-threats NVD:', e instanceof Error ? e.message : e); }

    // Deduplicate by CVE ID, sort by date desc
    const seen = new Set<string>();
    results.threats = results.threats
      .filter((t: any) => { if (seen.has(t.id)) return false; seen.add(t.id); return true; })
      .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    results.stats.active_cves  = results.threats.length;
    results.stats.critical      = results.threats.filter((t: any) => t.severity === 'CRITICAL').length;
    results.stats.high          = results.threats.filter((t: any) => t.severity === 'HIGH').length;
    results.stats.threat_level  = results.stats.critical >= 5 ? 'CRITICAL' : results.stats.critical >= 2 ? 'HIGH' : 'ELEVATED';

    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ threats: [], stats: {}, error: 'Failed' }, { status: 500 });
  }
}
