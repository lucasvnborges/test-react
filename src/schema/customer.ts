import { z } from 'zod'

// Schema for individual (PF) customers
const individualSchema = z.object({
  type: z.literal('PF'),
  name: z.string(),
  cpf: z.string().length(11),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/)
    .refine((value) => /^\(?\d{2}\)?\s?9/.test(value), {
      message: 'Phone number must start with 9 after the DDD',
    }),
})

// Schema for corporate (PJ) customers
const corporateSchema = z.object({
  type: z.literal('PJ'),
  name: z.string(),
  company_name: z.string(),
  cnpj: z.string().length(14),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/)
    .refine((value) => /^\(?\d{2}\)?\s?9/.test(value), {
      message: 'Phone number must start with 9 after the DDD',
    }),
})

export const customerSchema = z.union([individualSchema, corporateSchema])
