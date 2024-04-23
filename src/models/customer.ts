import { z } from 'zod'

const phoneRegex = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/

const IndividualSchema = z.object({
  type: z.literal('PF'),
  name: z.string().min(5, { message: 'Preencha com um nome completo válido' }),
  cpf: z.string().refine(
    (value) => {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
      return cpfRegex.test(value)
    },
    {
      message: 'Preencha com um CPF válido',
    }
  ),
  email: z.string().email('Preencha com um e-mail válido'),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message: 'Preencha com um número de telefone válido',
  }),
})

const CorporateSchema = z.object({
  type: z.literal('PJ'),
  name: z.string().min(5, { message: 'Preencha com uma razão social válida' }),
  fantasy_name: z
    .string()
    .min(5, { message: 'Preencha com um nome fantasia válido' }),
  cnpj: z.string().refine(
    (value) => {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
      return cnpjRegex.test(value)
    },
    {
      message: 'Preencha com um CNPJ válido',
    }
  ),
  email: z.string().email('Preencha com um e-mail válido'),
  phone: z.string().refine((value) => phoneRegex.test(value), {
    message: 'Preencha com um número de telefone válido',
  }),
})

export const CustomerSchema = z.union([IndividualSchema, CorporateSchema])

export type CustomerDataType = z.infer<typeof CustomerSchema>
