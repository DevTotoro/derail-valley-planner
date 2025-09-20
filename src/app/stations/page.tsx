import type { Metadata } from 'next';

import { stations } from '@/lib/config';

import { PageHeader } from '@/components/page-header';
import { StationCard } from '@/components/station-card';

const title = 'Stations';

export const metadata: Metadata = {
  title
};

export default function Stations() {
  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader title={title} description="A list of all stations in Derail Valley" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.keys(stations).map(stationId => (
          <StationCard key={stationId} stationId={stationId} />
        ))}
      </div>
    </div>
  );
}
