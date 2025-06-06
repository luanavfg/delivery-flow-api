import { z } from 'zod'

export const createDeliverySchema = z.object({
  item: z.string().min(1),
  courierId: z.string(),
  destinyAddress: z.string().min(1),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']),
})

export type CreateDeliveryDto = z.infer<typeof createDeliverySchema>