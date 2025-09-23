export const stationUtilities = {
  rs: 'Repair Station',
  ds: 'Diesel Service',
  cs: 'Coal Service',
  ec: 'Electric Charger',
  s: 'Shop'
};

export const stationIds = [
  'CME',
  'CMS',
  'CP',
  'CS',
  'CW',
  'FF',
  'FM',
  'FRC',
  'FRS',
  'GF',
  'HB',
  'IME',
  'IMW',
  'MB',
  'MF',
  'OR',
  'OWC',
  'OWN',
  'SM',
  'SW'
] as const;

export const stations: Record<
  (typeof stationIds)[number],
  { name: string; hex: string; utilities: (keyof typeof stationUtilities)[] }
> = {
  CME: { name: 'Coal Mine East', hex: '#4a4c44', utilities: ['rs', 'ds', 'cs'] },
  CMS: { name: 'Coal Mine South', hex: '#353b31', utilities: ['cs'] },
  CP: { name: 'Coal Power Plant', hex: '#402e24', utilities: ['cs'] },
  CS: { name: 'City South', hex: '#707e86', utilities: ['rs', 'ds', 'cs', 'ec'] },
  CW: { name: 'City West', hex: '#7a7872', utilities: ['rs', 'ds', 'ec', 's'] },
  FF: { name: 'Food Factory', hex: '#53799e', utilities: ['rs', 'ds', 'ec', 's'] },
  FM: { name: 'Farm', hex: '#a37a31', utilities: [] },
  FRC: { name: 'Forest Central', hex: '#6a8444', utilities: [] },
  FRS: { name: 'Forest South', hex: '#40693b', utilities: [] },
  GF: { name: 'Goods Factory', hex: '#91596c', utilities: ['rs', 'ds', 'cs', 'ec', 's'] },
  HB: { name: 'Harbor', hex: '#5e4c63', utilities: ['rs', 'ds', 'cs', 'ec', 's'] },
  IME: { name: 'Iron Mine East', hex: '#824c44', utilities: ['rs', 'cs'] },
  IMW: { name: 'Iron Mine West', hex: '#6f3f30', utilities: ['rs', 'cs'] },
  MB: { name: 'Military Base', hex: '#6f633b', utilities: [] },
  MF: { name: 'Machine Factory', hex: '#a0643b', utilities: ['rs', 'ds', 'cs', 'ec', 's'] },
  OR: { name: 'Oil Refinery', hex: '#6a3a51', utilities: [] },
  OWC: { name: 'Oil Well Central', hex: '#343f44', utilities: ['rs', 'ds'] },
  OWN: { name: 'Oil Well North', hex: '#49422f', utilities: ['rs', 'ds'] },
  SM: { name: 'Steel Mill', hex: '#575c63', utilities: ['rs', 'ds', 'cs', 'ec'] },
  SW: { name: 'Sawmill', hex: '#947958', utilities: ['rs', 'cs'] }
};
