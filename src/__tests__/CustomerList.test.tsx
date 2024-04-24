import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomerList } from 'src/screens'

describe('CustomerList component', () => {
  const queryClient = new QueryClient()

  test('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CustomerList />
        </MemoryRouter>
      </QueryClientProvider>
    )
  })
})
