import '@testing-library/jest-dom'
import { worker } from '../mocks/browser'
import { IndividualSchema } from 'src/models/customer'
import { createCustomer, fetchCustomers } from 'src/services/customerService'
import { createFixture } from 'zod-fixture'
import { expect, afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// Start worker before all tests
beforeAll(() => {
  worker.start()
})

//  Close worker after all tests
afterAll(() => {
  worker.stop()
})

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  worker.resetHandlers()
})

const customerFixture = createFixture(IndividualSchema, { seed: 11 })
describe('customerService', () => {
  it('fetches customers', async () => {
    const customers = await fetchCustomers()
    expect(customers).toEqual([customerFixture])
  })

  it('creates a customer', async () => {
    const customer = await createCustomer(customerFixture)
    expect(customer).toEqual(customerFixture)
  })
})
