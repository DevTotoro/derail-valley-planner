import type { Metadata } from 'next';

import type { WithSearchParams } from '@/lib/types';

import { Planner as PlannerComponent } from '@/components/planner';

const title = 'Planner';

export const metadata: Metadata = {
  title
};

export default async function Planner({ searchParams }: WithSearchParams) {
  const { id } = await searchParams;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PlannerComponent id={Array.isArray(id) ? id[0] : id} />
    </div>
  );
}
