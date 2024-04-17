import { http, HttpResponse } from "msw";
import { SessionStorageMap } from "./sessionStorage";

const storage = new SessionStorageMap<string, any>();

export const handlers = [
  http.get("/clientes", () => {
    return HttpResponse.json(Array.from(storage.values()));
  }),

  http.post("/clientes", ({ request }) => {
    const id = Date.now().toString();
    const cliente = { ...request.body, id };
    storage.set(id, cliente);
    return HttpResponse.json(cliente);
  }),

  http.put("/clientes/:id", ({ params, request }) => {
    const { id } = params;
    const cliente = { ...request.body, id };
    storage.set(id.toString(), cliente);
    return HttpResponse.json(cliente);
  }),

  http.delete("/clientes/:id", ({ params }) => {
    const { id } = params;
    storage.delete(id.toString());
    return new HttpResponse("Success", { status: 200 });
  }),
];
