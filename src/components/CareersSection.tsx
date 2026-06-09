import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, GraduationCap, Handshake, Users, Phone, Envelope, Lock, CaretRight } from '@phosphor-icons/react'

interface JobOpening {
  id: string
  title: string
  location: string
  type: string
  requirements: string[]
  description: string
}

const jobOpenings: JobOpening[] = [
  {
    id: 'guardia-intramuros',
    title: 'Guardia de Seguridad Intramuros',
    location: 'CDMX & Área Metropolitana',
    type: 'Tiempo Completo (Turnos 12x12 / 24x24)',
    description: 'Oficiales de seguridad responsables de la vigilancia, control de accesos y resguardo de corporativos, plantas industriales y centros logísticos de primer nivel.',
    requirements: [
      'Secundaria concluida (Certificado original)',
      'Cartilla de Servicio Militar (Liberada/Precartilla)',
      'Edad de 22 a 48 años',
      'Documentación básica en regla (RFC, CURP, NSS)',
      'Sin antecedentes penales (Carta federal o estatal)'
    ]
  },
  {
    id: 'custodio-foraneo',
    title: 'Custodio de Transportes de Carga (Foráneo)',
    location: 'Cobertura Nacional (Base Central)',
    type: 'Disponibilidad de Horario (Foráneo)',
    description: 'División elite de Custodia Carretera. Responsable de escoltar transportes de mercancías de alto valor en rutas federales, coordinando con el centro de mando.',
    requirements: [
      'Preparatoria o equivalente concluida',
      'Experiencia mínima de 1 año en custodia o seguridad en carretera',
      'Manejo defensivo y licencia de conducir de chofer vigente',
      'Cartilla Militar Liberada obligatoria',
      'Aprobación de exámenes de control de confianza'
    ]
  },
  {
    id: 'monitorista-cctv',
    title: 'Operador de Monitoristas CCTV',
    location: 'Corporativo Central GSI',
    type: 'Turnos Rotativos (8 horas / 12 horas)',
    description: 'Responsable de la vigilancia remota de instalaciones críticas, detección de anomalías y activación de protocolos de respuesta en coordinación directa con campo.',
    requirements: [
      'Preparatoria terminada comprobable',
      'Conocimiento en sistemas de CCTV, alarmas e informática básica',
      'Experiencia previa de 1 año en centros de monitoreo (Deseable)',
      'Facilidad de palabra y excelente toma de decisiones bajo presión',
      'Disponibilidad para rolar turnos'
    ]
  }
]

