import { deliverySchema, type Delivery } from '@/lib/schemas/delivery.schema';

const STORAGE_KEY = 'dvp_deliveries';

export const getDeliveries = (): Delivery[] => {
  if (typeof window === 'undefined') {
    throw new Error('Window is not defined');
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsedDeliveries: unknown = JSON.parse(stored);
    return deliverySchema.array().parse(parsedDeliveries);
  } catch (error) {
    throw error instanceof Error ? error : new Error('Unknown error');
  }
};
