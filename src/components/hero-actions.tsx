'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getStoredDeliveries } from '@/lib/deliveries';

import { Button } from '@/components/ui/button';

export const HeroActions = () => {
  const [hasDeliveries, setHasDeliveries] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    try {
      const storedDeliveries = getStoredDeliveries();
      setHasDeliveries(storedDeliveries.length > 0);
    } catch {
      setHasDeliveries(false);
    }
  }, []);

  if (hasDeliveries !== undefined) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom flex w-full items-center justify-center gap-2 pt-2 duration-500">
        <Button asChild size="sm">
          <Link href={hasDeliveries ? '/deliveries' : '/planner'}>
            {hasDeliveries ? 'View Deliveries' : 'Get Started'}
          </Link>
        </Button>

        <Button asChild size="sm" variant="ghost">
          <Link href="/locomotives">View Locomotives</Link>
        </Button>
      </div>
    );
  }
};