export default function CareersSection() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null)

  return (
    <section id="careers" className="pt-36 md:pt-48 pb-24 bg-white border-b border-gray-100 relative overflow-hidden">
      {/* Red decorative blur to anchor GSI branding */}
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-red-150/15 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF3B43] animate-ping"></span>
            Únete al Equipo Elite GSI
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black text-[#101820] tracking-tight leading-none">
            Bolsa de Trabajo & Carrera Profesional
          </h3>
          <p className="text-sm md:text-base text-gray-500 max-w-[60ch] mx-auto leading-relaxed">
            Forma parte del consorcio de seguridad privada líder en México. Ofrecemos estabilidad laboral, capacitación táctica certificada y oportunidades reales de crecimiento.
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Why Work With Us & Job Board */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Why Work With Us Cards */}
            <div className="space-y-6">
              <h4 className="font-display text-xl font-extrabold text-[#101820] tracking-tight flex items-center gap-2">
                <span className="h-6 w-1 bg-[#EF3B43] rounded-full"></span>
                ¿Por qué elegir GSI Seguridad Privada?
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Benefit 1 */}
                <div className="p-5 bg-gray-50/70 border border-gray-150 rounded-2xl space-y-3 hover:border-[#EF3B43]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Handshake size={20} weight="fill" />
                  </div>
                  <h5 className="font-display text-sm font-bold text-[#101820]">Estabilidad & Puntualidad</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Pagos quincenales exactos y puntuales. Ofrecemos prestaciones de ley completas y bonos por desempeño sobresaliente.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="p-5 bg-gray-50/70 border border-gray-150 rounded-2xl space-y-3 hover:border-[#EF3B43]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <GraduationCap size={20} weight="fill" />
                  </div>
                  <h5 className="font-display text-sm font-bold text-[#101820]">Capacitación Especializada</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Instrucción teórica y táctica bajo estándares oficiales. Cursos de defensa personal, armamento y radiocomunicaciones.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="p-5 bg-gray-50/70 border border-gray-150 rounded-2xl space-y-3 hover:border-[#EF3B43]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Shield size={20} weight="fill" />
                  </div>
                  <h5 className="font-display text-sm font-bold text-[#101820]">Equipo & Uniformes Elite</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Proporcionamos uniformes de alta gama sin costo alguno, calzado táctico ergonómico y equipo operativo de punta.
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className="p-5 bg-gray-50/70 border border-gray-150 rounded-2xl space-y-3 hover:border-[#EF3B43]/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Users size={20} weight="fill" />
                  </div>
                  <h5 className="font-display text-sm font-bold text-[#101820]">Crecimiento Profesional</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Plan de carrera diseñado para ascensos. El 80% de nuestros supervisores y directores operativos iniciaron como oficiales.
                  </p>
                </div>

              </div>
            </div>

            {/* Interactive Job Openings */}
            <div className="space-y-6">
              <h4 className="font-display text-xl font-extrabold text-[#101820] tracking-tight flex items-center gap-2">
                <span className="h-6 w-1 bg-[#EF3B43] rounded-full"></span>
                Vacantes Disponibles
              </h4>

              {/* Informative Locked Alert Banner */}
              <div className="p-4 bg-red-50 border border-red-150 rounded-2xl flex items-start space-x-3 text-xs text-gray-650">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-[#EF3B43] shrink-0 mt-0.5 shadow-sm">
                  <Lock size={18} weight="fill" />
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-bold text-[#101820] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    Postulaciones en Línea Suspendidas
                  </h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Actualmente estamos actualizando nuestro portal de empleo. Puedes consultar los detalles de las vacantes activas abajo. Para postularte, por favor comunícate a nuestra línea telefónica directa de atención a reclutamiento.
                  </p>
                </div>
              </div>

              {/* Interactive vacancies list (legible and openable, but button disabled) */}
              <div className="space-y-3">
                {jobOpenings.map((job) => {
                  const isOpen = activeJobId === job.id
                  return (
                    <div 
                      key={job.id} 
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen 
                          ? 'border-[#EF3B43]/50 bg-red-50/5 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {/* Job Accordion Header */}
                      <button
                        onClick={() => setActiveJobId(isOpen ? null : job.id)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{job.type}</span>
                          <h5 className="font-display text-base font-bold text-[#101820] tracking-tight hover:text-[#EF3B43] transition-colors">
                            {job.title}
                          </h5>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span className="font-semibold text-gray-400">Salario: Reservado</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className={`p-2 rounded-xl bg-gray-50 border border-gray-150 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#EF3B43] border-[#EF3B43]/20 bg-red-50/80' : ''}`}>
                          <CaretRight size={18} weight="bold" />
                        </div>
                      </button>

                      {/* Job Accordion Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-2 border-t border-gray-100 space-y-4">
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {job.description}
                              </p>
                              
                              <div className="space-y-2">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                  Requisitos Indispensables:
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start space-x-2 text-xs text-gray-500">
                                      <Shield size={14} className="text-[#EF3B43] shrink-0 mt-0.5" weight="fill" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Disabled Application Button */}
                              <div className="pt-2">
                                <button
                                  disabled
                                  className="px-5 py-2.5 bg-gray-100 text-gray-400 border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl cursor-not-allowed flex items-center gap-2"
                                >
                                  <Lock size={14} weight="fill" />
                                  Postulación en Línea Pausada
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Side: Cinematic Image Card & Stats with RED branding */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Cinematic Image Frame with subtle red neon overlay */}
            <div className="relative group rounded-[28px] overflow-hidden border border-gray-150 shadow-2xl aspect-4/5 flex-1 min-h-[400px]">
              
              <img
                src="/recursos/gsi-careers-cinematic.png"
                alt="Personal elite de seguridad GSI en centro de control operativo"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Dark vignette gradient and red overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/40 z-10"></div>
              <div className="absolute inset-0 bg-red-950/10 mix-blend-color-burn pointer-events-none z-10"></div>

              {/* Glowing red accent outline inside frame */}
              <div className="absolute inset-3 border border-red-500/20 rounded-[20px] pointer-events-none z-20"></div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute top-6 left-6 z-20 bg-[#EF3B43] text-white px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-red-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Reclutamiento Activo
              </div>

              {/* Content Box (Bottom Overlay) */}
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3 text-white">
                <h5 className="font-display text-lg md:text-xl font-black tracking-tight leading-tight">
                  "Disciplina, Lealtad y Profesionalismo al Servicio de México"
                </h5>
                <p className="text-[11px] text-gray-300 leading-relaxed max-w-[42ch]">
                  Nuestros oficiales son el pilar de la confianza nacional. Diseñamos un entorno tecnológico y seguro para que impulses tu carrera táctica.
                </p>
              </div>

            </div>

            {/* Quick Contact & WhatsApp Recruit Info (High-contrast red banner) */}
            <div className="bg-[#EF3B43] text-white p-6 rounded-[24px] shadow-xl shadow-red-500/15 relative overflow-hidden group">
              {/* Tech pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-100 block">Atención Directa de Reclutamiento</span>
                  <p className="font-display text-base font-black tracking-tight">¿Tienes dudas o quieres agendar entrevista?</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-red-100 pt-1">
                    <span className="flex items-center gap-1">
                      <Phone size={14} weight="fill" />
                      800 8305 990
                    </span>
                    <span className="flex items-center gap-1">
                      <Envelope size={14} weight="fill" />
                      reclutamiento@gsi.com.mx
                    </span>
                  </div>
                </div>
                
                <a 
                  href="tel:8008305990" 
                  className="px-4 py-2 bg-white text-[#EF3B43] hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95 shrink-0 block text-center w-full sm:w-auto cursor-pointer shadow-md shadow-black/10"
                >
                  Llamar Directo
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
