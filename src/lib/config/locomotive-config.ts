export const locomotiveTypes = {
  dm: 'Diesel-Mechanical',
  de: 'Diesel-Electric',
  dh: 'Diesel-Hydraulic',
  s: 'Steam',
  be: 'Battery-Electric',
  o: 'Other'
};

export const locomotives: Record<
  string,
  {
    name: string;
    url: string;
    type: keyof typeof locomotiveTypes;
    /**
     * Weight in tons
     */
    weight: {
      dry: number;
      wet?: number;
    };
    /**
     * Dimensions in meters
     */
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    /**
     * Load rating in tons
     */
    loadRating:
      | {
          /**
           * 0% incline
           */
          flat: number;
          /**
           * 2% incline
           */
          incline: number;
          /**
           * 2% incline with wet rails
           */
          wetIncline: number;
        }
      | undefined;
  }
> = {
  'de2-480': {
    name: 'DE2-480',
    url: 'https://derailvalley.fandom.com/wiki/DE2_Shunter',
    type: 'de',
    weight: { dry: 37, wet: 40 },
    dimensions: { length: 7.6, width: 2.96, height: 3.83 },
    loadRating: { flat: 1200, incline: 300, wetIncline: 250 }
  },
  'de6-860': {
    name: 'DE6-860',
    url: 'https://derailvalley.fandom.com/wiki/DE6',
    type: 'de',
    weight: { dry: 119.2, wet: 125 },
    dimensions: { length: 18.64, width: 3.04, height: 4.12 },
    loadRating: { flat: 3000, incline: 1200, wetIncline: 1000 }
  },
  'dh4-670': {
    name: 'DH4-670',
    url: 'https://derailvalley.fandom.com/wiki/DH4_Diesel_Road-Switcher',
    type: 'dh',
    weight: { dry: 74.2, wet: 77.5 },
    dimensions: { length: 12.94, width: 3, height: 4.6 },
    loadRating: { flat: 2000, incline: 600, wetIncline: 500 }
  },
  'dm3-540': {
    name: 'DM3-540',
    url: 'https://derailvalley.fandom.com/wiki/DM3_Diesel_Shunter',
    type: 'dm',
    weight: { dry: 50.4, wet: 52 },
    dimensions: { length: 8.6, width: 2.6, height: 3.97 },
    loadRating: { flat: 2000, incline: 500, wetIncline: 400 }
  },
  's060-440': {
    name: 'S060-440',
    url: 'https://derailvalley.fandom.com/wiki/S060_Steam_Shunter',
    type: 's',
    weight: { dry: 41, wet: 50.7 },
    dimensions: { length: 9.32, width: 2.6, height: 3.9 },
    loadRating: { flat: 1500, incline: 400, wetIncline: 300 }
  },
  's282-730': {
    name: 'S282-730',
    url: 'https://derailvalley.fandom.com/wiki/S282',
    type: 's',
    weight: { dry: 121, wet: 174.8 },
    dimensions: { length: 22.18, width: 3.17, height: 4.12 },
    loadRating: { flat: 3000, incline: 1000, wetIncline: 800 }
  },
  'be2-260': {
    name: 'BE2-260',
    url: 'https://derailvalley.fandom.com/wiki/BE2_Electric_Microshunter',
    type: 'be',
    weight: { dry: 11.6, wet: 12 },
    dimensions: { length: 4.08, width: 2.8, height: 2.85 },
    loadRating: { flat: 800, incline: 100, wetIncline: 50 }
  },
  'de6-860s': {
    name: 'DE6-860S',
    url: 'https://derailvalley.fandom.com/wiki/DE6_Slug',
    type: 'o',
    weight: { dry: 125 },
    dimensions: { length: 16.8, width: 3, height: 3.33 },
    loadRating: undefined
  },
  caboose: {
    name: 'Caboose',
    url: 'https://derailvalley.fandom.com/wiki/Caboose',
    type: 'o',
    weight: { dry: 22 },
    dimensions: { length: 13.2, width: 3, height: 4.3 },
    loadRating: undefined
  },
  'dm1u-150': {
    name: 'DM1U-150',
    url: 'https://derailvalley.fandom.com/wiki/DM1U_Utility_Rail_Vehicle',
    type: 'dm',
    weight: { dry: 10, wet: 10.4 },
    dimensions: { length: 14.47, width: 3.02, height: 3.03 },
    loadRating: { flat: 0, incline: 0, wetIncline: 0 }
  }
};
