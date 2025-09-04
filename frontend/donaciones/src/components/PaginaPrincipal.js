import React, { useEffect, useState } from 'react'
import '../styles/PaginaPrincipal.css';
import { useNavigate } from 'react-router-dom';

const PaginaPrincipal = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  

  // Efectos: barra de progreso de scroll, animaciones en viewport y contadores
  useEffect(() => {
    // Barra de progreso de scroll
    const bar = document.getElementById('scrollIndicator');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar) bar.style.transform = `scaleX(${ratio})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Animaciones al entrar en viewport
    const animatedEls = document.querySelectorAll(
      '.animate-slide-up, .animate-slide-in-left, .animate-slide-in-right'
    );
    animatedEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    animatedEls.forEach((el) => observer.observe(el));

    // Contadores animados
    function animateCounter(element, target) {
      let current = 0;
      const duration = 2000; // ms
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        current = Math.floor(progress * target);
        element.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const raw = (entry.target.textContent || '').replace(/[^0-9]/g, '');
          const target = parseInt(raw || '0', 10);
          if (!isNaN(target) && target > 0) {
            animateCounter(entry.target, target);
          }
          statsObserver.unobserve(entry.target);
        }
      });
    });
    document.querySelectorAll('.stat-number').forEach((el) => {
      statsObserver.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Indicador de progreso de scroll */}
      <div className="scroll-indicator" id="scrollIndicator" />
      <nav className="navbar fixed top-0 w-full z-50 px-6 py-3 md:py-4">
        <div className="navbar-content max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="brand flex items-center gap-3">
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
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent brand-title">
              FoodLoop
            </h1>
          </div>

          {/* Botones y enlaces de navegación */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-6 nav-links">
              <a href="#inicio" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Inicio</a>
              <a href="#nosotros" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Nosotros</a>
              <a href="#como-funciona" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Cómo Funciona</a>
              <a href="#impacto" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Impacto</a>
              <a href="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">🔑 Iniciar Sesión</a>
            </div>

            <button
              type="button"
              className="menu-toggle md:hidden text-gray-700"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div id="mobile-menu" className={`mobile-menu md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="max-w-7xl mx-auto px-2 pb-4 pt-2 flex flex-col gap-3">
            <a href="#inicio" className="mobile-link">Inicio</a>
            <a href="#nosotros" className="mobile-link">Nosotros</a>
            <a href="#como-funciona" className="mobile-link">Cómo Funciona</a>
            <a href="#impacto" className="mobile-link">Impacto</a>
            <a href="/login" className="mobile-link">🔑 Iniciar Sesión</a>
          </div>
        </div>
      </nav>

      <main>
        <section
          id="inicio"
          className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
          <div className="absolute inset-0 overlay-light" />

          {/* Floating Food Elements (emojis) */}
          <div className="floating-element floating-emoji-1">
            🥕
          </div>
          <div className="floating-element floating-emoji-2">
            🍞
          </div>
          <div className="floating-element floating-emoji-3">
            🍅
          </div>
          <div className="floating-element floating-emoji-4">
            🥬
          </div>
          <div className="floating-element floating-emoji-5">
            🍎
          </div>
          <div className="floating-element floating-emoji-6">
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
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="text-sm text-primary-700 font-medium">
                    ✅ Registro gratuito<br />
                    ✅ Verificación rápida<br />
                    ✅ Perfil personalizado
                  </div>
                </div>
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
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="text-sm text-secondary-700 font-medium">
                    ✅ Publicación fácil<br />
                    ✅ Búsqueda por ubicación<br />
                    ✅ Filtros inteligentes
                  </div>
                </div>
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
                <div className="bg-accent-50 rounded-lg p-4">
                  <div className="text-sm text-accent-700 font-medium">
                    ✅ Contacto directo<br />
                    ✅ Coordinación flexible<br />
                    ✅ Impacto inmediato
                  </div>
                </div>
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

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 animate-slide-in-left">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl">
                    👨‍🍳
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Carlos Mendoza</h4>
                    <p className="text-gray-600">Restaurante El Buen Sabor</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "FoodLoop nos ha permitido dar una segunda vida a nuestros excedentes.
                  Es increíble saber que nuestra comida llega a familias que la necesitan."
                </p>
              </div>

              <div className="glass-card p-8 animate-slide-in-right">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl">
                    👩‍💼
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">María González</h4>
                    <p className="text-gray-600">Fundación Ayuda Social</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Gracias a FoodLoop podemos alimentar a más familias cada semana.
                  La plataforma es fácil de usar y el impacto es inmediato."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 overlay-light" />
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-bold mb-8 animate-slide-up">
              🚀 ¡Únete a la Revolución Alimentaria!
            </h2>
            <p className="text-xl mb-12 opacity-90 animate-slide-up">
              Sé parte del cambio. Cada acción cuenta para construir un mundo
              sin desperdicio alimentario.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <a href="/register" className="btn-cta-white text-lg px-8 py-4">🌟 Crear Cuenta Gratis</a>
              <a href="/login" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">🔑 Ya tengo cuenta</a>
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
                  <li>
                    <a href="#como-funciona" className="hover:text-white">
                      Cómo Funciona
                    </a>
                  </li>
                  <li>
                    <a href="/" className="hover:text-white">
                      Explorar
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Contacto</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span>📧</span>
                    <span>info@foodloop.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📱</span>
                    <span>+34 900 123 456</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Madrid, España</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mb-12">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                <span className="text-lg">📧</span>
              </div>
              <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-700 transition-colors">
                <span className="text-lg">📱</span>
              </div>
              <div className="w-10 h-10 bg-secondary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary-700 transition-colors">
                <span className="text-lg">🌐</span>
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
