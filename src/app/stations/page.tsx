import type { Metadata } from 'next';

import { stations, stationUtilities } from '@/lib/config';
import { validateSearchParams } from '@/lib/utils';
import type { WithSearchParams } from '@/lib/types';

import { PageHeader } from '@/components/page-header';
import { StationCard } from '@/components/station-card';
import { StationFilters } from '@/components/station-filters';

const title = 'Stations';

export const metadata: Metadata = {
  title
};

export default async function Stations({ searchParams }: WithSearchParams) {
  const { utility } = await searchParams;
  const filters = validateSearchParams(utility, Object.keys(stationUtilities) as (keyof typeof stationUtilities)[]);

  const filteredStations = Object.entries(stations)
    .filter(([, station]) => (filters.length ? filters.every(filter => station.utilities.includes(filter)) : true))
    .map(([stationId]) => stationId);

  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader title={title} description="A list of all stations in Derail Valley" />

      <div className="flex flex-col gap-4">
        <StationFilters filters={filters} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredStations.map(stationId => (
            <StationCard key={stationId} stationId={stationId} />
          ))}
        </div>
      </div>
    </div>
  );
}
