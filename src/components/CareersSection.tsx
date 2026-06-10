import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, GraduationCap, Handshake, Users, Phone, Envelope, CaretRight, CaretLeft, ArrowDown, ArrowLeft, UploadSimple, CheckCircle, FilePdf, Trash, MapPin, Clock, User, ChatText, Calendar, FileText } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

interface JobOpening {
  id: string
  title: string
  location: string
  type: string
  requirements: string[]
  description: string
  image: string
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
      ],
      image: '/recursos/gsi-security-team.png'
    },
    {
      id: 'guardia-armado',
      title: 'Guardia de Seguridad Armado',
      location: 'CDMX, Edomex y Zonas Industriales',
      type: 'Tiempo Completo (Turnos 12x12 / 24x24)',
      description: 'Oficiales de seguridad armados responsables de la protección de instalaciones críticas, control de accesos de alta seguridad y respuesta ante incidentes.',
      requirements: [
        'Secundaria concluida (Certificado original)',
        'Cartilla de Servicio Militar Liberada (Indispensable)',
        'Edad de 25 a 45 años',
        'Experiencia mínima de 1 año en portación de armas o seguridad armada',
        'Aprobación de evaluaciones de control y confianza'
      ],
      image: '/recursos/gsi-guardia-armado-apuntando.png'
    }
    /* HIDE FOR LATER USE:
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
      description: 'Responsable de la vigilancia remota de instalaciones críticas, detección de anomalías y activación de protocolos de respuesta en coordination directa con campo.',
      requirements: [
        'Preparatoria terminada comprobable',
        'Conocimiento en sistemas de CCTV, alarmas e informática básica',
        'Experiencia previa de 1 año en centros de monitoreo (Deseable)',
        'Facilidad de palabra y excelente toma de decisiones bajo presión',
        'Disponibilidad para rolar turnos'
      ]
    }
    */
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
      ],
      image: '/recursos/gsi-security-team.png'
    },
    {
      id: 'guardia-armado',
      title: 'Armed Security Guard',
      location: 'CDMX, Edomex & Industrial Zones',
      type: 'Full Time (12x12 / 24x24 Shifts)',
      description: 'Armed security officers responsible for protecting critical facilities, high-security access control, and incident response.',
      requirements: [
        'High school diploma or equivalent (original certificate)',
        'Released Military Service Card (mandatory)',
        'Age between 25 and 45 years',
        'Minimum of 1 year of experience in armed security or weapon carrying',
        'Passing of security background check and trust evaluations'
      ],
      image: '/recursos/gsi-guardia-armado-apuntando.png'
    }
    /* HIDE FOR LATER USE:
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
    */
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
        '兵役卡（已服兵役 or 预备兵役卡）',
        '年龄 22 至 48 岁',
        '基本证件齐全（RFC, CURP, NSS）',
        '无犯罪记录证明（联邦或州级）'
      ],
      image: '/recursos/gsi-security-team.png'
    },
    {
      id: 'guardia-armado',
      title: '武装安全警卫',
      location: '墨西哥城、墨西哥州及工业区',
      type: '全职（12x12 / 24x24 班次）',
      description: '武装安全人员，负责保护关键设施、高安全级别准入控制以及应急安全响应。',
      requirements: [
        '初中或同等学历毕业（原件毕业证）',
        '已服完兵役证明卡（Liberada，必备）',
        '年龄在 25 至 45 岁之间',
        '至少 1 年武装安保或持枪工作经验',
        '通过安全背景审查与信任评估'
      ],
      image: '/recursos/gsi-guardia-armado-apuntando.png'
    }
    /* HIDE FOR LATER USE:
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
    */
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
    statusActive: string
    applyBtn: string
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
  stats: {
    profiles: string
    operation: string
  }
  jobPage: {
    backBtn: string
    formTitle: string
    secPersonal: string
    secProfessional: string
    secDocuments: string
    fieldName: string
    fieldNamePl: string
    fieldEmail: string
    fieldEmailPl: string
    fieldPhone: string
    fieldPhonePl: string
    fieldAge: string
    fieldAgePl: string
    fieldGender: string
    genderOpts: {
      hombre: string
      mujer: string
    }
    fieldMilitary: string
    militaryOpts: {
      liberada: string
      tramite: string
      noAplica: string
      noCuento: string
    }
    fieldEducation: string
    eduOpts: {
      secundaria: string
      preparatoria: string
      licenciatura: string
      otro: string
    }
    fieldCv: string
    cvPl: string
    cvSuccess: string
    fieldComments: string
    fieldCommentsPl: string
    submitBtn: string
    submittingBtn: string
    successTitle: string
    successDesc: string
    successClose: string
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
      alertTitle: 'Convocatoria Abierta',
      alertDesc: 'Selecciona una vacante habilitada para revisar los requisitos y enviar tu postulación en línea.',
      closed: 'Cerrada',
      salary: 'Salario: Reservado',
      requirements: 'Requisitos Indispensables:',
      closedBtn: 'Vacante cerrada',
      statusActive: 'Vacante Habilitada',
      applyBtn: 'Postularse Ahora'
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
    },
    stats: {
      profiles: 'Perfiles de Puesto',
      operation: 'Operación Nacional'
    },
    jobPage: {
      backBtn: 'Volver a Vacantes',
      formTitle: 'Enviar Postulación',
      secPersonal: '1. Datos Personales',
      secProfessional: '2. Información Profesional',
      secDocuments: '3. Documentación',
      fieldName: 'Nombre Completo',
      fieldNamePl: 'Ej. Juan Pérez',
      fieldEmail: 'Correo Electrónico',
      fieldEmailPl: 'ejemplo@gsi.com.mx',
      fieldPhone: 'Teléfono de Contacto',
      fieldPhonePl: '10 dígitos (Ej. 5512345678)',
      fieldAge: 'Edad',
      fieldAgePl: 'Ej. 28',
      fieldGender: 'Sexo',
      genderOpts: {
        hombre: 'Hombre',
        mujer: 'Mujer'
      },
      fieldMilitary: 'Cartilla de Servicio Militar',
      militaryOpts: {
        liberada: 'Liberada (Indispensable para armados)',
        tramite: 'En trámite / Precartilla',
        noAplica: 'No aplica / Mujeres',
        noCuento: 'No cuento con ella'
      },
      fieldEducation: 'Último Grado de Estudios',
      eduOpts: {
        secundaria: 'Secundaria Concluida',
        preparatoria: 'Preparatoria / Bachillerato',
        licenciatura: 'Licenciatura / Superior',
        otro: 'Otro'
      },
      fieldCv: 'Subir Currículum Vitae (CV)',
      cvPl: 'Arrastra tu archivo aquí o haz clic para buscar (.pdf, .docx, .doc, .jpg)',
      cvSuccess: '¡Archivo listo!',
      fieldComments: 'Mensaje o comentarios adicionales',
      fieldCommentsPl: 'Cuéntanos brevemente sobre tu experiencia laboral...',
      submitBtn: 'Enviar Postulación',
      submittingBtn: 'Enviando...',
      successTitle: '¡Postulación Recibida!',
      successDesc: 'Tu información ha sido enviada al departamento de Recursos Humanos de GSI. Evaluaremos tu perfil y nos pondremos en contacto contigo a la brevedad.',
      successClose: 'Entendido'
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
      alertTitle: 'Active Recruitment',
      alertDesc: 'Select an enabled vacancy to review details and submit your application online.',
      closed: 'Closed',
      salary: 'Salary: Confidential',
      requirements: 'Essential Requirements:',
      closedBtn: 'Vacancy closed',
      statusActive: 'Vacancy Enabled',
      applyBtn: 'Apply Now'
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
    },
    stats: {
      profiles: 'Job Profiles',
      operation: 'National Operation'
    },
    jobPage: {
      backBtn: 'Back to Vacancies',
      formTitle: 'Submit Application',
      secPersonal: '1. Personal Information',
      secProfessional: '2. Professional Profile',
      secDocuments: '3. Resume & Documents',
      fieldName: 'Full Name',
      fieldNamePl: 'e.g. John Doe',
      fieldEmail: 'Email Address',
      fieldEmailPl: 'example@gsi.com.mx',
      fieldPhone: 'Phone Number',
      fieldPhonePl: '10 digits (e.g. 5512345678)',
      fieldAge: 'Age',
      fieldAgePl: 'e.g. 28',
      fieldGender: 'Gender',
      genderOpts: {
        hombre: 'Male',
        mujer: 'Female'
      },
      fieldMilitary: 'Military Service Status',
      militaryOpts: {
        liberada: 'Released (Mandatory for armed guards)',
        tramite: 'In progress / Pre-card',
        noAplica: 'Not applicable / Female',
        noCuento: 'Do not have it'
      },
      fieldEducation: 'Highest Level of Education',
      eduOpts: {
        secundaria: 'Middle School / Junior High',
        preparatoria: 'High School / College Prep',
        licenciatura: 'Bachelor Degree / Higher',
        otro: 'Other'
      },
      fieldCv: 'Upload Resume / CV',
      cvPl: 'Drag your file here or click to browse (.pdf, .docx, .doc, .jpg)',
      cvSuccess: 'File ready!',
      fieldComments: 'Additional comments or message',
      fieldCommentsPl: 'Briefly tell us about your work experience...',
      submitBtn: 'Submit Application',
      submittingBtn: 'Submitting...',
      successTitle: 'Application Received!',
      successDesc: 'Your information has been sent to GSI\'s Human Resources department. We will evaluate your profile and contact you shortly.',
      successClose: 'Got it'
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
      alertTitle: '正在招聘',
      alertDesc: '选择一个开放的岗位以查看详情并在线提交求职申请。',
      closed: '已关闭',
      salary: '薪资：保密',
      requirements: '基本要求：',
      closedBtn: '岗位已关闭',
      statusActive: '岗位开放中',
      applyBtn: '立即申请'
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
    },
    stats: {
      profiles: '工作岗位',
      operation: '全国化运营'
    },
    jobPage: {
      backBtn: '返回职位列表',
      formTitle: '提交求职申请',
      secPersonal: '1. 个人基本信息',
      secProfessional: '2. 专业背景信息',
      secDocuments: '3. 求职简历及附件',
      fieldName: '姓名',
      fieldNamePl: '例如：张三',
      fieldEmail: '电子邮件',
      fieldEmailPl: 'example@gsi.com.mx',
      fieldPhone: '联系电话',
      fieldPhonePl: '10位数字 (例如: 5512345678)',
      fieldAge: '年龄',
      fieldAgePl: '例如：28',
      fieldGender: '性别',
      genderOpts: {
        hombre: '男',
        mujer: '女'
      },
      fieldMilitary: '服兵役情况',
      militaryOpts: {
        liberada: '已服完兵役 (武装警卫必备)',
        tramite: '办理中 / 预备兵役',
        noAplica: '不适用 / 女性',
        noCuento: '未持有兵役卡'
      },
      fieldEducation: '最高学历',
      eduOpts: {
        secundaria: '初中毕业',
        preparatoria: '高中 / 中专毕业',
        licenciatura: '本科 / 大专毕业',
        otro: '其他'
      },
      fieldCv: '上传个人简历 (CV)',
      cvPl: '拖拽文件到此处或点击浏览 (.pdf, .docx, .doc, .jpg)',
      cvSuccess: '文件已就绪！',
      fieldComments: '附加说明或留言',
      fieldCommentsPl: '简要介绍您的工作经历及相关背景...',
      submitBtn: '提交申请',
      submittingBtn: '正在提交...',
      successTitle: '求职申请已收到！',
      successDesc: '您的个人资料已成功发送至 GSI 人力资源部。我们将评估您的简历，并会尽快与您取得联系。',
      successClose: '我知道了'
    }
  }
}

