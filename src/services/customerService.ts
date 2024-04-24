import { CustomerDataType } from 'src/models/customer'

export const fetchCustomers = async () => {
  const response = await fetch('/clientes')

  if (!response.ok) {
    throw new Error('Erro ao buscar clientes')
  }

  return response.json()
}

export const createCustomer = async (customer: CustomerDataType) => {
  const response = await fetch('/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar cliente')
  }

  return response.json()
}

export const getCustomerById = async (id: string) => {
  const response = await fetch(`/clientes/${id}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Erro ao buscar cliente')
  }

  return response.json()
}

export const updateCustomer = async (customer: CustomerDataType) => {
  console.log(customer)
  const response = await fetch(`/clientes/${customer.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Erro ao atualizar cliente')
  }

  return response.json()
}

export const deleteCustomer = async (id: string) => {
  const response = await fetch(`/clientes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erro ao excluir cliente')
  }

  return response.json()
}
