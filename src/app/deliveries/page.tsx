import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { DeliveriesList } from '@/components/deliveries/deliveries-list';
import { Icons } from '@/components/icons';

const title = 'Deliveries';

export const metadata: Metadata = {
  title
};

export default function Deliveries() {
  return (
    <div className="flex flex-col gap-8 py-6 lg:py-8">
      <PageHeader
        title={title}
        description="Deliveries are stored locally. They will be lost if you clear your browser data."
        actions={
          <Button asChild size="sm">
            <Link href="/planner">
              <Icons.plus />
              <span className="hidden sm:flex">Create</span>
              <span className="sr-only sm:hidden">Create</span>
            </Link>
          </Button>
        }
      />

      <DeliveriesList />
    </div>
  );
}
