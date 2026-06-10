import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, GraduationCap, Handshake, Users, Phone, Envelope, Lock, CaretRight, ArrowDown } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

interface JobOpening {
  id: string
  title: string
  location: string
  type: string
  requirements: string[]
  description: string
}

const jobOpeningsData: Record<Language, JobOpening[]> = {
  es: [
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
  ],
  en: [
    {
      id: 'guardia-intramuros',
      title: 'On-Site Security Guard',
      location: 'CDMX & Metropolitan Area',
      type: 'Full Time (12x12 / 24x24 Shifts)',
      description: 'Security officers responsible for surveillance, access control, and protection of corporate offices, industrial plants, and premier logistics hubs.',
      requirements: [
        'High school diploma (original certificate)',
        'Military Service Card (released/pre-card)',
        'Age between 22 and 48 years',
        'Basic paperwork in order (RFC, CURP, NSS)',
        'No criminal record (federal or state letter)'
      ]
    },
    {
      id: 'custodio-foraneo',
      title: 'Cargo Transport Escort (Out-of-town)',
      location: 'National Coverage (Central Base)',
      type: 'Flexible Hours (Out-of-town)',
      description: 'Elite Highway Custody Division. Responsible for escorting high-value cargo transports on federal routes, coordinating with the command center.',
      requirements: [
        'High school graduate or equivalent completed',
        'Minimum of 1 year of experience in cargo escort or highway security',
        'Defensive driving skills and active driver\'s license',
        'Released Military Card (mandatory)',
        'Passing of trust and confidence exams'
      ]
    },
    {
      id: 'monitorista-cctv',
      title: 'CCTV Monitoring Operator',
      location: 'GSI Central Corporate',
      type: 'Rotating Shifts (8 hours / 12 hours)',
      description: 'Responsible for remote surveillance of critical facilities, anomaly detection, and activation of response protocols in direct coordination with field personnel.',
      requirements: [
        'High school graduate certified',
        'Basic knowledge of CCTV systems, alarms, and basic IT',
        'Previous experience of 1 year in monitoring centers (desirable)',
        'Good communication skills and excellent decision making under pressure',
        'Availability to rotate shifts'
      ]
    }
  ],
  zh: [
    {
      id: 'guardia-intramuros',
      title: '现场保安执勤哨兵',
      location: '墨西哥城及大都市区',
      type: '全职（12x12 / 24x24 班次）',
      description: '负责一级企业总部、工业厂区和物流中心的安全监视、进出控制以及财产保卫。',
      requirements: [
        '初中毕业（原件毕业证）',
        '兵役卡（已服兵役或预备兵役卡）',
        '年龄 22 至 48 岁',
        '基本证件齐全（RFC, CURP, NSS）',
        '无犯罪记录证明（联邦或州级）'
      ]
    },
    {
      id: 'custodio-foraneo',
      title: '跨区货运武装护卫',
      location: '全国覆盖（总部基地）',
      type: '弹性工作时间（跨区域）',
      description: '公路武装护送精英部门。负责在联邦公路上护送高价值货物运输，并与指挥中心保持密切沟通协调。',
      requirements: [
        '高中或同等学历毕业',
        '至少 1 年武装押运或公路安保经验',
        '具备防御性驾驶技能，持有有效的司机驾驶执照',
        '必须持有已服完兵役证明卡',
        '通过信用与信任测试'
      ]
    },
    {
      id: 'monitorista-cctv',
      title: 'CCTV 视频监控员',
      location: 'GSI 集团总部',
      type: '轮班制（8小时 / 12小时）',
      description: '负责关键设施的远程监控、异常检测，并与外勤人员直接协调，启动应急反应协议。',
      requirements: [
        '高中毕业证明',
        '熟悉 CCTV 系统、警报器及基本计算机操作',
        '有 1 年中控室视频监控经验者优先',
        '表达能力强，具备优秀的高压下决策能力',
        '接受轮班安排'
      ]
    }
  ]
}

