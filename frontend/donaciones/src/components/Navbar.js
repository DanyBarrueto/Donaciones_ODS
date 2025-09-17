import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    console.log('Cerrando sesión...')
    // Limpiar datos de usuario (localStorage, context, etc.)
    localStorage.removeItem('foodconnect_user')
    // Redirigir a login
    navigate('/login')
  }

  // Función para ir a configuración
  const handleGoToConfiguration = () => {
    setDropdownOpen(false)
    navigate('/configuracion')
  }

  // Función para navegar a otras rutas
  const handleNavigation = (path) => {
    setMenuOpen(false) // Cerrar menú móvil si está abierto
    navigate(path)
  }

  return (
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

        {/* Enlaces y acciones */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex items-center gap-6 nav-links">
            <button 
              onClick={() => handleNavigation('/explorador')} 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button 
              onClick={() => handleNavigation('/mis-publicaciones')} 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Mis Publicaciones
            </button>
            <button 
              onClick={() => handleNavigation('/publicar')} 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Publicar
            </button>
            <button 
              onClick={() => handleNavigation('/solicitadas')} 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors cursor-pointer"
            >
              Solicitadas
            </button>
            
            {/* Dropdown menu en desktop */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              >
                🔑 Mi Cuenta
                <svg 
                  className={`ml-1 h-4 w-4 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu Desktop */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                      onClick={handleGoToConfiguration}
                    >
                      ⚙️ Actualizar Datos
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                      onClick={() => {
                        setDropdownOpen(false)
                        handleLogout()
                      }}
                    >
                      🚪 Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
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

      {/* Menú móvil */}
      <div id="mobile-menu" className={`mobile-menu md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto px-2 pb-4 pt-2 flex flex-col gap-3">
          <button 
            onClick={() => handleNavigation('/explorador')} 
            className="mobile-link text-left"
          >
            Inicio
          </button>
          <button 
            onClick={() => handleNavigation('/mis-publicaciones')} 
            className="mobile-link text-left"
          >
            Mis Publicaciones
          </button>
          <button 
            onClick={() => handleNavigation('/publicar')} 
            className="mobile-link text-left"
          >
            Publicar
          </button>
          <button 
            onClick={() => handleNavigation('/solicitadas')} 
            className="mobile-link text-left"
          >
            Solicitadas
          </button>
          
          {/* Sección de usuario en móvil */}
          <div className="border-t border-gray-200 pt-3 mt-2">
            <div className="text-xs text-gray-500 uppercase tracking-wide px-2 mb-2">Mi Cuenta</div>
            <button 
              onClick={handleGoToConfiguration}
              className="mobile-link flex items-center gap-2 text-left w-full"
            >
              ⚙️ Actualizar Datos
            </button>
            <button
              type="button"
              className="mobile-link flex items-center gap-2 w-full text-left text-red-600 hover:text-red-700"
              onClick={() => {
                setMenuOpen(false)
                handleLogout()
              }}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar