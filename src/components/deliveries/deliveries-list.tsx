'use client';

import { type ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';

import type { Delivery } from '@/lib/schemas/delivery.schema';
import { getStoredDeliveries } from '@/lib/deliveries';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icons } from '@/components/icons';

export const DeliveriesList = () => {
  const [deliveries, setDeliveries] = useState<Delivery[] | undefined>(undefined);
  const [error, setError] = useState<ReactNode | undefined>(undefined);

  // Load stored deliveries
  useEffect(() => {
    try {
      const storedDeliveries = getStoredDeliveries();
      setDeliveries(storedDeliveries);
    } catch (error) {
      setError(
        <Alert variant="destructive">
          <Icons.error />
          <AlertTitle>We couldn&apos;t load your deliveries</AlertTitle>
          <AlertDescription>{error instanceof Error ? error.message : 'Unknown error'}</AlertDescription>
        </Alert>
      );
    }
  }, []);

  if (error) {
    return error;
  }

  if (!deliveries) {
    return (
      <div className="flex justify-center pt-16">
        <Icons.loading className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {deliveries.length === 0 && (
        <div className="text-muted-foreground flex flex-col pt-16 text-center text-sm font-extralight">
          <span className="font-medium">No deliveries yet</span>
          <span>
            <Link href="/planner" className="underline underline-offset-4">
              Get started
            </Link>{' '}
            by planning your first delivery
          </span>
        </div>
      )}
    </div>
  );
};
