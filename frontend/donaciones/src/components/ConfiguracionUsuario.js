import React, { useState, useEffect } from 'react';
import '../styles/ConfiguracionUsuario.css';

const ConfiguracionUsuario = () => {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    entityType: '',
    entityName: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    password: '',
    confirmPassword: '',
    newsletter: false
  });

  // Estados para validación de contraseña
  const [passwordStrength, setPasswordStrength] = useState({
    width: '0%',
    text: 'Deja en blanco si no quieres cambiarla',
    className: 'text-xs text-gray-500 mt-1'
  });

  // Función para verificar fortaleza de contraseña
  const checkPasswordStrength = (password) => {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength++;
    else if (password.length > 0) feedback.push('al menos 8 caracteres');
    
    if (/[a-z]/.test(password)) strength++;
    else if (password.length > 0) feedback.push('una letra minúscula');
    
    if (/[A-Z]/.test(password)) strength++;
    else if (password.length > 0) feedback.push('una letra mayúscula');
    
    if (/[0-9]/.test(password)) strength++;
    else if (password.length > 0) feedback.push('un número');
    
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else if (password.length > 0) feedback.push('un carácter especial');

    if (password.length === 0) {
      setPasswordStrength({
        width: '0%',
        text: 'Deja en blanco si no quieres cambiarla',
        className: 'text-xs text-gray-500 mt-1'
      });
      return;
    }

    if (strength <= 1) {
      setPasswordStrength({
        width: '25%',
        text: `🔴 Débil - Necesita: ${feedback.slice(0, 2).join(', ')}`,
        className: 'text-xs text-red-500 mt-1'
      });
    } else if (strength <= 2) {
      setPasswordStrength({
        width: '50%',
        text: `🟡 Regular - Necesita: ${feedback.slice(0, 2).join(', ')}`,
        className: 'text-xs text-yellow-500 mt-1'
      });
    } else if (strength <= 3) {
      setPasswordStrength({
        width: '75%',
        text: '🟠 Buena',
        className: 'text-xs text-orange-500 mt-1'
      });
    } else {
      setPasswordStrength({
        width: '100%',
        text: '🟢 Excelente',
        className: 'text-xs text-green-500 mt-1'
      });
    }
  };

  // Función para cargar datos del usuario (simulando localStorage)
  const loadUser = () => {
    // En un entorno real, aquí obtendrías los datos de tu API o estado global
    // Simulando datos por defecto
    return {
      entityType: 'restaurant',
      entityName: 'Demo Restaurante',
      email: 'demo@foodconnect.com',
      phone: '+34 600 123 456',
      location: 'Madrid',
      address: 'Calle Falsa 123',
      newsletter: true,
      password: 'demo123'
    };
  };

  // Función para guardar usuario (simulando localStorage)
  const saveUser = (userData) => {
    // En un entorno real, aquí harías una petición a tu API
    console.log('Guardando usuario:', userData);
    // Simulando guardado exitoso
    alert('✅ Datos actualizados correctamente');
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    const userData = loadUser();
    setFormData({
      entityType: userData.entityType || '',
      entityName: userData.entityName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      location: userData.location || '',
      address: userData.address || '',
      password: '',
      confirmPassword: '',
      newsletter: userData.newsletter || false
    });
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Verificar fortaleza de contraseña si es el campo password
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.entityType || !formData.entityName || !formData.email) {
      alert('Por favor, completa los campos obligatorios (tipo, nombre y correo)');
      return;
    }

    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        alert('❌ Las contraseñas no coinciden');
        return;
      }
      if (formData.password.length < 8) {
        alert('❌ La nueva contraseña debe tener al menos 8 caracteres');
        return;
      }
    }

    // Preparar datos para enviar
    const updatedData = {
      entityType: formData.entityType,
      entityName: formData.entityName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      address: formData.address,
      newsletter: formData.newsletter
    };

    // Solo agregar contraseña si se proporcionó una nueva
    if (formData.password) {
      updatedData.password = formData.password;
    }

    // Guardar datos
    saveUser(updatedData);
  };

  // Manejar eliminación de cuenta
  const handleDeleteAccount = () => {
    if (!window.confirm('¿Estás seguro que deseas eliminar tu cuenta? Esta acción no puede deshacerse.')) {
      return;
    }
    
    // En un entorno real, aquí harías una petición a tu API para eliminar la cuenta
    console.log('Eliminando cuenta...');
    alert('Cuenta eliminada. Serás redirigido al inicio.');
    // Aquí podrías redirigir usando React Router
    // navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      
      {/* Elementos flotantes decorativos */}
      <div className="absolute top-10 left-10 text-6xl opacity-60 animate-bounce" style={{animationDelay: '0s'}}>🥕</div>
      <div className="absolute top-20 right-20 text-4xl opacity-60 animate-bounce" style={{animationDelay: '1s'}}>🍞</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-60 animate-bounce" style={{animationDelay: '2s'}}>🍅</div>

      {/* Contenedor principal */}
      <div className="w-full max-w-lg p-8 relative z-10 bg-white/95 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-1">
            Actualizar mis datos
          </h1>
          <p className="text-gray-600 text-sm">Modifica tu información y guarda los cambios</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Tipo de entidad */}
          <div>
            <label htmlFor="entityType" className="block text-sm font-semibold text-gray-700 mb-2">
              🏢 Tipo de Entidad
            </label>
            <select
              id="entityType"
              name="entityType"
              value={formData.entityType}
              onChange={handleInputChange}
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
              required
            >
              <option value="">Selecciona tu tipo de entidad</option>
              <option value="restaurant">🍽️ Restaurante</option>
              <option value="bakery">🥖 Panadería</option>
              <option value="supermarket">🛒 Supermercado</option>
              <option value="ngo">🤝 ONG / Comedor Social</option>
              <option value="individual">👤 Particular</option>
              <option value="other">🏪 Otro</option>
            </select>
          </div>

          {/* Nombre de la entidad */}
          <div>
            <label htmlFor="entityName" className="block text-sm font-semibold text-gray-700 mb-2">
              🏷️ Nombre de la Entidad
            </label>
            <input
              id="entityName"
              name="entityName"
              type="text"
              value={formData.entityName}
              onChange={handleInputChange}
              placeholder="Ej: Panadería La Espiga"
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              📱 Teléfono de Contacto
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+34 600 123 456"
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              📍 Ubicación (Ciudad)
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Madrid, Barcelona..."
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
              🏠 Dirección Completa
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Calle, número, código postal..."
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Nueva contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              🔒 Nueva Contraseña (opcional)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Dejar en blanco para mantener la actual"
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
            />
            <div className="mt-2">
              <div className="h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 transition-all duration-300"
                  style={{ width: passwordStrength.width }}
                ></div>
              </div>
              <p className={passwordStrength.className}>{passwordStrength.text}</p>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              🔐 Confirmar Nueva Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repite la nueva contraseña"
              className="w-full p-4 border-2 border-green-200 rounded-xl bg-white/90 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Newsletter */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-green-600 rounded border-green-300 focus:ring-green-500"
            />
            <label htmlFor="newsletter" className="text-sm text-gray-600">
              Quiero recibir noticias y actualizaciones 📬
            </label>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              💾 Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ↩️ Volver
            </button>
          </div>

          {/* Eliminar cuenta */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
            >
              Eliminar cuenta
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ConfiguracionUsuario;