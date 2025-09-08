import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/PaginaPrincipal.css'
import '../styles/Publicar.css'

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

const Publicar = () => {
	const navigate = useNavigate()

	// Estado del formulario
	const [postType, setPostType] = useState('') // 'donation' | 'sale'
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [location, setLocation] = useState('')
	const [contact, setContact] = useState('')
	const [quantity, setQuantity] = useState('')
	const [expiration, setExpiration] = useState('')
	const [price, setPrice] = useState('')
	const [urgent, setUrgent] = useState(false)
	const [delivery, setDelivery] = useState(false)
	const [bulk, setBulk] = useState(false)

	// Imágenes
	const [images, setImages] = useState([]) // [{file, url}]
	const fileInputRef = useRef(null)

	const isDonation = postType === 'donation'

	const preview = useMemo(() => {
		const badgeClass = isDonation ? 'badge-donation' : 'badge-sale'
		const badgeText = isDonation ? '🤝 Donación Gratuita' : '💰 Oferta Especial'
		const exp = !isDonation && expiration
			? `<div class="flex items-center gap-2 text-sm text-secondary-600 bg-secondary-50 px-3 py-1 rounded-full mb-2">
					 <span>📅</span>
					 <span class="font-medium">Vence: ${new Date(expiration).toLocaleDateString('es-ES')}</span>
				 </div>`
			: ''
		const priceHtml = !isDonation && price
			? `<div class="flex items-center gap-2 text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-2">
					 <span>💶</span>
					 <span class="font-medium">${price}</span>
				 </div>`
			: ''
		const qtyHtml = quantity
			? `<div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
					 <span>⚖️</span>
					 <span>${quantity}</span>
				 </div>`
			: ''

		if (!postType) {
			return `
				<div class="text-center text-gray-400 py-8">
					<div class="text-4xl mb-4">🎯</div>
					<p>Selecciona el tipo de publicación para continuar</p>
				</div>
			`
		}

		return `
			<div class="flex items-start justify-between mb-4">
				<div class="flex items-center gap-3">
					<div class="text-3xl">${categoryEmoji(category)}</div>
					<div>
						<h3 class="text-lg font-bold text-gray-800 leading-tight">${title || 'Título de la publicación'}</h3>
						<div class="flex items-center gap-1 text-sm text-gray-600 mt-1">
							<span>🏢</span>
							<span>Tu Entidad</span>
						</div>
					</div>
				</div>
				<span class="${badgeClass}">${badgeText}</span>
			</div>
			<p class="text-gray-700 text-sm leading-relaxed mb-4">${
				description || 'Descripción de la publicación...'
			}</p>
			<div class="space-y-2 mb-4">
				<div class="flex items-center gap-2 text-sm text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
					<span>📍</span>
					<span class="font-medium">${location || 'Ubicación'}</span>
				</div>
				${exp}
				${priceHtml}
				${qtyHtml}
			</div>
			<div class="border-t pt-4">
				<div class="flex items-center gap-2 text-sm text-gray-600">
					<span>📞</span>
					<span class="font-medium">${contact || 'Información de contacto'}</span>
				</div>
			</div>
		`
	}, [postType, isDonation, expiration, price, quantity, category, title, description, location, contact])

	const onSelectType = (type) => {
		setPostType(type)
		if (type === 'donation') {
			setExpiration('')
			setPrice('')
		}
	}

	// Manejo de imágenes
	const onFiles = (files) => {
		const list = Array.from(files || [])
		const imageFiles = list.filter((f) => f.type.startsWith('image/'))

		if (images.length + imageFiles.length > 3) {
			window.alert('Máximo 3 imágenes permitidas')
			return
		}

		const next = [...images]
		for (const file of imageFiles) {
			if (file.size > 5 * 1024 * 1024) {
				window.alert(`La imagen ${file.name} es muy grande. Máximo 5MB.`)
				continue
			}
			const url = URL.createObjectURL(file)
			next.push({ file, url })
		}
		setImages(next)
	}

	const removeImageAt = (idx) => {
		setImages((prev) => prev.filter((_, i) => i !== idx))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!postType) return window.alert('Por favor, selecciona el tipo de publicación')
		if ((description || '').length < 20) return window.alert('La descripción debe tener al menos 20 caracteres')

		const payload = {
			type: postType,
			title,
			description,
			category,
			location,
			contact,
			quantity,
			expiration: isDonation ? undefined : expiration,
			price: isDonation ? undefined : price,
			urgent,
			delivery,
			bulk,
			images: images.length,
		}

		// Simulación de envío
		// eslint-disable-next-line no-console
		console.log('Publicación creada:', payload)
		window.alert('¡Publicación creada exitosamente! 🎉\n\nTu publicación será revisada y estará visible en breve.')
	}

	return (
		<div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #fff7ed 100%)' }}>
			<Navbar />

			{/* Floating Background Elements */}
			<div className="floating-element top-10 left-10 text-6xl" style={{ animationDelay: '0s' }}>🥕</div>
			<div className="floating-element top-20 right-20 text-4xl" style={{ animationDelay: '1s' }}>🍞</div>
			<div className="floating-element bottom-20 left-20 text-5xl" style={{ animationDelay: '2s' }}>🍅</div>
			<div className="floating-element bottom-32 right-16 text-3xl" style={{ animationDelay: '1.5s' }}>🥬</div>
			<div className="floating-element top-1/2 left-16 text-4xl" style={{ animationDelay: '3s' }}>🍎</div>
			<div className="floating-element top-1/3 right-32 text-3xl" style={{ animationDelay: '2.5s' }}>🥐</div>

			<div className="pt-24 pb-12 px-4 relative z-10">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12 animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
							📝 Crear Nueva Publicación
						</h1>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Comparte alimentos disponibles para donación o venta y ayuda a reducir el desperdicio alimentario
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Form Section */}
						<div className="lg:col-span-2">
							<div className="form-container p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
								<form className="space-y-6" onSubmit={handleSubmit}>
									{/* Type Selection */}
									<div>
										<h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Tipo de Publicación</h3>
										<div className="type-selector">
											<button
												type="button"
												className={`type-option donation ${postType === 'donation' ? 'selected' : ''}`}
												onClick={() => onSelectType('donation')}
											>
												<div className="text-4xl mb-3">🤝</div>
												<h4 className="text-lg font-bold text-gray-800 mb-2">Donación</h4>
												<p className="text-sm text-gray-600">Comparte alimentos de forma gratuita</p>
											</button>
											<button
												type="button"
												className={`type-option sale ${postType === 'sale' ? 'selected' : ''}`}
												onClick={() => onSelectType('sale')}
											>
												<div className="text-4xl mb-3">💰</div>
												<h4 className="text-lg font-bold text-gray-800 mb-2">Venta</h4>
												<p className="text-sm text-gray-600">Vende productos próximos a vencer</p>
											</button>
										</div>
									</div>

									{/* Basic Information */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
												🏷️ Título de la Publicación *
											</label>
											<input id="title" type="text" className="input-field" placeholder="Ej: Excedente de verduras frescas" value={title} onChange={(e) => setTitle(e.target.value)} required />
										</div>
										<div>
											<label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
												🍽️ Categoría *
											</label>
											<select id="category" className="select-field" value={category} onChange={(e) => setCategory(e.target.value)} required>
												<option value="">Selecciona una categoría</option>
												<option value="frutas-verduras">🥕 Frutas y Verduras</option>
												<option value="panaderia">🍞 Panadería</option>
												<option value="lacteos">🥛 Lácteos</option>
												<option value="carnes">🥩 Carnes y Pescados</option>
												<option value="comida-preparada">🍽️ Comida Preparada</option>
												<option value="conservas">🥫 Conservas y Enlatados</option>
												<option value="bebidas">🥤 Bebidas</option>
												<option value="otros">📦 Otros</option>
											</select>
										</div>
									</div>

									{/* Description */}
									<div>
										<label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
											📝 Descripción Detallada *
										</label>
										<textarea id="description" className="textarea-field" placeholder="Describe los alimentos, cantidad, estado, condiciones especiales, etc." value={description} onChange={(e) => setDescription(e.target.value)} required />
										<p className="text-xs text-gray-500 mt-1">Mínimo 20 caracteres</p>
									</div>

									{/* Location and Contact */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
												📍 Ubicación (Ciudad) *
											</label>
											<input id="location" type="text" className="input-field" placeholder="Madrid, Barcelona, Valencia..." value={location} onChange={(e) => setLocation(e.target.value)} required />
										</div>
										<div>
											<label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-2">
												📞 Información de Contacto *
											</label>
											<input id="contact" type="text" className="input-field" placeholder="Teléfono, email o dirección" value={contact} onChange={(e) => setContact(e.target.value)} required />
										</div>
									</div>

									{/* Quantity, Expiration, Price */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
												⚖️ Cantidad Aproximada
											</label>
											<input id="quantity" type="text" className="input-field" placeholder="Ej: 5 kg, 20 unidades, 3 cajas..." value={quantity} onChange={(e) => setQuantity(e.target.value)} />
										</div>

										{isDonation ? null : (
											<div>
												<label htmlFor="expiration" className="block text-sm font-semibold text-gray-700 mb-2">
													📅 Fecha de Vencimiento
												</label>
												<input id="expiration" type="date" className="input-field" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
											</div>
										)}

										{isDonation ? null : (
											<div className="md:col-span-2">
												<label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
													💶 Precio
												</label>
												<input id="price" type="text" className="input-field" placeholder="Ej: 5€, 2€/kg, Precio a convenir..." value={price} onChange={(e) => setPrice(e.target.value)} />
											</div>
										)}
									</div>

									{/* Image Upload */}
									<div>
										<label className="block text-sm font-semibold text-gray-700 mb-2">📸 Imágenes (Opcional)</label>
										<div
											className="file-upload"
											onClick={() => fileInputRef.current?.click()}
											onDragOver={(e) => {
												e.preventDefault()
												e.currentTarget.classList.add('dragover')
											}}
											onDragLeave={(e) => {
												e.preventDefault()
												e.currentTarget.classList.remove('dragover')
											}}
											onDrop={(e) => {
												e.preventDefault()
												e.currentTarget.classList.remove('dragover')
												onFiles(e.dataTransfer.files)
											}}
										>
											<div className="text-4xl mb-4">📷</div>
											<p className="text-gray-600 mb-2">
												<strong>Arrastra imágenes aquí</strong> o haz clic para seleccionar
											</p>
											<p className="text-xs text-gray-500">Máximo 3 imágenes • JPG, PNG • Máximo 5MB cada una</p>
											<input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
										</div>

										<div className="mt-4 grid grid-cols-3 gap-4">
											{images.map((img, idx) => (
												<div key={idx} className="relative">
													<img src={img.url} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
													<button
														type="button"
														className="remove-image"
														onClick={() => removeImageAt(idx)}
														aria-label="Eliminar imagen"
													>
														×
													</button>
												</div>
											))}
										</div>
									</div>
									{/* Submit Buttons */}
									<div className="flex flex-col sm:flex-row gap-4 pt-6">
										<button type="submit" className="btn-primary flex-1">🚀 Publicar Ahora</button>
										<button type="button" className="btn-secondary flex-1" onClick={() => {
											const el = document.getElementById('previewCard')
											if (el) el.scrollIntoView({ behavior: 'smooth' })
										}}>👁️ Vista Previa</button>
										<button type="button" className="btn-cancel flex-1" onClick={() => navigate('/explorador')}>✖️ Cancelar</button>
									</div>
								</form>
							</div>
						</div>

						{/* Preview Section */}
						<div className="lg:col-span-1">
							<div className="sticky top-24">
								<div className="form-container form-vista-previa p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
									<h3 className="text-lg font-semibold text-gray-800 mb-4">👁️ Vista Previa</h3>
									<div id="previewCard" className="preview-card" dangerouslySetInnerHTML={{ __html: preview }} />
								</div>

								{/* Tips */}
								<div className="form-container p-6 mt-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
									<h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Consejos para una buena publicación</h3>
									<ul className="space-y-3 text-sm text-gray-600">
										<li className="flex items-start gap-2"><span className="text-primary-500">✅</span><span>Usa un título claro y descriptivo</span></li>
										<li className="flex items-start gap-2"><span className="text-primary-500">✅</span><span>Incluye fotos de buena calidad</span></li>
										<li className="flex items-start gap-2"><span className="text-primary-500">✅</span><span>Especifica cantidad y estado</span></li>
										<li className="flex items-start gap-2"><span className="text-primary-500">✅</span><span>Proporciona contacto claro</span></li>
										<li className="flex items-start gap-2"><span className="text-primary-500">✅</span><span>Indica fechas de vencimiento</span></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Publicar