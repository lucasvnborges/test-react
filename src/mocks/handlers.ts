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
    storage.set(id, customer)
    return HttpResponse.json({ id: 1 })
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
