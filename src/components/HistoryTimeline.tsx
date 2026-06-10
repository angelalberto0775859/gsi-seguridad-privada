import { motion } from 'framer-motion'
import { Calendar, Certificate, Shield, MapTrifold } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

const stepsIcons = [
  <Calendar size={24} weight="bold" />,
  <Certificate size={24} weight="bold" />,
  <Shield size={24} weight="bold" />,
  <MapTrifold size={24} weight="bold" />
]

const contentDict: Record<Language, {
  eyebrow: string
  title: string
  description: string
  steps: { year: string; title: string; description: string }[]
}> = {
  es: {
    eyebrow: 'Trayectoria y Confianza',
    title: 'Una historia dedicada a proteger',
    description: 'Desde nuestra fundación, hemos crecido de la mano con la industria y el comercio en México, certificando cada paso para brindar máxima tranquilidad.',
    steps: [
      {
        year: '2003',
        title: 'Fundación de GSI Seguridad Privada',
        description: 'Iniciamos operaciones en México con el compromiso de redefinir la seguridad corporativa B2B bajo un esquema de estricto protocolo, selección y criterio de guardias.'
      },
      {
        year: '2010',
        title: 'Certificación ISO 9001:2015',
        description: 'Estandarizamos todos nuestros procesos de supervisión, capacitación en sitio y respuesta operativa diaria, garantizando la continuidad de las operaciones de nuestros clientes.'
      },
      {
        year: '2016',
        title: 'Certificación BASC (Business Alliance for Secure Commerce)',
        description: 'Alcanzamos los máximos estándares globales en seguridad logística, posicionándonos como el aliado predilecto para parques industriales y centros de distribución.'
      },
      {
        year: '2024',
        title: 'Consolidación Nacional',
        description: 'Consolidamos nuestra presencia nacional con más de 30 sucursales activas y cobertura estratégica en los sectores financiero, industrial, aeroportuario y logístico.'
      }
    ]
  },
  en: {
    eyebrow: 'Trajectory and Trust',
    title: 'A history dedicated to protecting',
    description: 'Since our founding, we have grown hand-in-hand with industry and commerce in Mexico, certifying every step to provide maximum peace of mind.',
    steps: [
      {
        year: '2003',
        title: 'Founding of GSI Seguridad Privada',
        description: 'We began operations in Mexico with a commitment to redefine B2B corporate security under a strict protocol, selection, and guard evaluation scheme.'
      },
      {
        year: '2010',
        title: 'ISO 9001:2015 Certification',
        description: 'We standardized all our supervision, on-site training, and daily operational response processes, guaranteeing the continuity of our clients\' operations.'
      },
      {
        year: '2016',
        title: 'BASC Certification',
        description: 'We achieved the highest global standards in supply chain security, positioning ourselves as the preferred partner for industrial parks and distribution centers.'
      },
      {
        year: '2024',
        title: 'National Consolidation',
        description: 'We consolidated our national presence with more than 30 active branches and strategic coverage in the financial, industrial, airport, and logistics sectors.'
      }
    ]
  },
  zh: {
    eyebrow: '历程与信任',
    title: '致力于守护的历史',
    description: '自创立以来，我们与墨西哥的工业和商业携手成长，对每一步进行认证，以提供最大的安心。',
    steps: [
      {
        year: '2003',
        title: 'GSI Seguridad Privada 创立',
        description: '我们在墨西哥开始运营，承诺在严格的警卫协议、选拔和评估计划下，重新定义 B2B 企业安全。'
      },
      {
        year: '2010',
        title: 'ISO 9001:2015 质量管理体系认证',
        description: '我们标准化了所有的监督、现场培训和日常运营响应流程，保障客户的业务连续性。'
      },
      {
        year: '2016',
        title: 'BASC 安全商盟认证',
        description: '我们达到了全球供应链安全的最高标准，成为工业园区和物流分拨中心的首选合作伙伴。'
      },
      {
        year: '2024',
        title: '全国业务整合',
        description: '我们在墨西哥全国拥有30多个活跃的分支机构，并在金融、工业、机场和物流等关键行业实现战略覆盖。'
      }
    ]
  }
}

export default function HistoryTimeline() {
  const { isRedBlack, language } = useSitePreferences()
  const content = contentDict[language]

  return (
    <section id="story" className={`py-24 border-y relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-[#050608] border-[#EF3B43]/18' : 'bg-white border-gray-100'
    }`}>
      {/* Subtle Logo Watermark Background (Very transparent, for B2B aesthetics) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none select-none z-0">
        <img
          src={isRedBlack 
            ? "/recursos/Logotipos 2023 colo blanco fondo transparente_GSI SEGURIDAD PRIVADA.png" 
            : "/recursos/Logotipos 2023 Color Negro Fondo transparente_GSI SEGURIDAD PRIVADA.png"
          }
          alt="GSI Watermark"
          className="w-[600px] h-auto object-contain opacity-[0.025]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            {content.eyebrow}
          </h2>
          <h3 className={`font-display text-3xl md:text-5xl font-black tracking-tight leading-none ${
            isRedBlack ? 'text-white' : 'text-[#101820]'
          }`}>
            {content.title}
          </h3>
          <p className={`text-sm md:text-base max-w-[55ch] mx-auto leading-relaxed ${
            isRedBlack ? 'text-white/90' : 'text-gray-700'
          }`}>
            {content.description}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className={`absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 ${
            isRedBlack ? 'bg-[#EF3B43]/28' : 'bg-gray-100'
          }`}></div>
          
          {/* Timeline Cards */}
          <div className="space-y-16">
            {content.steps.map((step, idx) => {
              const isEven = idx % 2 === 0
              const icon = stepsIcons[idx % stepsIcons.length]
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
                      {icon}
                    </motion.div>
                  </div>

                  {/* Left Empty / Right Content asymmetric layout */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
                      className={`backdrop-blur-sm border p-8 shadow-sm relative group transition-all duration-300 rounded-[24px] overflow-hidden ${
                        isRedBlack
                          ? 'bg-[#0b0d11]/86 border-white/10 hover:border-[#EF3B43]/55 shadow-[#EF3B43]/5'
                          : 'bg-[#fafafa]/80 border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {/* Year Indicator */}
                      <span className={`font-display text-4xl font-black group-hover:text-[#EF3B43]/25 transition-colors duration-300 block mb-2 ${
                        isRedBlack ? 'text-white/10' : 'text-gray-200'
                      }`}>
                        {step.year}
                      </span>
                      <h4 className={`font-display text-lg font-extrabold mb-2 ${
                        isRedBlack ? 'text-white' : 'text-[#101820]'
                      }`}>
                        {step.title}
                      </h4>
                      <p className={`text-sm leading-relaxed max-w-[55ch] md:ml-auto ${
                        isRedBlack ? 'text-white/85' : 'text-gray-750'
                      }`}>
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
