// Cliente HTTP simple basado en fetch con base URL configurable

const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:4001'
const API_PREFIX = process.env.REACT_APP_API_PREFIX || '/foodloop'

export function getBaseUrl() {
  return `${BASE_URL}${API_PREFIX}`
}

export async function request(path, { method = 'GET', body, token } = {}) {
  const url = `${getBaseUrl()}${path}`
  const headers = { 'Content-Type': 'application/json' }
  const authToken = token || localStorage.getItem('auth_token')
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const isJson = res.headers.get('content-type')?.includes('application/json')
  const data = isJson ? await res.json() : await res.text()
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return data
}
