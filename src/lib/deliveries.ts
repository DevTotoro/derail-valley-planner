import { deliverySchema, type Delivery } from '@/lib/schemas/delivery.schema';
import { locomotives } from '@/lib/config';

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

export const deleteStoredDelivery = (id: string) => {
  const deliveries = getStoredDeliveries();
  const updatedDeliveries = deliveries.filter(delivery => delivery.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDeliveries));
};

export const getDeliveryStats = (delivery: Delivery) => {
  const loadRating = delivery.rollingStock.reduce((acc, rs) => {
    if (rs.type === 'cargo' || !rs.model || !rs.active) return acc;

    return acc + (locomotives[rs.model].loadRating?.incline ?? 0);
  }, 0);

  const weight = delivery.rollingStock.reduce((acc, rs) => {
    if (rs.type === 'cargo') return acc + (rs.weight ?? 0);

    if (!rs.model) return acc;

    return acc + (locomotives[rs.model].weight.wet ?? 0);
  }, 0);

  const length = delivery.rollingStock.reduce((acc, rs) => {
    if (rs.type === 'cargo') return acc + (rs.length ?? 0);

    if (!rs.model) return acc;

    return acc + (locomotives[rs.model].dimensions.length ?? 0);
  }, 0);

  return { loadRating, weight, length };
};
