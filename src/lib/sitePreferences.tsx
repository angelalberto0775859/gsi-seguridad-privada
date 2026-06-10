import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'es' | 'en' | 'zh'
export type VisualMode = 'classic' | 'redblack'

type TranslationKey =
  | 'nav.history'
  | 'nav.services'
  | 'nav.coverage'
  | 'nav.careers'
  | 'nav.contact'
  | 'nav.menu'
  | 'controls.language'
  | 'controls.theme'
  | 'controls.classic'
  | 'controls.redblack'
  | 'hero.badge'
  | 'hero.title.before'
  | 'hero.title.accent'
  | 'hero.description'
  | 'hero.primary'
  | 'hero.secondary'
  | 'hero.metric.continuity'
  | 'hero.metric.branches'
  | 'map.eyebrow'
  | 'map.title'
  | 'map.description'
  | 'map.command'
  | 'map.details'
  | 'map.instructions'
  | 'map.status'
  | 'map.address'
  | 'map.phone'
  | 'map.email'
  | 'map.support'
  | 'map.supportValue'
  | 'map.coverage'
  | 'map.supervision'
  | 'map.legend'
  | 'map.station'
  | 'map.footer'
  | 'contact.eyebrow'
  | 'contact.title'
  | 'contact.description'
  | 'contact.phone'
  | 'contact.whatsapp'
  | 'contact.whatsappCta'
  | 'contact.successTitle'
  | 'contact.successText'
  | 'contact.formTitle'
  | 'contact.formText'
  | 'contact.name'
  | 'contact.company'
  | 'contact.email'
  | 'contact.phoneLabel'
  | 'contact.message'
  | 'contact.optional'
  | 'contact.submit'
  | 'contact.placeholder.name'
  | 'contact.placeholder.company'
  | 'contact.placeholder.phone'
  | 'contact.placeholder.message'
  | 'contact.state'
  | 'contact.propertyType'
  | 'contact.serviceType'
  | 'contact.placeholder.select'
  | 'contact.captcha.label'
  | 'contact.captcha.instruction'
  | 'contact.captcha.error'
  | 'contact.captcha.placeholder'
  | 'footer.description'
  | 'footer.sitemap'
  | 'footer.home'
  | 'footer.accreditations'
  | 'footer.support'
  | 'footer.hours'
  | 'footer.operational'
  | 'footer.rights'
  | 'footer.privacy'
  | 'footer.terms'
  | 'footer.dgsp'
  | 'cookie.title'
  | 'cookie.text'
  | 'cookie.reject'
  | 'cookie.accept'
  | 'cookie.close'

type PreferencesContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  visualMode: VisualMode
  setVisualMode: (mode: VisualMode) => void
  isRedBlack: boolean
  t: (key: TranslationKey) => string
}

