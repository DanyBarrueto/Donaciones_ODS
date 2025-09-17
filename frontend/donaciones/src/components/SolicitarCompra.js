import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SolicitarCompra.css';

// Estado inicial replicando campos del HTML original
const initialForm = {
	quantity: '',
	budget: '',
	paymentMethod: '',
	cardNumber: '',
	expiryDate: '',
	cvv: '',
	cardName: '',
	deliveryPreference: '',
	timePreference: '',
	message: '',
	terms: false
};

const SolicitarCompra = () => {
	const [form, setForm] = useState(initialForm);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		document.body.classList.add('solicitar-compra-page');
		return () => document.body.classList.remove('solicitar-compra-page');
	}, []);

	// Delay secuencial para animaciones como HTML original
	useEffect(() => {
		const animated = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
		animated.forEach((el, idx) => {
			(el).style.animationDelay = `${idx * 0.1}s`;
		});
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const handlePaymentChange = (e) => {
		const method = e.target.value;
		setForm(prev => ({ ...prev, paymentMethod: method }));
		if (method !== 'card') {
			setForm(prev => ({
				...prev,
				cardNumber: '', expiryDate: '', cvv: '', cardName: ''
			}));
		}
	};

	// Formateos
	const handleCardNumber = (e) => {
		let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
		let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
		if (formatted.length > 19) formatted = formatted.substring(0, 19);
		setForm(prev => ({ ...prev, cardNumber: formatted }));
	};
	const handleExpiry = (e) => {
		let value = e.target.value.replace(/\D/g, '');
		if (value.length > 4) value = value.substring(0,4);
		if (value.length >= 3) value = value.substring(0,2) + '/' + value.substring(2,4);
		setForm(prev => ({ ...prev, expiryDate: value }));
	};
	const handleCVV = (e) => {
		let value = e.target.value.replace(/[^0-9]/g, '');
		if (value.length > 4) value = value.substring(0,4);
		setForm(prev => ({ ...prev, cvv: value }));
	};

	const resetMessages = () => { setSuccess(false); setError(false); };

	const handleSubmit = (e) => {
		e.preventDefault();
		resetMessages();
		setSubmitting(true);
		setTimeout(() => {
			const ok = Math.random() > 0.1; // 90% éxito
			if (ok) {
				setSuccess(true);
				setForm(initialForm);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				setError(true);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
			setSubmitting(false);
		}, 1000);
	};

	const showCard = form.paymentMethod === 'card';

	return (
		<div className="pb-12">
			{/* Header */}
			<header className="header-glass sticky top-0 z-50 flex h-20 items-center justify-between px-6 md:px-8">
				<div className="flex items-center gap-3">
					<div className="relative">
						<div className="pulse-ring absolute inset-0 rounded-full bg-secondary-400 opacity-30"></div>
						<div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 text-white shadow-lg">
							<svg className="icon" viewBox="0 0 24 24">
								<path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-6" />
							</svg>
						</div>
					</div>
					<div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">Solicitar Compra</h1>
						<p className="text-sm text-gray-600">Compra alimentos a precio reducido</p>
					</div>
				</div>
				<Link to="/" className="btn-secondary">
					<svg className="icon w-4 h-4" viewBox="0 0 24 24">
						<path d="M19 12H5" />
						<path d="M12 19l-7-7 7-7" />
					</svg>
					Volver al inicio
				</Link>
			</header>

			<main className="py-12 px-6">
				<div className="max-w-2xl mx-auto">
					{/* Hero */}
						<div className="text-center mb-12 animate-fade-in">
							<div className="text-6xl mb-4">🛒</div>
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Solicitar Compra</h2>
							<p className="text-lg text-gray-600 max-w-xl mx-auto">Completa los detalles para solicitar la compra de este producto a precio especial.</p>
						</div>

						{/* Product Info */}
						<div className="product-info animate-slide-up">
							<div className="flex items-center gap-4 mb-4">
								<div className="text-4xl">🥐</div>
								<div>
									<h3 className="text-xl font-bold text-gray-800">Lotes de bollería a punto de caducar</h3>
									<p className="text-sm text-gray-600">Panadería La Espiga Dorada - Barcelona</p>
									<div className="flex items-center gap-2 mt-2">
										<span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full text-xs font-medium">💰 Oferta Especial</span>
										<span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">📅 Vence: 15/08/2025</span>
									</div>
								</div>
							</div>
							<p className="text-gray-700 text-sm">Bollería variada con fecha de vencimiento próxima (2 días): croissants, magdalenas, donuts y pasteles. Descuento del 50% sobre precio original.</p>
						</div>

						{/* Form Card */}
						<div className="card p-8 animate-slide-up mt-8">
							<div className={`success-message ${success ? 'is-visible' : ''}`} role="alert">
								<div className="flex items-center gap-3">
									<svg className="icon w-6 h-6" viewBox="0 0 24 24">
										<path d="M20 6L9 17l-5-5" />
									</svg>
									<div>
										<h3 className="font-semibold">¡Solicitud enviada correctamente!</h3>
										<p className="text-sm opacity-90">El vendedor se pondrá en contacto contigo pronto.</p>
									</div>
								</div>
							</div>
							<div className={`error-message ${error ? 'is-visible' : ''}`} role="alert">
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

							<form onSubmit={handleSubmit} id="purchaseForm" className="space-y-6">
								{/* Cantidad */}
								<div className="space-y-4">
									<h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
										<svg className="icon text-secondary-500" viewBox="0 0 24 24">
											<path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-6" />
										</svg>
										Cantidad Deseada
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Cantidad que deseas *</label>
											<select id="quantity" name="quantity" required className="select-field" value={form.quantity} onChange={handleChange}>
												<option value="">Selecciona la cantidad</option>
												<option value="1">1 lote/unidad</option>
												<option value="2">2 lotes/unidades</option>
												<option value="3">3 lotes/unidades</option>
												<option value="4">4 lotes/unidades</option>
												<option value="5+">5 o más</option>
												<option value="all">Todo lo disponible</option>
											</select>
										</div>
										<div>
											<label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">Presupuesto máximo (opcional)</label>
											<input type="text" id="budget" name="budget" className="input-field" placeholder="Ej: 15€, 20€..." value={form.budget} onChange={handleChange} />
										</div>
									</div>
								</div>

								{/* Método de Pago */}
								<div className="space-y-4">
									<h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
										<svg className="icon text-secondary-500" viewBox="0 0 24 24">
											<rect width="20" height="14" x="2" y="5" rx="2" />
											<line x1="2" x2="22" y1="10" y2="10" />
										</svg>
										Método de Pago *
									</h3>
									<div className="payment-methods">
										<label className={`payment-option ${form.paymentMethod === 'cash' ? 'selected' : ''}`}>
											<input type="radio" name="paymentMethod" value="cash" required checked={form.paymentMethod === 'cash'} onChange={handlePaymentChange} />
											<div className="text-2xl mb-2">💵</div>
											<div className="font-semibold text-sm">Efectivo</div>
											<div className="text-xs text-gray-600">Pago en efectivo</div>
										</label>
										<label className={`payment-option ${form.paymentMethod === 'card' ? 'selected' : ''}`}>
											<input type="radio" name="paymentMethod" value="card" required checked={form.paymentMethod === 'card'} onChange={handlePaymentChange} />
											<div className="text-2xl mb-2">💳</div>
											<div className="font-semibold text-sm">Tarjeta</div>
											<div className="text-xs text-gray-600">Débito/Crédito</div>
										</label>
									</div>

									{/* Detalles dinámicos */}
									<div id="paymentDetails" className="space-y-4" style={{ display: form.paymentMethod ? 'block' : 'none' }}>
										{/* Efectivo */}
										<div id="cashDetails" className="payment-detail" style={{ display: form.paymentMethod === 'cash' ? 'block' : 'none' }}>
											<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
												<div className="flex items-center gap-2 mb-2">
													<span className="text-yellow-600">💵</span>
													<h4 className="font-semibold text-yellow-800">Pago en Efectivo</h4>
												</div>
												<p className="text-sm text-yellow-700">El pago se acordará directamente con el anunciante en el momento de la entrega o recogida del producto.</p>
											</div>
										</div>

										{/* Tarjeta */}
										<div id="cardDetails" className="payment-detail" style={{ display: showCard ? 'block' : 'none' }}>
											<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
												<div className="flex items-center gap-2 mb-3">
													<span className="text-blue-600">💳</span>
													<h4 className="font-semibold text-blue-800">Datos de la Tarjeta</h4>
												</div>
												<div className="grid grid-cols-1 gap-4">
													<div>
														<label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">Número de tarjeta *</label>
														<input type="text" id="cardNumber" name="cardNumber" className="input-field" placeholder="1234 5678 9012 3456" maxLength={19} value={form.cardNumber} onChange={handleCardNumber} required={showCard} />
													</div>
													<div className="grid grid-cols-2 gap-4">
														<div>
															<label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento *</label>
															<input type="text" id="expiryDate" name="expiryDate" className="input-field" placeholder="MM/AA" maxLength={5} value={form.expiryDate} onChange={handleExpiry} required={showCard} />
														</div>
														<div>
															<label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
															<input type="text" id="cvv" name="cvv" className="input-field" placeholder="123" maxLength={4} value={form.cvv} onChange={handleCVV} required={showCard} />
														</div>
													</div>
													<div>
														<label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">Nombre en la tarjeta *</label>
														<input type="text" id="cardName" name="cardName" className="input-field" placeholder="Nombre como aparece en la tarjeta" value={form.cardName} onChange={handleChange} required={showCard} />
													</div>
												</div>
												<div className="bg-blue-100 rounded-lg p-3">
													<p className="text-xs text-blue-700">🔒 Tus datos están protegidos con encriptación SSL. Esta información solo se usará para procesar el pago.</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Información de Entrega */}
								<div className="space-y-4">
									<h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
										<svg className="icon text-secondary-500" viewBox="0 0 24 24">
											<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
										Información de Entrega
									</h3>
									<div>
										<label htmlFor="deliveryPreference" className="block text-sm font-medium text-gray-700 mb-2">Preferencia de entrega *</label>
										<select id="deliveryPreference" name="deliveryPreference" required className="select-field" value={form.deliveryPreference} onChange={handleChange}>
											<option value="">Selecciona una opción</option>
											<option value="pickup">Recoger en el establecimiento</option>
											<option value="delivery">Entrega a domicilio (si disponible)</option>
											<option value="both">Cualquiera de las dos opciones</option>
										</select>
									</div>
									<div>
										<label htmlFor="timePreference" className="block text-sm font-medium text-gray-700 mb-2">Horario preferido *</label>
										<select id="timePreference" name="timePreference" required className="select-field" value={form.timePreference} onChange={handleChange}>
											<option value="">Selecciona tu horario preferido</option>
											<option value="morning">Mañana (9:00 - 12:00)</option>
											<option value="afternoon">Tarde (12:00 - 18:00)</option>
											<option value="evening">Noche (18:00 - 21:00)</option>
											<option value="weekend">Fines de semana</option>
											<option value="flexible">Horario flexible</option>
										</select>
									</div>
								</div>

								{/* Mensaje adicional */}
								<div className="space-y-4">
									<h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
										<svg className="icon text-secondary-500" viewBox="0 0 24 24">
											<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
										</svg>
										Mensaje Adicional
									</h3>
									<div>
										<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Comentarios para el vendedor</label>
										<textarea id="message" name="message" className="textarea-field" placeholder="Cualquier información adicional que quieras compartir con el vendedor (método de pago preferido, preguntas específicas, etc.)..." rows={4} value={form.message} onChange={handleChange}></textarea>
									</div>
								</div>

								{/* Términos */}
								<div className="flex items-start gap-3">
									<input type="checkbox" id="terms" name="terms" required className="mt-1 h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded" checked={form.terms} onChange={handleChange} />
									<label htmlFor="terms" className="text-sm text-gray-600">Acepto los términos y condiciones de compra y confirmo mi interés en adquirir este producto. *</label>
								</div>

								{/* Botones */}
								<div className="flex flex-col sm:flex-row gap-4 pt-6">
									<button type="submit" className="btn-primary flex-1" disabled={submitting}>{submitting ? 'Enviando...' : 'Confirmar Solicitud de Compra'}</button>
									<Link to="/explorador" className="btn-secondary"><svg className="icon w-4 h-4" viewBox="0 0 24 24"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>Cancelar</Link>
								</div>
							</form>
						</div>

						{/* Info Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
							<div className="card p-6 text-center">
								<div className="text-4xl mb-3">💰</div>
								<h3 className="text-lg font-semibold text-gray-800 mb-2">Precio Especial</h3>
								<p className="text-sm text-gray-600">Este producto tiene un descuento del 50% sobre su precio original.</p>
							</div>
							<div className="card p-6 text-center">
								<div className="text-4xl mb-3">⚡</div>
								<h3 className="text-lg font-semibold text-gray-800 mb-2">Respuesta Rápida</h3>
								<p className="text-sm text-gray-600">El vendedor te contactará en las próximas horas para coordinar la compra.</p>
							</div>
						</div>
				</div>
			</main>
		</div>
	);
};

export default SolicitarCompra;