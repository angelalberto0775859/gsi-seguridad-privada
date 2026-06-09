import { motion } from 'framer-motion'
import { Calendar, Certificate, Shield, MapTrifold } from '@phosphor-icons/react'

interface TimelineStep {
  year: string
  title: string
  description: string
  icon: React.ReactNode
}

const steps: TimelineStep[] = [
  {
    year: '2003',
    title: 'Fundación de GSI Seguridad Privada',
    description: 'Iniciamos operaciones en México con el compromiso de redefinir la seguridad corporativa B2B bajo un esquema de estricto protocolo, selección y criterio de guardias.',
    icon: <Calendar size={24} weight="bold" />
  },
  {
    year: '2010',
    title: 'Certificación ISO 9001:2015',
    description: 'Estandarizamos todos nuestros procesos de supervisión, capacitación en sitio y respuesta operativa diaria, garantizando la continuidad de las operaciones de nuestros clientes.',
    icon: <Certificate size={24} weight="bold" />
  },
  {
    year: '2016',
    title: 'Certificación BASC (Business Alliance for Secure Commerce)',
    description: 'Alcanzamos los máximos estándares globales en seguridad logística, posicionándonos como el aliado predilecto para parques industriales y centros de distribución.',
    icon: <Shield size={24} weight="bold" />
  },
  {
    year: '2024',
    title: 'Consolidación Nacional',
    description: 'Consolidamos nuestra presencia nacional con más de 30 sucursales activas y cobertura estratégica en los sectores financiero, industrial, aeroportuario y logístico.',
    icon: <MapTrifold size={24} weight="bold" />
  }
]

export default function HistoryTimeline() {
  return (
    <section id="story" className="py-24 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            Trayectoria y Confianza
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black text-[#101820] tracking-tight leading-none">
            Una historia dedicada a proteger
          </h3>
          <p className="text-sm md:text-base text-gray-500 max-w-[55ch] mx-auto leading-relaxed">
            Desde nuestra fundación, hemos crecido de la mano con la industria y el comercio en México, certificando cada paso para brindar máxima tranquilidad.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gray-100 -translate-x-1/2"></div>
          
          {/* Timeline Cards */}
          <div className="space-y-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch">
                  {/* Central Node / Icon */}
                  <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.1, 1], backgroundColor: ['#ffffff', '#EF3B43', '#101820'] }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-white shadow-md cursor-pointer"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Left Empty / Right Content asymmetric layout */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                      className="bg-[#fafafa]/80 backdrop-blur-sm border border-gray-100 p-8 shadow-sm relative group hover:border-gray-200 transition-all duration-300 rounded-[24px] overflow-hidden"
                    >
                      {/* Year Indicator */}
                      <span className="font-display text-4xl font-black text-gray-200 group-hover:text-[#EF3B43]/10 transition-colors duration-300 block mb-2">
                        {step.year}
                      </span>
                      <h4 className="font-display text-lg font-extrabold text-[#101820] mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-[55ch] md:ml-auto">
                        {step.description}
                      </p>

                      {/* Subtle red bottom highlight on card hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-[#EF3B43] transition-all duration-300"></div>
                    </motion.div>
                  </div>
                  
                  {/* Placeholders for desktop symmetry */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
