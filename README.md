<div align="center">

# DIL Observatory

### Digital Intelligence Lab — Community Dashboard

[![Live Dashboard](https://img.shields.io/badge/community.digintlab.com-00E5FF?style=for-the-badge&logo=vercel&logoColor=white)](https://community.digintlab.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![MapLibre](https://img.shields.io/badge/MapLibre_GL-GPU_Rendered-396CB2?style=for-the-badge)](https://maplibre.org)
[![License](https://img.shields.io/badge/License-MIT-D4AF37?style=for-the-badge)](LICENSE)

**A free community dashboard for monitoring and making sense of the evolving digital realm — built on the open-source [OSIRIS](https://github.com/simplifaisoul/osiris) intelligence platform.**

[Open Dashboard](https://community.digintlab.com/) · [Report Bug](https://github.com/digintlab/osiris-dil/issues) · [Request Feature](https://github.com/digintlab/osiris-dil/issues)

</div>

---

## Overview

The DIL Observatory is a shared space for observing the state of the digital world in real time: from cyber incidents and underground signals to geopolitical and regulatory shifts affecting the digital ecosystem.

The dashboard gives users a live, map-based view of recent activity across the digital landscape. It brings together signals from multiple domains, helping analysts, researchers, journalists, students, and curious observers understand where digital events are happening, what types of activity are emerging, and which sectors may be affected.

### What you can explore

| Domain | Examples |
|--------|----------|
| **Cyber Incidents** | Data breaches, extortion, vandalism |
| **Underground Activity** | Threat actor signals, dark web indicators |
| **Threat Infrastructure** | C2 networks, malicious hosting, botnets |
| **Vulnerability Intelligence** | CVE updates, exploit activity, patch advisories |
| **Regulatory & Geopolitical** | Policy shifts, sanctions, digital governance events |
| **Broader Digital Risk** | Market signals, sector exposure, emerging threats |

---

## Interface

The Observatory is built around a **global interactive map** enriched with:

- **Event layers** — toggleable data streams across incident types and domains
- **Regional presets** — quick-focus views for major geographies
- **Intelligence feeds** — live and near-real-time signal aggregation
- **Vulnerability updates** — CVE and threat intelligence overlays
- **Market & contextual indicators** — sector and economic context

Each event can be inspected directly, with details such as actor, date, sector, location, and geocoding level where available.

---

## Architecture

Built on the OSIRIS open-source platform with a GPU-accelerated map engine:

```
┌─────────────────────────────────────────────────┐
│             DIL OBSERVATORY CLIENT               │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐ │
│  │ MapLibre  │  │  Event   │  │  Intelligence │ │
│  │  GL (GPU) │  │  Layers  │  │  Feeds        │ │
│  │  WebGL    │  │  Panels  │  │  Vuln Scanner │ │
│  │  Render   │  │ Controls │  │  CVE Lookup   │ │
│  └──────────┘  └──────────┘  └───────────────┘ │
├─────────────────────────────────────────────────┤
│               NEXT.JS API ROUTES                 │
│  /api/flights  /api/earthquakes  /api/cctv      │
│  /api/news     /api/fires        /api/maritime  │
│  /api/gdelt    /api/satellites   /api/weather   │
│  /api/scanner  /api/sentinel     /api/osint/*   │
├─────────────────────────────────────────────────┤
│              EXTERNAL DATA SOURCES               │
│  OpenSky · USGS · NASA · NOAA · TfL · NVD      │
│  GDACS · EONET · FIRMS · N2YO · RSS Feeds      │
└─────────────────────────────────────────────────┘
```

---

## Layer Reference

| Key | Group | Label | Default | Data source |
|-----|-------|-------|---------|-------------|
| `flights` | AVIATION | Commercial | off | OpenSky Network |
| `private` | AVIATION | Private | off | OpenSky Network |
| `jets` | AVIATION | Private Jets | off | OpenSky Network |
| `military` | AVIATION | Military | off | OpenSky Network |
| `maritime` | MARITIME & SPACE | Maritime / Naval | **on** | Static naval intel |
| `satellites` | MARITIME & SPACE | Satellites | off | N2YO |
| `cctv` | SURVEILLANCE | CCTV Cameras | **on** | TfL, WSDOT, Caltrans, NYC DOT + more |
| `live_news` | SURVEILLANCE | Live News Feeds | **on** | 25+ global broadcasters |
| `earthquakes` | NATURAL HAZARDS | Earthquakes (24h) | **on** | USGS |
| `fires` | NATURAL HAZARDS | Active Fires | off | NASA FIRMS |
| `weather` | NATURAL HAZARDS | Severe Weather | off | NASA EONET |
| `infrastructure` | THREATS & INFRA | Nuclear Facilities | off | Static OSINT intel |
| `global_incidents` | THREATS & INFRA | Global Incidents | **on** | GDELT |
| `gps_jamming` | THREATS & INFRA | GPS Jamming | off | Static OSINT intel |
| `dep_threats` | THREATS & INFRA | DEP Breach Events | off | DEP (requires credentials — see [DEP.md](DEP.md)) |
| `day_night` | DISPLAY | Day / Night Cycle | **on** | Computed |
| `balloons` | — | High-altitude Balloons | off | OpenSky Network |
| `news_intel` | — | News Intelligence | **on** | Internal feed |
| `radiation` | — | Radiation Monitoring | off | Static OSINT intel |
| `war_alerts` | — | War / Conflict Alerts | off | Static OSINT intel |

#### Customising layers

Two build-time env vars control layer visibility and defaults:

```env
# Show only these layers in the panel (comma-separated keys). Omit to show all.
NEXT_PUBLIC_ENABLED_LAYERS=maritime,earthquakes,global_incidents,dep_threats,day_night

# Layers that are ON at startup. Omit to use the built-in defaults above.
NEXT_PUBLIC_DEFAULT_LAYERS=global_incidents,dep_threats,day_night
```

---

## Quick Start

```bash
git clone https://github.com/digintlab/osiris-dil.git
cd osiris-dil
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker / Self-Hosting

```bash
git clone https://github.com/digintlab/osiris-dil.git
cd osiris-dil
cp .env.template .env     # optional — configure keys / port
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000). The image is a multi-stage
`node:22-alpine` standalone build (~220 MB, non-root). The compose file also
carries CasaOS app metadata (`x-casaos:`) for one-click install on
[CasaOS](https://casaos.io). See **[DOCKER.md](DOCKER.md)** for the full Docker,
CasaOS and API-key guide.

**Prebuilt image (GHCR)** — skip the build and pull it directly:

```bash
docker pull ghcr.io/digintlab/osiris-dil:latest
docker run -d -p 3000:3000 --env-file .env ghcr.io/digintlab/osiris-dil:latest
```

**Custom port** — set `OSIRIS_PORT` in `.env` to change the published host port
(e.g. `OSIRIS_PORT=3005`) without editing the compose file.

### Environment Variables

The dashboard works **partially without any API keys** — all core feeds use public,
keyless sources. Copy [`.env.template`](.env.template) to `.env` and set only
what you need:

```env
# Published host port (container always listens on 3000). Default: 3000
OSIRIS_PORT=3000

# RECON scanner backend
# SCANNER_KEY must match the backend's OSIRIS_KEY — generate with: openssl rand -hex 32
SCANNER_URL=
SCANNER_KEY=

# Optional, for higher rate limits / future sources (see DOCKER.md for signup links)
FIRMS_API_KEY=                # NASA FIRMS  — firms.modaps.eosdis.nasa.gov/api/map_key/
OPENSKY_CLIENT_ID=            # OpenSky OAuth2 (since Mar 2025) — opensky-network.org
OPENSKY_CLIENT_SECRET=
N2YO_API_KEY=                 # N2YO satellites — n2yo.com (Profile → API key)
AIS_API_KEY=                  # aisstream.io maritime
```

> Without `SCANNER_URL`/`SCANNER_KEY` the RECON toolkit returns `503`; every
> other layer works out of the box. `.env` is gitignored — only the template is committed.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Map Engine | MapLibre GL JS (WebGL) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Custom CSS Design System |
| Deployment | Vercel Edge Network |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F` | Toggle flight layers |
| `E` | Toggle earthquakes |
| `S` | Toggle satellites |
| `D` | Toggle day/night cycle |
| `Escape` | Close panels |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

**DIL Observatory** is a free community resource by [DigIntLab](https://digintlab.com).

Built on [OSIRIS](https://github.com/simplifaisoul/osiris) — the open-source intelligence and reconnaissance platform.

*The goal is simple: make digital intelligence more accessible, visible, and understandable.*

</div>
