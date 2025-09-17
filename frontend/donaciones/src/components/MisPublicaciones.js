import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/MisPublicaciones.css'
import Navbar from './Navbar'

// Datos mock iniciales
const MOCK_POSTS = [
	{
		id: 1,
		type: 'donation',
		title: 'Excedente de verduras frescas',
		description:
			'Tenemos un excedente de verduras frescas de nuestra huerta. Incluye lechugas, tomates, zanahorias y pimientos. Todo en perfecto estado.',
		category: 'frutas-verduras',
		location: 'Madrid',
		contact: '📞 +34 600 123 456',
		quantity: '15 kg aprox.',
		status: 'active',
		createdAt: '2024-01-15',
	},
	{
		id: 2,
		type: 'sale',
		title: 'Pan artesanal del día anterior',
		description:
			'Pan artesanal de excelente calidad del día anterior. Perfecto para tostadas o para hacer pan rallado. Precio muy reducido.',
		category: 'panaderia',
		location: 'Barcelona',
		contact: '📧 panaderia@email.com',
		quantity: '20 barras',
		price: '1€/barra',
		expiration: '2024-01-18',
		status: 'active',
		createdAt: '2024-01-16',
	},
	{
		id: 3,
		type: 'donation',
		title: 'Comida preparada - Cocido madrileño',
		description:
			'Hemos preparado demasiado cocido madrileño para nuestro evento. Está recién hecho y en perfectas condiciones.',
		category: 'comida-preparada',
		location: 'Madrid',
		contact: '📱 WhatsApp: 600 987 654',
		quantity: '8 raciones',
		status: 'active',
		createdAt: '2024-01-17',
	},
	{
		id: 4,
		type: 'sale',
		title: 'Productos lácteos próximos a vencer',
		description:
			'Yogures, leche y quesos con fechas de vencimiento próximas pero en perfecto estado. Precios muy reducidos.',
		category: 'lacteos',
		location: 'Valencia',
		contact: '📞 +34 600 555 777',
		quantity: 'Varios productos',
		price: '50% descuento',
		expiration: '2024-01-20',
		status: 'paused',
		createdAt: '2024-01-14',
	},
	{
		id: 5,
		type: 'donation',
		title: 'Frutas maduras para mermeladas',
		description:
			'Frutas muy maduras ideales para hacer mermeladas, compotas o batidos. Incluye plátanos, manzanas y peras.',
		category: 'frutas-verduras',
		location: 'Sevilla',
		contact: '📧 fruteria@email.com',
		quantity: '10 kg',
		status: 'active',
		createdAt: '2024-01-16',
	},
	{
		id: 6,
		type: 'donation',
		title: 'Conservas variadas',
		description:
			'Conservas en buen estado que no vamos a consumir. Incluye legumbres, verduras y frutas en almíbar.',
		category: 'conservas',
		location: 'Bilbao',
		contact: '📞 +34 600 111 222',
		quantity: '25 latas',
		status: 'active',
		createdAt: '2024-01-13',
	},
	{
		id: 7,
		type: 'sale',
		title: 'Carne fresca con descuento',
		description:
			'Carne fresca de excelente calidad con fecha de vencimiento próxima. Perfecta para congelar.',
		category: 'carnes',
		location: 'Zaragoza',
		contact: '📱 +34 600 333 444',
		quantity: '5 kg',
		price: '8€/kg',
		expiration: '2024-01-12',
		status: 'expired',
		createdAt: '2024-01-10',
	},
	{
		id: 8,
		type: 'donation',
		title: 'Bebidas variadas',
		description:
			'Refrescos y zumos que sobran de nuestro evento. Todas las bebidas están en perfecto estado.',
		category: 'bebidas',
		location: 'Granada',
		contact: '📧 eventos@email.com',
		quantity: '30 botellas',
		status: 'active',
		createdAt: '2024-01-17',
	},
]

const categoryEmoji = (category) => {
	const emojis = {
		'frutas-verduras': '🥕',
		panaderia: '🍞',
		lacteos: '🥛',
		carnes: '🥩',
		'comida-preparada': '🍽️',
		conservas: '🥫',
		bebidas: '🥤',
		otros: '📦',
	}
	return emojis[category] || '🍽️'
}

