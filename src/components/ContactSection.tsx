import { useState } from 'react'
import { Phone, WhatsappLogo, ShieldCheck } from '@phosphor-icons/react'
import { useSitePreferences } from '../lib/sitePreferences'

export default function ContactSection() {
  const { isRedBlack, t } = useSitePreferences()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', company: '', email: '', phone: '', message: '' })
    }, 4000)
  }

  return (
    <section id="contact" className={`py-24 text-white relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-black' : 'bg-[#101820]'
    }`}>
      {/* Background design accents */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/[0.01] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Call info & Trust cards */}
        <div className="lg:col-span-5 text-left space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-[#EF3B43] tracking-widest uppercase">
              {t('contact.eyebrow')}
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">
              {t('contact.title')}
            </h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-[45ch]">
              {t('contact.description')}
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone Card */}
            <div className="bg-white/5 border border-white/10 p-6 flex items-start space-x-4 rounded-[24px]">
              <div className="p-3 bg-white/5 text-[#EF3B43] rounded-xl">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {t('contact.phone')}
                </p>
                <a
                  href="tel:8008305990"
                  className="font-display text-xl font-extrabold hover:text-[#EF3B43] transition-colors block mt-1"
                >
                  800 8305 990
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/5 border border-white/10 p-6 flex items-start space-x-4 rounded-[24px]">
              <div className="p-3 bg-white/5 text-[#25D366] rounded-xl">
                <WhatsappLogo size={24} weight="fill" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {t('contact.whatsapp')}
                </p>
                <a
                  href="https://wa.me/5215500000000?text=Hola,%20me%20gustaría%20cotizar%20servicios%20de%20seguridad%20privada."
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xl font-extrabold hover:text-[#25D366] transition-colors block mt-1"
                >
                  {t('contact.whatsappCta')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form (Vanguard style, clean organic inputs) */}
        <div className="lg:col-span-7">
          <div className={`p-8 md:p-10 shadow-2xl relative rounded-[32px] overflow-hidden ${
            isRedBlack ? 'bg-[#0b0d11] text-white border border-[#EF3B43]/25' : 'bg-white text-gray-900'
          }`}>
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck size={36} weight="fill" />
                </div>
                <h4 className={`font-display text-2xl font-bold ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                  {t('contact.successTitle')}
                </h4>
                <p className="text-sm text-gray-500 max-w-[40ch] mx-auto">
                  {t('contact.successText')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-left space-y-2 mb-8">
                  <h4 className={`font-display text-2xl font-black ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                    {t('contact.formTitle')}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t('contact.formText')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#101820] outline-none text-sm font-medium transition-colors rounded-xl"
                    />
                  </div>

                  {/* Company Input */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {t('contact.company')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Logística Industrial S.A."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#101820] outline-none text-sm font-medium transition-colors rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="carlos.mendoza@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#101820] outline-none text-sm font-medium transition-colors rounded-xl"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10 dígitos"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#101820] outline-none text-sm font-medium transition-colors rounded-xl"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {t('contact.message')}
                    <span className="text-gray-400 font-normal normal-case ml-1">{t('contact.optional')}</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe brevemente tus requerimientos o número de guardias requeridos..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#101820] outline-none text-sm font-medium transition-colors resize-none rounded-xl"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#EF3B43] hover:bg-[#101820] transition-colors duration-300 shadow-lg shadow-[#EF3B43]/20 rounded-full"
                >
                  {t('contact.submit')}
                </button>
              </form>
            )}

            {/* Subtle bottom indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#EF3B43]"></div>
          </div>
        </div>

      </div>
    </section>
  )
}
