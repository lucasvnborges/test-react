import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { EditCustomer } from 'src/screens'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
describe('EditCustomer component', () => {
  const queryClient = new QueryClient()
  test('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <EditCustomer />
        </Router>
      </QueryClientProvider>
    )
  })
})
