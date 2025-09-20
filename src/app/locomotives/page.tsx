import type { Metadata } from 'next';

import { locomotives } from '@/lib/config';

import { PageHeader } from '@/components/page-header';
import { LocomotiveCard } from '@/components/locomotive-card';

const title = 'Locomotives';

export const metadata: Metadata = {
  title
};

export default function Locomotives() {
  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader title={title} description="A list of all locomotives in Derail Valley" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(locomotives).map(locomotiveId => (
          <LocomotiveCard key={locomotiveId} locomotiveId={locomotiveId} />
        ))}
      </div>
    </div>
  );
}
