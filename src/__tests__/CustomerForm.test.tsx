import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'
import { CustomerForm } from '../components'

describe('CustomerForm', () => {
  test('renders form fields correctly', () => {
    const onSubmit = jest.fn()
    const register = jest.fn()
    const errors = {}
    const handleSubmit = jest.fn()

    render(
      <CustomerForm
        onSubmit={onSubmit}
        customerType="PF"
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    )

    // Check if form fields are rendered
    expect(screen.getByLabelText('CPF')).toBeTruthy()
    expect(screen.getByLabelText('Nome completo')).toBeTruthy()
    expect(screen.getByLabelText('E-mail')).toBeTruthy()
    expect(screen.getByLabelText('Telefone')).toBeTruthy()
    expect(screen.getByRole('button', { name: /salvar/i })).toBeTruthy()
  })

  test('disables form fields and button when disabled prop is true', () => {
    const onSubmit = jest.fn()
    const register = jest.fn()
    const errors = {}
    const handleSubmit = jest.fn()

    render(
      <CustomerForm
        onSubmit={onSubmit}
        customerType="PJ"
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        disabled={true}
      />
    )

    // Check if form fields are disabled
    expect(screen.getByLabelText('CNPJ')).toBeTruthy()
    expect(screen.getByLabelText('Razão social')).toBeTruthy()
    expect(screen.getByLabelText('E-mail')).toBeTruthy()
    expect(screen.getByLabelText('Telefone')).toBeTruthy()

    // Check if button is disabled
    expect(screen.getByRole('button', { name: /salvar/i })).toBeDisabled()
  })

  test('calls onSubmit when form is submitted', async () => {
    const onSubmit = jest.fn()
    const register = jest.fn()
    const errors = {}
    const handleSubmit = jest.fn()

    render(
      <CustomerForm
        onSubmit={onSubmit}
        customerType="PF"
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    )

    // Fill in form fields
    userEvent.type(screen.getByLabelText('CPF'), '123.456.789-00')
    userEvent.type(screen.getByLabelText('Nome completo'), 'John Doe')
    userEvent.type(screen.getByLabelText('E-mail'), 'john@example.com')
    userEvent.type(screen.getByLabelText('Telefone'), '(99) 99999-9999')

    // Submit form
    fireEvent.submit(screen.getByRole('button', { name: /salvar/i }))
  })
})
