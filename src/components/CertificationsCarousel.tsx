import { motion } from 'framer-motion'
import { Medal, Buildings, FileText, Globe } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

interface Certification {
  id: string
  name: string
  acronym: string
  description: string
  regId: string
  icon?: React.ReactNode
  logoUrl?: string
}

const contentDict: Record<Language, {
  eyebrow: string
  title: string
  description: string
  certifications: Omit<Certification, 'icon' | 'logoUrl'>[]
}> = {
  es: {
    eyebrow: 'Garantía de Confianza',
    title: 'Cumplimiento y Certificaciones Oficiales',
    description: 'Operamos bajo las más estrictas regulaciones gubernamentales e internacionales en seguridad corporativa y logística.',
    certifications: [
      {
        id: 'cert-iso',
        name: 'Gestión de Calidad Internacional',
        acronym: 'ISO 9001:2015',
        regId: 'Calidad Estandarizada',
        description: 'Avala la estandarización y mejora continua en nuestros procesos de selección, reclutamiento y supervisión de seguridad privada.'
      },
      {
        id: 'cert-basc',
        name: 'Comercio Seguro de Cadena de Suministro',
        acronym: 'Certificación BASC',
        regId: 'Código MX-MEX00249',
        description: 'Estándar global que valida la seguridad de nuestros procedimientos para mitigar riesgos en logística y comercio exterior.'
      },
      {
        id: 'cert-amesp',
        name: 'Asociación Mexicana de Seguridad Privada',
        acronym: 'Asociado Activo AMESP',
        regId: 'Asociado Reg. GSI',
        description: 'Miembro activo de la asociación de seguridad más grande de México, garantizando cumplimiento normativo y profesionalismo.'
      },
      {
        id: 'compliance',
        name: 'Autorización Federal de Seguridad',
        acronym: 'DGSP / CNS',
        regId: 'Registro: DGSP/008-24/SP',
        description: 'Registro oficial ante la Dirección General de Seguridad Privada para brindar servicios autorizados en todo el territorio mexicano.'
      },
      {
        id: 'cert-esr',
        name: 'Empresa Socialmente Responsable',
        acronym: 'Distintivo ESR',
        regId: 'Acreditación Activa',
        description: 'Reconoce nuestra gestión ética, el respeto a la dignidad del guardia de seguridad y el impacto positivo en el entorno laboral.'
      },
      {
        id: 'cert-repse',
        name: 'Prestadora de Servicios Especializados',
        acronym: 'Registro REPSE',
        regId: 'STPS / REPSE-2023',
        description: 'Cumplimiento total con las obligaciones fiscales y de seguridad social ante la Secretaría del Trabajo (STPS).'
      },
      {
        id: 'cert-ctpat',
        name: 'Criterios de Seguridad de Fronteras',
        acronym: 'C-TPAT Compliant',
        regId: 'Alineación Homologada',
        description: 'Seguridad en aduanas y cruces transfronterizos para custodias logísticas críticas del sector B2B exportador.'
      }
    ]
  },
  en: {
    eyebrow: 'Trust Guarantee',
    title: 'Compliance and Official Certifications',
    description: 'We operate under the strictest governmental and international regulations in corporate and logistics security.',
    certifications: [
      {
        id: 'cert-iso',
        name: 'International Quality Management',
        acronym: 'ISO 9001:2015',
        regId: 'Standardized Quality',
        description: 'Validates standardization and continuous improvement in our private security selection, recruitment, and supervision processes.'
      },
      {
        id: 'cert-basc',
        name: 'Secure Supply Chain Commerce',
        acronym: 'BASC Certification',
        regId: 'Code MX-MEX00249',
        description: 'Global standard validating the security of our procedures to mitigate risks in logistics and foreign trade.'
      },
      {
        id: 'cert-amesp',
        name: 'Mexican Private Security Association',
        acronym: 'AMESP Active Member',
        regId: 'Associated Reg. GSI',
        description: 'Active member of the largest security association in Mexico, guaranteeing regulatory compliance and professionalism.'
      },
      {
        id: 'compliance',
        name: 'Federal Security Authorization',
        acronym: 'DGSP / CNS',
        regId: 'Registry: DGSP/008-24/SP',
        description: 'Official registry before the General Directorate of Private Security to provide authorized services throughout Mexico.'
      },
      {
        id: 'cert-esr',
        name: 'Socially Responsible Company',
        acronym: 'ESR Distinction',
        regId: 'Active Accreditation',
        description: 'Recognizes our ethical management, respect for the dignity of the security guard, and positive workplace impact.'
      },
      {
        id: 'cert-repse',
        name: 'Specialized Services Provider',
        acronym: 'REPSE Registry',
        regId: 'STPS / REPSE-2023',
        description: 'Full compliance with tax and social security obligations before the Ministry of Labor (STPS).'
      },
      {
        id: 'cert-ctpat',
        name: 'Customs-Trade Partnership Against Terrorism',
        acronym: 'C-TPAT Compliant',
        regId: 'Approved Alignment',
        description: 'Customs and cross-border security for critical logistics escorts in the B2B exporting sector.'
      }
    ]
  },
  zh: {
    eyebrow: '信任保证',
    title: '合规与官方认证',
    description: '我们在企业和物流安全领域最严格的政府和国际法规下运营。',
    certifications: [
      {
        id: 'cert-iso',
        name: '国际质量管理体系',
        acronym: 'ISO 9001:2015',
        regId: '标准化质量',
        description: '验证了我们在私人安保选拔、招募和监督过程中的标准化及持续改进。'
      },
      {
        id: 'cert-basc',
        name: '安全供应链商业认证',
        acronym: 'BASC 认证',
        regId: '编码 MX-MEX00249',
        description: '全球标准，验证我们减少物流和对外贸易风险程序的安全性。'
      },
      {
        id: 'cert-amesp',
        name: '墨西哥私人安保协会',
        acronym: 'AMESP 活跃会员',
        regId: '关联注册 GSI',
        description: '墨西哥最大安保协会的活跃会员，保证合规性与专业化程度。'
      },
      {
        id: 'compliance',
        name: '联邦安全许可授权',
        acronym: 'DGSP / CNS',
        regId: '备案号: DGSP/008-24/SP',
        description: '在国家私营保安总局正式注册，在墨西哥全国范围内提供授权的安保服务。'
      },
      {
        id: 'cert-esr',
        name: '社会责任企业',
        acronym: 'ESR 标识',
        regId: '活跃认证',
        description: '表彰我们的道德管理、对保安人员尊严的尊重以及对工作环境的积极影响。'
      },
      {
        id: 'cert-repse',
        name: '专业服务提供商登记',
        acronym: 'REPSE 备案',
        regId: 'STPS / REPSE-2023',
        description: '完全符合劳动和社会保障部 (STPS) 规定的税务及社会保障义务。'
      },
      {
        id: 'cert-ctpat',
        name: '海关商贸反恐联盟',
        acronym: '符合 C-TPAT 标准',
        regId: '核准对齐',
        description: '为B2B出口行业关键物流护送提供海关和跨境安全保障。'
      }
    ]
  }
}

