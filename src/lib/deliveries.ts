import { deliverySchema, type Delivery } from '@/lib/schemas/delivery.schema';

const STORAGE_KEY = 'dvp_deliveries';

export const getStoredDeliveries = (): Delivery[] => {
  if (typeof window === 'undefined') {
    console.error('Window is not defined');
    throw new Error('Window is not defined');
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsedDeliveries: unknown = JSON.parse(stored);
    return deliverySchema.array().parse(parsedDeliveries);
  } catch (error) {
    console.error('Failed to parse deliveries from localStorage', error);
    throw error instanceof Error ? error : new Error('Unknown error');
  }
};

export const getStoredDelivery = (id: string): Delivery | undefined => {
  const deliveries = getStoredDeliveries();
  return deliveries.find(delivery => delivery.id === id);
};

export const storeDelivery = (delivery: Delivery) => {
  const deliveries = getStoredDeliveries();
  const existingIndex = deliveries.findIndex(d => d.id === delivery.id);

  if (existingIndex !== -1) {
    deliveries[existingIndex] = delivery;
  } else {
    deliveries.push(delivery);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveries));
};
