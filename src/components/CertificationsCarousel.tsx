import { motion } from 'framer-motion'
import { Medal, Buildings, FileText, Globe } from '@phosphor-icons/react'

interface Certification {
  id: string
  name: string
  acronym: string
  description: string
  regId: string
  icon?: React.ReactNode
  logoUrl?: string
}

const certifications: Certification[] = [
  {
    id: 'cert-iso',
    name: 'Gestión de Calidad Internacional',
    acronym: 'ISO 9001:2015',
    description: 'Avala la estandarización y mejora continua en nuestros procesos de selección, reclutamiento y supervisión de seguridad privada.',
    regId: 'Calidad Estandarizada',
    logoUrl: '/recursos/DNV_ISO_9001_SPA.png'
  },
  {
    id: 'cert-basc',
    name: 'Comercio Seguro de Cadena de Suministro',
    acronym: 'Certificación BASC',
    description: 'Estándar global que valida la seguridad de nuestros procedimientos para mitigar riesgos en logística y comercio exterior.',
    regId: 'Código MX-MEX00249',
    logoUrl: '/recursos/BASC.png'
  },
  {
    id: 'cert-amesp',
    name: 'Asociación Mexicana de Seguridad Privada',
    acronym: 'Asociado Activo AMESP',
    description: 'Miembro activo de la asociación de seguridad más grande de México, garantizando cumplimiento normativo y profesionalismo.',
    regId: 'Asociado Reg. GSI',
    logoUrl: '/recursos/AMESP_LOGO.png'
  },
  {
    id: 'compliance',
    name: 'Autorización Federal de Seguridad',
    acronym: 'DGSP / CNS',
    description: 'Registro oficial ante la Dirección General de Seguridad Privada para brindar servicios autorizados en todo el territorio mexicano.',
    regId: 'Registro: DGSP/008-24/SP',
    icon: <Medal size={32} className="text-[#EF3B43]" weight="duotone" />
  },
  {
    id: 'cert-esr',
    name: 'Empresa Socialmente Responsable',
    acronym: 'Distintivo ESR',
    description: 'Reconoce nuestra gestión ética, el respeto a la dignidad del guardia de seguridad y el impacto positivo en el entorno laboral.',
    regId: 'Acreditación Activa',
    icon: <Buildings size={32} className="text-[#EF3B43]" weight="duotone" />
  },
  {
    id: 'cert-repse',
    name: 'Prestadora de Servicios Especializados',
    acronym: 'Registro REPSE',
    description: 'Cumplimiento total con las obligaciones fiscales y de seguridad social ante la Secretaría del Trabajo (STPS).',
    regId: 'STPS / REPSE-2023',
    icon: <FileText size={32} className="text-[#EF3B43]" weight="duotone" />
  },
  {
    id: 'cert-ctpat',
    name: 'Criterios de Seguridad de Fronteras',
    acronym: 'C-TPAT Compliant',
    description: 'Seguridad en aduanas y cruces transfronterizos para custodias logísticas críticas del sector B2B exportador.',
    regId: 'Alineación Homologada',
    icon: <Globe size={32} className="text-[#EF3B43]" weight="duotone" />
  }
]

// Duplicate list for infinite loop effect
const doubleCertifications = [...certifications, ...certifications]

export default function CertificationsCarousel() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fafafa] relative overflow-hidden border-b border-gray-100">
      
      {/* Sliding tech grid background for premium feeling */}
      <div className="absolute inset-0 animate-tech-grid opacity-75 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            Garantía de Confianza
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black text-[#101820] tracking-tight leading-none">
            Cumplimiento y Certificaciones Oficiales
          </h3>
          <p className="text-sm md:text-base text-gray-500 max-w-[60ch] mx-auto leading-relaxed">
            Operamos bajo las más estrictas regulaciones gubernamentales e internacionales en seguridad corporativa y logística.
          </p>
        </div>

        {/* Infinite Sliding Carousel Container */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          {/* Fading gradient overlays on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-6 w-max"
            animate={{
              x: [0, -1800] // Shift by exactly half the size of doubleCertifications width
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 35
            }}
            whileHover={{ transition: { duration: 60 } }} // Slows down slightly on hover for reading
          >
            {doubleCertifications.map((c, index) => (
              <div
                key={`${c.id}-${index}`}
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: c.id } }))}
                className="w-[300px] md:w-[350px] shrink-0 bg-white border border-gray-200 p-8 shadow-sm flex flex-col justify-between min-h-[260px] rounded-[24px] hover:border-[#EF3B43]/50 hover:shadow-md cursor-pointer transition-all duration-300 relative group focus:outline-none"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center rounded-xl p-1.5 overflow-hidden">
                      {c.logoUrl ? (
                        <img
                          src={c.logoUrl}
                          alt={c.acronym}
                          className="h-full w-auto object-contain max-w-full grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      ) : (
                        <div className="text-[#EF3B43]">{c.icon}</div>
                      )}
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase bg-gray-50 px-2.5 py-1 border border-gray-100 rounded-full self-center">
                      {c.regId}
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-bold text-[#EF3B43] tracking-widest uppercase block mb-1">
                    {c.acronym}
                  </span>
                  <h4 className="font-display text-base font-extrabold text-[#101820] mb-3 leading-snug group-hover:text-[#EF3B43] transition-colors duration-300">
                    {c.name}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Accent red indicator inside card */}
                <div className="absolute left-0 bottom-6 w-[3px] h-10 bg-transparent group-hover:bg-[#EF3B43] transition-all duration-300 rounded-r"></div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
