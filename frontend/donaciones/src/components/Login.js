import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { login as loginService } from '../api/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // entrance animation similar al script original
    const t = setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.add('animate-fade-in')
    }, 200)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Por favor, completa todos los campos')
      return
    }
    try {
      setLoading(true)
      const data = await loginService({ email, password })
      const token = data?.token
      if (!token) throw new Error('No se recibió el token del servidor')
      localStorage.setItem('auth_token', token)
      // redirige al explorador por defecto; ajusta según rol si es necesario
      navigate('/explorador')
    } catch (err) {
      const msg = (err?.name === 'TypeError') ? 'No se pudo conectar con el servidor. Verifica que el backend esté encendido y el puerto/URL sean correctos.' : (err.message || 'No se pudo iniciar sesión')
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
  <div className="floating-element top-10 left-10 text-6xl login-emoji-1">🥕</div>
  <div className="floating-element top-20 right-20 text-4xl login-emoji-2">🍞</div>
  <div className="floating-element bottom-20 left-20 text-5xl login-emoji-3">🍅</div>
  <div className="floating-element bottom-32 right-16 text-3xl login-emoji-4">🥬</div>
  <div className="floating-element top-1/2 left-16 text-4xl login-emoji-5">🍎</div>
  <div className="floating-element top-1/3 right-32 text-3xl login-emoji-6">🥐</div>

      {/* Main Container */}
      <div ref={containerRef} className="auth-container w-full max-w-md p-8 animate-slide-up relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg">
              <svg className="icon w-8 h-8" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">¡Bienvenido de vuelta! 👋</h1>
          <p className="text-gray-600">Inicia sesión para continuar ayudando a tu comunidad</p>
        </div>

        {/* Login Form */}
        <form id="loginForm" className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">📧 Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              className="input-field"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">🔒 Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="input-field"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
              Recordarme
            </label>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">¿Olvidaste tu contraseña?</a>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          {/* Login Button */}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Iniciando...' : '🚀 Iniciar Sesión'}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">¿No tienes una cuenta? <a href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">Regístrate aquí 🎉</a></p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <a href="/" className="btn-secondary">🏠 Volver al inicio</a>
        </div>

      </div>
    </div>
  )
}

export default Login
