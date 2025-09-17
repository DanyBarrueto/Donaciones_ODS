import React, { useEffect, useMemo, useState } from 'react'
import '../styles/Explorador.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

// Datos mock (del HTML original)
const MOCK_LISTINGS = [
  {
    id: '1',
    entityName: 'Comedor Solidario San José',
    title: 'Excedente de verduras frescas',
    description:
      'Tenemos una gran cantidad de verduras variadas: zanahorias, lechugas, tomates y pimientos. Perfectas para comedores sociales o familias necesitadas.',
    foodType: 'donacion',
    location: 'Madrid',
    contactInfo: 'contacto@comedor.org',
    createdAt: '2025-08-13T10:00:00Z',
    emoji: '🥕',
  },
  {
    id: '2',
    entityName: 'Panadería Artesanal El Trigo',
    title: 'Pan del día anterior',
    description:
      'Pan artesanal recién horneado del día anterior. Ideal para hacer tostadas, pan rallado o simplemente disfrutar. Variedad de panes integrales y blancos.',
    foodType: 'donacion',
    location: 'Madrid',
    contactInfo: 'contacto@comedor.org',
    createdAt: '2025-08-13T09:00:00Z',
    emoji: '🍞',
  },
  {
    id: '3',
    entityName: 'Panadería La Espiga Dorada',
    title: 'Lotes de bollería a punto de caducar',
    description:
      'Bollería variada con fecha de vencimiento próxima (2 días): croissants, magdalenas, donuts y pasteles. Descuento del 50% sobre precio original.',
    foodType: 'venta',
    location: 'Barcelona',
    expirationDate: '2025-08-15',
    contactInfo: 'ventas@panaderia.es',
    createdAt: '2025-08-13T08:00:00Z',
    emoji: '🥐',
  },
  {
    id: '4',
    entityName: 'Lácteos Frescos del Valle',
    title: 'Yogures con 3 días de caducidad',
    description:
      'Pack de 6 yogures naturales de alta calidad, caducan en 3 días. Perfectos para consumo inmediato. Precio especial por lote completo.',
    foodType: 'venta',
    location: 'Barcelona',
    expirationDate: '2025-08-16',
    contactInfo: 'ventas@panaderia.es',
    createdAt: '2025-08-13T07:00:00Z',
    emoji: '🥛',
  },
  {
    id: '5',
    entityName: 'Supermercado Verde Ecológico',
    title: 'Frutas maduras para donación',
    description:
      'Frutas que están muy maduras pero perfectas para batidos, mermeladas o consumo inmediato: plátanos, manzanas, peras y naranjas.',
    foodType: 'donacion',
    location: 'Valencia',
    contactInfo: 'donaciones@supermercadoverde.com',
    createdAt: '2025-08-12T18:00:00Z',
    emoji: '🍎',
  },
  {
    id: '6',
    entityName: 'Restaurante El Buen Sabor',
    title: 'Comida preparada del día',
    description:
      'Platos preparados que no se vendieron hoy: paellas, guisos y ensaladas. Perfectos para llevar y consumir en el día. Calidad garantizada.',
    foodType: 'venta',
    location: 'Sevilla',
    expirationDate: '2025-08-14',
    contactInfo: 'info@elbuensabor.es',
    createdAt: '2025-08-12T20:00:00Z',
    emoji: '🥘',
  },
  {
    id: '7',
    entityName: 'Carnicería Los Hermanos',
    title: 'Embutidos próximos a caducar',
    description:
      'Jamón serrano, chorizo y salchichón artesanal con 5 días para caducidad. Excelente calidad a precio reducido del 40%.',
    foodType: 'venta',
    location: 'Bilbao',
    expirationDate: '2025-08-18',
    contactInfo: 'hermanos@carniceria.com',
    createdAt: '2025-08-12T15:00:00Z',
    emoji: '🥓',
  },
  {
    id: '8',
    entityName: 'Huerto Urbano Comunitario',
    title: 'Cosecha excedente de temporada',
    description:
      'Verduras frescas recién cosechadas: calabacines, berenjenas, pimientos y hierbas aromáticas. Cultivo ecológico sin pesticidas.',
    foodType: 'donacion',
    location: 'Granada',
    contactInfo: 'huerto@comunidad.org',
    createdAt: '2025-08-12T12:00:00Z',
    emoji: '🍆',
  },
]

