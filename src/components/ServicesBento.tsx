import { motion } from 'framer-motion'
import { ShieldCheck, Crosshair, MonitorPlay, UserCheck } from '@phosphor-icons/react'

export default function ServicesBento() {
  return (
    <section id="services" className="py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            Soluciones Integrales
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black text-[#101820] tracking-tight leading-none">
            Estrategias de seguridad adaptables
          </h3>
          <p className="text-sm md:text-base text-gray-500 max-w-[60ch] leading-relaxed">
            Protegemos tus activos críticos combinando la excelencia operativa de nuestro personal en sitio con tecnología de supervisión de última generación.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Vigilancia Física Intramuros (2 columns, image background) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'service-intramuros' } }))}
            className="md:col-span-2 relative aspect-[16/9] md:aspect-auto md:min-h-[380px] bg-gray-900 border border-gray-200 overflow-hidden group shadow-lg cursor-pointer rounded-[32px]"
          >
            {/* Background image of guard */}
            <img
              src="/recursos/gsi-base-parque-industrial.png"
              alt="Vigilancia Industrial"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            {/* Content (Liquid Glass styled container) */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-left space-y-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={20} className="text-[#EF3B43]" weight="fill" />
                <h4 className="font-display text-lg font-extrabold text-white">
                  Vigilancia Intramuros
                </h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-[55ch]">
                Guardias certificados con uniformes impecables, entrenamiento táctico y estricto control de accesos peatonales y vehiculares en corporativos y parques industriales.
              </p>
            </div>
            
            {/* Tactical border click feedback */}
            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#EF3B43] transition-all duration-300 pointer-events-none rounded-[32px]"></div>
          </motion.div>

          {/* Card 2: Seguridad Armada (1 column, High contrast dark style) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'service-armada' } }))}
            className="bg-[#101820] border border-gray-800 p-8 flex flex-col justify-between text-left group shadow-lg cursor-pointer min-h-[320px] relative rounded-[32px]"
          >
            <div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#EF3B43] mb-6 rounded-2xl">
                <Crosshair size={24} />
              </div>
              <h4 className="font-display text-xl font-extrabold text-white mb-3">
                Protección Armada
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Escoltas y guardias armados altamente capacitados para la custodia de activos de alto valor y situaciones de riesgo extraordinario.
              </p>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-6 group-hover:text-[#EF3B43] transition-colors duration-300">
              Protocolos de Reacción →
            </span>
            
            {/* Subtle red line indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#EF3B43] transition-all duration-300 rounded-t-[32px]"></div>
          </motion.div>

          {/* Card 3: Monitoreo y Rastreo Satelital (1 column, high contrast) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'service-monitoreo' } }))}
            className="bg-white border border-gray-200 p-8 flex flex-col justify-between text-left group shadow-lg cursor-pointer min-h-[320px] relative rounded-[32px]"
          >
            <div>
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-[#101820] mb-6 rounded-2xl">
                <MonitorPlay size={24} />
              </div>
              <h4 className="font-display text-xl font-extrabold text-[#101820] mb-3">
                Monitoreo GPS & CCTV
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Integración tecnológica 24/7 con rastreo satelital vehicular, geocercas activas y monitoreo de cámaras de seguridad con respuesta de emergencia inmediata.
              </p>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6 group-hover:text-[#EF3B43] transition-colors duration-300">
              Centro de Control GSI →
            </span>

            {/* Subtle red line indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#EF3B43] transition-all duration-300 rounded-t-[32px]"></div>
          </motion.div>

          {/* Card 4: Pruebas de Confianza (2 columns, image background) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'service-confianza' } }))}
            className="md:col-span-2 relative aspect-[16/9] md:aspect-auto md:min-h-[380px] bg-gray-900 border border-gray-200 overflow-hidden group shadow-lg cursor-pointer rounded-[32px]"
          >
            <img
              src="/recursos/Imagen generada a.png"
              alt="Evaluaciones y Confianza"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            {/* Content (Liquid Glass styled container) */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-left space-y-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <UserCheck size={20} className="text-[#EF3B43]" weight="fill" />
                <h4 className="font-display text-lg font-extrabold text-white">
                  Evaluaciones de Confianza
                </h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed max-w-[55ch]">
                Evita pérdidas internas y robos hormiga. Implementamos filtros conductuales rigurosos, análisis psicométricos y polígrafo para puestos críticos y control de confianza del personal.
              </p>
            </div>

            {/* Tactical border click feedback */}
            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#EF3B43] transition-all duration-300 pointer-events-none rounded-[32px]"></div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
