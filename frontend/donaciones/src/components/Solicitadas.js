import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/Solicitadas.css'

const STORAGE_KEY = 'requested_items'

const demoData = () => ([
	{ id: 'r1', title: 'Pan integral sobrante', entity: 'Panadería La Espiga', type: 'donation', quantity: 20, location: 'Madrid', requestedBy: 'Juan Pérez', status: 'requested' },
	{ id: 'r2', title: 'Bandeja de ensalada', entity: 'Restaurante Verde', type: 'donation', quantity: 5, location: 'Barcelona', requestedBy: 'Comedor San José', status: 'delivered' },
])

const loadRequested = () => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return demoData()
		const parsed = JSON.parse(raw)
		if (!Array.isArray(parsed)) return demoData()
		return parsed
	} catch {
		return demoData()
	}
}

const saveRequested = (arr) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
	} catch {
		// ignore
	}
}

const StatusBadge = ({ status }) => {
	if (status === 'delivered') return (
		<span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Entregada</span>
	)
	if (status === 'requested') return (
		<span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">Solicitada</span>
	)
	return (
		<span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{String(status || '')}</span>
	)
}

const Solicitadas = () => {
	const [items, setItems] = useState(() => loadRequested())
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('all') // all | requested | delivered

	useEffect(() => {
		document.body.classList.add('solicitadas-page')
		return () => document.body.classList.remove('solicitadas-page')
	}, [])

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		return (items || []).filter((it) => {
			if (filter === 'requested' && it.status !== 'requested') return false
			if (filter === 'delivered' && it.status !== 'delivered') return false
			if (!q) return true
			const t = (it.title || '').toLowerCase()
			const e = (it.entity || '').toLowerCase()
			const l = (it.location || '').toLowerCase()
			return t.includes(q) || e.includes(q) || l.includes(q)
		})
	}, [items, search, filter])

	const markDelivered = (id) => {
		setItems((prev) => {
			const copy = prev.map((x) => (x.id === id ? { ...x, status: 'delivered' } : x))
			saveRequested(copy)
			return copy
		})
	}

	const cancelRequest = (id) => {
		if (!window.confirm('¿Confirmas cancelar esta solicitud?')) return
		setItems((prev) => {
			const copy = prev.filter((x) => x.id !== id)
			saveRequested(copy)
			return copy
		})
	}

	return (
		<div className="min-h-screen relative">
			{/* Floating emojis */}
			<div className="floating top-10 left-10 text-5xl">🥕</div>
			<div className="floating top-20 right-20 text-4xl">🍞</div>

			<Navbar />

			<main className="pt-24 pb-12 px-6">
				<div className="max-w-6xl mx-auto">
					{/* Header intro */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">🍽️</div>
							<div>
								<h1 className="text-xl font-bold">Publicaciones solicitadas</h1>
								<p className="text-sm text-gray-600">Aquí ves las solicitudes que ya fueron realizadas</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Link to="/explorador" className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white">Inicio</Link>
							<Link to="/mis-publicaciones" className="px-4 py-2 rounded-full bg-white border">Mis publicaciones</Link>
						</div>
					</div>

					{/* Filters */}
					<div className="mb-6 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<input
								id="search"
								className="input-field px-4 py-2 rounded-lg border"
								placeholder="Buscar por título, entidad o ciudad"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<select
								id="filter"
								className="px-3 py-2 rounded-lg border bg-white"
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
							>
								<option value="all">Todas</option>
								<option value="requested">Solicitadas</option>
								<option value="delivered">Entregadas</option>
							</select>
						</div>
						<div className="text-sm text-gray-600">Items: <span>{filtered.length}</span></div>
					</div>

					{/* List */}
					{filtered.length === 0 ? (
						<div className="mt-8 text-center text-gray-600">No hay publicaciones solicitadas.</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{filtered.map((it) => (
								<div key={it.id} className="glass p-4">
									<div className="flex justify-between items-start gap-3">
										<div>
											<h3 className="text-lg font-semibold">{it.title}</h3>
											<p className="text-sm text-gray-600">{it.entity} · {it.location}</p>
										</div>
										<div className="text-sm">
											<StatusBadge status={it.status} />
										</div>
									</div>
									<p className="mt-3 text-sm text-gray-700">Cantidad: <strong>{it.quantity}</strong></p>
									<p className="mt-1 text-sm text-gray-600">Solicitado por: {it.requestedBy || '—'}</p>
									<div className="mt-4 flex gap-3 flex-wrap">
										{it.status !== 'delivered' && (
											<button onClick={() => markDelivered(it.id)} className="px-3 py-2 bg-green-500 text-white rounded">Marcar entregado</button>
										)}
										<button onClick={() => cancelRequest(it.id)} className="px-3 py-2 bg-red-500 text-white rounded">Cancelar</button>
										<Link to="/explorador" className="px-3 py-2 border rounded">Ver publicación</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	)
}

export default Solicitadas