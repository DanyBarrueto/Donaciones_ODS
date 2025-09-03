import React, { useEffect, useRef, useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    // entrance animation similar al script original
    const t = setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.add('animate-fade-in')
    }, 200)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('Por favor, completa todos los campos')
      return
    }

    // Mock authentication (igual que el HTML original)
    if (email === 'demo@foodconnect.com' && password === 'demo123') {
      alert('¡Inicio de sesión exitoso! 🎉')
      window.location.href = '/'
    } else {
      alert('Credenciales incorrectas. Intenta con:\nEmail: demo@foodconnect.com\nContraseña: demo123')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="floating-element top-10 left-10 text-6xl" style={{ animationDelay: '0s' }}>🥕</div>
      <div className="floating-element top-20 right-20 text-4xl" style={{ animationDelay: '1s' }}>🍞</div>
      <div className="floating-element bottom-20 left-20 text-5xl" style={{ animationDelay: '2s' }}>🍅</div>
      <div className="floating-element bottom-32 right-16 text-3xl" style={{ animationDelay: '1.5s' }}>🥬</div>
      <div className="floating-element top-1/2 left-16 text-4xl" style={{ animationDelay: '3s' }}>🍎</div>
      <div className="floating-element top-1/3 right-32 text-3xl" style={{ animationDelay: '2.5s' }}>🥐</div>

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

          {/* Login Button */}
          <button type="submit" className="btn-primary w-full">🚀 Iniciar Sesión</button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">¿No tienes una cuenta? <a href="/register" className="text-primary-600 hover:text-primary-700 font-semibold">Regístrate aquí 🎉</a></p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <a href="/" className="btn-secondary">🏠 Volver al inicio</a>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="text-sm font-semibold text-primary-800 mb-2">🔑 Credenciales de Demo:</h3>
          <div className="text-xs text-primary-700 space-y-1">
            <p><strong>Email:</strong> demo@foodconnect.com</p>
            <p><strong>Contraseña:</strong> demo123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
