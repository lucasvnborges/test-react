import { Routes, Route } from 'react-router-dom'
import { CustomerList, CreateCustomer } from './screens'

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<CustomerList />} />
        <Route path="novo-cliente" element={<CreateCustomer />} />
      </Route>
    </Routes>
  )
}
