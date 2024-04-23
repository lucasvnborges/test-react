import { http, HttpResponse } from 'msw'
import { SessionStorageMap } from './sessionStorage'

const storage = new SessionStorageMap<string, any>()

export const handlers = [
  http.get('/clientes', () => {
    return HttpResponse.json(Array.from(storage.values()))
  }),

  http.post('/clientes', async ({ request }) => {
    const id = Date.now().toString()
    const customer = await request.json()

    if (customer && typeof customer === 'object' && !Array.isArray(customer)) {
      customer.id = id
      storage.set(id, customer)
      return HttpResponse.json({}, { status: 201 })
    } else {
      return HttpResponse.json(
        { error: 'Invalid customer data' },
        { status: 400 }
      )
    }
  }),

  http.put('/clientes/:id', async ({ params, request }) => {
    // const { id } = params
    // const customer = await request.json()
    // storage.set(id.toString(), customer)
    // return HttpResponse.json(customer)
  }),

  http.delete('/clientes/:id', ({ params }) => {
    const { id } = params
    storage.delete(id.toString())
    return new HttpResponse('Success', { status: 200 })
  }),
]