const translations: Record<Language, Record<TranslationKey, string>> = {
  es: {
    'nav.history': 'Nuestra Historia',
    'nav.services': 'Servicios',
    'nav.coverage': 'Cobertura',
    'nav.careers': 'Bolsa de Trabajo',
    'nav.contact': 'Contacto',
    'nav.menu': 'Abrir menú',
    'controls.language': 'Idioma',
    'controls.theme': 'Tema',
    'controls.classic': 'Claro',
    'controls.redblack': 'Rojo / Negro',
    'hero.badge': 'Estándar de Seguridad Certificado',
    'hero.title.before': 'Control, criterio y',
    'hero.title.accent': 'prevención',
    'hero.description': 'Seguridad privada corporativa e industrial alineada con la continuidad operativa de tu empresa en todo México. Más de 22 años de respuesta impecable.',
    'hero.primary': 'Iniciar Estrategia B2B',
    'hero.secondary': 'Explorar Servicios',
    'hero.metric.continuity': 'Continuidad Operativa →',
    'hero.metric.branches': 'Sucursales en México →',
    'map.eyebrow': 'Presencia Estratégica',
    'map.title': 'Cobertura Nacional Real',
    'map.description': 'Haz clic directamente en cualquiera de las sucursales sobre el mapa de la república para ver la información operativa de la delegación en la tarjeta de control izquierda.',
    'map.command': 'Centro de Mando Nacional GSI',
    'map.details': 'Detalles de Delegación',
    'map.instructions': 'Haz clic en cualquier punto del mapa para ver los datos de la sucursal.',
    'map.status': 'Conexión Operativa Activa',
    'map.address': 'Dirección Operativa',
    'map.phone': 'Teléfono de Enlace',
    'map.email': 'Correo Electrónico',
    'map.support': 'Soporte Operativo',
    'map.supportValue': '24 Horas / 365 Días al Año',
    'map.coverage': 'Cobertura y Despliegue:',
    'map.supervision': 'Supervisión: Activa',
    'map.legend': 'Presencia GSI Nacional',
    'map.station': 'Estación:',
    'map.footer': 'Contamos con más de 30 sucursales en todo México.',
    'contact.eyebrow': 'Contacto B2B Directo',
    'contact.title': 'Protege tu operación hoy',
    'contact.description': 'Agenda una consultoría de análisis de riesgos sin costo y descubre cómo GSI Seguridad Privada puede blindar tus instalaciones.',
    'contact.phone': 'Línea Telefónica Nacional (24/7)',
    'contact.whatsapp': 'Atención Rápida Comercial',
    'contact.whatsappCta': 'Chat vía WhatsApp',
    'contact.successTitle': 'Solicitud Enviada',
    'contact.successText': 'Hemos recibido tus datos de contacto comercial. Un asesor regional de seguridad se comunicará contigo en breve.',
    'contact.formTitle': 'Solicitar Diagnóstico',
    'contact.formText': 'Ingresa los datos de tu empresa para contactarte.',
    'contact.name': 'Nombre Completo',
    'contact.company': 'Empresa / Corporativo',
    'contact.email': 'Correo Corporativo',
    'contact.phoneLabel': 'Teléfono de Contacto',
    'contact.message': 'Mensaje / Requerimiento',
    'contact.optional': '(Opcional)',
    'contact.submit': 'Enviar Información',
    'contact.placeholder.name': 'Ej. Ing. Carlos Mendoza',
    'contact.placeholder.company': 'Ej. Logística Industrial S.A.',
    'contact.placeholder.phone': '10 dígitos',
    'contact.placeholder.message': 'Describe brevemente tus requerimientos o número de guardias requeridos...',
    'contact.state': 'Estado de la República',
    'contact.propertyType': 'Tipo de Inmueble a Resguardar',
    'contact.serviceType': 'Tipo de Servicio',
    'contact.placeholder.select': 'Selecciona una opción...',
    'contact.captcha.label': 'Verificación de Seguridad',
    'contact.captcha.instruction': 'Ingresa el código que se muestra al lado',
    'contact.captcha.error': 'Código de verificación incorrecto',
    'contact.captcha.placeholder': 'Código',
    'footer.description': 'Parte del Grupo Seguridad Integral (GSI). Proporcionando servicios estandarizados de seguridad privada, física y tecnológica a nivel nacional.',
    'footer.sitemap': 'Mapa del Sitio',
    'footer.home': 'Inicio',
    'footer.accreditations': 'Acreditaciones',
    'footer.support': 'Soporte Comercial',
    'footer.hours': 'Lunes a Viernes: 8:00 AM - 6:00 PM',
    'footer.operational': 'Atención Operativa: 24 Horas / 365 Días',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Aviso de Privacidad',
    'footer.terms': 'Términos del Servicio',
    'footer.dgsp': 'Permisos DGSP',
    'cookie.title': 'Control de Privacidad',
    'cookie.text': 'Utilizamos cookies para optimizar la navegación y analizar el tráfico de nuestro sitio de seguridad privada. Al continuar, aceptas el uso de cookies.',
    'cookie.reject': 'Rechazar',
    'cookie.accept': 'Aceptar',
    'cookie.close': 'Cerrar',
  },
  en: {
    'nav.history': 'Our History',
    'nav.services': 'Services',
    'nav.coverage': 'Coverage',
    'nav.careers': 'Careers',
    'nav.contact': 'Contact',
    'nav.menu': 'Open menu',
    'controls.language': 'Language',
    'controls.theme': 'Theme',
    'controls.classic': 'Light',
    'controls.redblack': 'Red / Black',
    'hero.badge': 'Certified Security Standard',
    'hero.title.before': 'Control, judgment and',
    'hero.title.accent': 'prevention',
    'hero.description': 'Corporate and industrial private security aligned with your operational continuity across Mexico. More than 22 years of reliable response.',
    'hero.primary': 'Start B2B Strategy',
    'hero.secondary': 'Explore Services',
    'hero.metric.continuity': 'Operational Continuity →',
    'hero.metric.branches': 'Branches in Mexico →',
    'map.eyebrow': 'Strategic Presence',
    'map.title': 'Real National Coverage',
    'map.description': 'Click any branch on the map of Mexico to review operational information for that location in the control card.',
    'map.command': 'GSI National Command Center',
    'map.details': 'Branch Details',
    'map.instructions': 'Click any point on the map to view branch data.',
    'map.status': 'Active Operational Link',
    'map.address': 'Operational Address',
    'map.phone': 'Contact Phone',
    'map.email': 'Email',
    'map.support': 'Operational Support',
    'map.supportValue': '24 Hours / 365 Days a Year',
    'map.coverage': 'Coverage and Deployment:',
    'map.supervision': 'Supervision: Active',
    'map.legend': 'GSI National Presence',
    'map.station': 'Station:',
    'map.footer': 'More than 30 branches across Mexico.',
    'contact.eyebrow': 'Direct B2B Contact',
    'contact.title': 'Protect your operation today',
    'contact.description': 'Schedule a free risk analysis consultation and discover how GSI Seguridad Privada can protect your facilities.',
    'contact.phone': 'National Phone Line (24/7)',
    'contact.whatsapp': 'Fast Commercial Support',
    'contact.whatsappCta': 'WhatsApp Chat',
    'contact.successTitle': 'Request Sent',
    'contact.successText': 'We received your business contact information. A regional security advisor will contact you shortly.',
    'contact.formTitle': 'Request Assessment',
    'contact.formText': 'Enter your company information so we can contact you.',
    'contact.name': 'Full Name',
    'contact.company': 'Company / Corporate',
    'contact.email': 'Business Email',
    'contact.phoneLabel': 'Contact Phone',
    'contact.message': 'Message / Requirement',
    'contact.optional': '(Optional)',
    'contact.submit': 'Send Information',
    'contact.placeholder.name': 'e.g. John Doe',
    'contact.placeholder.company': 'e.g. Industrial Logistics Inc.',
    'contact.placeholder.phone': '10 digits',
    'contact.placeholder.message': 'Briefly describe your requirements or number of guards needed...',
    'contact.state': 'State / Region',
    'contact.propertyType': 'Property Type to Protect',
    'contact.serviceType': 'Type of Service',
    'contact.placeholder.select': 'Select an option...',
    'contact.captcha.label': 'Security Verification',
    'contact.captcha.instruction': 'Enter the code shown on the side',
    'contact.captcha.error': 'Incorrect verification code',
    'contact.captcha.placeholder': 'Code',
    'footer.description': 'Part of Grupo Seguridad Integral (GSI). Providing standardized private, physical, and technology security services nationwide.',
    'footer.sitemap': 'Site Map',
    'footer.home': 'Home',
    'footer.accreditations': 'Accreditations',
    'footer.support': 'Commercial Support',
    'footer.hours': 'Monday to Friday: 8:00 AM - 6:00 PM',
    'footer.operational': 'Operational Support: 24 Hours / 365 Days',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Notice',
    'footer.terms': 'Terms of Service',
    'footer.dgsp': 'DGSP Permits',
    'cookie.title': 'Privacy Control',
    'cookie.text': 'We use cookies to optimize navigation and analyze traffic on our private security website. By continuing, you accept cookie use.',
    'cookie.reject': 'Reject',
    'cookie.accept': 'Accept',
    'cookie.close': 'Close',
  },
  zh: {
    'nav.history': '我们的历史',
    'nav.services': '服务',
    'nav.coverage': '覆盖范围',
    'nav.careers': '招聘',
    'nav.contact': '联系',
    'nav.menu': '打开菜单',
    'controls.language': '语言',
    'controls.theme': '主题',
    'controls.classic': '明亮',
    'controls.redblack': '红 / 黑',
    'hero.badge': '认证安保标准',
    'hero.title.before': '管控、判断与',
    'hero.title.accent': '预防',
    'hero.description': '面向企业与工业场景的私人安保服务，保障您在墨西哥全国范围内的运营连续性。超过22年的可靠响应经验。',
    'hero.primary': '启动B2B策略',
    'hero.secondary': '查看服务',
    'hero.metric.continuity': '运营连续性 →',
    'hero.metric.branches': '墨西哥分支机构 →',
    'map.eyebrow': '战略布局',
    'map.title': '全国真实覆盖',
    'map.description': '点击墨西哥地图上的任一分支点，即可在左侧控制卡中查看该地点的运营信息。',
    'map.command': 'GSI全国指挥中心',
    'map.details': '分支详情',
    'map.instructions': '点击地图上的任一点查看分支数据。',
    'map.status': '运营连接已激活',
    'map.address': '运营地址',
    'map.phone': '联系电话',
    'map.email': '电子邮件',
    'map.support': '运营支持',
    'map.supportValue': '全年365天 / 每天24小时',
    'map.coverage': '覆盖与部署:',
    'map.supervision': '监控: 已激活',
    'map.legend': 'GSI全国布局',
    'map.station': '站点:',
    'map.footer': '我们在墨西哥拥有30多个分支机构。',
    'contact.eyebrow': 'B2B直接联系',
    'contact.title': '立即保护您的运营',
    'contact.description': '预约免费的风险分析咨询，了解GSI Seguridad Privada如何保护您的设施。',
    'contact.phone': '全国电话热线 (24/7)',
    'contact.whatsapp': '快速商务支持',
    'contact.whatsappCta': 'WhatsApp咨询',
    'contact.successTitle': '请求已发送',
    'contact.successText': '我们已收到您的商务联系信息。区域安保顾问将尽快与您联系。',
    'contact.formTitle': '申请诊断',
    'contact.formText': '请输入公司信息，我们将与您联系。',
    'contact.name': '姓名',
    'contact.company': '公司 / 企业',
    'contact.email': '企业邮箱',
    'contact.phoneLabel': '联系电话',
    'contact.message': '留言 / 需求',
    'contact.optional': '(可选)',
    'contact.submit': '发送信息',
    'contact.placeholder.name': '例如：张伟先生',
    'contact.placeholder.company': '例如：工业物流有限公司',
    'contact.placeholder.phone': '10 位数字',
    'contact.placeholder.message': '简要描述您的需求或所需的警卫人数...',
    'contact.state': '墨西哥省份 / 地区',
    'contact.propertyType': '待保护的物业类型',
    'contact.serviceType': '服务类型',
    'contact.placeholder.select': '请选择一个选项...',
    'contact.captcha.label': '安全验证',
    'contact.captcha.instruction': '请输入侧面显示的验证码',
    'contact.captcha.error': '验证码输入错误',
    'contact.captcha.placeholder': '验证码',
    'footer.description': '隶属于Grupo Seguridad Integral (GSI)。在全国范围内提供标准化私人、实体与技术安保服务。',
    'footer.sitemap': '网站地图',
    'footer.home': '首页',
    'footer.accreditations': '资质认证',
    'footer.support': '商务支持',
    'footer.hours': '周一至周五: 8:00 AM - 6:00 PM',
    'footer.operational': '运营支持: 全年365天 / 每天24小时',
    'footer.rights': '版权所有。',
    'footer.privacy': '隐私声明',
    'footer.terms': '服务条款',
    'footer.dgsp': 'DGSP许可',
    'cookie.title': '隐私控制',
    'cookie.text': '我们使用 Cookie 优化浏览体验并分析私人安保网站流量。继续浏览即表示您接受 Cookie 的使用。',
    'cookie.reject': '拒绝',
    'cookie.accept': '接受',
    'cookie.close': '关闭',
  },
}

