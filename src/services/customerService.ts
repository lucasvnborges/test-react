import { CustomerDataType } from "src/models/customer"

export const createCustomer = async (customer: CustomerDataType) => {
  const response = await fetch('/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar o cliente')
  }

  return response.json()
}