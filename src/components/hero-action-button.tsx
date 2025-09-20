'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { getDeliveries } from '@/lib/deliveries';

import { Button } from '@/components/ui/button';

export const HeroActionButton = () => {
  const hasDeliveries = useMemo(() => {
    try {
      const storedDeliveries = getDeliveries();
      return storedDeliveries.length > 0;
    } catch {
      return false;
    }
  }, []);

  return (
    <Button asChild size="sm">
      <Link href={hasDeliveries ? '/deliveries' : '/planner'}>{hasDeliveries ? 'View Deliveries' : 'Get Started'}</Link>
    </Button>
  );
};
