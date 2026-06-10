import { motion } from 'framer-motion'
import { ShieldCheck, Crosshair, MonitorPlay, UserCheck } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

const contentDict: Record<Language, {
  eyebrow: string
  title: string
  description: string
  services: {
    intramuros: { title: string; desc: string }
    armada: { title: string; desc: string; link: string }
    monitoreo: { title: string; desc: string; link: string }
    confianza: { title: string; desc: string }
  }
}> = {
  es: {
    eyebrow: 'Soluciones Integrales',
    title: 'Estrategias de seguridad adaptables',
    description: 'Protegemos tus activos críticos combinando la excelencia operativa de nuestro personal en sitio con tecnología de supervisión de última generación.',
    services: {
      intramuros: {
        title: 'Vigilancia Intramuros',
        desc: 'Guardias certificados con uniformes impecables, entrenamiento táctico y estricto control de accesos peatonales y vehiculares en corporativos y parques industriales.'
      },
      armada: {
        title: 'Protección Armada',
        desc: 'Escoltas y guardias armados altamente capacitados para la custodia de activos de alto valor y situaciones de riesgo extraordinario.',
        link: 'Protocolos de Reacción →'
      },
      monitoreo: {
        title: 'Monitoreo GPS & CCTV',
        desc: 'Integración tecnológica 24/7 con rastreo satelital vehicular, geocercas activas y monitoreo de cámaras de seguridad con respuesta de emergencia inmediata.',
        link: 'Centro de Control GSI →'
      },
      confianza: {
        title: 'Evaluaciones de Confianza',
        desc: 'Evita pérdidas internas y robos hormiga. Implementamos filtros conductuales rigurosos, análisis psicométricos y polígrafo para puestos críticos y control de confianza del personal.'
      }
    }
  },
  en: {
    eyebrow: 'Comprehensive Solutions',
    title: 'Adaptable security strategies',
    description: 'We protect your critical assets by combining the operational excellence of our on-site personnel with state-of-the-art monitoring technology.',
    services: {
      intramuros: {
        title: 'On-Site Security',
        desc: 'Certified guards with impeccable uniforms, tactical training, and strict control of pedestrian and vehicular access in corporate and industrial parks.'
      },
      armada: {
        title: 'Armed Protection',
        desc: 'Highly trained armed guards and escorts for the custody of high-value assets and extraordinary risk situations.',
        link: 'Reaction Protocols →'
      },
      monitoreo: {
        title: 'GPS & CCTV Monitoring',
        desc: '24/7 technological integration with vehicular satellite tracking, active geofencing, and security camera monitoring with immediate emergency response.',
        link: 'GSI Control Center →'
      },
      confianza: {
        title: 'Trust Evaluations',
        desc: 'Prevent internal losses and petty theft. We implement rigorous behavioral filters, psychometric analysis, and polygraphs for critical positions and staff trust verification.'
      }
    }
  },
  zh: {
    eyebrow: '综合解决方案',
    title: '可定制的安保策略',
    description: '我们将现场人员的卓越运营能力与先进的监控技术相结合，切实保障您的关键资产安全。',
    services: {
      intramuros: {
        title: '现场守卫与巡逻',
        desc: '经认证的警卫人员，身着无可挑剔的制服，接受战术培训，并在企业总部和工业园区实施严格的人员及车辆准入控制。'
      },
      armada: {
        title: '武装保卫',
        desc: '高素质武装警卫 and 随身护卫，为高价值资产的护送以及应对非常规安全风险提供专业守护。',
        link: '应急处置协议 →'
      },
      monitoreo: {
        title: 'GPS 与视频监控',
        desc: '24/7 全天候技术整合，提供车辆卫星定位、主动地理围栏和安全监控视频轮巡，并具备即时应急响应能力。',
        link: 'GSI 指挥中心 →'
      },
      confianza: {
        title: '背景与信任调查',
        desc: '防止企业内部流失及盗窃。针对关键岗位员工实施严格的行为筛查、心理测量分析以及测谎服务，开展全面的员工信任验证。'
      }
    }
  }
}

