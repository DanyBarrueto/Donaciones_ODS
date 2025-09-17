import { request } from './http'

export function login({ email, password }) {
  // El backend acepta body con keys `email` y `password`
  return request('/login', {
    method: 'POST',
    body: { email, password }
  })
}

export function register({ entityType, entityName, email, phone, location, address, password }) {
  return request('/register', {
    method: 'POST',
    body: {
      tipoEntidad: entityType,
      nombreEntidad: entityName,
      correo: email,
      telefono: phone,
      ubicacion: location,
      direccion: address,
      password
    }
  })
}
