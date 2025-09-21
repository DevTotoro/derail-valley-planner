import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { customAlphabet } from 'nanoid';

import type { SearchParam } from '@/lib/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const validateSearchParams = <T>(param: SearchParam, acceptedValues: T[]): T[] => {
  if (!param) {
    return [];
  }

  const values = Array.isArray(param) ? param : [param];
  return values.filter(v => acceptedValues.includes(v as T)) as T[];
};

export const deliveryId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
