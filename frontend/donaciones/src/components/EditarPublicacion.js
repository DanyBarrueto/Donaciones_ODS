import React, { useState, useEffect } from 'react';

const EditarPublicacion = () => {
    // Estados del formulario
    const [formData, setFormData] = useState({
        postType: 'donation',
        title: 'Excedente de verduras frescas',
        category: 'frutas-verduras',
        location: 'Madrid',
        description: 'Tenemos un excedente de verduras frescas de nuestra huerta. Incluye lechugas, tomates, zanahorias y pimientos. Todo en perfecto estado, recién cosechado.',
        quantity: '15 kg aprox.',
        contact: '📞 +34 600 123 456',
        price: '',
        expiration: '',
        status: 'active'
    });

    // Estado para notificaciones
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success',
        icon: '✅'
    });

    // Emojis por categoría
    const categoryEmojis = {
        'frutas-verduras': '🥕',
        'panaderia': '🍞',
        'lacteos': '🥛',
        'carnes': '🥩',
        'comida-preparada': '🍽️',
        'conservas': '🥫',
        'bebidas': '🥤',
        'otros': '📦'
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simular guardado
        setTimeout(() => {
            if (Math.random() > 0.1) {
                showNotification('¡Publicación guardada exitosamente!', 'success', '✅');
            } else {
                showNotification('Error al guardar. Intenta nuevamente.', 'error', '❌');
            }
        }, 1000);
    };

    // Mostrar notificación
    const showNotification = (message, type = 'success', icon = '✅') => {
        setNotification({
            show: true,
            message,
            type,
            icon
        });
        
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 4000);
    };

    // Obtener emoji de la categoría actual
    const getCurrentEmoji = () => {
        return categoryEmojis[formData.category] || '🍽️';
    };

    // Obtener badge según tipo de publicación
    const getPostTypeBadge = () => {
        if (formData.postType === 'sale') {
            return { text: '💰 Venta', className: 'bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium' };
        }
        return { text: '🤝 Donación', className: 'bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium' };
    };

    return (
        <div className="min-h-screen">
            {/* Iconos flotantes de fondo */}
            <div className="floating-icon" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>🍎</div>
            <div className="floating-icon" style={{ top: '20%', right: '10%', animationDelay: '1s' }}>🥕</div>
            <div className="floating-icon" style={{ bottom: '30%', left: '8%', animationDelay: '2s' }}>🍞</div>
            <div className="floating-icon" style={{ bottom: '15%', right: '15%', animationDelay: '1.5s' }}>🥛</div>
            <div className="floating-icon" style={{ top: '50%', left: '3%', animationDelay: '3s' }}>🍅</div>
            <div className="floating-icon" style={{ top: '70%', right: '5%', animationDelay: '2.5s' }}>🥐</div>

            {/* Header */}
            <header className="header-modern sticky top-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-xl">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Editor de Publicaciones
                            </h1>
                            <p className="text-sm text-gray-300">Crea y edita tus publicaciones de manera profesional</p>
                        </div>
                    </div>
                    <button className="btn-secondary" onClick={() => window.history.back()}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5"/>
                            <path d="M12 19l-7-7 7-7"/>
                        </svg>
                        Volver
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="text-8xl mb-6 animate-bounce-in">✨</div>
                        <h2 className="text-5xl font-bold text-white mb-6">
                            Editor Avanzado
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Herramientas profesionales para crear publicaciones que destaquen y generen más interés
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Editor Form */}
                        <div className="lg:col-span-2">
                            <div className="editor-card p-8 animate-slide-in">
                                <div className="space-y-8">
                                    {/* Tipo de Publicación */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                            <span className="text-3xl">🎯</span>
                                            Tipo de Publicación
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <label className={`type-card donation ${formData.postType === 'donation' ? 'selected' : ''}`}>
                                                <input 
                                                    type="radio" 
                                                    name="postType" 
                                                    value="donation" 
                                                    checked={formData.postType === 'donation'}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <div className="text-5xl mb-4">🤝</div>
                                                <div className="text-xl font-bold text-white mb-2">Donación</div>
                                                <div className="text-sm text-gray-300">Compartir alimentos gratuitos con la comunidad</div>
                                            </label>
                                            <label className={`type-card ${formData.postType === 'sale' ? 'selected' : ''}`}>
                                                <input 
                                                    type="radio" 
                                                    name="postType" 
                                                    value="sale" 
                                                    checked={formData.postType === 'sale'}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <div className="text-5xl mb-4">💰</div>
                                                <div className="text-xl font-bold text-white mb-2">Venta</div>
                                                <div className="text-sm text-gray-300">Vender alimentos a precio reducido</div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="section-divider"></div>

                                    {/* Información Principal */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                            <span className="text-3xl">📝</span>
                                            Información Principal
                                        </h3>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="label-modern">
                                                    <span className="text-2xl">🏷️</span>
                                                    Título de la publicación
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    required
                                                    className="input-modern w-full"
                                                    placeholder="Ej: Excedente de verduras frescas de temporada"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="label-modern">
                                                        <span className="text-2xl">🗂️</span>
                                                        Categoría
                                                    </label>
                                                    <select 
                                                        name="category" 
                                                        required 
                                                        className="input-modern w-full"
                                                        value={formData.category}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Selecciona una categoría</option>
                                                        <option value="frutas-verduras">🥕 Frutas y Verduras</option>
                                                        <option value="panaderia">🍞 Panadería</option>
                                                        <option value="lacteos">🥛 Lácteos</option>
                                                        <option value="carnes">🥩 Carnes y Pescados</option>
                                                        <option value="comida-preparada">🍽️ Comida Preparada</option>
                                                        <option value="conservas">🥫 Conservas</option>
                                                        <option value="bebidas">🥤 Bebidas</option>
                                                        <option value="otros">📦 Otros</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="label-modern">
                                                        <span className="text-2xl">📍</span>
                                                        Ubicación
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        required
                                                        className="input-modern w-full"
                                                        placeholder="Ciudad o zona específica"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="label-modern">
                                                    <span className="text-2xl">📄</span>
                                                    Descripción detallada
                                                </label>
                                                <textarea
                                                    name="description"
                                                    required
                                                    className="textarea-modern w-full"
                                                    placeholder="Describe los alimentos, su estado, origen, condiciones especiales, etc."
                                                    rows="5"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="label-modern">
                                                        <span className="text-2xl">⚖️</span>
                                                        Cantidad disponible
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="quantity"
                                                        required
                                                        className="input-modern w-full"
                                                        placeholder="Ej: 15 kg aprox., 20 unidades, etc."
                                                        value={formData.quantity}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="label-modern">
                                                        <span className="text-2xl">📞</span>
                                                        Contacto
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="contact"
                                                        required
                                                        className="input-modern w-full"
                                                        placeholder="Teléfono, email, WhatsApp, etc."
                                                        value={formData.contact}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Información de Venta (condicional) */}
                                    {formData.postType === 'sale' && (
                                        <>
                                            <div className="section-divider"></div>
                                            
                                            <div className="space-y-6">
                                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                                    <span className="text-3xl">💳</span>
                                                    Información de Venta
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="label-modern">
                                                            <span className="text-2xl">💶</span>
                                                            Precio
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="price"
                                                            className="input-modern w-full"
                                                            placeholder="Ej: 1€/kg, 50% descuento, etc."
                                                            value={formData.price}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="label-modern">
                                                            <span className="text-2xl">📅</span>
                                                            Fecha de vencimiento
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="expiration"
                                                            className="input-modern w-full"
                                                            value={formData.expiration}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="section-divider"></div>

                                    {/* Estado de la Publicación */}
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                            <span className="text-3xl">🎛️</span>
                                            Estado de la Publicación
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <label className={`status-pill ${formData.status === 'active' ? 'selected' : ''}`}>
                                                <input 
                                                    type="radio" 
                                                    name="status" 
                                                    value="active" 
                                                    checked={formData.status === 'active'}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <div className="text-2xl mb-2">✅</div>
                                                <div className="font-semibold">Activa</div>
                                                <div className="text-xs opacity-75">Visible para todos</div>
                                            </label>
                                            <label className={`status-pill ${formData.status === 'paused' ? 'selected' : ''}`}>
                                                <input 
                                                    type="radio" 
                                                    name="status" 
                                                    value="paused" 
                                                    checked={formData.status === 'paused'}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <div className="text-2xl mb-2">⏸️</div>
                                                <div className="font-semibold">Pausada</div>
                                                <div className="text-xs opacity-75">Temporalmente oculta</div>
                                            </label>
                                            <label className={`status-pill ${formData.status === 'completed' ? 'selected' : ''}`}>
                                                <input 
                                                    type="radio" 
                                                    name="status" 
                                                    value="completed" 
                                                    checked={formData.status === 'completed'}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                                <div className="text-2xl mb-2">✅</div>
                                                <div className="font-semibold">Completada</div>
                                                <div className="text-xs opacity-75">Ya no disponible</div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Botones de Acción */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                                        <button type="button" onClick={handleSubmit} className="btn-success flex-1">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5"/>
                                            </svg>
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vista Previa */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="preview-card animate-scale-in">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <span className="text-2xl">👁️</span>
                                        Vista Previa
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="text-3xl">{getCurrentEmoji()}</div>
                                            <div>
                                                <h4 className="font-bold text-lg text-white">{formData.title || 'Título de la publicación'}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={getPostTypeBadge().className}>
                                                        {getPostTypeBadge().text}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {formData.description || 'Descripción de la publicación...'}
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-blue-300">
                                                <span>📍</span>
                                                <span>{formData.location || 'Ubicación'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <span>⚖️</span>
                                                <span>{formData.quantity || 'Cantidad'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <span>📞</span>
                                                <span>{formData.contact || 'Contacto'}</span>
                                            </div>
                                            {formData.postType === 'sale' && formData.price && (
                                                <div className="flex items-center gap-2 text-sm text-yellow-300">
                                                    <span>💶</span>
                                                    <span>{formData.price}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tips Card */}
                                <div className="glass-card p-6 mt-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <span className="text-xl">💡</span>
                                        Consejos Pro
                                    </h4>
                                    <ul className="space-y-3 text-sm text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Usa títulos descriptivos y atractivos</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Incluye detalles sobre el estado de los alimentos</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Especifica cantidades aproximadas</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-400">✓</span>
                                            <span>Proporciona múltiples formas de contacto</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Notification */}
            {notification.show && (
                <div className={`notification ${notification.type} show`}>
                    <div className="flex items-center gap-3">
                        <span>{notification.icon}</span>
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditarPublicacion;