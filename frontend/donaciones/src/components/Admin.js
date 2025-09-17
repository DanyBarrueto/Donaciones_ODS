import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Admin.css'

// Tipos de pestañas soportadas
const TABS = ['usuarios', 'productos', 'categorias', 'publicaciones', 'transacciones', 'reportes']

// Datos mock iniciales por sección
const initialData = {
	usuarios: [
		{ id: 1, nombre: 'Ana López', email: 'ana@example.com', rol: 'admin', estado: 'active' },
		{ id: 2, nombre: 'Luis Pérez', email: 'luis@example.com', rol: 'user', estado: 'inactive' },
		{ id: 3, nombre: 'María Gómez', email: 'maria@example.com', rol: 'user', estado: 'active' },
	],
	productos: [
		{ id: 1, nombre: 'Pan artesanal', categoria: 'Panadería', stock: 40, precio: 1.5 },
		{ id: 2, nombre: 'Leche entera', categoria: 'Lácteos', stock: 25, precio: 0.9 },
	],
	categorias: [
		{ id: 1, nombre: 'Frutas y Verduras', productos: 120 },
		{ id: 2, nombre: 'Panadería', productos: 45 },
		{ id: 3, nombre: 'Lácteos', productos: 60 },
	],
	publicaciones: [
		{ id: 1, titulo: 'Excedente de verduras frescas', tipo: 'donación', estado: 'active', fecha: '2025-09-01' },
		{ id: 2, titulo: 'Pan del día anterior', tipo: 'venta', estado: 'paused', fecha: '2025-09-10' },
		{ id: 3, titulo: 'Lácteos por vencer', tipo: 'venta', estado: 'expired', fecha: '2025-08-27' },
	],
	transacciones: [
		{ id: 1001, usuario: 'Ana López', monto: 12.5, estado: 'pending', fecha: '2025-09-12' },
		{ id: 1002, usuario: 'Luis Pérez', monto: 4.0, estado: 'completed', fecha: '2025-09-13' },
	],
	reportes: [
		{ id: 501, reportante: 'Usuario 23', asunto: 'Publicación duplicada', estado: 'pending', fecha: '2025-09-09' },
		{ id: 502, reportante: 'Usuario 17', asunto: 'Contenido inapropiado', estado: 'resolved', fecha: '2025-09-11' },
	],
}

