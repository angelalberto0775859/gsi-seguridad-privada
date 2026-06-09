import { motion } from 'framer-motion'
import { ShieldCheck, ArrowDown } from '@phosphor-icons/react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center bg-[#fafafa] pt-20 overflow-hidden"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#101820" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content (Asymmetric text layout) */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 border border-gray-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
          >
            <ShieldCheck size={18} className="text-[#EF3B43]" weight="fill" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
              Estándar de Seguridad Certificado
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-extrabold text-[#101820] tracking-tighter leading-[0.95]"
          >
            Control, criterio <br />y <span className="text-[#EF3B43]">prevención</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 font-normal leading-relaxed max-w-[50ch]"
          >
            Seguridad privada corporativa e industrial alineada con la continuidad operativa de tu empresa en todo México. Más de 22 años de respuesta impecable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#contact"
              className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#101820] hover:bg-[#EF3B43] transition-colors duration-300 shadow-lg shadow-black/10 rounded-full"
            >
              Iniciar Estrategia B2B
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-800 bg-white border border-gray-200 hover:border-gray-400 transition-colors duration-300 rounded-full"
            >
              Explorar Servicios
            </a>
          </motion.div>
        </div>

        {/* Right Graphic/Image Panel with Guard Visual (Organic floating design) */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ 
              scale: { type: 'spring', stiffness: 80, damping: 15, delay: 0.2 },
              y: { repeat: Infinity, duration: 6, ease: 'easeInOut' }
            }}
            className="relative w-full max-w-[540px] mx-auto aspect-[4/5] bg-gray-100 overflow-hidden shadow-2xl border border-white rounded-[32px]"
          >
            {/* The primary guard/team image */}
            <img
              src="/recursos/gsi-equipo-vertical-rostros-distintos.png"
              alt="Guardias de Seguridad GSI"
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-750"
            />
            {/* Subtle red bottom indicator line */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#EF3B43]"></div>
          </motion.div>

          {/* Floating Telemetry Box (Spring physics driven metrics, organic float) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ 
              x: { type: 'spring', stiffness: 120, damping: 18, delay: 0.4 },
              y: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }
            }}
            className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-gray-200/80 p-5 shadow-xl max-w-[240px] hidden sm:block rounded-[24px]"
          >
            <div className="space-y-3">
              {/* Metric 1: ISO Quality */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'cert-iso' } }))}
                className="w-full text-left p-3 hover:bg-red-50/50 border border-transparent hover:border-red-150 rounded-xl transition-all duration-300 cursor-pointer block focus:outline-none"
              >
                <p className="font-display text-3xl font-extrabold text-[#101820] leading-none">
                  99.8%
                </p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                  Continuidad Operativa →
                </p>
              </button>

              <div className="h-[1px] bg-gray-100 mx-2"></div>

              {/* Metric 2: Coverage Scroll */}
              <a
                href="#coverage"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full text-left p-3 hover:bg-red-50/50 border border-transparent hover:border-red-150 rounded-xl transition-all duration-300 cursor-pointer block focus:outline-none"
              >
                <p className="font-display text-3xl font-extrabold text-[#101820] leading-none">
                  +35
                </p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">
                  Sucursales en México →
                </p>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <motion.a
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          href="#story"
          className="p-3 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg inline-flex items-center justify-center text-gray-600 hover:text-[#EF3B43] transition-colors"
        >
          <ArrowDown size={18} strokeWidth={2.5} />
        </motion.a>
      </div>
    </section>
  )
}