export default function ServicesBento() {
  const { isRedBlack, language } = useSitePreferences()
  const content = contentDict[language]

  return (
    <section id="services" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-[#050608]' : 'bg-[#fafafa]'
    }`}>
      {/* Subtle Logo Watermark Background (Very transparent, for B2B aesthetics) */}
      <div className="absolute left-0 bottom-10 -translate-x-1/4 pointer-events-none select-none z-0">
        <img
          src={isRedBlack 
            ? "/recursos/Logotipos 2023 colo blanco fondo transparente_GSI SEGURIDAD PRIVADA.png" 
            : "/recursos/Logotipos 2023 Color Negro Fondo transparente_GSI SEGURIDAD PRIVADA.png"
          }
          alt="GSI Watermark"
          className="w-[550px] h-auto object-contain opacity-[0.025]"
          loading="lazy"
        />
      </div>

      {/* Background Graphic */}
      <div className={`absolute top-1/4 right-0 w-96 h-96 rounded-full filter blur-3xl pointer-events-none ${
        isRedBlack ? 'bg-[#EF3B43]/18 opacity-80' : 'bg-red-50 opacity-30'
      }`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 text-left space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            {content.eyebrow}
          </h2>
          <h3 className={`font-display text-3xl md:text-5xl font-black tracking-tight leading-none ${
            isRedBlack ? 'text-white' : 'text-[#101820]'
          }`}>
            {content.title}
          </h3>
          <p className={`text-sm md:text-base max-w-[60ch] leading-relaxed ${
            isRedBlack ? 'text-white/90' : 'text-gray-700'
          }`}>
            {content.description}
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
            className={`md:col-span-2 relative min-h-[340px] md:min-h-[380px] bg-gray-900 border overflow-hidden group shadow-lg cursor-pointer rounded-[32px] ${
              isRedBlack ? 'border-[#EF3B43]/30 shadow-[#EF3B43]/10' : 'border-gray-200'
            }`}
          >
            {/* Background image of guard */}
            <img
              src="/recursos/gsi-base-parque-industrial.png"
              alt="Vigilancia Industrial"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            {/* Content (Liquid Glass styled container) */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-left space-y-2 md:space-y-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={20} className="text-[#EF3B43] shrink-0" weight="fill" />
                <h4 className="font-display text-base md:text-lg font-extrabold text-white">
                  {content.services.intramuros.title}
                </h4>
              </div>
              <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed max-w-[55ch]">
                {content.services.intramuros.desc}
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
            className={`bg-[#101820] border p-8 flex flex-col justify-between text-left group shadow-lg cursor-pointer min-h-[320px] relative rounded-[32px] ${
              isRedBlack ? 'border-[#EF3B43]/35 shadow-[#EF3B43]/10' : 'border-gray-800'
            }`}
          >
            <div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#EF3B43] mb-6 rounded-2xl">
                <Crosshair size={24} />
              </div>
              <h4 className="font-display text-xl font-extrabold text-white mb-3">
                {content.services.armada.title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {content.services.armada.desc}
              </p>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-6 group-hover:text-[#EF3B43] transition-colors duration-300">
              {content.services.armada.link}
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
            className={`border p-8 flex flex-col justify-between text-left group shadow-lg cursor-pointer min-h-[320px] relative rounded-[32px] ${
              isRedBlack ? 'bg-[#0b0d11] border-[#EF3B43]/30 shadow-[#EF3B43]/10' : 'bg-white border-gray-200'
            }`}
          >
            <div>
              <div className={`w-12 h-12 border flex items-center justify-center mb-6 rounded-2xl ${
                isRedBlack ? 'bg-[#EF3B43]/10 border-[#EF3B43]/25 text-[#EF3B43]' : 'bg-gray-50 border-gray-100 text-[#101820]'
              }`}>
                <MonitorPlay size={24} />
              </div>
              <h4 className={`font-display text-xl font-extrabold mb-3 ${
                isRedBlack ? 'text-white' : 'text-[#101820]'
              }`}>
                {content.services.monitoreo.title}
              </h4>
              <p className={`text-xs leading-relaxed ${
                isRedBlack ? 'text-white/85' : 'text-gray-700'
              }`}>
                {content.services.monitoreo.desc}
              </p>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-6 group-hover:text-[#EF3B43] transition-colors duration-300 ${
              isRedBlack ? 'text-white/35' : 'text-gray-400'
            }`}>
              {content.services.monitoreo.link}
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
            className={`md:col-span-2 relative min-h-[340px] md:min-h-[380px] bg-gray-900 border overflow-hidden group shadow-lg cursor-pointer rounded-[32px] ${
              isRedBlack ? 'border-[#EF3B43]/30 shadow-[#EF3B43]/10' : 'border-gray-200'
            }`}
          >
            <img
              src="/recursos/Imagen generada a.png"
              alt="Evaluaciones y Confianza"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            {/* Content (Liquid Glass styled container) */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-left space-y-2 md:space-y-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <UserCheck size={20} className="text-[#EF3B43] shrink-0" weight="fill" />
                <h4 className="font-display text-base md:text-lg font-extrabold text-white">
                  {content.services.confianza.title}
                </h4>
              </div>
              <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed max-w-[55ch]">
                {content.services.confianza.desc}
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
