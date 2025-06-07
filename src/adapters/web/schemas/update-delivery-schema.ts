import { z } from 'zod'

export const updateDeliverySchema = z.object({
  item: z.string().min(1).optional(),
  courierId: z.string().uuid().optional(),
  destinyAddress: z.string().min(1).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED']).optional(),
})

export type UpdateDeliveryDto = z.infer<typeof updateDeliverySchema>