const Admin = () => {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState('usuarios')
	const [data, setData] = useState(initialData)

	// Modales
	const [editModal, setEditModal] = useState({ open: false, titulo: '', tipo: '', values: {} })
	const [deleteModal, setDeleteModal] = useState({ open: false, mensaje: '', onConfirm: null })

	useEffect(() => {
		document.body.classList.add('admin-page')
		return () => document.body.classList.remove('admin-page')
	}, [])

	const stats = useMemo(() => {
		return {
			usuarios: data.usuarios.length,
			productos: data.productos.length,
			categorias: data.categorias.length,
			publicaciones: data.publicaciones.length,
			transacciones: data.transacciones.length,
			reportes: data.reportes.length,
		}
	}, [data])

	// Helpers
	const formatDate = (iso) => {
		try {
			return new Date(iso).toLocaleDateString('es-ES')
		} catch {
			return iso
		}
	}

	// Acciones comunes
	const openEdit = (tipo, values) => {
		setEditModal({ open: true, titulo: `Editar ${tipo}`, tipo, values })
	}
	const closeEdit = () => setEditModal({ open: false, titulo: '', tipo: '', values: {} })
	const saveEdit = (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const values = Object.fromEntries(formData.entries())
		const id = Number(values.id)

		setData((prev) => {
			const list = [...prev[editModal.tipo]]
			const idx = list.findIndex((x) => x.id === id)
			if (idx !== -1) {
				list[idx] = { ...list[idx], ...values, id }
			}
			return { ...prev, [editModal.tipo]: list }
		})
		closeEdit()
	}

	const openDelete = (mensaje, onConfirm) => setDeleteModal({ open: true, mensaje, onConfirm })
	const closeDelete = () => setDeleteModal({ open: false, mensaje: '', onConfirm: null })
	const confirmDelete = () => {
		if (deleteModal.onConfirm) deleteModal.onConfirm()
		closeDelete()
	}

	// Acciones específicas
	const toggleUserStatus = (id) => {
		setData((prev) => ({
			...prev,
			usuarios: prev.usuarios.map((u) => (u.id === id ? { ...u, estado: u.estado === 'active' ? 'inactive' : 'active' } : u)),
		}))
	}

	const togglePublicationStatus = (id) => {
		setData((prev) => ({
			...prev,
			publicaciones: prev.publicaciones.map((p) => {
				if (p.id !== id) return p
				if (p.estado === 'expired') return p
				return { ...p, estado: p.estado === 'paused' ? 'active' : 'paused' }
			}),
		}))
	}

	// Renderers por pestaña
	const renderUsuarios = () => (
		<div className="admin-table-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
			<div className="p-4 flex justify-end">
				<button className="admin-btn-primary" onClick={() => openEdit('usuarios', { id: '', nombre: '', email: '', rol: 'user', estado: 'active' })}>➕ Agregar usuario</button>
			</div>
			<div className="overflow-x-auto">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Email</th>
							<th>Rol</th>
							<th>Estado</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.usuarios.map((u) => (
							<tr key={u.id}>
								<td>{u.id}</td>
								<td>{u.nombre}</td>
								<td>{u.email}</td>
								<td>{u.rol}</td>
								<td>
									<span className={u.estado === 'active' ? 'admin-badge-active' : 'admin-badge-inactive'}>
										{u.estado === 'active' ? 'Activo' : 'Inactivo'}
									</span>
								</td>
								<td className="flex flex-wrap gap-2">
									<button className="admin-btn-secondary" onClick={() => openEdit('usuarios', u)}>✏️ Editar</button>
									<button className="admin-btn-warning" onClick={() => toggleUserStatus(u.id)}>
										{u.estado === 'active' ? '⏸️ Desactivar' : '▶️ Activar'}
									</button>
									<button
										className="admin-btn-danger"
										onClick={() => openDelete(`¿Eliminar el usuario "${u.nombre}"?`, () => {
											setData((prev) => ({ ...prev, usuarios: prev.usuarios.filter((x) => x.id !== u.id) }))
										})}
									>
										🗑️ Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderProductos = () => (
		<div className="admin-table-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
			<div className="p-4 flex justify-end">
				<button className="admin-btn-primary" onClick={() => openEdit('productos', { id: '', nombre: '', categoria: '', stock: 0, precio: 0 })}>➕ Agregar producto</button>
			</div>
			<div className="overflow-x-auto">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th>Categoría</th>
							<th>Stock</th>
							<th>Precio</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.productos.map((p) => (
							<tr key={p.id}>
								<td>{p.id}</td>
								<td>{p.nombre}</td>
								<td>{p.categoria}</td>
								<td>{p.stock}</td>
								<td>€ {Number(p.precio).toFixed(2)}</td>
								<td className="flex flex-wrap gap-2">
									<button className="admin-btn-secondary" onClick={() => openEdit('productos', p)}>✏️ Editar</button>
									<button
										className="admin-btn-danger"
										onClick={() => openDelete(`¿Eliminar el producto "${p.nombre}"?`, () => {
											setData((prev) => ({ ...prev, productos: prev.productos.filter((x) => x.id !== p.id) }))
										})}
									>
										🗑️ Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderCategorias = () => (
		<div className="admin-table-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
			<div className="p-4 flex justify-end">
				<button className="admin-btn-primary" onClick={() => openEdit('categorias', { id: '', nombre: '', productos: 0 })}>➕ Agregar categoría</button>
			</div>
			<div className="overflow-x-auto">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Nombre</th>
							<th># Productos</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.categorias.map((c) => (
							<tr key={c.id}>
								<td>{c.id}</td>
								<td>{c.nombre}</td>
								<td>{c.productos}</td>
								<td className="flex flex-wrap gap-2">
									<button className="admin-btn-secondary" onClick={() => openEdit('categorias', c)}>✏️ Editar</button>
									<button
										className="admin-btn-danger"
										onClick={() => openDelete(`¿Eliminar la categoría "${c.nombre}"?`, () => {
											setData((prev) => ({ ...prev, categorias: prev.categorias.filter((x) => x.id !== c.id) }))
										})}
									>
										🗑️ Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderPublicaciones = () => (
		<div className="admin-table-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
			<div className="p-4 flex justify-end">
				<button className="admin-btn-primary" onClick={() => openEdit('publicaciones', { id: '', titulo: '', tipo: 'donación', estado: 'active', fecha: new Date().toISOString().slice(0, 10) })}>➕ Agregar publicación</button>
			</div>
			<div className="overflow-x-auto">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Título</th>
							<th>Tipo</th>
							<th>Estado</th>
							<th>Fecha</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.publicaciones.map((p) => (
							<tr key={p.id}>
								<td>{p.id}</td>
								<td>{p.titulo}</td>
								<td>{p.tipo}</td>
								<td>
									{p.estado === 'active' && <span className="admin-badge-active">Activa</span>}
									{p.estado === 'paused' && <span className="admin-badge-pending">Pausada</span>}
									{p.estado === 'expired' && <span className="admin-badge-expired">Vencida</span>}
								</td>
								<td>{formatDate(p.fecha)}</td>
								<td className="flex flex-wrap gap-2">
									<button className="admin-btn-secondary" onClick={() => openEdit('publicaciones', p)}>✏️ Editar</button>
									<button className="admin-btn-warning" onClick={() => togglePublicationStatus(p.id)} disabled={p.estado === 'expired'}>
										{p.estado === 'paused' ? '▶️ Reanudar' : '⏸️ Pausar'}
									</button>
									<button
										className="admin-btn-danger"
										onClick={() => openDelete(`¿Eliminar la publicación "${p.titulo}"?`, () => {
											setData((prev) => ({ ...prev, publicaciones: prev.publicaciones.filter((x) => x.id !== p.id) }))
										})}
									>
										🗑️ Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderTransacciones = () => (
		<div className="admin-table-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
			<div className="p-4 flex justify-end">
				<button className="admin-btn-primary" onClick={() => openEdit('transacciones', { id: '', usuario: '', monto: 0, estado: 'pending', fecha: new Date().toISOString().slice(0, 10) })}>➕ Agregar transacción</button>
			</div>
			<div className="overflow-x-auto">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Usuario</th>
							<th>Monto</th>
							<th>Estado</th>
							<th>Fecha</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.transacciones.map((t) => (
							<tr key={t.id}>
								<td>{t.id}</td>
								<td>{t.usuario}</td>
								<td>€ {Number(t.monto).toFixed(2)}</td>
								<td>
									{t.estado === 'pending' && <span className="admin-badge-pending">Pendiente</span>}
									{t.estado === 'completed' && <span className="admin-badge-resolved">Completada</span>}
									{t.estado === 'failed' && <span className="admin-badge-expired">Fallida</span>}
								</td>
								<td>{formatDate(t.fecha)}</td>
								<td className="flex flex-wrap gap-2">
									<button className="admin-btn-secondary" onClick={() => openEdit('transacciones', t)}>✏️ Editar</button>
									<button
										className="admin-btn-danger"
										onClick={() => openDelete(`¿Eliminar la transacción #${t.id}?`, () => {
											setData((prev) => ({ ...prev, transacciones: prev.transacciones.filter((x) => x.id !== t.id) }))
										})}
									>
										🗑️ Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderReportes = () => (
		<div className="admin-table-container animate-slide-up" style={{ animationDelay: '0.1s' }}>
			<div className="p-4 flex justify-end">
				<button className="admin-btn-primary" onClick={() => openEdit('reportes', { id: '', reportante: '', asunto: '', estado: 'pending', fecha: new Date().toISOString().slice(0, 10) })}>➕ Agregar reporte</button>
			</div>
			<div className="overflow-x-auto">
				<table className="admin-table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Reportante</th>
							<th>Asunto</th>
							<th>Estado</th>
							<th>Fecha</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{data.reportes.map((r) => (
							<tr key={r.id}>
								<td>{r.id}</td>
								<td>{r.reportante}</td>
								<td>{r.asunto}</td>
								<td>
									{r.estado === 'pending' && <span className="admin-badge-pending">Pendiente</span>}
									{r.estado === 'resolved' && <span className="admin-badge-resolved">Resuelto</span>}
								</td>
								<td>{formatDate(r.fecha)}</td>
								<td className="flex flex-wrap gap-2">
									<button className="admin-btn-secondary" onClick={() => openEdit('reportes', r)}>✏️ Editar</button>
									<button
										className="admin-btn-danger"
										onClick={() => openDelete(`¿Eliminar el reporte #${r.id}?`, () => {
											setData((prev) => ({ ...prev, reportes: prev.reportes.filter((x) => x.id !== r.id) }))
										})}
									>
										🗑️ Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderActiveTab = () => {
		switch (activeTab) {
			case 'usuarios':
				return renderUsuarios()
			case 'productos':
				return renderProductos()
			case 'categorias':
				return renderCategorias()
			case 'publicaciones':
				return renderPublicaciones()
			case 'transacciones':
				return renderTransacciones()
			case 'reportes':
				return renderReportes()
			default:
				return null
		}
	}

	// Campos dinámicos del formulario de edición por tipo
	const renderFormFields = () => {
		const v = editModal.values || {}
		switch (editModal.tipo) {
			case 'usuarios':
				return (
					<>
						<input type="hidden" name="id" defaultValue={v.id} />
						<div className="admin-form-group">
							<label className="admin-form-label">Nombre</label>
							<input className="admin-form-input" name="nombre" defaultValue={v.nombre} required />
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Email</label>
							<input className="admin-form-input" type="email" name="email" defaultValue={v.email} required />
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Rol</label>
							<select className="admin-form-select" name="rol" defaultValue={v.rol || 'user'}>
								<option value="admin">Admin</option>
								<option value="user">Usuario</option>
							</select>
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Estado</label>
							<select className="admin-form-select" name="estado" defaultValue={v.estado || 'active'}>
								<option value="active">Activo</option>
								<option value="inactive">Inactivo</option>
							</select>
						</div>
					</>
				)
			case 'productos':
				return (
					<>
						<input type="hidden" name="id" defaultValue={v.id} />
						<div className="admin-form-group">
							<label className="admin-form-label">Nombre</label>
							<input className="admin-form-input" name="nombre" defaultValue={v.nombre} required />
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Categoría</label>
							<input className="admin-form-input" name="categoria" defaultValue={v.categoria} required />
						</div>
						<div className="admin-form-group grid grid-cols-2 gap-3">
							<div>
								<label className="admin-form-label">Stock</label>
								<input className="admin-form-input" type="number" name="stock" defaultValue={v.stock} required />
							</div>
							<div>
								<label className="admin-form-label">Precio (€)</label>
								<input className="admin-form-input" type="number" step="0.01" name="precio" defaultValue={v.precio} required />
							</div>
						</div>
					</>
				)
			case 'categorias':
				return (
					<>
						<input type="hidden" name="id" defaultValue={v.id} />
						<div className="admin-form-group">
							<label className="admin-form-label">Nombre</label>
							<input className="admin-form-input" name="nombre" defaultValue={v.nombre} required />
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label"># Productos</label>
							<input className="admin-form-input" type="number" name="productos" defaultValue={v.productos} required />
						</div>
					</>
				)
			case 'publicaciones':
				return (
					<>
						<input type="hidden" name="id" defaultValue={v.id} />
						<div className="admin-form-group">
							<label className="admin-form-label">Título</label>
							<input className="admin-form-input" name="titulo" defaultValue={v.titulo} required />
						</div>
						<div className="admin-form-group grid grid-cols-2 gap-3">
							<div>
								<label className="admin-form-label">Tipo</label>
								<select className="admin-form-select" name="tipo" defaultValue={v.tipo}>
									<option value="donación">Donación</option>
									<option value="venta">Venta</option>
								</select>
							</div>
							<div>
								<label className="admin-form-label">Estado</label>
								<select className="admin-form-select" name="estado" defaultValue={v.estado}>
									<option value="active">Activa</option>
									<option value="paused">Pausada</option>
									<option value="expired">Vencida</option>
								</select>
							</div>
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Fecha</label>
							<input className="admin-form-input" name="fecha" type="date" defaultValue={v.fecha} required />
						</div>
					</>
				)
			case 'transacciones':
				return (
					<>
						<input type="hidden" name="id" defaultValue={v.id} />
						<div className="admin-form-group">
							<label className="admin-form-label">Usuario</label>
							<input className="admin-form-input" name="usuario" defaultValue={v.usuario} required />
						</div>
						<div className="admin-form-group grid grid-cols-2 gap-3">
							<div>
								<label className="admin-form-label">Monto (€)</label>
								<input className="admin-form-input" type="number" step="0.01" name="monto" defaultValue={v.monto} required />
							</div>
							<div>
								<label className="admin-form-label">Estado</label>
								<select className="admin-form-select" name="estado" defaultValue={v.estado}>
									<option value="pending">Pendiente</option>
									<option value="completed">Completada</option>
									<option value="failed">Fallida</option>
								</select>
							</div>
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Fecha</label>
							<input className="admin-form-input" name="fecha" type="date" defaultValue={v.fecha} required />
						</div>
					</>
				)
			case 'reportes':
				return (
					<>
						<input type="hidden" name="id" defaultValue={v.id} />
						<div className="admin-form-group">
							<label className="admin-form-label">Reportante</label>
							<input className="admin-form-input" name="reportante" defaultValue={v.reportante} required />
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Asunto</label>
							<input className="admin-form-input" name="asunto" defaultValue={v.asunto} required />
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Estado</label>
							<select className="admin-form-select" name="estado" defaultValue={v.estado}>
								<option value="pending">Pendiente</option>
								<option value="resolved">Resuelto</option>
							</select>
						</div>
						<div className="admin-form-group">
							<label className="admin-form-label">Fecha</label>
							<input className="admin-form-input" name="fecha" type="date" defaultValue={v.fecha} required />
						</div>
					</>
				)
			default:
				return null
		}
	}

	return (
		<div className="min-h-screen relative">
			{/* Elementos flotantes decorativos */}
			<div className="admin-floating-element top-10 left-10 text-6xl" style={{ animationDelay: '0s' }}>⚙️</div>
			<div className="admin-floating-element top-20 right-20 text-4xl" style={{ animationDelay: '1s' }}>📊</div>
			<div className="admin-floating-element bottom-20 left-20 text-5xl" style={{ animationDelay: '2s' }}>👥</div>
			<div className="admin-floating-element bottom-32 right-16 text-3xl" style={{ animationDelay: '1.5s' }}>📋</div>
			<div className="admin-floating-element top-1/2 left-16 text-4xl" style={{ animationDelay: '3s' }}>🔧</div>
			<div className="admin-floating-element top-1/3 right-32 text-3xl" style={{ animationDelay: '2.5s' }}>📈</div>

			{/* Barra superior del admin */}
			<nav className="admin-navbar fixed top-0 w-full z-50 px-6 py-4">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="text-2xl">🛠️</div>
						<div className="text-xl font-semibold text-gray-800">Panel de Administración</div>
					</div>
					  <button className="admin-btn-logout" onClick={() => navigate('/login')}>Cerrar sesión</button>
				</div>
			</nav>

			{/* Contenido principal */}
			<div className="pt-24 pb-12 px-4 relative z-10">
				<div className="max-w-7xl mx-auto">
					{/* Encabezado */}
					<div className="text-center mb-10 animate-slide-up">
						<h1 className="text-4xl md:text-5xl font-bold mb-3">
							🧩 <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Administración</span>
						</h1>
						<p className="text-gray-600">Gestiona usuarios, productos, categorías, publicaciones, transacciones y reportes.</p>
					</div>

					{/* Tarjetas de estadísticas */}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
						<div className="admin-stats-card">
							<div className="text-2xl font-bold text-primary-600">{stats.usuarios}</div>
							<div className="text-sm text-gray-600">Usuarios</div>
						</div>
						<div className="admin-stats-card">
							<div className="text-2xl font-bold text-secondary-600">{stats.productos}</div>
							<div className="text-sm text-gray-600">Productos</div>
						</div>
						<div className="admin-stats-card">
							<div className="text-2xl font-bold text-accent-600">{stats.categorias}</div>
							<div className="text-sm text-gray-600">Categorías</div>
						</div>
						<div className="admin-stats-card">
							<div className="text-2xl font-bold text-primary-600">{stats.publicaciones}</div>
							<div className="text-sm text-gray-600">Publicaciones</div>
						</div>
						<div className="admin-stats-card">
							<div className="text-2xl font-bold text-secondary-600">{stats.transacciones}</div>
							<div className="text-sm text-gray-600">Transacciones</div>
						</div>
						<div className="admin-stats-card">
							<div className="text-2xl font-bold text-accent-600">{stats.reportes}</div>
							<div className="text-sm text-gray-600">Reportes</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="flex flex-wrap gap-3 mb-8">
						{TABS.map((tab) => (
							<button
								key={tab}
								className={`admin-tab-btn ${activeTab === tab ? 'active' : ''}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab === 'usuarios' && '👥 Usuarios'}
								{tab === 'productos' && '📦 Productos'}
								{tab === 'categorias' && '🏷️ Categorías'}
								{tab === 'publicaciones' && '📰 Publicaciones'}
								{tab === 'transacciones' && '💳 Transacciones'}
								{tab === 'reportes' && '📝 Reportes'}
							</button>
						))}
					</div>

					{/* Contenido de pestaña activa */}
					{renderActiveTab()}
				</div>
			</div>

			{/* Modal de Edición */}
			{editModal.open && (
				<div className="admin-modal-overlay show" onClick={(e) => e.target.classList.contains('admin-modal-overlay') && closeEdit()}>
					<div className="admin-modal-content">
						<button className="admin-btn-close" onClick={closeEdit}>×</button>
						<h3 className="text-xl font-semibold text-gray-800 mb-4">{editModal.titulo}</h3>
						<form onSubmit={saveEdit}>
							{renderFormFields()}
							<div className="admin-modal-buttons">
								<button type="button" className="admin-btn-cancel" onClick={closeEdit}>Cancelar</button>
								<button type="submit" className="admin-btn-save">Guardar</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Modal de Eliminación */}
			{deleteModal.open && (
				<div className="admin-modal-overlay show" onClick={(e) => e.target.classList.contains('admin-modal-overlay') && closeDelete()}>
					<div className="admin-modal-content" style={{ maxWidth: 420 }}>
						<button className="admin-btn-close" onClick={closeDelete}>×</button>
						<div className="flex items-start gap-3">
							<div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">⚠️</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">Confirmación</h3>
								<p className="mt-1 text-sm text-gray-600">{deleteModal.mensaje}</p>
							</div>
						</div>
						<div className="admin-modal-buttons mt-5">
							<button type="button" className="admin-btn-cancel" onClick={closeDelete}>Cancelar</button>
							<button type="button" className="admin-btn-save" onClick={confirmDelete}>Eliminar</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Admin