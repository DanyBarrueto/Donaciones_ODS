import React, { useState, useEffect } from 'react';
import '../styles/SolicitarDonacion.css';

// Formulario basado fielmente en el HTML original proporcionado
const SolicitarDonacion = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    deliveryPreference: 'recoger',
    timePreference: 'manana',
    economicSituation: '',
    message: '',
    terms: false,
  });

  useEffect(() => {
    document.body.classList.add('solicitar-donacion-page');
    return () => document.body.classList.remove('solicitar-donacion-page');
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (!form.terms) {
      setError(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (Math.random() > 0.1) { // 90% éxito
        setSuccess(true);
        setForm({
          deliveryPreference: 'recoger',
          timePreference: 'manana',
          economicSituation: '',
          message: '',
          terms: false,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <header className="header-glass sticky top-0 z-50 flex h-20 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="pulse-ring absolute inset-0 rounded-full bg-primary-400 opacity-30"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Solicitar Donación</h1>
            <p className="text-sm text-gray-600">Recibe alimentos gratuitos</p>
          </div>
        </div>
        <a href="/" className="btn-secondary">
          <svg className="icon w-4 h-4" viewBox="0 0 24 24">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </a>
      </header>

      {/* Main */}
      <main className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="text-6xl mb-4">🤝</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Solicitar Donación</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Solicita esta donación gratuita. Solo necesitas completar algunos detalles básicos.
            </p>
          </div>

          {/* Product Info */}
          <div className="product-info animate-slide-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">🥕</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Excedente de verduras frescas</h3>
                <p className="text-sm text-gray-600">Comedor Solidario San José - Madrid</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">Disponible hoy</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Prioridad media</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Tenemos una gran cantidad de verduras variadas: zanahorias, lechugas, tomates y pimientos.
              Perfectas para comedores sociales o familias necesitadas.
            </p>
          </div>

          {/* Form Card */}
          <div className="card p-8 animate-slide-up">
            {success && (
              <div className="success-message animate-slide-up" id="successMessage" role="alert" aria-live="polite">
                <div className="flex items-center gap-3">
                  <svg className="icon w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">¡Solicitud enviada correctamente!</h3>
                    <p className="text-sm opacity-90">El donante se pondrá en contacto contigo pronto.</p>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="error-message animate-slide-up" id="errorMessage" role="alert" aria-live="assertive">
                <div className="flex items-center gap-3">
                  <svg className="icon w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" x2="9" y1="9" y2="15" />
                    <line x1="9" x2="15" y1="9" y2="15" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Error al enviar la solicitud</h3>
                    <p className="text-sm opacity-90">Por favor, verifica todos los campos e intenta nuevamente.</p>
                  </div>
                </div>
              </div>
            )}

            <form id="donationForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Información de Entrega */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="icon text-primary-500" viewBox="0 0 24 24">
                    <path d="M3 7l9-4 9 4-9 4-9-4v6" />
                    <path d="M3 13l9 4 9-4" />
                    <path d="M3 17l9 4 9-4" />
                  </svg>
                  Información de Entrega
                </h3>

                <div>
                  <label htmlFor="deliveryPreference" className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo prefieres recibir la donación?
                  </label>
                  <select
                    id="deliveryPreference"
                    name="deliveryPreference"
                    required
                    value={form.deliveryPreference}
                    onChange={handleChange}
                    className="select-field"
                  >
                    <option value="recoger">Recoger personalmente</option>
                    <option value="coordinar">Coordinar recogida con voluntario</option>
                    <option value="enviar">Necesito envío (si es posible)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timePreference" className="block text-sm font-medium text-gray-700 mb-2">
                    Horario preferido para coordinar
                  </label>
                  <select
                    id="timePreference"
                    name="timePreference"
                    required
                    value={form.timePreference}
                    onChange={handleChange}
                    className="select-field"
                  >
                    <option value="manana">Mañana (8am - 12pm)</option>
                    <option value="tarde">Tarde (12pm - 5pm)</option>
                    <option value="noche">Noche (5pm - 9pm)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Situación Económica (Opcional) */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="icon text-primary-500" viewBox="0 0 24 24">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                    <path d="M12 17v1" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  Situación Económica (Opcional)
                </h3>

                <div>
                  <label htmlFor="economicSituation" className="block text-sm font-medium text-gray-700 mb-2">
                    Describe brevemente tu situación económica
                  </label>
                  <textarea
                    id="economicSituation"
                    name="economicSituation"
                    value={form.economicSituation}
                    onChange={handleChange}
                    className="textarea-field"
                    placeholder="Ej: Actualmente estamos apoyando a 15 familias y nuestros recursos son limitados."
                  />
                </div>
              </div>

              {/* Mensaje Adicional */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="icon text-primary-500" viewBox="0 0 24 24">
                    <path d="M4 4h16v12H5.17L4 17.17V4z" />
                  </svg>
                  Mensaje Adicional
                </h3>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje para el Donante</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="textarea-field"
                    placeholder="Explica por qué solicitas esta donación y cómo será utilizada."
                  />
                </div>
              </div>

              {/* Términos */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Confirmo que la información proporcionada es verídica y acepto los términos y condiciones.
                </label>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button type="submit" className="btn-primary flex-1" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
                <a href="/explorador" className="btn-cancelar">Cancelar</a>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Completamente Gratuito</h3>
              <p className="text-sm text-gray-600">Esta donación es completamente gratuita. Solo necesitas coordinar la recogida.</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Información Confidencial</h3>
              <p className="text-sm text-gray-600">Tu información se mantiene privada y solo se usa para coordinar la donación.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolicitarDonacion;