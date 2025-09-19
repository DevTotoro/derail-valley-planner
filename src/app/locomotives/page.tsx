import type { Metadata } from 'next';

import { PageHeader } from '@/components/page-header';

const title = 'Locomotives';

export const metadata: Metadata = {
  title
};

export default function Locomotives() {
  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader title={title} description="A list of all locomotives in Derail Valley" />
    </div>
  );
}
