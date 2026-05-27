export type DepDataset = 'ext' | 'prv' | 'nws' | 'vnd' | 'dds' | 'frm';

export const DATASET_COLORS: Record<DepDataset, string> = {
  ext: '#b3001b', // DE crimson      — data extortion (highest severity)
  prv: '#d4533a', // DE terra cotta  — regulatory exposure
  dds: '#ffb700', // DE warn amber   — ddos / availability attack
  nws: '#9c9c69', // DE mustard      — major breach (intelligence signal)
  vnd: '#4a5e6a', // DE slate        — vandalism / hacktivist
  frm: '#6b8e8e', // DE teal         — underground / dark web intel
};

export const DATASET_LABELS: Record<DepDataset, string> = {
  ext: 'DATA EXTORTION',
  prv: 'REGULATORY',
  dds: 'DDOS',
  nws: 'MAJOR BREACH',
  vnd: 'VANDALISM',
  frm: 'UNDERGROUND',
};

export interface DepPrivlistRecord {
  date: string;
  victim: string;
  sector: string | null;
  actor: string | null;
  country: string | null;
  revenue: string | null;
  amount: string | null;
  naics: string | null;
  site: string | null;
  hashid: string | null;
  annLink: string | null;
  annTitle: string | null;
  victimDomain: string | null;
  annDescription: string | null;
  annDataTypes: string[];
  victimCC: string | null;
  victimCity: string | null;
  victimState: string | null;
  victimAddress: string | null;
}

export interface DepGeoPoint {
  id: string;
  /** null when DEP_HIDE_VICTIM_NAME=true */
  victim: string | null;
  sector: string | null;
  actor: string | null;
  date: string;
  /** null when DEP_HIDE_VICTIM_NAME=true */
  site: string | null;
  dset: DepDataset;
  victimCC: string | null;
  victimCity: string | null;
  victimState: string | null;
  /** null when DEP_HIDE_VICTIM_NAME=true */
  victimAddress: string | null;
  lat: number;
  lng: number;
  geocodeTier: 'city' | 'country';
}

export interface DepSearchResult {
  /** null when DEP_HIDE_VICTIM_NAME=true */
  victim: string | null;
  sector: string | null;
  actor: string | null;
  country: string | null;
  /** null when DEP_HIDE_VICTIM_NAME=true */
  domain: string | null;
  date: string | null;
  dset: string | null;
  annTitle: string | null;
  annDescription: string | null;
  annLink: string | null;
  hashid: string | null;
  victimCC: string | null;
  victimCity: string | null;
  victimState: string | null;
  executiveReport: string | null;
}
