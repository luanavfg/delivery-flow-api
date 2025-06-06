import { z } from 'zod'

export const createCourierSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export type CreateCourierDto = z.infer<typeof createCourierSchema>