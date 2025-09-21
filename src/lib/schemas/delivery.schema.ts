import { z } from 'zod';

import { locomotives, stations } from '@/lib/config';

const locomotiveSchema = z.object({
  type: z.literal('locomotive'),
  model: z.enum(Object.keys(locomotives))
});

const cargoSchema = z.object({
  type: z.literal('cargo'),
  jobId: z.string().optional(),
  destination: z.enum(Object.keys(stations)),
  weight: z.number().min(0), // tons
  length: z.number().min(0) // meters
});

const rollingStockSchema = z.discriminatedUnion('type', [locomotiveSchema, cargoSchema]);

export type Delivery = z.infer<typeof deliverySchema>;
export const deliverySchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string(),

  name: z.string().optional(),
  rollingStock: rollingStockSchema.array()
});
