import { request } from './http'

export function login({ email, password }) {
  // El backend acepta body con keys `email` y `password`
  return request('/login', {
    method: 'POST',
    body: { email, password }
  })
}