const languageLabels: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
  zh: '中文',
}

const SitePreferencesContext = createContext<PreferencesContextValue | null>(null)

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check URL hash first for SEO language deep-linking
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (hash.includes('en')) return 'en'
    if (hash.includes('zh')) return 'zh'

    const stored = localStorage.getItem('gsi-language')
    return stored === 'en' || stored === 'zh' ? stored : 'es'
  })
  const [visualMode, setVisualModeState] = useState<VisualMode>(() => {
    return localStorage.getItem('gsi-visual-mode') === 'redblack' ? 'redblack' : 'classic'
  })

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    localStorage.setItem('gsi-language', nextLanguage)
  }

  const setVisualMode = (nextMode: VisualMode) => {
    setVisualModeState(nextMode)
    localStorage.setItem('gsi-visual-mode', nextMode)
  }

  useEffect(() => {
    const handleHashLanguage = () => {
      const hash = window.location.hash
      if (hash.includes('en')) {
        setLanguageState('en')
      } else if (hash.includes('zh')) {
        setLanguageState('zh')
      }
    }
    
    // Check language hash change events
    window.addEventListener('hashchange', handleHashLanguage)
    return () => window.removeEventListener('hashchange', handleHashLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language
    document.documentElement.classList.toggle('theme-redblack', visualMode === 'redblack')
  }, [language, visualMode])

  const value = useMemo<PreferencesContextValue>(() => ({
    language,
    setLanguage,
    visualMode,
    setVisualMode,
    isRedBlack: visualMode === 'redblack',
    t: (key) => translations[language][key],
  }), [language, visualMode])

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  )
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext)
  if (!context) {
    throw new Error('useSitePreferences must be used inside SitePreferencesProvider')
  }
  return context
}

export const supportedLanguages: Language[] = ['es', 'en', 'zh']
export { languageLabels }
