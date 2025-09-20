import { z } from 'zod';

export type Delivery = z.infer<typeof deliverySchema>;
export const deliverySchema = z.object({
  schemaVersion: z.literal(1),
  id: z.nanoid()
});
