import { z } from 'zod'

export const CustomerSchema = z.object({
  type: z.literal('PF').or(z.literal('PJ')),
  name: z.string(),
  cpf: z.string().optional(),
  fantasy_name: z.string().optional(),
  cnpj: z.string().optional(),
  email: z.string(),
  phone: z.string(),
})