const Explorador = () => {
  // filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [foodType, setFoodType] = useState('all')
  const [location, setLocation] = useState('')
  // pedidos
  const [requested, setRequested] = useState(new Set())
  // modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    // Añade retrasos a elementos con animación de entrada
    const els = document.querySelectorAll('.animate-fade-in')
    els.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`
    })
  }, [])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const loc = location.trim().toLowerCase()

    return MOCK_LISTINGS.filter((l) => {
      const matchesQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.entityName.toLowerCase().includes(q)

      const matchesFood = foodType === 'all' || l.foodType === foodType
      const matchesLoc = !loc || l.location.toLowerCase().includes(loc)
      return matchesQuery && matchesFood && matchesLoc
    })
  }, [searchQuery, foodType, location])

  const stats = useMemo(() => {
    const total = filtered.length
    const donationCount = filtered.filter((l) => l.foodType === 'donacion').length
    const saleCount = filtered.filter((l) => l.foodType === 'venta').length
    return { total, donationCount, saleCount }
  }, [filtered])

  const handleRequest = (listing) => {
    if (requested.has(listing.id)) return
    const next = new Set(requested)
    next.add(listing.id)
    setRequested(next)

    const actionText = listing.foodType === 'donacion' ? 'donación' : 'compra'
    setModalMessage(
      `Tu solicitud de ${actionText} para "${listing.title}" de ${listing.entityName} ha sido enviada correctamente. Te contactarán pronto.`
    )
    setModalOpen(true)
    // autocerrar
    setTimeout(() => setModalOpen(false), 3000)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)' }}>
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient py-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 overlay-light"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">🍎 Encuentra Comida 🥖</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Conectamos donaciones de comida y alimentos próximos a vencer con personas que los necesitan
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-2xl">🤝</span>
              <span className="font-medium text-black">Donaciones Gratuitas</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-2xl">💰</span>
              <span className="font-medium text-black">Precios Reducidos</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-2xl">🌍</span>
              <span className="font-medium text-black">Reduce Desperdicio</span>
            </div>
          </div>
        </div>
        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-6xl floating-element opacity-30">🥕</div>
        <div className="absolute top-40 right-20 text-4xl floating-element opacity-40" style={{ animationDelay: '1s' }}>
          🍞
        </div>
        <div className="absolute bottom-20 left-20 text-5xl floating-element opacity-35" style={{ animationDelay: '2s' }}>
          🍅
        </div>
        <div className="absolute bottom-40 right-10 text-3xl floating-element opacity-45" style={{ animationDelay: '1.5s' }}>
          🥬
        </div>
      </section>

      {/* Main */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Search */}
          <div className="card p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="align-middle mr-2">🔍</span>
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent inline-block">
                Busca lo que necesitas
              </span>
            </h3>
            <div className="flex flex-col lg:flex-row gap-6">
              <select
                className="select-field lg:w-48"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              >
                <option value="all">🍽️ Todos los tipos</option>
                <option value="donacion">🤝 Donaciones</option>
                <option value="venta">💰 Ventas</option>
              </select>
              <div className="relative lg:w-48">
                <svg className="icon absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  type="text"
                  placeholder="📍 Ciudad"
                  className="input-field pl-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">📊</div>
              <div className="text-3xl font-bold text-primary-600">{stats.total}</div>
              <div className="text-gray-600 font-medium">Listados Activos</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">🎁</div>
              <div className="text-3xl font-bold text-primary-600">{stats.donationCount}</div>
              <div className="text-gray-600 font-medium">Donaciones</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">🏪</div>
              <div className="text-3xl font-bold text-secondary-600">{stats.saleCount}</div>
              <div className="text-gray-600 font-medium">Ofertas Especiales</div>
            </div>
          </div>

          {/* Listings */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No encontramos resultados</h3>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((listing) => {
                const isDonation = listing.foodType === 'donacion'
                const badgeClass = isDonation ? 'badge-donation' : 'badge-sale'
                const badgeText = isDonation ? '🤝 Donación Gratuita' : '💰 Oferta Especial'
                const buttonText = isDonation ? '🤝 Solicitar Donación' : '🛒 Solicitar Compra'
                const isRequested = requested.has(listing.id)

                const onButtonClick = () => {
                  if (isDonation) {
                    navigate('/solicitar-donacion')
                  } else {
                    navigate('/solicitar-compra')
                  }
                }

                return (
                  <div key={listing.id} className="card p-6 animate-fade-in hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{listing.emoji}</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 leading-tight">{listing.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                            <svg className="icon w-4 h-4" viewBox="0 0 24 24">
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                            {listing.entityName}
                          </div>
                        </div>
                      </div>
                      <span className={badgeClass}>{badgeText}</span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{listing.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                        <svg className="icon w-4 h-4" viewBox="0 0 24 24">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="font-medium">📍 {listing.location}</span>
                      </div>
                      {listing.expirationDate ? (
                        <div className="flex items-center gap-2 text-sm text-secondary-600 bg-secondary-50 px-3 py-1 rounded-full">
                          <svg className="icon w-4 h-4" viewBox="0 0 24 24">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                          <span className="font-medium">
                            Vence: {new Date(listing.expirationDate).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="icon w-4 h-4" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          <span className="font-medium">{listing.contactInfo}</span>
                        </div>
                        <div className="text-xs text-gray-400">{new Date(listing.createdAt).toLocaleDateString('es-ES')}</div>
                      </div>
                    </div>

                    <button
                      className={`btn-request ${isRequested && !isDonation ? 'requested' : ''}`}
                      onClick={onButtonClick}
                      disabled={isRequested && !isDonation}
                    >
                      {isRequested && !isDonation ? (
                        <>
                          <svg className="icon w-4 h-4" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          Solicitado
                        </>
                      ) : (
                        buttonText
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-800 to-accent-800 text-white py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold mb-4">Juntos reducimos el desperdicio alimentario</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            FoodConnect conecta a donantes y vendedores de alimentos con personas que los necesitan, creando un impacto positivo en nuestra comunidad y el medio ambiente.
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <span>💚 Sostenible</span>
            <span>🤝 Solidario</span>
            <span>🌍 Responsable</span>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="modal show" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="modal-content">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Solicitud Enviada!</h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              <button className="btn-request" style={{ width: 'auto', padding: '0.5rem 2rem' }} onClick={() => setModalOpen(false)}>
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Explorador
