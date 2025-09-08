import React, { useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

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
            <a href="/explorador" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Inicio</a>
            <a href="/mis-publicaciones" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Mis Publicaciones</a>
            <a href="/publicar" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Publicar</a>
            <a href="/#impacto" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Impacto</a>
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

      {/* Menú móvil */}
    <div id="mobile-menu" className={`mobile-menu md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto px-2 pb-4 pt-2 flex flex-col gap-3">
          <a href="/#inicio" className="mobile-link" onClick={() => setMenuOpen(false)}>Inicio</a>
      <a href="/mis-publicaciones" className="mobile-link" onClick={() => setMenuOpen(false)}>Mis Publicaciones</a>
          <a href="/#como-funciona" className="mobile-link" onClick={() => setMenuOpen(false)}>Cómo Funciona</a>
          <a href="/#impacto" className="mobile-link" onClick={() => setMenuOpen(false)}>Impacto</a>
          <a href="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>🔑 Iniciar Sesión</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
