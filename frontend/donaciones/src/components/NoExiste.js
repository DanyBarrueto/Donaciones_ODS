import React from "react";
import { motion } from "framer-motion";

const NoExiste = ({ homeUrl = "/", title = "Página no encontrada" }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: mensaje */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">404</h1>
            <p className="mt-2 text-xl md:text-2xl text-slate-300 font-semibold">{title}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-400"
          >
            Lo sentimos — parece que la página que buscas no existe o fue movida. Pero no te preocupes,
            aquí hay algunas cosas que puedes intentar para volver al camino:
          </motion.p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={homeUrl}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              Volver al inicio
            </a>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800/60 hover:bg-slate-800/40 text-slate-200 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
            >
              Recargar
            </button>
          </div>

          <small className="block mt-4 text-xs text-slate-600">Si crees que esto es un error, contáctanos en soporte.</small>
        </section>

        {/* Right: ilustración creativa */}
        <aside className="flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
            aria-hidden
          >
            {/* Ilustración SVG simple y estilizada: un mapa estelar/portal para el 'no sitio' */}
            <svg viewBox="0 0 600 400" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.95" />
                </linearGradient>
                <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="12" result="b" />
                  <feBlend in="SourceGraphic" in2="b" mode="screen" />
                </filter>
              </defs>

              <rect x="0" y="0" width="600" height="400" rx="16" fill="url(#g1)" opacity="0.06" />

              <g filter="url(#f1)">
                <circle cx="180" cy="120" r="70" fill="#7c3aed" opacity="0.10" />
                <circle cx="360" cy="240" r="100" fill="#ec4899" opacity="0.08" />
              </g>

              <g>
                {/* Paths like constellations */}
                <path d="M120 280 C170 200, 240 180, 300 220" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" />
                <path d="M320 140 C360 120, 420 140, 460 180" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" />

                {/* Floating markers */}
                <circle cx="130" cy="280" r="6" fill="#fff" opacity="0.95" />
                <circle cx="300" cy="220" r="5" fill="#fff" opacity="0.9" />
                <circle cx="460" cy="180" r="7" fill="#fff" opacity="0.95" />

                {/* Small decorative 404 shape */}
                <g transform="translate(200,80)">
                  <rect x="0" y="0" width="200" height="120" rx="12" fill="#0f172a" opacity="0.6" />
                  <text x="100" y="70" textAnchor="middle" fill="#fff" fontSize="44" fontWeight="700">404</text>
                </g>
              </g>

              {/* Bottom ribbon */}
              <g>
                <rect x="60" y="320" width="480" height="40" rx="10" fill="#0b1220" opacity="0.35" />
                <text x="300" y="345" textAnchor="middle" fill="#cbd5e1" fontSize="13">Parece que te extraviaste, regresa para seguir compartiendo</text>
              </g>
            </svg>
          </motion.div>
        </aside>
      </div>

      {/* Fallback small credit at bottom */}
      <div className="sr-only">404 - Not Found</div>
    </main>
  );
}

export default NoExiste;
