import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CustomersTable } from 'src/components'
import { CustomerDataType } from 'src/models/customer'

describe('CustomersTable', () => {
  const customers: CustomerDataType[] = [
    {
      id: '1',
      type: 'PF',
      name: 'John Doe',
      cpf: '123.456.789-00',
      email: 'john@example.com',
      phone: '(99) 99999-9999',
    },
    {
      id: '2',
      type: 'PJ',
      name: 'Acme Corporation',
      fantasy_name: 'Acme',
      cnpj: '12.345.678/0001-90',
      email: 'acme@example.com',
      phone: '(88) 88888-8888',
    },
  ]

  test('renders customers table correctly', () => {
    const onEdit = jest.fn()
    const onDelete = jest.fn()

    render(
      <CustomersTable
        customers={customers}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )

    // Check if table headers are rendered
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Nome fantasia')).toBeInTheDocument()
    expect(screen.getByText('Documento')).toBeInTheDocument()
    expect(screen.getByText('E-mail')).toBeInTheDocument()
    expect(screen.getByText('Telefone')).toBeInTheDocument()

    // Check if customer data is rendered
    expect(screen.getByText('PF')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('123.456.789-00')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('(99) 99999-9999')).toBeInTheDocument()

    expect(screen.getByText('PJ')).toBeInTheDocument()
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
    expect(screen.getByText('Acme')).toBeInTheDocument()
    expect(screen.getByText('12.345.678/0001-90')).toBeInTheDocument()
    expect(screen.getByText('acme@example.com')).toBeInTheDocument()
    expect(screen.getByText('(88) 88888-8888')).toBeInTheDocument()
  })

  test('renders empty state when customers list is empty', () => {
    const onEdit = jest.fn()
    const onDelete = jest.fn()

    render(
      <CustomersTable customers={[]} onEdit={onEdit} onDelete={onDelete} />
    )

    expect(
      screen.getByText(
        'Sua lista de clientes está vazia. Comece adicionando um novo cliente.'
      )
    ).toBeInTheDocument()
  })
})
