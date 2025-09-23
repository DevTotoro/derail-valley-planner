import { z } from 'zod';

import { locomotiveModels, stationIds } from '@/lib/config';

export type Locomotive = z.infer<typeof locomotiveSchema>;
const locomotiveSchema = z.object({
  id: z.string(),
  type: z.literal('locomotive'),
  model: z.enum(locomotiveModels).optional(),
  active: z.boolean().optional()
});

export type Cargo = z.infer<typeof cargoSchema>;
const cargoSchema = z.object({
  id: z.string(),
  type: z.literal('cargo'),
  jobId: z.string().optional(),
  destination: z.enum(stationIds).optional(),
  weight: z.number().min(0).optional(), // tons
  length: z.number().min(0).optional() // meters
});

export type RollingStock = z.infer<typeof rollingStockSchema>;
const rollingStockSchema = z.discriminatedUnion('type', [locomotiveSchema, cargoSchema]);

export type Delivery = z.infer<typeof deliverySchema>;
export const deliverySchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string(),

  name: z.string().optional(),
  rollingStock: rollingStockSchema.array()
});
