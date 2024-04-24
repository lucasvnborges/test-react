import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { CreateCustomer } from 'src/screens'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
describe('CreateCustomer component', () => {
  const queryClient = new QueryClient()
  test('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CreateCustomer />
        </Router>
      </QueryClientProvider>
    )
  })

  test('renders customer type menu', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CreateCustomer />
        </Router>
      </QueryClientProvider>
    )
    expect(getByText('Pessoa Física')).toBeInTheDocument()
    expect(getByText('Pessoa Jurídica')).toBeInTheDocument()
  })

  test('renders customer form', () => {
    const { getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <CreateCustomer />
        </Router>
      </QueryClientProvider>
    )
    expect(getByLabelText('CPF')).toBeInTheDocument()
    expect(getByLabelText('Nome completo')).toBeInTheDocument()
    expect(getByLabelText('E-mail')).toBeInTheDocument()
    expect(getByLabelText('Telefone')).toBeInTheDocument()
  })
})
