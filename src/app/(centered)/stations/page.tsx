import type { Metadata } from 'next';

import { stationIds, stations, stationUtilities } from '@/lib/config';
import { validateSearchParams } from '@/lib/utils';
import type { WithSearchParams } from '@/lib/types';

import { PageHeader } from '@/components/page-header';
import { StationCard } from '@/components/station-card';
import { FilterControls } from '@/components/filter-controls';

const title = 'Stations';

export const metadata: Metadata = {
  title
};

export default async function Stations({ searchParams }: WithSearchParams) {
  const { utility } = await searchParams;
  const filters = validateSearchParams(utility, Object.keys(stationUtilities) as (keyof typeof stationUtilities)[]);

  const filteredStations = stationIds.filter(stationId => {
    if (filters.length === 0) return true;

    const station = stations[stationId];
    if (!station.utilities) return false;

    return filters.every(filter => station.utilities?.includes(filter));
  });

  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader title={title} description="A list of all stations in Derail Valley" />

      <div className="flex flex-col gap-4">
        <FilterControls
          path="/stations"
          queryKey="utility"
          filterOptions={stationUtilities}
          currentFilters={filters}
          className="hidden sm:flex"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredStations.map(stationId => (
            <StationCard key={stationId} stationId={stationId} />
          ))}
        </div>
      </div>
    </div>
  );
}
