import { useState, useEffect } from 'react'
import { Phone, WhatsappLogo, ShieldCheck, ArrowUpRight, ArrowClockwise } from '@phosphor-icons/react'
import { useSitePreferences } from '../lib/sitePreferences'

const statesOfMexico = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Coahuila", "Colima", "Ciudad de México (CDMX)", "Durango",
  "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Estado de México",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
]

const createCaptchaCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default function ContactSection() {
  const { isRedBlack, language, t } = useSitePreferences()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    state: '',
    propertyType: '',
    serviceType: '',
    message: ''
  })
  
  // Captcha State
  const [captchaCode, setCaptchaCode] = useState(createCaptchaCode)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const propertyTypes = {
    es: [
      "Parque Industrial / Almacén",
      "Planta de Manufactura",
      "Oficinas Corporativas / Sucursal",
      "Centro Comercial / Local Comercial",
      "Residencial / Condominio",
      "Otro"
    ],
    en: [
      "Industrial Park / Warehouse",
      "Manufacturing Plant",
      "Corporate Offices / Branch",
      "Shopping Mall / Retail Store",
      "Residential / Condominium",
      "Other"
    ],
    zh: [
      "工业园 / 仓库",
      "制造工厂",
      "公司办公室 / 分部",
      "商场 / 零售店",
      "住宅 / 社区",
      "其他"
    ]
  }[language] || [
    "Parque Industrial / Almacén",
    "Planta de Manufactura",
    "Oficinas Corporativas / Sucursal",
    "Centro Comercial / Local Comercial",
    "Residencial / Condominio",
    "Otro"
  ]

  const serviceTypes = {
    es: [
      "Seguridad Armada",
      "Seguridad No Armada (Física)",
      "Rastreo y Monitoreo (GPS/CCTV)",
      "Evaluación y Control de Confianza"
    ],
    en: [
      "Armed Security",
      "Unarmed Security (Physical)",
      "Tracking & Monitoring (GPS/CCTV)",
      "Trust Evaluation & Background Checks"
    ],
    zh: [
      "武装安保",
      "非武装安保（人防）",
      "定位与监控 (GPS/CCTV)",
      "信任评估与背景调查"
    ]
  }[language] || [
    "Seguridad Armada",
    "Seguridad No Armada (Física)",
    "Rastreo y Monitoreo (GPS/CCTV)",
    "Evaluación y Control de Confianza"
  ]

  const generateCaptcha = () => {
    setCaptchaCode(createCaptchaCode())
    setCaptchaInput('')
    setCaptchaError(false)
  }

  // Listen to map selections to auto-select state in form
  useEffect(() => {
    const handleMapSelectState = (e: Event) => {
      const customEvent = e as CustomEvent<{ state: string }>
      if (customEvent.detail && customEvent.detail.state) {
        setFormData(prev => ({ ...prev, state: customEvent.detail.state }))
      }
    }
    window.addEventListener('map-select-state', handleMapSelectState)
    return () => window.removeEventListener('map-select-state', handleMapSelectState)
  }, [])

  // Draw Captcha on Canvas
  useEffect(() => {
    if (!captchaCode) return
    const canvas = document.getElementById('captcha-canvas') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear and fill bg
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = isRedBlack ? '#0c0f13' : '#f3f4f6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw some noise lines
    ctx.strokeStyle = isRedBlack ? '#EF3B43' : '#101820'
    for (let i = 0; i < 4; i++) {
      ctx.beginPath()
      ctx.lineWidth = Math.random() * 1.5 + 0.5
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
      ctx.stroke()
    }

    // Draw noise dots
    ctx.fillStyle = isRedBlack ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 24, 32, 0.15)'
    for (let i = 0; i < 40; i++) {
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.2 + 0.5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw text with rotations and offsets
    ctx.font = 'bold 24px monospace'
    ctx.fillStyle = isRedBlack ? '#ffffff' : '#101820'
    ctx.textBaseline = 'middle'
    
    const charWidth = canvas.width / 5.5
    for (let i = 0; i < captchaCode.length; i++) {
      const char = captchaCode[i]
      ctx.save()
      const x = (i + 1) * charWidth + (Math.random() * 4 - 2)
      const y = canvas.height / 2 + (Math.random() * 6 - 3)
      ctx.translate(x, y)
      const angle = (Math.random() * 30 - 15) * Math.PI / 180
      ctx.rotate(angle)
      ctx.fillText(char, -8, 0)
      ctx.restore()
    }
  }, [captchaCode, isRedBlack])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate CAPTCHA
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError(true)
      return
    }

    // Construct Mailto Email
    const emailTo = 'contacto@gsiseguridad.com.mx'
    const subject = `GSI Contacto: Solicitud de ${formData.serviceType} - ${formData.company}`
    const body = 
