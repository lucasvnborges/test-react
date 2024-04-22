import { z } from 'zod'

const IndividualSchema = z.object({
  type: z.literal('PF'),
  name: z
    .string()
    .min(5, { message: 'Preencha com um nome completo válido' }),
  cpf: z
    .string()
    .length(14, { message: 'Preencha com um número de CPF válido' }),
  email: z.string().email('Preencha com um e-mail válido'),
  phone: z.string().refine(
    (value) => {
      const phoneRegex = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/
      return phoneRegex.test(value)
    },
    {
      message: 'Preencha com um número de telefone válido',
    }
  ),
})

const CorporateSchema = z.object({
  type: z.literal('PJ'),
  name: z.string(),
  fantasy_name: z.string(),
  cnpj: z.string().length(18),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/)
    .refine((value) => /^\(?\d{2}\)?\s?9/.test(value), {
      message: 'Preencha com um número de telefone válido',
    }),
})

export const CustomerSchema = z.union([IndividualSchema, CorporateSchema])

export type CustomerDataType = z.infer<typeof CustomerSchema>