const MisPublicaciones = () => {
	const navigate = useNavigate()
	const [posts, setPosts] = useState(MOCK_POSTS)
	const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' })
	const [filter, setFilter] = useState('all') // all | donation | sale | active | paused | expired

	useEffect(() => {
		// animación de entrada secuencial
		const els = document.querySelectorAll('.animate-fade-in, .animate-slide-up')
		els.forEach((el, i) => {
			el.style.animationDelay = `${i * 80}ms`
		})
	}, [])

	const counts = useMemo(() => {
		return {
			all: posts.length,
			donation: posts.filter((p) => p.type === 'donation').length,
			sale: posts.filter((p) => p.type === 'sale').length,
			active: posts.filter((p) => p.status === 'active').length,
			paused: posts.filter((p) => p.status === 'paused').length,
			expired: posts.filter((p) => p.status === 'expired').length,
		}
	}, [posts])

	const stats = useMemo(() => {
		return {
			total: posts.length,
			active: posts.filter((p) => p.status === 'active').length,
			donations: posts.filter((p) => p.type === 'donation').length,
			sales: posts.filter((p) => p.type === 'sale').length,
		}
	}, [posts])

	const filtered = useMemo(() => {
		if (filter === 'all') return posts
		if (filter === 'donation' || filter === 'sale') return posts.filter((p) => p.type === filter)
		return posts.filter((p) => p.status === filter)
	}, [posts, filter])

	const onEdit = (id) => {
		// Navegar al editor de publicaciones (con id opcional en query)
		navigate(`/editar-publicacion?id=${id}`)
	}

	const requestDelete = (post) => setDeleteModal({ open: true, id: post.id, title: post.title })
	const cancelDelete = () => setDeleteModal({ open: false, id: null, title: '' })
	const confirmDelete = () => {
		if (deleteModal.id == null) return cancelDelete()
		setPosts((prev) => prev.filter((p) => p.id !== deleteModal.id))
		setDeleteModal({ open: false, id: null, title: '' })
	}

	// Alterna entre 'active' y 'paused' (no cambia si está 'expired')
	const togglePause = (id) => {
		setPosts((prev) =>
			prev.map((p) => {
				if (p.id !== id) return p
				if (p.status === 'expired') return p
				return { ...p, status: p.status === 'paused' ? 'active' : 'paused' }
			})
		)
	}

	const formatDate = (iso) => {
		try {
			return new Date(iso).toLocaleDateString('es-ES')
		} catch {
			return iso
		}
	}

	return (
		<div
			className="min-h-screen relative"
			style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #fff7ed 100%)' }}
		>
			{/* Elementos flotantes decorativos */}
			<div className="floating-element top-10 left-10 text-6xl" style={{ animationDelay: '0s' }}>
				🥕
			</div>
			<div className="floating-element top-20 right-20 text-4xl" style={{ animationDelay: '1s' }}>
				🍞
			</div>
			<div className="floating-element bottom-20 left-20 text-5xl" style={{ animationDelay: '2s' }}>
				🍅
			</div>
			<div className="floating-element bottom-32 right-16 text-3xl" style={{ animationDelay: '1.5s' }}>
				🥬
			</div>
			<div className="floating-element top-1/2 left-16 text-4xl" style={{ animationDelay: '3s' }}>
				🍎
			</div>
			<div className="floating-element top-1/3 right-32 text-3xl" style={{ animationDelay: '2.5s' }}>
				🥐
			</div>

			<Navbar />

			{/* Contenido principal */}
			<div className="pt-24 pb-12 px-4 relative z-10">
				<div className="max-w-7xl mx-auto">
					{/* Encabezado */}
					<div className="text-center mb-12 animate-slide-up">
                        <br></br>
                        <br></br>
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
                            📋 <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Mis Publicaciones</span>
                        </h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Gestiona todas tus donaciones y ventas desde un solo lugar
						</p>
					</div>

					{/* Tarjetas de estadísticas */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
						<div className="stats-card">
							<div className="text-3xl font-bold text-primary-600 mb-2">{stats.total}</div>
							<div className="text-sm text-gray-600 font-medium">Total Publicaciones</div>
						</div>
						<div className="stats-card">
							<div className="text-3xl font-bold text-primary-600 mb-2">{stats.active}</div>
							<div className="text-sm text-gray-600 font-medium">Activas</div>
						</div>
						<div className="stats-card">
							<div className="text-3xl font-bold text-secondary-600 mb-2">{stats.donations}</div>
							<div className="text-sm text-gray-600 font-medium">Donaciones</div>
						</div>
						<div className="stats-card">
							<div className="text-3xl font-bold text-accent-600 mb-2">{stats.sales}</div>
							<div className="text-sm text-gray-600 font-medium">Ventas</div>
						</div>
					</div>

					{/* Filtros y acciones */}
					<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
						<div className="flex flex-wrap gap-3">
							<button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
								📋 Todas ({counts.all})
							</button>
							<button className={`filter-btn ${filter === 'donation' ? 'active' : ''}`} onClick={() => setFilter('donation')}>
								🤝 Donaciones ({counts.donation})
							</button>
							<button className={`filter-btn ${filter === 'sale' ? 'active' : ''}`} onClick={() => setFilter('sale')}>
								💰 Ventas ({counts.sale})
							</button>
							<button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
								✅ Activas ({counts.active})
							</button>
							<button className={`filter-btn ${filter === 'paused' ? 'active' : ''}`} onClick={() => setFilter('paused')}>
								⏸️ Pausadas ({counts.paused})
							</button>
							<button className={`filter-btn ${filter === 'expired' ? 'active' : ''}`} onClick={() => setFilter('expired')}>
								⏰ Vencidas ({counts.expired})
							</button>
						</div>
						<a href="#" className="btn-primary" onClick={(e) => e.preventDefault()}>
							➕ Nueva Publicación
						</a>
					</div>

					{/* Grid de publicaciones */}
					{filtered.length === 0 ? (
						<div id="emptyState" className="empty-state">
							<div className="text-6xl mb-6">📝</div>
							<h3 className="text-2xl font-bold text-gray-800 mb-4">No hay publicaciones</h3>
							<p className="text-gray-600 mb-6">
								Aún no has creado ninguna publicación. ¡Comienza a compartir alimentos ahora!
							</p>
							<a href="#" className="btn-primary" onClick={(e) => e.preventDefault()}>
								➕ Crear Primera Publicación
							</a>
						</div>
					) : (
						<div id="postsContainer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
							{filtered.map((post) => {
								const isDonation = post.type === 'donation'
								const badgeClass = isDonation ? 'badge-donation' : 'badge-sale'
								const badgeText = isDonation ? '🤝 Donación' : '💰 Venta'

								return (
									<div className="post-card p-6 relative" key={post.id}>
										<div className="flex items-start justify-between mb-4">
											<div className="flex items-center gap-3">
												<div className="text-3xl">{categoryEmoji(post.category)}</div>
												<div>
													<h3 className="text-lg font-bold text-gray-800 leading-tight">{post.title}</h3>
													<div className="flex items-center gap-2 mt-1">
														<span className={badgeClass}>{badgeText}</span>
														{post.status === 'paused' && (
															<span className="px-2 py-0.5 rounded-full text-xs bg-accent-50 text-accent-600 border border-accent-200">⏸️ Pausada</span>
														)}
													</div>
												</div>
											</div>
										</div>

										<p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{post.description}</p>

										<div className="space-y-2 mb-4">
											<div className="flex flex-wrap items-center gap-2 text-sm text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
												<span>📍 {post.location}</span>
												<span>•</span>
												<span>📦 {post.quantity}</span>
												{post.price && (<><span>•</span><span>💵 {post.price}</span></>)}
												{post.expiration && (<><span>•</span><span>⏰ {formatDate(post.expiration)}</span></>)}
											</div>
										</div>

										<div className="flex flex-wrap gap-2">
											<button className="btn-secondary" onClick={() => onEdit(post.id)}>✏️ Editar</button>
											<button
												className="btn-warning"
												onClick={() => togglePause(post.id)}
												disabled={post.status === 'expired'}
											>
												{post.status === 'paused' ? '▶️ Reanudar' : '⏸️ Pausar'}
											</button>
											<button className="btn-danger" onClick={() => requestDelete(post)}>🗑️ Eliminar</button>
										</div>

										{/* Modal inline por tarjeta */}
										{deleteModal.open && deleteModal.id === post.id && (
											<div className="absolute inset-0 z-20">
												<div className="absolute inset-0 bg-black/30 rounded-[inherit]" onClick={cancelDelete} />
												<div className="absolute inset-0 z-30 flex items-center justify-center p-4">
													<div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6">
														<div className="flex items-start gap-3">
															<div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">⚠️</div>
															<div>
																<h3 className="text-lg font-semibold text-gray-900">¿Eliminar publicación?</h3>
																<p className="mt-1 text-sm text-gray-600">Estás a punto de eliminar: <span className="font-medium text-gray-800">{deleteModal.title}</span>. Esta acción no se puede deshacer.</p>
															</div>
														</div>
														<div className="mt-5 flex justify-end gap-3">
															<button onClick={cancelDelete} className="px-4 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50">Cancelar</button>
															<button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Eliminar</button>
														</div>
													</div>
												</div>
											</div>
										)}
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default MisPublicaciones