export default function CareersSection() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const { isRedBlack, language } = useSitePreferences()
  const content = contentDict[language]
  const jobOpenings = jobOpeningsData[language]

  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const activeJob = jobOpenings.find(job => currentHash.includes(job.id))

  if (activeJob) {
    return (
      <section id="careers" className={`border-b relative overflow-hidden transition-colors duration-500 pt-36 pb-20 min-h-[100dvh] ${
        isRedBlack ? 'bg-[#050608] border-[#EF3B43]/18 text-white' : 'bg-[#fafafa] border-gray-100 text-gray-800'
      }`}>
        {/* Subtle decorative background watermark */}
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-red-150/15 rounded-full filter blur-[120px] pointer-events-none"></div>

         <JobDetailPage 
          job={activeJob}
          content={content}
          isRedBlack={isRedBlack}
        />
      </section>
    )
  }

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
                    {jobOpenings.length}
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/60">
                    {content.stats.profiles}
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
                    {content.stats.operation}
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
                  isRedBlack ? 'bg-[#EF3B43]/10 text-[#EF3B43]' : 'bg-red-50 text-[#EF3B43]'
                }`}>
                  <Shield size={18} weight="fill" />
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
                          <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">
                            {content.vacancies.statusActive} · {job.type}
                          </span>
                          <h5 className={`font-display text-base font-bold tracking-tight hover:text-[#EF3B43] transition-colors ${
                            isRedBlack ? 'text-white/90' : 'text-gray-800'
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

                              {/* Apply Button */}
                              <div className="pt-2">
                                <a
                                  href={`#careers/${job.id}`}
                                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                                    isRedBlack
                                      ? 'bg-[#EF3B43] text-white hover:bg-white hover:text-[#050608]'
                                      : 'bg-[#EF3B43] text-white hover:bg-[#101820]'
                                  }`}
                                >
                                  <Shield size={14} weight="fill" />
                                  {content.vacancies.applyBtn}
                                </a>
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

// ==========================================
// JOB DETAIL PAGE & APPLICATION FORM COMPONENT
// ==========================================
function JobDetailPage({
  job,
  content,
  isRedBlack
}: {
  job: JobOpening
  content: any
  isRedBlack: boolean
}) {
  const { language } = useSitePreferences()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'hombre',
    militaryCard: 'liberada',
    education: 'secundaria',
    comments: ''
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => {
      const next = { ...prev, [name]: value }
      if (name === 'gender' && value === 'mujer') {
        next.militaryCard = 'noAplica'
      }
      return next
    })
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
      if (errors.cv) {
        setErrors(prev => {
          const next = { ...prev }
          delete next.cv
          return next
        })
      }
    }
  }

  const getErrorMsg = (field: string) => {
    if (language === 'es') {
      if (field === 'name') return 'El nombre es obligatorio.'
      if (field === 'emailRequired') return 'El correo es obligatorio.'
      if (field === 'emailInvalid') return 'Formato de correo inválido.'
      if (field === 'phoneRequired') return 'El teléfono es obligatorio.'
      if (field === 'phoneInvalid') return 'El teléfono debe tener 10 dígitos.'
      if (field === 'ageRequired') return 'La edad es obligatoria.'
      if (field === 'ageInvalid') return 'La edad debe estar entre 18 y 65 años.'
      if (field === 'cv') return 'El CV es obligatorio.'
    } else if (language === 'zh') {
      if (field === 'name') return '姓名是必填项。'
      if (field === 'emailRequired') return '电子邮箱是必填项。'
      if (field === 'emailInvalid') return '电子邮箱格式不正确。'
      if (field === 'phoneRequired') return '联系电话是必填项。'
      if (field === 'phoneInvalid') return '电话必须是10位数字。'
      if (field === 'ageRequired') return '年龄是必填项。'
      if (field === 'ageInvalid') return '年龄必须在18至65岁之间。'
      if (field === 'cv') return '简历是必填文件。'
    } else {
      if (field === 'name') return 'Name is required.'
      if (field === 'emailRequired') return 'Email is required.'
      if (field === 'emailInvalid') return 'Invalid email format.'
      if (field === 'phoneRequired') return 'Phone number is required.'
      if (field === 'phoneInvalid') return 'Phone must be 10 digits.'
      if (field === 'ageRequired') return 'Age is required.'
      if (field === 'ageInvalid') return 'Age must be between 18 and 65.'
      if (field === 'cv') return 'Resume file is required.'
    }
    return ''
  }

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: Record<string, string> = {}
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        stepErrors.name = getErrorMsg('name')
      }
      if (!formData.email.trim()) {
        stepErrors.email = getErrorMsg('emailRequired')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        stepErrors.email = getErrorMsg('emailInvalid')
      }
      if (!formData.phone.trim()) {
        stepErrors.phone = getErrorMsg('phoneRequired')
      } else if (!/^[0-9]{10}$/.test(formData.phone)) {
        stepErrors.phone = getErrorMsg('phoneInvalid')
      }
      if (!formData.age.trim()) {
        stepErrors.age = getErrorMsg('ageRequired')
      } else {
        const ageNum = parseInt(formData.age, 10)
        if (isNaN(ageNum) || ageNum < 18 || ageNum > 65) {
          stepErrors.age = getErrorMsg('ageInvalid')
        }
      }
    } else if (currentStep === 3) {
      if (!cvFile) {
        stepErrors.cv = getErrorMsg('cv')
      }
    }
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(3)) {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)
      }, 1500)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCvFile(e.dataTransfer.files[0])
      if (errors.cv) {
        setErrors(prev => {
          const next = { ...prev }
          delete next.cv
          return next
        })
      }
    }
  }

  const clearFile = () => {
    setCvFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const closeSuccess = () => {
    setIsSuccess(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: 'hombre',
      militaryCard: 'liberada',
      education: 'secundaria',
      comments: ''
    })
    setCvFile(null)
    setStep(1)
    window.location.hash = '#careers'
  }

  const getStepTitle = (num: number) => {
    const full = num === 1 
      ? content.jobPage.secPersonal 
      : num === 2 
        ? content.jobPage.secProfessional 
        : content.jobPage.secDocuments
    return full.replace(/^\d+\.\s*/, '')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Back button */}
      <div className="mb-8 text-left">
        <a
          href="#careers"
          className={`inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
            isRedBlack ? 'text-white/60 hover:text-[#EF3B43]' : 'text-gray-500 hover:text-[#EF3B43]'
          }`}
        >
          <ArrowLeft size={16} />
          <span>{content.jobPage.backBtn}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Job Illustrative Image */}
          {job.image && (
            <div className={`relative h-64 sm:h-80 w-full overflow-hidden border rounded-[24px] group shadow-lg ${
              isRedBlack ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-white'
            }`}>
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-t ${
                isRedBlack ? 'from-[#050608]/70 via-transparent' : 'from-black/40 via-transparent'
              }`}></div>
            </div>
          )}

          <div className="space-y-3">
            <span className={`inline-flex items-center px-3 py-1 text-[9px] font-bold uppercase tracking-wider border rounded-full ${
              isRedBlack ? 'bg-red-500/10 border-red-500/20 text-[#EF3B43]' : 'bg-red-50 text-[#EF3B43] border-red-150'
            }`}>
              {content.vacancies.statusActive}
            </span>
            <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] ${
              isRedBlack ? 'text-white' : 'text-[#101820]'
            }`}>
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 font-semibold pt-1">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin size={16} className="text-[#EF3B43]" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Clock size={16} className="text-[#EF3B43]" />
                {job.type}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Shield size={16} className="text-[#EF3B43]" />
                {content.vacancies.salary}
              </span>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${
            isRedBlack ? 'bg-[#0b0d11] border-white/10' : 'bg-white border-gray-150 shadow-sm'
          }`}>
            <p className={`text-sm leading-relaxed ${isRedBlack ? 'text-white/70' : 'text-gray-600'}`}>
              {job.description}
            </p>
          </div>

          {/* Requirements list */}
          <div className="space-y-4">
            <h3 className={`font-display text-sm font-black uppercase tracking-widest ${
              isRedBlack ? 'text-white/90' : 'text-[#101820]'
            }`}>
              {content.vacancies.requirements}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.requirements.map((req, i) => (
                <div 
                  key={i} 
                  className={`flex items-start space-x-3 p-3.5 border rounded-xl transition-all duration-300 hover:scale-[1.01] ${
                    isRedBlack ? 'bg-white/[0.02] border-white/5 text-white/80' : 'bg-gray-50/50 border-gray-100 text-gray-600'
                  }`}
                >
                  <CheckCircle size={18} className="text-[#EF3B43] shrink-0 mt-0.5" weight="fill" />
                  <span className="text-xs font-medium leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-6">
          <div className={`p-6 sm:p-8 rounded-[24px] border relative overflow-hidden transition-all duration-500 ${
            isRedBlack ? 'bg-[#0b0d11] border-[#EF3B43]/20 shadow-2xl shadow-[#EF3B43]/5' : 'bg-white border-gray-200 shadow-xl'
          }`}>
            {/* Watermark inside form */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.025] pointer-events-none select-none">
              <img 
                src={isRedBlack ? "/recursos/gsi-isomarca-white.png" : "/recursos/gsi-isomarca-black.png"} 
                alt="GSI Watermark" 
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className={`font-display text-xl sm:text-2xl font-black tracking-tight mb-6 text-left ${
              isRedBlack ? 'text-white' : 'text-[#101820]'
            }`}>
              {content.jobPage.formTitle}
            </h2>

            {/* Step indicator */}
            <div className="mb-10 relative z-10">
              <div className="flex items-center justify-between max-w-md mx-auto relative">
                {/* Line behind steps */}
                <div className={`absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 ${
                  isRedBlack ? 'bg-white/5' : 'bg-gray-100'
                }`} />
                
                {/* Active progress line */}
                <div 
                  className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 bg-[#EF3B43] transition-all duration-500 shadow-[0_0_8px_rgba(239,59,67,0.5)]" 
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />

                {[1, 2, 3].map((num) => {
                  const isActive = step === num
                  const isCompleted = step > num
                  const IconComp = num === 1 ? User : num === 2 ? GraduationCap : FileText
                  
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        if (num < step) {
                          setStep(num)
                        } else if (num > step) {
                          let valid = true
                          for (let s = step; s < num; s++) {
                            if (!validateStep(s)) {
                              valid = false
                              break
                            }
                          }
                          if (valid) setStep(num)
                        }
                      }}
                      className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-500 outline-none ${
                        isCompleted
                          ? 'bg-[#EF3B43] border-[#EF3B43] text-white shadow-md shadow-red-500/20'
                          : isActive
                            ? isRedBlack 
                              ? 'bg-black border-[#EF3B43] text-[#EF3B43] shadow-lg shadow-[#EF3B43]/30'
                              : 'bg-white border-[#EF3B43] text-[#EF3B43] shadow-md shadow-[#EF3B43]/20'
                            : isRedBlack
                              ? 'bg-[#0b0d11] border-white/10 text-white/40 hover:border-white/20'
                              : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={18} weight="fill" className="text-white" />
                      ) : (
                        <IconComp size={16} weight={isActive ? 'fill' : 'regular'} />
                      )}
                      
                      {/* Label under step */}
                      <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black tracking-widest uppercase transition-all duration-300 ${
                        isActive 
                          ? 'text-[#EF3B43]' 
                          : isCompleted
                            ? isRedBlack ? 'text-white' : 'text-gray-800'
                            : 'text-gray-400'
                      }`}>
                        {getStepTitle(num)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 pt-4">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="space-y-5"
                >
                  {step === 1 && (
                    <div className="space-y-4 text-left">
                      {/* Name field */}
                      <div className="space-y-1.5 group">
                        <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                          errors.name 
                            ? 'text-red-500' 
                            : isRedBlack 
                              ? 'text-white/60 group-focus-within:text-[#EF3B43]' 
                              : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                        }`}>
                          {content.jobPage.fieldName} *
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <User className={`h-4 w-4 transition-colors duration-300 ${
                              errors.name
                                ? 'text-red-500/60'
                                : isRedBlack 
                                  ? 'text-white/30 group-focus-within:text-[#EF3B43]' 
                                  : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                            }`} />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={content.jobPage.fieldNamePl}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 ${
                              errors.name
                                ? 'border-red-500/50 bg-red-500/[0.02] focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-red-900 placeholder-red-500/30'
                                : isRedBlack 
                                  ? 'bg-black/45 border-white/10 text-white placeholder-white/25 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50'
                                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <span className="text-[10px] text-red-500 font-bold block mt-1">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Grid: Email & Age */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Email field */}
                        <div className="space-y-1.5 sm:col-span-2 group">
                          <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                            errors.email 
                              ? 'text-red-500' 
                              : isRedBlack 
                                ? 'text-white/60 group-focus-within:text-[#EF3B43]' 
                                : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                          }`}>
                            {content.jobPage.fieldEmail} *
                          </label>
                          <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Envelope className={`h-4 w-4 transition-colors duration-300 ${
                                errors.email
                                  ? 'text-red-500/60'
                                  : isRedBlack 
                                    ? 'text-white/30 group-focus-within:text-[#EF3B43]' 
                                    : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                              }`} />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder={content.jobPage.fieldEmailPl}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 ${
                                errors.email
                                  ? 'border-red-500/50 bg-red-500/[0.02] focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-red-900 placeholder-red-500/30'
                                  : isRedBlack 
                                    ? 'bg-black/45 border-white/10 text-white placeholder-white/25 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50'
                                    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <span className="text-[10px] text-red-500 font-bold block mt-1">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        {/* Age field */}
                        <div className="space-y-1.5 group">
                          <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                            errors.age 
                              ? 'text-red-500' 
                              : isRedBlack 
                                ? 'text-white/60 group-focus-within:text-[#EF3B43]' 
                                : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                          }`}>
                            {content.jobPage.fieldAge} *
                          </label>
                          <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                              <Calendar className={`h-4 w-4 transition-colors duration-300 ${
                                errors.age
                                  ? 'text-red-500/60'
                                  : isRedBlack 
                                    ? 'text-white/30 group-focus-within:text-[#EF3B43]' 
                                    : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                              }`} />
                            </div>
                            <input
                              type="number"
                              name="age"
                              min="18"
                              max="65"
                              value={formData.age}
                              onChange={handleInputChange}
                              placeholder={content.jobPage.fieldAgePl}
                              className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 ${
                                errors.age
                                  ? 'border-red-500/50 bg-red-500/[0.02] focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-red-900 placeholder-red-500/30'
                                  : isRedBlack 
                                    ? 'bg-black/45 border-white/10 text-white placeholder-white/25 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50'
                                    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                              }`}
                            />
                          </div>
                          {errors.age && (
                            <span className="text-[10px] text-red-500 font-bold block mt-1">
                              {errors.age}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Phone field */}
                      <div className="space-y-1.5 group">
                        <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                          errors.phone 
                            ? 'text-red-500' 
                            : isRedBlack 
                              ? 'text-white/60 group-focus-within:text-[#EF3B43]' 
                              : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                        }`}>
                          {content.jobPage.fieldPhone} *
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Phone className={`h-4 w-4 transition-colors duration-300 ${
                              errors.phone
                                ? 'text-red-500/60'
                                : isRedBlack 
                                  ? 'text-white/30 group-focus-within:text-[#EF3B43]' 
                                  : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                            }`} />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={content.jobPage.fieldPhonePl}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 ${
                              errors.phone
                                ? 'border-red-500/50 bg-red-500/[0.02] focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-red-900 placeholder-red-500/30'
                                : isRedBlack 
                                  ? 'bg-black/45 border-white/10 text-white placeholder-white/25 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50'
                                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <span className="text-[10px] text-red-500 font-bold block mt-1">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 text-left">
                      {/* Gender field */}
                      <div className="space-y-1.5 group">
                        <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                          isRedBlack ? 'text-white/60 group-focus-within:text-[#EF3B43]' : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                        }`}>
                          {content.jobPage.fieldGender} *
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Users className={`h-4 w-4 transition-colors duration-300 ${
                              isRedBlack ? 'text-white/30 group-focus-within:text-[#EF3B43]' : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                            }`} />
                          </div>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 appearance-none ${
                              isRedBlack 
                                ? 'bg-black/45 border-white/10 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50 [&>option]:bg-[#0b0d11]'
                                : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30 [&>option]:bg-white'
                            }`}
                          >
                            <option value="hombre">{content.jobPage.genderOpts.hombre}</option>
                            <option value="mujer">{content.jobPage.genderOpts.mujer}</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ArrowDown size={14} className={isRedBlack ? 'text-white/40' : 'text-gray-450'} />
                          </div>
                        </div>
                      </div>

                      {/* Education field */}
                      <div className="space-y-1.5 group">
                        <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                          isRedBlack ? 'text-white/60 group-focus-within:text-[#EF3B43]' : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                        }`}>
                          {content.jobPage.fieldEducation} *
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <GraduationCap className={`h-4 w-4 transition-colors duration-300 ${
                              isRedBlack ? 'text-white/30 group-focus-within:text-[#EF3B43]' : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                            }`} />
                          </div>
                          <select
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 appearance-none ${
                              isRedBlack 
                                ? 'bg-black/45 border-white/10 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50 [&>option]:bg-[#0b0d11]'
                                : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30 [&>option]:bg-white'
                            }`}
                          >
                            <option value="secundaria">{content.jobPage.eduOpts.secundaria}</option>
                            <option value="preparatoria">{content.jobPage.eduOpts.preparatoria}</option>
                            <option value="licenciatura">{content.jobPage.eduOpts.licenciatura}</option>
                            <option value="otro">{content.jobPage.eduOpts.otro}</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ArrowDown size={14} className={isRedBlack ? 'text-white/40' : 'text-gray-450'} />
                          </div>
                        </div>
                      </div>

                      {/* Military Card (Cartilla) */}
                      <AnimatePresence initial={false}>
                        {formData.gender === 'hombre' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="space-y-1.5 group overflow-hidden"
                          >
                            <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                              isRedBlack ? 'text-white/60 group-focus-within:text-[#EF3B43]' : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                            }`}>
                              {content.jobPage.fieldMilitary} *
                            </label>
                            <div className="relative rounded-xl shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Shield className={`h-4 w-4 transition-colors duration-300 ${
                                  isRedBlack ? 'text-white/30 group-focus-within:text-[#EF3B43]' : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                                }`} />
                              </div>
                              <select
                                name="militaryCard"
                                value={formData.militaryCard}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 appearance-none ${
                                  isRedBlack 
                                    ? 'bg-black/45 border-white/10 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50 [&>option]:bg-[#0b0d11]'
                                    : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30 [&>option]:bg-white'
                                }`}
                              >
                                <option value="liberada">{content.jobPage.militaryOpts.liberada}</option>
                                <option value="tramite">{content.jobPage.militaryOpts.tramite}</option>
                                <option value="noAplica">{content.jobPage.militaryOpts.noAplica}</option>
                                <option value="noCuento">{content.jobPage.militaryOpts.noCuento}</option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ArrowDown size={14} className={isRedBlack ? 'text-white/40' : 'text-gray-450'} />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 text-left">
                      {/* File Upload drag and drop */}
                      <div className="space-y-1.5">
                        <label className={`block text-[10px] font-extrabold uppercase tracking-wider ${
                          errors.cv ? 'text-red-500' : isRedBlack ? 'text-white/60' : 'text-gray-500'
                        }`}>
                          {content.jobPage.fieldCv} *
                        </label>
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg"
                          required={!cvFile}
                          className="hidden"
                          id="cv-upload-input"
                        />

                        {!cvFile ? (
                          <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2 group ${
                              errors.cv
                                ? 'border-red-500/50 bg-red-500/[0.02] hover:border-red-500 hover:bg-red-500/[0.05]'
                                : isRedBlack 
                                  ? 'border-white/10 bg-black/25 hover:border-[#EF3B43]/50 hover:bg-[#EF3B43]/5' 
                                  : 'border-gray-200 bg-gray-50/50 hover:border-[#EF3B43]/50 hover:bg-red-50/10'
                            }`}
                          >
                            <UploadSimple size={24} className={`transition-colors duration-300 ${
                              errors.cv
                                ? 'text-red-500'
                                : isRedBlack ? 'text-white/40 group-hover:text-[#EF3B43]' : 'text-gray-400 group-hover:text-[#EF3B43]'
                            }`} />
                            <p className={`text-[11px] leading-relaxed max-w-[280px] mx-auto ${
                              errors.cv
                                ? 'text-red-500/80 font-semibold'
                                : isRedBlack ? 'text-white/50' : 'text-gray-500'
                            }`}>
                              {content.jobPage.cvPl}
                            </p>
                          </div>
                        ) : (
                          <div className={`flex items-center justify-between p-3.5 border rounded-xl ${
                            isRedBlack ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-150'
                          }`}>
                            <div className="flex items-center space-x-2.5 overflow-hidden">
                              <FilePdf size={20} className="text-[#EF3B43] shrink-0" weight="fill" />
                              <div className="text-left overflow-hidden">
                                <p className={`text-xs font-bold truncate ${isRedBlack ? 'text-white/90' : 'text-gray-700'}`}>
                                  {cvFile.name}
                                </p>
                                <p className="text-[10px] text-green-500 font-bold">
                                  {content.jobPage.cvSuccess} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={clearFile}
                              className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                                isRedBlack ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-gray-150 text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        )}
                        {errors.cv && (
                          <span className="text-[10px] text-red-500 font-bold block mt-1">
                            {errors.cv}
                          </span>
                        )}
                      </div>

                      {/* Comments field */}
                      <div className="space-y-1.5 group">
                        <label className={`block text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                          isRedBlack ? 'text-white/60 group-focus-within:text-[#EF3B43]' : 'text-gray-500 group-focus-within:text-[#EF3B43]'
                        }`}>
                          {content.jobPage.fieldComments}
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute top-3.5 left-3.5 flex items-center pointer-events-none">
                            <ChatText className={`h-4 w-4 transition-colors duration-300 ${
                              isRedBlack ? 'text-white/30 group-focus-within:text-[#EF3B43]' : 'text-gray-400 group-focus-within:text-[#EF3B43]'
                            }`} />
                          </div>
                          <textarea
                            name="comments"
                            rows={3}
                            value={formData.comments}
                            onChange={handleInputChange}
                            placeholder={content.jobPage.fieldCommentsPl}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold border outline-none transition-all duration-300 resize-none ${
                              isRedBlack 
                                ? 'bg-black/45 border-white/10 text-white placeholder-white/25 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/50'
                                : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation & Submit buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-dashed border-white/10 mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-xl flex items-center justify-center space-x-1.5 border outline-none cursor-pointer ${
                      isRedBlack 
                        ? 'bg-transparent border-white/10 text-white hover:bg-white/5' 
                        : 'bg-transparent border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CaretLeft size={14} weight="bold" />
                    <span>{language === 'es' ? 'Atrás' : language === 'zh' ? '返回' : 'Back'}</span>
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer outline-none ${
                      isRedBlack 
                        ? 'bg-[#EF3B43] hover:bg-white hover:text-[#050608] shadow-lg shadow-red-500/10' 
                        : 'bg-[#EF3B43] hover:bg-[#101820] shadow-lg shadow-red-500/15'
                    }`}
                  >
                    <span>{language === 'es' ? 'Siguiente' : language === 'zh' ? '下一步' : 'Next'}</span>
                    <CaretRight size={14} weight="bold" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 rounded-xl cursor-pointer flex items-center justify-center space-x-2 outline-none ${
                      isSubmitting 
                        ? 'bg-[#EF3B43]/50 cursor-not-allowed'
                        : isRedBlack 
                          ? 'bg-[#EF3B43] hover:bg-white hover:text-[#050608] shadow-lg shadow-red-500/10' 
                          : 'bg-[#EF3B43] hover:bg-[#101820] shadow-lg shadow-red-500/15'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{content.jobPage.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Shield size={14} weight="fill" />
                        <span>{content.jobPage.submitBtn}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeSuccess}
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className={`relative z-10 max-w-md w-full p-8 rounded-[28px] border text-center space-y-5 shadow-2xl ${
                isRedBlack ? 'bg-[#0b0d11] border-white/10 text-white' : 'bg-white border-gray-150 text-gray-800'
              }`}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle size={36} weight="fill" />
              </div>

              <div className="space-y-2">
                <h3 className={`font-display text-xl font-black tracking-tight ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                  {content.jobPage.successTitle}
                </h3>
                <p className={`text-xs leading-relaxed ${isRedBlack ? 'text-white/60' : 'text-gray-500'}`}>
                  {content.jobPage.successDesc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={closeSuccess}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 rounded-xl cursor-pointer ${
                    isRedBlack ? 'bg-white/10 hover:bg-[#EF3B43]' : 'bg-[#101820] hover:bg-[#EF3B43]'
                  }`}
                >
                  {content.jobPage.successClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
