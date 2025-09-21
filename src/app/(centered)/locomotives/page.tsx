import type { Metadata } from 'next';

import { locomotives, locomotiveTypes } from '@/lib/config';
import { validateSearchParams } from '@/lib/utils';
import type { WithSearchParams } from '@/lib/types';

import { PageHeader } from '@/components/page-header';
import { LocomotiveCard } from '@/components/locomotive-card';
import { FilterControls } from '@/components/filter-controls';

const title = 'Locomotives';

export const metadata: Metadata = {
  title
};

export default async function Locomotives({ searchParams }: WithSearchParams) {
  const { type } = await searchParams;
  const filters = validateSearchParams(type, Object.keys(locomotiveTypes) as (keyof typeof locomotiveTypes)[]);

  const filteredLocomotives = Object.entries(locomotives)
    .filter(([, locomotive]) => (filters.length ? filters.includes(locomotive.type) : true))
    .map(([locomotiveId]) => locomotiveId);

  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader title={title} description="A list of all locomotives in Derail Valley" />

      <div className="flex flex-col gap-4">
        <FilterControls
          path="/locomotives"
          queryKey="type"
          filterOptions={locomotiveTypes}
          currentFilters={filters}
          className="hidden md:flex"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocomotives.map(locomotiveId => (
            <LocomotiveCard key={locomotiveId} locomotiveId={locomotiveId} />
          ))}
        </div>
      </div>
    </div>
  );
}
