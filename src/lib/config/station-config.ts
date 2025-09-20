export const stationUtilities = {
  repairStation: 'Repair Station',
  dieselService: 'Diesel Service',
  coalService: 'Coal Service',
  electricCharger: 'Electric Charger',
  shop: 'Shop'
};

export const stations: Record<
  string,
  {
    name: string;
    hex: string;
    utilities: (keyof typeof stationUtilities)[];
  }
> = {
  CME: {
    name: 'Coal Mine East',
    hex: '#4a4c44',
    utilities: ['repairStation', 'dieselService', 'coalService']
  },
  CMS: {
    name: 'Coal Mine South',
    hex: '#353b31',
    utilities: ['coalService']
  },
  CP: {
    name: 'Coal Power Plant',
    hex: '#402e24',
    utilities: ['coalService']
  },
  CS: {
    name: 'City South',
    hex: '#707e86',
    utilities: ['repairStation', 'dieselService', 'coalService', 'electricCharger']
  },
  CW: {
    name: 'City West',
    hex: '#7a7872',
    utilities: ['repairStation', 'dieselService', 'electricCharger', 'shop']
  },
  FF: {
    name: 'Food Factory',
    hex: '#53799e',
    utilities: ['repairStation', 'dieselService', 'electricCharger', 'shop']
  },
  FM: {
    name: 'Farm',
    hex: '#a37a31',
    utilities: []
  },
  FRC: {
    name: 'Forest Central',
    hex: '#6a8444',
    utilities: []
  },
  FRS: {
    name: 'Forest South',
    hex: '#40693b',
    utilities: []
  },
  GF: {
    name: 'Goods Factory',
    hex: '#91596c',
    utilities: ['repairStation', 'dieselService', 'coalService', 'electricCharger', 'shop']
  },
  HB: {
    name: 'Harbor',
    hex: '#5e4c63',
    utilities: ['repairStation', 'dieselService', 'coalService', 'electricCharger', 'shop']
  },
  IME: {
    name: 'Iron Mine East',
    hex: '#824c44',
    utilities: ['repairStation', 'coalService']
  },
  IMW: {
    name: 'Iron Mine West',
    hex: '#6f3f30',
    utilities: ['repairStation', 'coalService']
  },
  MB: {
    name: 'Military Base',
    hex: '#6f633b',
    utilities: []
  },
  MF: {
    name: 'Machine Factory',
    hex: '#a0643b',
    utilities: ['repairStation', 'dieselService', 'coalService', 'electricCharger', 'shop']
  },
  OR: {
    name: 'Oil Refinery',
    hex: '#6a3a51',
    utilities: []
  },
  OWC: {
    name: 'Oil Well Central',
    hex: '#343f44',
    utilities: ['repairStation', 'dieselService']
  },
  OWN: {
    name: 'Oil Well North',
    hex: '#49422f',
    utilities: ['repairStation', 'dieselService']
  },
  SM: {
    name: 'Steel Mill',
    hex: '#575c63',
    utilities: ['repairStation', 'dieselService', 'coalService', 'electricCharger']
  },
  SW: {
    name: 'Sawmill',
    hex: '#947958',
    utilities: ['repairStation', 'coalService']
  }
};
