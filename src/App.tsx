import { Routes, Route } from 'react-router-dom'
import { CustomerList, CreateCustomer } from './screens'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/">
          <Route index element={<CustomerList />} />
          <Route path="novo-cliente" element={<CreateCustomer />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}