`Detalles del contacto GSI Seguridad Privada:
--------------------------------------------------
Nombre Completo: ${formData.name}
Empresa / Corporativo: ${formData.company}
Correo Electrónico: ${formData.email}
Teléfono de Contacto: ${formData.phone}
Estado de la República: ${formData.state}
Tipo de Inmueble: ${formData.propertyType}
Tipo de Servicio Solicitado: ${formData.serviceType}
--------------------------------------------------
Mensaje / Requerimiento adicional:
${formData.message || 'Sin comentarios adicionales.'}

Enviado desde el formulario de contacto oficial de GSI.`

    // Open mail client
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Simulate submission state inside Web UI
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        state: '',
        propertyType: '',
        serviceType: '',
        message: ''
      })
      generateCaptcha()
    }, 4000)
  }

  const selectArrowSvgWhite = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E'
  const selectArrowSvgDark = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23101820\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E'

  return (
    <section id="contact" className={`py-32 relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-black text-white' : 'bg-[#101820] text-white'
    }`}>
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] pointer-events-none opacity-20 bg-gradient-to-br from-[#EF3B43]/40 to-transparent"></div>
      <div className="absolute bottom-1/12 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[130px] pointer-events-none opacity-10 bg-gradient-to-tr from-white/20 to-transparent"></div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Editorial copywriting & Double-bezel contacts */}
        <div className="lg:col-span-5 text-left space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-[#EF3B43]/15 text-[#EF3B43] border border-[#EF3B43]/20">
              {t('contact.eyebrow')}
            </span>
            <h3 className="font-display text-4xl md:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              {t('contact.title')}
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-[42ch]">
              {t('contact.description')}
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone Card with Double-Bezel Architecture */}
            <div className="p-1.5 rounded-[2rem] border border-white/5 bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-500 hover:border-[#EF3B43]/30 hover:bg-white/[0.04] group">
              <div className="p-6 rounded-[calc(2rem-0.375rem)] bg-[#0b0d11]/30 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3.5 bg-[#EF3B43]/10 text-[#EF3B43] rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <Phone size={22} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      {t('contact.phone')}
                    </p>
                    <a
                      href="tel:8008305990"
                      className="font-display text-xl font-extrabold hover:text-[#EF3B43] transition-colors block mt-1 tracking-tight text-white"
                    >
                      800 8305 990
                    </a>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#EF3B43] group-hover:border-transparent transition-all duration-300 text-white/50 group-hover:text-white">
                  <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* WhatsApp Card with Double-Bezel Architecture */}
            <div className="p-1.5 rounded-[2rem] border border-white/5 bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-500 hover:border-[#25D366]/30 hover:bg-white/[0.04] group">
              <div className="p-6 rounded-[calc(2rem-0.375rem)] bg-[#0b0d11]/30 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3.5 bg-[#25D366]/10 text-[#25D366] rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <WhatsappLogo size={22} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      {t('contact.whatsapp')}
                    </p>
                    <a
                      href="https://wa.me/528008305990?text=Hola,%20me%20gustaría%20cotizar%20servicios%20de%20seguridad%20privada."
                      target="_blank"
                      rel="noreferrer"
                      className="font-display text-lg font-extrabold hover:text-[#25D366] transition-colors block mt-1 tracking-tight text-white"
                    >
                      {t('contact.whatsappCta')}
                    </a>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#25D366] group-hover:border-transparent transition-all duration-300 text-white/50 group-hover:text-white">
                  <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form (Double-Bezel Floating Panel) */}
        <div className="lg:col-span-7">
          <div className={`p-2 rounded-[2.5rem] transition-all duration-500 ${
            isRedBlack 
              ? 'bg-white/[0.02] border border-white/5 shadow-2xl' 
              : 'bg-black/5 border border-black/5 shadow-2xl'
          }`}>
            <div className={`p-8 md:p-10 rounded-[calc(2.5rem-0.5rem)] relative overflow-hidden transition-all duration-500 ${
              isRedBlack 
                ? 'bg-[#0b0d11] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] text-white' 
                : 'bg-white border border-gray-100 text-gray-900 shadow-xl shadow-black/5'
            }`}>
              {/* Subtle Form Card Watermark (Very transparent, for B2B aesthetics) */}
              <div className="absolute -right-12 -bottom-12 pointer-events-none select-none z-0">
                <img
                  src={isRedBlack 
                    ? "/recursos/Logotipos 2023 colo blanco fondo transparente_GSI SEGURIDAD PRIVADA.png" 
                    : "/recursos/Logotipos 2023 Color Negro Fondo transparente_GSI SEGURIDAD PRIVADA.png"
                  }
                  alt="GSI Watermark"
                  className="w-72 h-auto object-contain opacity-[0.025]"
                />
              </div>
              
              {submitted ? (
                <div className="py-16 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto">
                    <ShieldCheck size={32} weight="fill" />
                  </div>
                  <div className="space-y-2">
                    <h4 className={`font-display text-2xl font-black tracking-tight ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                      {t('contact.successTitle')}
                    </h4>
                    <p className={`text-xs max-w-[40ch] mx-auto leading-relaxed ${isRedBlack ? 'text-gray-300' : 'text-gray-650'}`}>
                      {t('contact.successText')}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-left space-y-2 mb-6">
                    <h4 className={`font-display text-2xl font-black tracking-tight ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                      {t('contact.formTitle')}
                    </h4>
                    <p className={`text-xs ${isRedBlack ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t('contact.formText')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.placeholder.name')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl ${
                          isRedBlack
                            ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      />
                    </div>

                    {/* Company Input */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.company')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.placeholder.company')}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl ${
                          isRedBlack
                            ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email Input */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="carlos.mendoza@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl ${
                          isRedBlack
                            ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={t('contact.placeholder.phone')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl ${
                          isRedBlack
                            ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Estado de la República Dropdown */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.state')}
                      </label>
                      <select
                        required
                        value={formData.state}
                        onChange={(e) => {
                          const nextState = e.target.value
                          setFormData({ ...formData, state: nextState })
                          window.dispatchEvent(new CustomEvent('form-select-state', { detail: { state: nextState } }))
                        }}
                        style={{
                          backgroundImage: `url("${isRedBlack ? selectArrowSvgWhite : selectArrowSvgDark}")`,
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.2em'
                        }}
                        className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl appearance-none bg-no-repeat pr-10 cursor-pointer ${
                          isRedBlack
                            ? 'bg-[#0b0d11] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      >
                        <option value="" disabled className={isRedBlack ? 'bg-[#0b0d11] text-gray-400' : 'bg-white text-gray-500'}>
                          {t('contact.placeholder.select')}
                        </option>
                        {statesOfMexico.map((state) => (
                          <option key={state} value={state} className={isRedBlack ? 'bg-[#0b0d11] text-white' : 'bg-white text-gray-900'}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tipo de Inmueble Dropdown */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.propertyType')}
                      </label>
                      <select
                        required
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        style={{
                          backgroundImage: `url("${isRedBlack ? selectArrowSvgWhite : selectArrowSvgDark}")`,
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.2em'
                        }}
                        className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl appearance-none bg-no-repeat pr-10 cursor-pointer ${
                          isRedBlack
                            ? 'bg-[#0b0d11] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                            : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      >
                        <option value="" disabled className={isRedBlack ? 'bg-[#0b0d11] text-gray-400' : 'bg-white text-gray-500'}>
                          {t('contact.placeholder.select')}
                        </option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type} className={isRedBlack ? 'bg-[#0b0d11] text-white' : 'bg-white text-gray-900'}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tipo de Servicio Dropdown */}
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      {t('contact.serviceType')}
                    </label>
                    <select
                      required
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      style={{
                        backgroundImage: `url("${isRedBlack ? selectArrowSvgWhite : selectArrowSvgDark}")`,
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.2em'
                      }}
                      className={`w-full px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 rounded-xl appearance-none bg-no-repeat pr-10 cursor-pointer ${
                        isRedBlack
                          ? 'bg-[#0b0d11] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                          : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                      }`}
                    >
                      <option value="" disabled className={isRedBlack ? 'bg-[#0b0d11] text-gray-400' : 'bg-white text-gray-500'}>
                        {t('contact.placeholder.select')}
                      </option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type} className={isRedBlack ? 'bg-[#0b0d11] text-white' : 'bg-white text-gray-900'}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      {t('contact.message')}
                      <span className="text-gray-400 font-normal normal-case ml-1.5">{t('contact.optional')}</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t('contact.placeholder.message')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`px-4 py-3 border outline-none text-xs font-medium transition-all duration-300 resize-none rounded-xl ${
                        isRedBlack
                          ? 'bg-[#0b0d11] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                          : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                      }`}
                    ></textarea>
                  </div>

                  {/* Captcha Verification Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                    {/* Captcha Canvas and Refresh */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                        <span>{t('contact.captcha.label')}</span>
                        <span className={`${isRedBlack ? 'text-gray-400' : 'text-gray-500'} font-normal normal-case`}>
                          {t('contact.captcha.instruction')}
                        </span>
                      </label>
                      <div className="flex items-center space-x-3">
                        {/* Double-Bezel canvas wrapper */}
                        <div className={`p-1 rounded-2xl shrink-0 ${isRedBlack ? 'bg-white/[0.02] border border-white/5' : 'bg-black/5 border border-black/5'}`}>
                          <canvas
                            id="captcha-canvas"
                            width="140"
                            height="44"
                            className="rounded-lg overflow-hidden shrink-0 block"
                          />
                        </div>
                        {/* Refresh Button */}
                        <button
                          type="button"
                          onClick={generateCaptcha}
                          className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                            isRedBlack
                              ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white hover:bg-white/[0.08]'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                          title="Actualizar código"
                        >
                          <ArrowClockwise size={16} weight="bold" />
                        </button>
                      </div>
                    </div>

                    {/* Input Field */}
                    <div className="flex flex-col text-left">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {t('contact.captcha.placeholder')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.captcha.placeholder')}
                        value={captchaInput}
                        onChange={(e) => {
                          setCaptchaInput(e.target.value)
                          if (captchaError) setCaptchaError(false)
                        }}
                        className={`px-4 py-3 border outline-none text-xs font-semibold transition-all duration-300 rounded-xl uppercase tracking-widest text-center ${
                          captchaError
                            ? 'border-red-500 bg-red-500/10 text-red-400 focus:ring-1 focus:ring-red-500/20'
                            : isRedBlack
                              ? 'bg-white/[0.03] border-white/10 hover:border-white/20 text-white focus:border-[#EF3B43] focus:ring-1 focus:ring-[#EF3B43]/30'
                              : 'bg-gray-50 hover:bg-gray-100/70 border-gray-200 focus:border-[#101820] text-gray-900 focus:ring-1 focus:ring-[#101820]/10'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Captcha Error Alert */}
                  {captchaError && (
                    <div className="text-left text-xs font-bold text-red-500 animate-pulse mt-1">
                      ⚠️ {t('contact.captcha.error')}
                    </div>
                  )}

                  {/* Submit Button with Nested CTA & Island Icon */}
                  <button
                    type="submit"
                    className={`w-full p-1 rounded-full active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group cursor-pointer ${
                      isRedBlack 
                        ? 'bg-white/[0.04] border border-white/10 hover:border-[#EF3B43]/30' 
                        : 'bg-black/5 border border-black/5 hover:border-[#EF3B43]/30'
                    }`}
                  >
                    <div className="w-full py-3 px-6 bg-[#EF3B43] hover:bg-[#101820] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3">
                      <span>{t('contact.submit')}</span>
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                        <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                </form>
              )}

              {/* Red Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EF3B43]"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
