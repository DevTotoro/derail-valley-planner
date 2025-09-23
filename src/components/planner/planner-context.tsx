import { createContext, type ReactNode, useEffect, useState, type PropsWithChildren } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

import type { Delivery } from '@/lib/schemas/delivery.schema';
import { getStoredDelivery, storeDelivery } from '@/lib/deliveries';
import { nanoid } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Icons } from '@/components/icons';

export const PlannerContext = createContext<{
  delivery: Delivery;
  updateDelivery: (delivery: Delivery) => void;
}>({
  delivery: {} as Delivery,
  updateDelivery: () => {}
});

export const PlannerContextProvider = ({ children, id }: PropsWithChildren<{ id?: string }>) => {
  const [delivery, setDelivery] = useState<Delivery | undefined>(undefined);
  const [error, setError] = useState<ReactNode | undefined>(undefined);

  const [debouncedDelivery] = useDebounce(delivery, 500);

  const router = useRouter();

  // Initialize delivery
  useEffect(() => {
    if (id) {
      try {
        const storedDelivery = getStoredDelivery(id);

        if (storedDelivery) {
          setDelivery(storedDelivery);
        } else {
          setError(
            <Alert variant="destructive" className="w-fit max-w-lg sm:min-w-sm">
              <Icons.error />
              <AlertTitle>Your delivery was not found</AlertTitle>
              <AlertDescription>
                <div>
                  Deliveries are stored locally. They will be lost if you clear your browser data.{' '}
                  <Link href="/planner" className="underline underline-offset-4">
                    Create a new one
                  </Link>
                  .
                </div>
              </AlertDescription>
            </Alert>
          );
        }
      } catch (error) {
        setError(
          <Alert variant="destructive" className="w-fit max-w-lg sm:min-w-sm">
            <Icons.error />
            <AlertTitle>We couldn&apos;t load your delivery</AlertTitle>
            <AlertDescription>
              <div>
                {error instanceof Error ? error.message : 'Unknown error'}.{' '}
                <Link href="/planner" className="underline underline-offset-4">
                  Create a new one
                </Link>
                .
              </div>
            </AlertDescription>
          </Alert>
        );
      }
    } else {
      setError(undefined);
      setDelivery({
        schemaVersion: 1,
        id: nanoid(),
        name: 'New Delivery',
        rollingStock: []
      });
    }
  }, [id]);

  // Save delivery to local storage (debounced)
  useEffect(() => {
    if (debouncedDelivery) {
      storeDelivery(debouncedDelivery);
      if (id !== debouncedDelivery.id) {
        router.replace(`/planner?id=${debouncedDelivery.id}`); // Update URL if id has changed
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDelivery]);

  if (error) {
    return <div className="flex flex-1 items-center justify-center p-4">{error}</div>;
  }

  if (!delivery) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <Icons.loading className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <PlannerContext.Provider value={{ delivery, updateDelivery: setDelivery }}>{children}</PlannerContext.Provider>
  );
};