const contentDict: Record<Language, {
  about: {
    eyebrow: string
    title: string
    desc: string
    quote: string
  }
  whyChooseUs: {
    title: string
    benefits: {
      b1: { title: string; desc: string }
      b2: { title: string; desc: string }
      b3: { title: string; desc: string }
      b4: { title: string; desc: string }
    }
  }
  vacancies: {
    title: string
    alertTitle: string
    alertDesc: string
    closed: string
    salary: string
    requirements: string
    closedBtn: string
  }
  cinematic: {
    badge: string
    quote: string
    desc: string
  }
  recruitment: {
    eyebrow: string
    title: string
    phone: string
    email: string
    cta: string
  }
  whyWork: {
    eyebrow: string
    title: string
    desc: string
    grid: string[]
  }
}> = {
  es: {
    about: {
      eyebrow: 'Sobre nosotros',
      title: 'Seguridad privada con método, presencia y respaldo',
      desc: 'Somos una empresa de seguridad privada con presencia nacional, enfoque corporativo y estándares de operación pensados para instalaciones industriales, logísticas y empresariales.',
      quote: 'Nuestro trabajo combina criterio humano, supervisión constante y tecnología para proteger operaciones críticas todos los días.'
    },
    whyChooseUs: {
      title: '¿Por qué elegir GSI Seguridad Privada?',
      benefits: {
        b1: { title: 'Estabilidad & Puntualidad', desc: 'Pagos quincenales exactos y puntuales. Ofrecemos prestaciones de ley completas y bonos por desempeño sobresaliente.' },
        b2: { title: 'Capacitación Especializada', desc: 'Instrucción teórica y táctica bajo estándares oficiales. Cursos de defensa personal, armamento y radiocomunicaciones.' },
        b3: { title: 'Equipo & Uniformes Elite', desc: 'Proporcionamos uniformes de alta gama sin costo alguno, calzado táctico ergonómico y equipo operativo de punta.' },
        b4: { title: 'Crecimiento Profesional', desc: 'Plan de carrera diseñado para ascensos. El 80% de nuestros supervisores y directores operativos iniciaron como oficiales.' }
      }
    },
    vacancies: {
      title: 'Vacantes disponibles',
      alertTitle: 'Actualmente no estamos contratando',
      alertDesc: 'Las postulaciones se encuentran cerradas por el momento. Puedes revisar la información de cada perfil para conocer requisitos y funciones.',
      closed: 'Cerrada',
      salary: 'Salario: Reservado',
      requirements: 'Requisitos Indispensables:',
      closedBtn: 'Vacante cerrada'
    },
    cinematic: {
      badge: 'Reclutamiento Activo',
      quote: '"Disciplina, Lealtad y Profesionalismo al Servicio de México"',
      desc: 'Nuestros oficiales son el pilar de la confianza nacional. Diseñamos un entorno tecnológico y seguro para que impulses tu carrera táctica.'
    },
    recruitment: {
      eyebrow: 'Atención Directa de Reclutamiento',
      title: '¿Tienes dudas o quieres agendar entrevista?',
      phone: '800 8305 990',
      email: 'reclutamiento@gsi.com.mx',
      cta: 'Llamar Directo'
    },
    whyWork: {
      eyebrow: 'Por qué trabajar con nosotros',
      title: 'Crece dentro de una operación nacional seria',
      desc: 'En GSI cada puesto tiene respaldo operativo, capacitación continua y supervisión real. Buscamos personas disciplinadas que quieran construir una carrera estable en seguridad privada.',
      grid: ['Pagos puntuales', 'Capacitación táctica', 'Uniformes y equipo', 'Crecimiento interno']
    }
  },
  en: {
    about: {
      eyebrow: 'About us',
      title: 'Private security with method, presence, and backing',
      desc: 'We are a private security company with a national presence, corporate focus, and operational standards designed for industrial, logistics, and business facilities.',
      quote: 'Our work combines human judgment, constant supervision, and technology to protect critical operations every single day.'
    },
    whyChooseUs: {
      title: 'Why choose GSI Private Security?',
      benefits: {
        b1: { title: 'Stability & Punctuality', desc: 'Exact and timely biweekly payments. We offer full law benefits and performance bonuses.' },
        b2: { title: 'Specialized Training', desc: 'Theoretical and tactical instruction under official standards. Self-defense, weapons, and radio communication courses.' },
        b3: { title: 'Elite Equipment & Uniforms', desc: 'We provide high-end uniforms at no cost, ergonomic tactical footwear, and state-of-the-art operational gear.' },
        b4: { title: 'Professional Growth', desc: 'Career path designed for promotions. 80% of our supervisors and operational directors started as guards.' }
      }
    },
    vacancies: {
      title: 'Available vacancies',
      alertTitle: 'We are currently not hiring',
      alertDesc: 'Applications are closed for the moment. You can review the details of each profile to learn about requirements and duties.',
      closed: 'Closed',
      salary: 'Salary: Confidential',
      requirements: 'Essential Requirements:',
      closedBtn: 'Vacancy closed'
    },
    cinematic: {
      badge: 'Active Recruitment',
      quote: '"Discipline, Loyalty, and Professionalism at the Service of Mexico"',
      desc: 'Our guards are the pillar of national trust. We design a technological and safe environment for you to boost your tactical career.'
    },
    recruitment: {
      eyebrow: 'Direct Recruitment Support',
      title: 'Do you have questions or want to schedule an interview?',
      phone: '800 8305 990',
      email: 'recruitment@gsi.com.mx',
      cta: 'Call Direct'
    },
    whyWork: {
      eyebrow: 'Why work with us',
      title: 'Grow within a serious national operation',
      desc: 'At GSI each position has operational backing, continuous training, and real supervision. We look for disciplined people who want to build a stable career in private security.',
      grid: ['On-time payments', 'Tactical training', 'Uniforms & gear', 'Internal growth']
    }
  },
  zh: {
    about: {
      eyebrow: '关于我们',
      title: '具有系统方法、全国布局和雄厚实力的私人安保',
      desc: '我们是一家具有全国业务布局、注重企业级服务且针对工业、物流和商业设施设计了严格运营标准的私人安保公司。',
      quote: '我们的工作结合了专业的人员判断、持续的监督和先进的技术，天天为关键运营保驾护航。'
    },
    whyChooseUs: {
      title: '为什么选择 GSI 私人安保？',
      benefits: {
        b1: { title: '稳定与准时', desc: '每半月准确、按时发放薪资。我们提供完整的法定福利和优异绩效奖金。' },
        b2: { title: '专业化培训', desc: '官方标准下的理论和战术指导。开设防身术、武器使用和无线电通信等课程。' },
        b3: { title: '精良装备与制服', desc: '免费提供高端制服、人体工学战术鞋及最先进的执勤装备。' },
        b4: { title: '职业成长空间', desc: '为晋升设计的职业规划。我们 80% 的主管和运营总监都是从保安基层做起的。' }
      }
    },
    vacancies: {
      title: '可申请岗位',
      alertTitle: '当前暂无招聘需求',
      alertDesc: '申请目前已关闭。您可以查看每个岗位的详细信息，以了解相关要求和职责。',
      closed: '已关闭',
      salary: '薪资：保密',
      requirements: '基本要求：',
      closedBtn: '岗位已关闭'
    },
    cinematic: {
      badge: '招聘进行中',
      quote: '“纪律、忠诚和专业，为墨西哥服务”',
      desc: '我们的安全守卫是国家信任的支柱。我们设计了一个技术化且安全的环境，让您发展自己的战术生涯。'
    },
    recruitment: {
      eyebrow: '招聘直接咨询',
      title: '您有疑问或想安排面试吗？',
      phone: '800 8305 990',
      email: 'recruitment@gsi.com.mx',
      cta: '直接致电'
    },
    whyWork: {
      eyebrow: '为什么选择我们',
      title: '在正规的全国化运营中成长',
      desc: '在 GSI，每个岗位都有运营支持、持续的培训和真实的现场指导。我们寻找有纪律性、想在私人安保领域建立稳定职业生涯的人才。',
      grid: ['按时发放薪资', '战术训练', '制服与装备', '内部晋升']
    }
  }
}

