import { motion } from 'framer-motion'
import { ShieldCheck, Target, Sparkle } from '@phosphor-icons/react'

export default function ArmedGallery() {
  return (
    <section className="py-24 bg-[#101820] text-white relative overflow-hidden">
      
      {/* Dynamic scanline grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
      {/* Floating background glowing red blur blobs */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#EF3B43]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-[#EF3B43]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43] flex items-center justify-center gap-2">
            <Sparkle size={14} weight="fill" className="animate-spin-slow text-[#EF3B43]" />
            Fuerza de Custodia Armada
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
            Capacidad Operativa y Adiestramiento
          </h3>
          <p className="text-sm md:text-base text-gray-400 max-w-[60ch] mx-auto leading-relaxed">
            Nuestro cuerpo de seguridad privada armada opera bajo el más estricto control de licencias federales, combinando una presencia disuasiva equipada con entrenamientos de reacción táctica.
          </p>
        </div>

        {/* Side-by-side Guard Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Armed Guard Alert (Equipped, not aiming) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="group relative flex flex-col justify-between overflow-hidden bg-slate-900 border border-white/5 shadow-2xl rounded-[36px] min-h-[500px]"
          >
            {/* Image container */}
            <div className="absolute inset-0 z-0">
              <img
                src="/recursos/gsi-guardia-armado-alerta.png"
                alt="Guardia Armado GSI en Vigilancia"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
              />
              {/* Vignette dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Top Badge */}
            <div className="p-8 z-10 self-start">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} className="text-[#EF3B43]" weight="fill" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                  Presencia Disuasiva: Equipado
                </span>
              </span>
            </div>

            {/* Bottom Content Card */}
            <div className="p-8 z-10 space-y-4 bg-slate-950/70 backdrop-blur-sm border-t border-white/5">
              <h4 className="font-display text-xl font-extrabold text-white leading-tight">
                Vigilancia Estática y Patrullaje Armado
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Personal equipado con armamento reglamentario homologado y portación de licencia oficial (LFE). Su rol principal es el control de accesos críticos, patrullaje perimetral y disuasión de amenazas en parques industriales y corporativos.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 text-[9px] font-bold bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  Armamento Fundado en Funda
                </span>
                <span className="px-2.5 py-1 text-[9px] font-bold bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  Portación Legal Regulada
                </span>
              </div>
            </div>

            {/* Left accent line indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#EF3B43] transition-colors duration-300"></div>
          </motion.div>

          {/* Card 2: Tactical Training (Aiming stance) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="group relative flex flex-col justify-between overflow-hidden bg-slate-900 border border-white/5 shadow-2xl rounded-[36px] min-h-[500px]"
          >
            {/* Image container */}
            <div className="absolute inset-0 z-0">
              <img
                src="/recursos/gsi-guardia-armado-apuntando.png"
                alt="Entrenamiento de Tiro GSI"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
              />
              {/* Vignette dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Top Badge */}
            <div className="p-8 z-10 self-start">
              <span className="inline-flex items-center space-x-1.5 bg-[#EF3B43]/20 backdrop-blur-md border border-[#EF3B43]/45 px-3 py-1.5 rounded-full">
                <Target size={14} className="text-[#EF3B43]" weight="fill" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                  Adiestramiento: Reacción y Alineación
                </span>
              </span>
            </div>

            {/* Bottom Content Card */}
            <div className="p-8 z-10 space-y-4 bg-slate-950/70 backdrop-blur-sm border-t border-white/5">
              <h4 className="font-display text-xl font-extrabold text-white leading-tight">
                Capacitación Táctica y Prácticas de Precisión
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Nuestros guardias y escoltas armados asisten a entrenamientos periódicos en campos de tiro certificados. Reciben instrucción en posturas de tiro, tiro de reacción, despeje de áreas e intervención ante situaciones de riesgo letal inmediato.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 text-[9px] font-bold bg-[#EF3B43]/10 border border-[#EF3B43]/30 rounded-lg text-white">
                  Postura Táctica de Reacción
                </span>
                <span className="px-2.5 py-1 text-[9px] font-bold bg-white/5 border border-white/10 rounded-lg text-gray-300">
                  Campo de Tiro Autorizado
                </span>
              </div>
            </div>

            {/* Left accent line indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#EF3B43] transition-colors duration-300"></div>
          </motion.div>

        </div>
        
      </div>
    </section>
  )
}