// Media assets matching the certification ID
const certAssets: Record<string, { logoUrl?: string; icon?: React.ReactNode }> = {
  'cert-iso': { logoUrl: '/recursos/DNV_ISO_9001_SPA.png' },
  'cert-basc': { logoUrl: '/recursos/BASC.png' },
  'cert-amesp': { logoUrl: '/recursos/AMESP_LOGO.png' },
  'compliance': { icon: <Medal size={32} className="text-[#EF3B43]" weight="duotone" /> },
  'cert-esr': { icon: <Buildings size={32} className="text-[#EF3B43]" weight="duotone" /> },
  'cert-repse': { icon: <FileText size={32} className="text-[#EF3B43]" weight="duotone" /> },
  'cert-ctpat': { icon: <Globe size={32} className="text-[#EF3B43]" weight="duotone" /> }
}

export default function CertificationsCarousel() {
  const { isRedBlack, language } = useSitePreferences()
  const content = contentDict[language]

  // Map translations to assets
  const certifications: Certification[] = content.certifications.map((cert) => ({
    ...cert,
    ...certAssets[cert.id]
  }))

  const doubleCertifications = [...certifications, ...certifications]

  return (
    <section className={`py-20 relative overflow-hidden border-b transition-colors duration-500 ${
      isRedBlack ? 'bg-[#050608] border-[#EF3B43]/18' : 'bg-gradient-to-b from-white to-[#fafafa] border-gray-100'
    }`}>
      


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            {content.eyebrow}
          </h2>
          <h3 className={`font-display text-3xl md:text-5xl font-black tracking-tight leading-none ${
            isRedBlack ? 'text-white' : 'text-[#101820]'
          }`}>
            {content.title}
          </h3>
          <p className={`text-sm md:text-base max-w-[60ch] mx-auto leading-relaxed ${
            isRedBlack ? 'text-white/62' : 'text-gray-500'
          }`}>
            {content.description}
          </p>
        </div>

        {/* Infinite Sliding Carousel Container */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          {/* Fading gradient overlays on edges */}
          <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r z-10 pointer-events-none ${
            isRedBlack ? 'from-[#050608]' : 'from-white'
          } to-transparent`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l z-10 pointer-events-none ${
            isRedBlack ? 'from-[#050608]' : 'from-white'
          } to-transparent`}></div>

          <motion.div
            className="flex gap-6 w-max"
            animate={{
              x: [0, -2450] // Shift dynamically
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 35
            }}
            whileHover={{ transition: { duration: 60 } }}
          >
            {doubleCertifications.map((c, index) => (
              <div
                key={`${c.id}-${index}`}
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: c.id } }))}
                className={`w-[300px] md:w-[350px] shrink-0 border p-8 shadow-sm flex flex-col justify-between min-h-[260px] rounded-[24px] hover:border-[#EF3B43]/65 hover:shadow-md cursor-pointer transition-all duration-300 relative group focus:outline-none ${
                  isRedBlack ? 'bg-[#0b0d11] border-white/10 shadow-[#EF3B43]/5' : 'bg-white border-gray-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-16 h-12 border flex items-center justify-center rounded-xl p-1.5 overflow-hidden ${
                      isRedBlack ? 'bg-white/95 border-[#EF3B43]/20' : 'bg-gray-50 border-gray-100'
                    }`}>
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
                    <span className={`text-[9px] font-bold uppercase px-2.5 py-1 border rounded-full self-center ${
                      isRedBlack ? 'text-white/50 bg-white/5 border-white/10' : 'text-gray-400 bg-gray-50 border-gray-100'
                    }`}>
                      {c.regId}
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-bold text-[#EF3B43] tracking-widest uppercase block mb-1">
                    {c.acronym}
                  </span>
                  <h4 className={`font-display text-base font-extrabold mb-3 leading-snug group-hover:text-[#EF3B43] transition-colors duration-300 ${
                    isRedBlack ? 'text-white' : 'text-[#101820]'
                  }`}>
                    {c.name}
                  </h4>
                  <p className={`text-xs leading-relaxed ${
                    isRedBlack ? 'text-white/56' : 'text-gray-500'
                  }`}>
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
