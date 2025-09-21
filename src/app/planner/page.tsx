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
    <div className="flex flex-1 items-center justify-center">
      <PlannerComponent id={Array.isArray(id) ? id[0] : id} />
    </div>
  );
}
