import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css'
import { register as registerService } from '../api/auth'

const Register = () => {
  const containerRef = useRef(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      if (containerRef.current) containerRef.current.classList.add('animate-fade-in')
    }, 200)

    // Mostrar requisitos iniciales
    const strengthBar = document.getElementById('passwordStrength')
    const strengthText = document.getElementById('passwordText')
    if (strengthBar && strengthText) {
      strengthBar.className = 'progress-bar strength-weak'
      strengthText.textContent = '💡 Debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo'
      strengthText.className = 'text-xs text-gray-500 mt-1'
    }

    return () => clearTimeout(t)
  }, [])

  const onPasswordInput = (e) => {
    const pwd = e.target.value
    setPassword(pwd)
    const strengthBar = document.getElementById('passwordStrength')
    const strengthText = document.getElementById('passwordText')

    let strength = 0
    let missingRequirements = []

    // Validar cada requisito mínimo
    if (pwd.length >= 8) strength++
    else missingRequirements.push('8 caracteres mínimo')

    if (/[a-z]/.test(pwd)) strength++
    else missingRequirements.push('1 letra minúscula (a-z)')

    if (/[A-Z]/.test(pwd)) strength++
    else missingRequirements.push('1 letra mayúscula (A-Z)')

    if (/[0-9]/.test(pwd)) strength++
    else missingRequirements.push('1 número (0-9)')

    if (/[^A-Za-z0-9]/.test(pwd)) strength++
    else missingRequirements.push('1 carácter especial (!@#$%^&*)')

    strengthBar.className = 'progress-bar'

    if (strength === 0) {
      strengthBar.classList.add('strength-weak')
      strengthText.textContent = '🔴 Agrega al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos'
      strengthText.className = 'text-xs text-red-500 mt-1'
    } else if (strength === 1) {
      strengthBar.classList.add('strength-weak')
      strengthText.textContent = '🟠 Necesitas: ' + missingRequirements.join(' + ')
      strengthText.className = 'text-xs text-orange-500 mt-1'
    } else if (strength === 2) {
      strengthBar.classList.add('strength-weak')
      strengthText.textContent = '🟠 Te faltan: ' + missingRequirements.join(' + ')
      strengthText.className = 'text-xs text-orange-500 mt-1'
    } else if (strength === 3) {
      strengthBar.classList.add('strength-fair')
      strengthText.textContent = '🟡 ¡Casi! Solo necesitas: ' + missingRequirements.join(' + ')
      strengthText.className = 'text-xs text-yellow-500 mt-1'
    } else if (strength === 4) {
      strengthBar.classList.add('strength-good')
      strengthText.textContent = '🟡 ¡Excelente progreso! Solo falta: ' + missingRequirements.join('')
      strengthText.className = 'text-xs text-yellow-500 mt-1'
    } else if (strength === 5) {
      strengthBar.classList.add('strength-strong')
      strengthText.textContent = '🟢 ¡Contraseña perfecta! Cumple todos los requisitos de seguridad'
      strengthText.className = 'text-xs text-green-500 mt-1'
    }
  }

  const onConfirmPasswordChange = (e) => {
    const confPwd = e.target.value
    setConfirmPassword(confPwd)
    if (password !== confPwd) {
      setErrorMessage('🔴 Las contraseñas no coinciden')
    } else if (confPwd.length > 0) {
      setErrorMessage('🟢 Las contraseñas coinciden')
    } else {
      setErrorMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Obtener datos del formulario
    const formData = new FormData(e.target)
    const data = {
      entityType: formData.get('entityType'),
      entityName: formData.get('entityName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      address: formData.get('address'),
      password: password
    }

    // Validar campos requeridos
    if (!data.entityType || !data.entityName || !data.email || !data.phone || !data.location || !data.address) {
      setError('❌ Por favor completa todos los campos')
      return
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('❌ Las contraseñas no coinciden')
      return
    }

    // Validar todos los requisitos de la contraseña
    let validationErrors = []

    if (password.length < 8) {
      validationErrors.push('Mínimo 8 caracteres')
    }
    if (!/[a-z]/.test(password)) {
      validationErrors.push('Al menos 1 letra minúscula')
    }
    if (!/[A-Z]/.test(password)) {
      validationErrors.push('Al menos 1 letra mayúscula')
    }
    if (!/[0-9]/.test(password)) {
      validationErrors.push('Al menos 1 número')
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      validationErrors.push('Al menos 1 carácter especial (!@#$%^&*)')
    }

    if (validationErrors.length > 0) {
      setError('❌ La contraseña no cumple los requisitos mínimos:\n\n' + validationErrors.join('\n'))
      return
    }

    try {
      setLoading(true)
      const result = await registerService(data)
      alert('🎉 ¡Registro exitoso! Ya puedes iniciar sesión.')
      navigate('/login')
    } catch (err) {
      setError(err.message || 'No se pudo registrar el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      {/* Floating Background Elements */}
      <div className="floating-element top-10 left-10 text-6xl register-emoji-1">🥕</div>
      <div className="floating-element top-20 right-20 text-4xl register-emoji-2">🍞</div>
      <div className="floating-element bottom-20 left-20 text-5xl register-emoji-3">🍅</div>
      <div className="floating-element bottom-32 right-16 text-3xl register-emoji-4">🥬</div>
      <div className="floating-element top-1/2 left-16 text-4xl register-emoji-5">🍎</div>
      <div className="floating-element top-1/3 right-32 text-3xl register-emoji-6">🥐</div>

      {/* Main Container */}
      <div ref={containerRef} className="auth-container w-full max-w-lg p-8 animate-slide-up relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-secondary text-white shadow-lg">
              <svg className="icon w-8 h-8" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">¡Únete a FoodConnect! 🌟</h1>
          <p className="text-gray-600">Crea tu cuenta y comienza a hacer la diferencia en tu comunidad</p>
        </div>

        {/* Registration Form */}
        <form id="registerForm" className="space-y-6" onSubmit={handleSubmit}>
          {/* Entity Type */}
          <div className="space-y-2">
            <label htmlFor="entityType" className="block text-sm font-semibold text-gray-700">🏢 Tipo de Entidad</label>
            <select id="entityType" name="entityType" className="select-field" required>
              <option value="">Selecciona tu tipo de entidad</option>
              <option value="Restaurante">🍽️ Restaurante</option>
              <option value="Panadería">🥖 Panadería</option>
              <option value="Supermercado">🛒 Supermercado</option>
              <option value="ONG">🤝 ONG / Comedor Social</option>
              <option value="Particular">👤 Particular</option>
              <option value="Otro">🏪 Otro</option>
            </select>
          </div>

          {/* Entity Name */}
          <div className="space-y-2">
            <label htmlFor="entityName" className="block text-sm font-semibold text-gray-700">🏷️ Nombre de la Entidad</label>
            <input type="text" id="entityName" name="entityName" placeholder="Ej: Panadería La Espiga, Comedor San José..." className="input-field" required />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">📧 Correo Electrónico</label>
            <input type="email" id="email" name="email" placeholder="tu@email.com" className="input-field" required />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">📱 Teléfono de Contacto</label>
            <input type="tel" id="phone" name="phone" placeholder="+34 600 123 456" className="input-field" required />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700">📍 Ubicación (Ciudad)</label>
            <input type="text" id="location" name="location" placeholder="Madrid, Barcelona, Valencia..." className="input-field" required />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">🏠 Dirección Completa</label>
            <input type="text" id="address" name="address" placeholder="Calle, número, código postal..." className="input-field" required />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">🔒 Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Ej: MiClave123!" className="input-field" required value={password} onChange={onPasswordInput} />
            <div className="mt-2">
              <div className="progress-bar" id="passwordStrength"></div>
              <p className="text-xs text-gray-500 mt-1" id="passwordText">💡 Debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo</p>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">🔐 Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repite tu contraseña" className="input-field" required value={confirmPassword} onChange={onConfirmPasswordChange} />
            {errorMessage && (
              <p className={`text-xs mt-1 ${errorMessage.includes('🟢') ? 'text-green-500' : 'text-red-500'}`}>
                {errorMessage}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" name="terms" className="mt-1" required />
            <label htmlFor="terms" className="text-sm text-gray-600">Acepto los <a href="#" className="text-gradient">términos y condiciones</a> y la <a href="#" className="text-gradient">política de privacidad</a> de FoodConnect 📋</label>
          </div>

          {error && (
            <div className="text-red-600 text-sm whitespace-pre-line">{error}</div>
          )}

          {/* Register Button */}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Registrando...' : '🎉 Crear mi cuenta'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">¿Ya tienes una cuenta? <a href="/login" className="text-gradient font-semibold">Inicia sesión aquí 🚀</a></p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <a href="/" className="btn-secondary">🏠 Volver al inicio</a>
        </div>
      </div>
    </div>
  )
}

export default Register