export default function CareersSection() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const { isRedBlack, language } = useSitePreferences()
  const content = contentDict[language]
  const jobOpenings = jobOpeningsData[language]

  return (
    <section id="careers" className={`border-b relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-[#050608] border-[#EF3B43]/18 text-white' : 'bg-white border-gray-100'
    }`}>
      {/* Red decorative blur to anchor GSI branding */}
      <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-red-150/15 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-36 pb-28">
        {/* Background Image - Clean and natural colors */}
        <img
          src="/recursos/gsi-careers-hero-recruitment-v2.png"
          alt="Reclutamiento profesional de seguridad privada GSI"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.03]"
          loading="eager"
          fetchPriority="high"
        />

        {/* Header Vignette - Keeps logo/navbar perfectly readable */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black/80 via-black/35 to-transparent z-10 pointer-events-none"></div>

        {/* Reddish overlay and left shadow gradients for maximum legibility & theme styling */}
        <div
          className={`absolute inset-0 z-0 pointer-events-none ${
            isRedBlack
              ? 'bg-[radial-gradient(circle_at_75%_50%,rgba(239,59,67,0.20),transparent_60%),linear-gradient(90deg,#050608_0%,rgba(5,6,8,0.6)_50%,transparent_100%),linear-gradient(180deg,transparent_75%,#050608_100%)]'
              : 'bg-[radial-gradient(circle_at_75%_50%,rgba(239,59,67,0.18),transparent_60%),linear-gradient(90deg,#101820_0%,rgba(16,24,32,0.6)_50%,transparent_100%),linear-gradient(180deg,transparent_75%,#ffffff_100%)]'
          }`}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-16 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Careers Text and CTA directly on background */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 text-white">
              
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className={`inline-flex items-center space-x-2 px-3 py-1.5 border rounded-full ${
                  isRedBlack ? 'bg-black/35 border-[#EF3B43]/45' : 'bg-white/10 border-white/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF3B43] animate-pulse"></span>
                <span className="text-[9px] font-bold tracking-widest uppercase text-white/90">
                  Únete al Equipo Elite GSI
                </span>
              </motion.div>

              {/* Main Title */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] text-white tracking-tight text-balance">
                Bolsa de Trabajo <br />
                <span className="text-[#EF3B43]">& Carrera Profesional</span>.
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base font-medium leading-relaxed text-white/80 max-w-[54ch]">
                Forma parte del consorcio de seguridad privada líder en México. Ofrecemos estabilidad laboral, capacitación táctica certificada y oportunidades reales de crecimiento.
              </p>

              {/* Call to Action */}
              <div className="pt-2">
                <a
                  href="#careers-content"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('careers-content')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-lg shadow-black/10 rounded-full hover:scale-105 active:scale-95 ${
                    isRedBlack ? 'bg-[#EF3B43] hover:bg-white hover:text-[#050608]' : 'bg-[#EF3B43] hover:bg-[#101820]'
                  }`}
                >
                  Ver Perfiles y Vacantes
                </a>
              </div>

            </div>

            {/* Right Column: Subtle HUD stats & Benefits checklist */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Perfiles Stat */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
                  className="group text-left border border-[#EF3B43]/30 hover:border-[#EF3B43] bg-black/35 hover:bg-[#EF3B43]/5 p-5 rounded-xl transition-all duration-300 w-full"
                >
                  <p className="font-display text-4xl font-black leading-none text-white tracking-tight">
                    3
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    Perfiles de Puesto
                  </p>
                </motion.div>

                {/* Nacional Stat */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.22 }}
                  className="group text-left border border-[#EF3B43]/30 hover:border-[#EF3B43] bg-black/35 hover:bg-[#EF3B43]/5 p-5 rounded-xl transition-all duration-300 w-full"
                >
                  <p className="font-display text-4xl font-black leading-none text-white tracking-tight">
                    24/7
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    Operación Nacional
                  </p>
                </motion.div>
              </div>

              {/* Benefits Checklist directly on background */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
                className="space-y-3 text-left"
              >
                <div className="flex items-center space-x-2 border-b border-white/10 pb-2.5">
                  <Shield size={16} className="text-[#EF3B43]" weight="fill" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-white/90">
                    BENEFICIOS GSI ELITE
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs font-semibold text-white/80">
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF3B43]"></span>
                    <span>Pagos Quincenales Puntuales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF3B43]"></span>
                    <span>Prestaciones de Ley Completas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF3B43]"></span>
                    <span>Capacitación Táctica Certificada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF3B43]"></span>
                    <span>Uniformes de Alta Gama Sin Costo</span>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
          <motion.a
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            href="#careers-content"
            className={`p-3 border rounded-full shadow-md hover:shadow-lg inline-flex items-center justify-center hover:text-[#EF3B43] hover:border-[#EF3B43] transition-all ${
              isRedBlack ? 'bg-white/5 border-white/10 text-white/70' : 'bg-white border-gray-200 text-gray-600'
            }`}
            aria-label="Ver vacantes"
          >
            <ArrowDown size={18} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>
      
      <div id="careers-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 scroll-mt-28 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 95, damping: 18 }}
            className="lg:col-span-7 relative min-h-[420px] overflow-hidden border border-[#EF3B43]/30 shadow-2xl shadow-[#EF3B43]/10 lg:order-first"
          >
            <img
              src="/recursos/gsi-careers-about-us.png"
              alt="Equipo operativo y supervisores de GSI Seguridad Privada"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#EF3B43]/28 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/10 to-transparent"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 95, damping: 18, delay: 0.08 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-5"
          >
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
              {content.about.eyebrow}
            </h2>
            <h3 className={`font-display text-3xl md:text-5xl font-black tracking-tight leading-none ${
              isRedBlack ? 'text-white' : 'text-[#101820]'
            }`}>
              {content.about.title}
            </h3>
            <p className={`text-sm md:text-base leading-relaxed max-w-[58ch] ${
              isRedBlack ? 'text-white/64' : 'text-gray-500'
            }`}>
              {content.about.desc}
            </p>
            <div className={`border-l-2 border-[#EF3B43] pl-5 py-1 ${
              isRedBlack ? 'text-white/78' : 'text-gray-600'
            }`}>
              <p className="text-sm leading-relaxed">
                {content.about.quote}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Why Work With Us & Job Board */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Why Work With Us Cards */}
            <div className="space-y-6">
              <h4 className={`font-display text-xl font-extrabold tracking-tight flex items-center gap-2 ${
                isRedBlack ? 'text-white' : 'text-[#101820]'
              }`}>
                <span className="h-6 w-1 bg-[#EF3B43] rounded-full"></span>
                {content.whyChooseUs.title}
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Benefit 1 */}
                <div className={`p-5 border rounded-2xl space-y-3 hover:border-[#EF3B43]/50 transition-colors group ${
                  isRedBlack ? 'bg-[#0b0d11] border-white/10' : 'bg-gray-50/70 border-gray-150'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Handshake size={20} weight="fill" />
                  </div>
                  <h5 className={`font-display text-sm font-bold ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                    {content.whyChooseUs.benefits.b1.title}
                  </h5>
                  <p className={`text-[11px] leading-relaxed ${isRedBlack ? 'text-white/56' : 'text-gray-500'}`}>
                    {content.whyChooseUs.benefits.b1.desc}
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className={`p-5 border rounded-2xl space-y-3 hover:border-[#EF3B43]/50 transition-colors group ${
                  isRedBlack ? 'bg-[#0b0d11] border-white/10' : 'bg-gray-50/70 border-gray-150'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <GraduationCap size={20} weight="fill" />
                  </div>
                  <h5 className={`font-display text-sm font-bold ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                    {content.whyChooseUs.benefits.b2.title}
                  </h5>
                  <p className={`text-[11px] leading-relaxed ${isRedBlack ? 'text-white/56' : 'text-gray-500'}`}>
                    {content.whyChooseUs.benefits.b2.desc}
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className={`p-5 border rounded-2xl space-y-3 hover:border-[#EF3B43]/50 transition-colors group ${
                  isRedBlack ? 'bg-[#0b0d11] border-white/10' : 'bg-gray-50/70 border-gray-150'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Shield size={20} weight="fill" />
                  </div>
                  <h5 className={`font-display text-sm font-bold ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                    {content.whyChooseUs.benefits.b3.title}
                  </h5>
                  <p className={`text-[11px] leading-relaxed ${isRedBlack ? 'text-white/56' : 'text-gray-500'}`}>
                    {content.whyChooseUs.benefits.b3.desc}
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className={`p-5 border rounded-2xl space-y-3 hover:border-[#EF3B43]/50 transition-colors group ${
                  isRedBlack ? 'bg-[#0b0d11] border-white/10' : 'bg-gray-50/70 border-gray-150'
                }`}>
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#EF3B43] group-hover:bg-[#EF3B43] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Users size={20} weight="fill" />
                  </div>
                  <h5 className={`font-display text-sm font-bold ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                    {content.whyChooseUs.benefits.b4.title}
                  </h5>
                  <p className={`text-[11px] leading-relaxed ${isRedBlack ? 'text-white/56' : 'text-gray-500'}`}>
                    {content.whyChooseUs.benefits.b4.desc}
                  </p>
                </div>

              </div>
            </div>

            {/* Interactive Job Openings */}
            <div className="space-y-6">
              <h4 className={`font-display text-xl font-extrabold tracking-tight flex items-center gap-2 ${
                isRedBlack ? 'text-white' : 'text-[#101820]'
              }`}>
                <span className="h-6 w-1 bg-[#EF3B43] rounded-full"></span>
                {content.vacancies.title}
              </h4>

              {/* Informative Locked Alert Banner */}
              <div className={`p-4 border rounded-2xl flex items-start space-x-3 text-xs ${
                isRedBlack ? 'bg-white/[0.035] border-white/10 text-white/58' : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                  isRedBlack ? 'bg-white/8 text-white/50' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Lock size={18} weight="fill" />
                </div>
                <div className="space-y-0.5">
                  <h5 className={`font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 ${
                    isRedBlack ? 'text-white/72' : 'text-gray-700'
                  }`}>
                    {content.vacancies.alertTitle}
                  </h5>
                  <p className={`text-[11px] leading-relaxed ${isRedBlack ? 'text-white/54' : 'text-gray-500'}`}>
                    {content.vacancies.alertDesc}
                  </p>
                </div>
              </div>

              {/* Interactive vacancies list */}
              <div className="space-y-3">
                {jobOpenings.map((job) => {
                  const isOpen = activeJobId === job.id
                  return (
                    <div 
                      key={job.id} 
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen 
                          ? isRedBlack
                            ? 'border-white/18 bg-white/[0.045] shadow-md'
                            : 'border-gray-300 bg-gray-50 shadow-sm'
                          : isRedBlack
                            ? 'border-white/10 hover:border-white/20 bg-[#0b0d11]/80 opacity-78'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/85 opacity-82'
                      }`}
                    >
                      {/* Job Accordion Header */}
                      <button
                        onClick={() => setActiveJobId(isOpen ? null : job.id)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                            {content.vacancies.closed} · {job.type}
                          </span>
                          <h5 className={`font-display text-base font-bold tracking-tight hover:text-[#EF3B43] transition-colors ${
                            isRedBlack ? 'text-white/68' : 'text-gray-600'
                          }`}>
                            {job.title}
                          </h5>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span className="font-semibold text-gray-400">{content.vacancies.salary}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className={`p-2 rounded-xl border text-gray-400 transition-transform duration-300 ${
                          isOpen
                            ? isRedBlack
                              ? 'rotate-90 border-white/20 bg-white/8 text-white/60'
                              : 'rotate-90 border-gray-300 bg-gray-100 text-gray-500'
                            : isRedBlack
                              ? 'border-white/10 bg-white/5'
                              : 'border-gray-150 bg-gray-50'
                        }`}>
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
                            <div className={`px-5 pb-5 pt-2 border-t space-y-4 ${
                              isRedBlack ? 'border-white/10' : 'border-gray-200'
                            }`}>
                              <p className={`text-xs leading-relaxed ${isRedBlack ? 'text-white/54' : 'text-gray-500'}`}>
                                {job.description}
                              </p>
                              
                              <div className="space-y-2">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                  {content.vacancies.requirements}
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {job.requirements.map((req, i) => (
                                    <li key={i} className={`flex items-start space-x-2 text-xs ${isRedBlack ? 'text-white/50' : 'text-gray-500'}`}>
                                      <Shield size={14} className="text-gray-400 shrink-0 mt-0.5" weight="fill" />
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
                                  {content.vacancies.closedBtn}
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
                loading="lazy"
              />
              
              {/* Dark vignette gradient and red overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101820] via-transparent to-[#101820]/40 z-10"></div>
              <div className="absolute inset-0 bg-red-950/10 mix-blend-color-burn pointer-events-none z-10"></div>

              {/* Glowing red accent outline inside frame */}
              <div className="absolute inset-3 border border-red-500/20 rounded-[20px] pointer-events-none z-20"></div>

              {/* Floating Badge (Top Left) */}
              <div className="absolute top-6 left-6 z-20 bg-[#EF3B43] text-white px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-red-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                {content.cinematic.badge}
              </div>

              {/* Content Box (Bottom Overlay) */}
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3 text-white">
                <h5 className="font-display text-lg md:text-xl font-black tracking-tight leading-tight">
                  {content.cinematic.quote}
                </h5>
                <p className="text-[11px] text-gray-300 leading-relaxed max-w-[42ch]">
                  {content.cinematic.desc}
                </p>
              </div>

            </div>

            {/* Quick Contact & WhatsApp Recruit Info (High-contrast red banner) */}
            <div className="bg-[#EF3B43] text-white p-6 rounded-[24px] shadow-xl shadow-red-500/15 relative overflow-hidden group">
              {/* Tech pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-100 block">
                    {content.recruitment.eyebrow}
                  </span>
                  <p className="font-display text-base font-black tracking-tight">
                    {content.recruitment.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-red-100 pt-1">
                    <span className="flex items-center gap-1">
                      <Phone size={14} weight="fill" />
                      {content.recruitment.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Envelope size={14} weight="fill" />
                      {content.recruitment.email}
                    </span>
                  </div>
                </div>
                
                <a 
                  href={`tel:${content.recruitment.phone.replace(/\s+/g, '')}`} 
                  className="px-4 py-2 bg-white text-[#EF3B43] hover:bg-red-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95 shrink-0 block text-center w-full sm:w-auto cursor-pointer shadow-md shadow-black/10"
                >
                  {content.recruitment.cta}
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 95, damping: 18 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-5"
          >
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
              {content.whyWork.eyebrow}
            </h2>
            <h3 className={`font-display text-3xl md:text-5xl font-black tracking-tight leading-none ${
              isRedBlack ? 'text-white' : 'text-[#101820]'
            }`}>
              {content.whyWork.title}
            </h3>
            <p className={`text-sm md:text-base leading-relaxed max-w-[58ch] ${
              isRedBlack ? 'text-white/64' : 'text-gray-500'
            }`}>
              {content.whyWork.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {content.whyWork.grid.map((item) => (
                <div
                  key={item}
                  className={`border px-4 py-3 text-xs font-bold uppercase tracking-wider ${
                    isRedBlack ? 'bg-[#0b0d11] border-[#EF3B43]/24 text-white/78' : 'bg-red-50/70 border-red-100 text-[#101820]'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 95, damping: 18, delay: 0.08 }}
            className="lg:col-span-7 relative min-h-[420px] overflow-hidden border border-[#EF3B43]/30 shadow-2xl shadow-[#EF3B43]/10"
          >
            <img
              src="/recursos/gsi-careers-why-work.png"
              alt="Capacitación y desarrollo profesional en GSI Seguridad Privada"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#EF3B43]/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent"></div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
