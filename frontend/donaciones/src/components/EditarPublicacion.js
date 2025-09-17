import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/EditarPublicacion.css'

const categoryEmojis = {
	'frutas-verduras': '🥕',
	'panaderia': '🍞',
	'lacteos': '🥛',
	'carnes': '🥩',
	'comida-preparada': '🍽️',
	'conservas': '🥫',
	'bebidas': '🥤',
	'otros': '📦'
}

const EditarPublicacion = () => {
	const [postType, setPostType] = useState('donation') // donation | sale
	const [status, setStatus] = useState('activa') // activa | pausada
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [location, setLocation] = useState('')
	const [quantity, setQuantity] = useState('')
	const [contact, setContact] = useState('')
	const [category, setCategory] = useState('frutas-verduras')
	const [price, setPrice] = useState('')

	const [notif, setNotif] = useState({ show: false, type: 'success', icon: '✅', message: '' })

	useEffect(() => {
		document.body.classList.add('editar-publicacion-page')
		return () => document.body.classList.remove('editar-publicacion-page')
	}, [])

	const preview = useMemo(() => {
		const emoji = categoryEmojis[category] || '🍽️'
		const showPrice = postType === 'sale' && price && Number(price) > 0
		return {
			title: title || 'Título de la publicación',
			description: description || 'Descripción de la publicación...'
				,
			location: location || 'Ubicación',
			quantity: quantity || 'Cantidad',
			contact: contact || 'Contacto',
			emoji,
			showPrice,
			price: showPrice ? Number(price).toFixed(2) : ''
		}
	}, [title, description, location, quantity, contact, category, price, postType])

	const onSubmit = (e) => {
		e.preventDefault()
		// Simular guardado
		setNotif({ show: true, type: 'success', icon: '✅', message: 'Cambios guardados exitosamente.' })
		setTimeout(() => setNotif((n) => ({ ...n, show: false })), 3500)
	}

	return (
		<div className="min-h-screen relative">
			{/* Floating Icons */}
			<div className="floating-icon" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>🍎</div>
			<div className="floating-icon" style={{ top: '20%', right: '10%', animationDelay: '1s' }}>🥕</div>
			<div className="floating-icon" style={{ bottom: '30%', left: '8%', animationDelay: '2s' }}>🍞</div>
			<div className="floating-icon" style={{ bottom: '15%', right: '15%', animationDelay: '1.5s' }}>🥛</div>
			<div className="floating-icon" style={{ top: '50%', left: '3%', animationDelay: '3s' }}>🍅</div>
			<div className="floating-icon" style={{ top: '70%', right: '5%', animationDelay: '2.5s' }}>🥐</div>

			<Navbar />

			{/* Acceso rápido */}
			<div className="fixed right-6 top-24 z-40">
				<Link to="/mis-publicaciones" className="btn-secondary">Mis publicaciones</Link>
			</div>

			<main className="pt-24 pb-12 px-6">
				<div className="max-w-6xl mx-auto">
					{/* Hero */}
					<div className="text-center mb-12 animate-fade-in">
						<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Editor de Publicaciones</h1>
						<p className="mt-2 text-gray-600">Actualiza los detalles de tu publicación y visualiza los cambios en tiempo real.</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Panel izquierdo: opciones y formulario */}
						<div className="lg:col-span-2 editor-card p-6">
							{/* Tipo de publicación */}
							<div className="mb-6">
								<div className="grid grid-cols-2 gap-4">
									<button
										type="button"
										className={`type-card ${postType === 'donation' ? 'selected donation' : ''}`}
										onClick={() => setPostType('donation')}
									>
										<div className="text-3xl mb-2">🤝</div>
										<div className="font-semibold">Donación</div>
										<div className="text-xs text-slate-200 mt-1 text-black">Entrega sin costo</div>
									</button>
									<button
										type="button"
										className={`type-card ${postType === 'sale' ? 'selected' : ''}`}
										onClick={() => setPostType('sale')}
									>
										<div className="text-3xl mb-2">💲</div>
										<div className="font-semibold">Venta</div>
										<div className="text-xs text-slate-200 mt-1 text-black">Incluye precio</div>
									</button>
								</div>
							</div>

							{/* Estado */}
							<div className="mb-6">
								<div className="flex gap-3 flex-wrap">
									{['activa', 'pausada'].map((s) => (
										<button
											key={s}
											type="button"
											className={`status-pill ${status === s ? 'selected' : ''}`}
											onClick={() => setStatus(s)}
										>
											{s === 'activa' ? '🟢 Activa' : '⏸️ Pausada'}
										</button>
									))}
								</div>
							</div>

							<div className="section-divider" />

							{/* Formulario */}
							<form onSubmit={onSubmit} className="space-y-5">
								<div>
									<label className="label-modern">Título</label>
									<input className="input-modern w-full" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título de la publicación" />
								</div>

								<div>
									<label className="label-modern">Descripción</label>
									<textarea className="textarea-modern w-full" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu publicación..." />
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="label-modern">Ubicación</label>
										<input className="input-modern w-full" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ciudad o dirección" />
									</div>
									<div>
										<label className="label-modern">Cantidad</label>
										<input type="number" min="0" className="input-modern w-full" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Ej. 10 kg, 5 unidades" />
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="label-modern">Contacto</label>
										<input className="input-modern w-full" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Correo o teléfono" />
									</div>
									<div>
										<label className="label-modern">Categoría</label>
										<select className="input-modern w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
											<option value="frutas-verduras">Frutas y verduras</option>
											<option value="panaderia">Panadería</option>
											<option value="lacteos">Lácteos</option>
											<option value="carnes">Carnes</option>
											<option value="comida-preparada">Comida preparada</option>
											<option value="conservas">Conservas</option>
											<option value="bebidas">Bebidas</option>
											<option value="otros">Otros</option>
										</select>
									</div>
								</div>

								{postType === 'sale' && (
									<div>
										<label className="label-modern">Precio</label>
										<input type="number" min="0" step="0.01" className="input-modern w-full" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ej. 10.00" />
									</div>
								)}

								<div className="flex flex-wrap gap-3 pt-2">
									<button type="submit" className="btn-success">Guardar cambios</button>
									<Link to="/mis-publicaciones" className="btn-cancelar">Cancelar</Link>
								</div>
							</form>
						</div>

						{/* Panel derecho: previsualización */}
						<div id="preview" className="glass-card p-6 h-fit">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-3">
									<div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center shadow-lg">
										<span className="text-2xl">{preview.emoji}</span>
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900">{preview.title}</h3>
										<div className="text-xs text-gray-600">{status === 'activa' ? 'Estado: Activa' : 'Estado: Pausada'}</div>
									</div>
								</div>
								<span className={`px-3 py-1 rounded-full text-xs font-semibold ${postType === 'sale' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
									{postType === 'sale' ? 'Venta' : 'Donación'}
								</span>
							</div>

							<div className="preview-card">
								<p className="text-gray-700 whitespace-pre-wrap">{preview.description}</p>
								<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
									<div>📍 {preview.location}</div>
									<div>📦 {preview.quantity}</div>
									<div>📞 {preview.contact}</div>
									{preview.showPrice && <div>💵 ${preview.price}</div>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Notificación */}
			<div className={`notification ${notif.type} ${notif.show ? 'show' : ''}`}>
				<div className="flex items-center gap-3">
					<span>{notif.icon}</span>
					<span>{notif.message}</span>
				</div>
			</div>
		</div>
	)
}

export default EditarPublicacion