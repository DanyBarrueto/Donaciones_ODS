import React from 'react'
import App from '../App';
import { useNavigate } from 'react-router-dom';

const PaginaPrincipal = () => {
  

  

  const navigate = useNavigate();
  const buttonLogin = () => navigate('/login');



  

  
  
  return (
    <div>
      <nav className="navbar fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent" style={{right: "10px", position: "relative" }}>
              FoodLoop
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" style={{ left: '10px', position: 'relative' }}>Inicio</a>
            <a href="#nosotros" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Nosotros</a>
            <a href="#como-funciona" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Cómo Funciona</a>
            <a href="#impacto" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Impacto</a>
            <a
              href="#nosotros"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Nosotros
            </a>
            <a
              href="#como-funciona"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Cómo Funciona
            </a>
            <a
              href="#impacto"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Impacto
            </a>
          </div>

          <div className="md:hidden">
            <button id="menuToggle" className="text-gray-700">
              ☰
            </button>
          </div>

          <div>
            <button id="login" onClick={buttonLogin} className="btn-secondary btn-sm">Iniciar Sesión</button>
          </div>
        </div>
      </nav>

      <main>
        <section
          id="inicio"
          className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
          <div className="absolute inset-0 bg-black bg-opacity-20" />

          {/* Floating Food Elements (emojis) */}
          <div
            className="floating-element"
            style={{
              top: "5rem",
              left: "2.5rem",
              fontSize: "3rem",
              animationDelay: "0s",
            }}
          >
            🥕
          </div>
          <div
            className="floating-element"
            style={{
              top: "8rem",
              right: "5rem",
              fontSize: "2.5rem",
              animationDelay: "1s",
            }}
          >
            🍞
          </div>
          <div
            className="floating-element"
            style={{
              bottom: "8rem",
              left: "5rem",
              fontSize: "3rem",
              animationDelay: "2s",
            }}
          >
            🍅
          </div>
          <div
            className="floating-element"
            style={{
              bottom: "5rem",
              right: "4rem",
              fontSize: "2rem",
              animationDelay: "1.5s",
            }}
          >
            🥬
          </div>
          <div
            className="floating-element"
            style={{
              top: "45%",
              left: "8rem",
              fontSize: "2.5rem",
              animationDelay: "3s",
            }}
          >
            🍎
          </div>
          <div
            className="floating-element"
            style={{
              top: "33%",
              right: "10rem",
              fontSize: "1.8rem",
              animationDelay: "2.5s",
            }}
          >
            🥐
          </div>

          <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-slide-up">
              🌟 FoodLoop
            </h1>
            <p className="text-2xl md:text-4xl mb-8 opacity-90 animate-slide-up">
              Conectando comida con necesidad
            </p>
            <p className="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto animate-slide-up">
              La plataforma que une a donantes de alimentos, vendedores con
              productos próximos a vencer y personas que necesitan comida.
              Juntos reducimos el desperdicio alimentario y ayudamos a nuestra
              comunidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <a href="/register" className="btn-primary text-lg px-8 py-4">
                🚀 Únete Ahora
              </a>
              <a href="/login" className="btn-secondary text-lg px-8 py-4">
                🔑 Iniciar Sesión
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up">
              <div className="hero-stats-card p-6">
                <div className="text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-white opacity-90 font-medium">
                  Kilos Donados
                </div>
              </div>
              <div className="hero-stats-card p-6">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-white opacity-90 font-medium">
                  Familias Ayudadas
                </div>
              </div>
              <div className="hero-stats-card p-6">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white opacity-90 font-medium">
                  Entidades Activas
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="nosotros" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 animate-slide-up">
                🤝 Nuestra Misión
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
                En FoodLoop creemos que ningún alimento debería desperdiciarse
                mientras hay personas que lo necesitan. Somos el puente que
                conecta la abundancia con la necesidad.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-in-left">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  💡 ¿Por qué FoodLoop?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Impacto Ambiental
                      </h4>
                      <p className="text-gray-600">
                        Reducimos el desperdicio alimentario, contribuyendo a un
                        planeta más sostenible.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">❤️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Impacto Social
                      </h4>
                      <p className="text-gray-600">
                        Ayudamos a familias y organizaciones que necesitan
                        alimentos de calidad.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Beneficio Económico
                      </h4>
                      <p className="text-gray-600">
                        Los vendedores recuperan valor de productos próximos a
                        vencer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-slide-in-right">
                <div className="glass-card p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    📊 Nuestro Impacto
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        15 Toneladas
                      </div>
                      <div className="text-sm text-gray-600">
                        Comida Rescatada
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary-600 mb-2">
                        2,500
                      </div>
                      <div className="text-sm text-gray-600">
                        Personas Beneficiadas
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-600 mb-2">
                        85%
                      </div>
                      <div className="text-sm text-gray-600">
                        Reducción Desperdicio
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        120
                      </div>
                      <div className="text-sm text-gray-600">
                        Entidades Registradas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="py-20 px-6 bg-gradient-to-r from-primary-50 to-accent-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 animate-slide-up">
                ⚡ Cómo Funciona
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
                Un proceso simple y efectivo para conectar donantes, vendedores
                y beneficiarios
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card p-8 text-center animate-slide-up">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  1. Regístrate
                </h3>
                <p className="text-gray-600 mb-6">
                  Crea tu cuenta como donante, vendedor o beneficiario. El
                  proceso es rápido y gratuito.
                </p>
              </div>
              <div className="feature-card p-8 text-center animate-slide-up">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  2. Publica o Busca
                </h3>
                <p className="text-gray-600 mb-6">
                  Publica tus donaciones/ventas o busca alimentos disponibles en
                  tu zona.
                </p>
              </div>
              <div className="feature-card p-8 text-center animate-slide-up">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  3. Conecta
                </h3>
                <p className="text-gray-600 mb-6">
                  Contacta directamente y coordina la entrega. ¡Así de simple!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="impacto" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 animate-slide-up">
                🌟 Nuestro Impacto
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
                Cada conexión cuenta. Mira cómo estamos transformando
                comunidades y cuidando el planeta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="glass-card p-6 text-center animate-slide-up">
                <div className="text-4xl mb-4">🍎</div>
                <div className="text-3xl font-bold stat-number mb-2">
                  25,000
                </div>
                <div className="text-gray-600 font-medium">
                  Kilos de Comida Rescatada
                </div>
              </div>
              <div className="glass-card p-6 text-center animate-slide-up">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <div className="text-3xl font-bold stat-number mb-2">5,200</div>
                <div className="text-gray-600 font-medium">
                  Personas Beneficiadas
                </div>
              </div>
              <div className="glass-card p-6 text-center animate-slide-up">
                <div className="text-4xl mb-4">🏪</div>
                <div className="text-3xl font-bold stat-number mb-2">180</div>
                <div className="text-gray-600 font-medium">
                  Entidades Participantes
                </div>
              </div>
              <div className="glass-card p-6 text-center animate-slide-up">
                <div className="text-4xl mb-4">🌍</div>
                <div className="text-3xl font-bold stat-number mb-2">15</div>
                <div className="text-gray-600 font-medium">
                  Ciudades Conectadas
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-bold mb-8 animate-slide-up">
              🚀 ¡Únete a la Revolución Alimentaria!
            </h2>
            <p className="text-xl mb-12 opacity-90 animate-slide-up">
              Sé parte del cambio. Cada acción cuenta para construir un mundo
              sin desperdicio alimentario.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <a href="#" className="btn-cta-white text-lg px-8 py-4">
                🌟 Crear Cuenta Gratis
              </a>
              <a
                href="#"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600"
              >
                🔑 Ya tengo cuenta
              </a>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">FoodLoop</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Conectando comida con necesidad para un mundo más sostenible y
                  solidario.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <a href="#inicio" className="hover:text-white">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a href="#nosotros" className="hover:text-white">
                      Nosotros
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Contacto</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span>📧</span>
                    <span>atencion@foodloop.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📱</span>
                    <span>+57 321 309 6695</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              &copy; 2025 FoodLoop. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
