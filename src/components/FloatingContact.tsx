import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WhatsappLogo, LinkedinLogo, InstagramLogo, TiktokLogo, X, ChatCircleDots } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

const contentDict: Record<Language, {
  title: string
  subtitle: string
  whatsappCta: string
  socialTitle: string
  closeAria: string
}> = {
  es: {
    title: 'Contacto & Soporte GSI',
    subtitle: '¿Buscas servicios de seguridad o vacantes? Conéctate directo con nuestro equipo.',
    whatsappCta: 'Escríbenos por WhatsApp',
    socialTitle: 'Redes Sociales GSI',
    closeAria: 'Cerrar menú de contacto'
  },
  en: {
    title: 'GSI Contact & Support',
    subtitle: 'Looking for security services or vacancies? Connect directly with our team.',
    whatsappCta: 'Message us on WhatsApp',
    socialTitle: 'GSI Social Networks',
    closeAria: 'Close contact menu'
  },
  zh: {
    title: 'GSI 联系与支持',
    subtitle: '在寻找安保服务或工作机会？直接与我们的团队联系。',
    whatsappCta: '通过 WhatsApp 联系我们',
    socialTitle: 'GSI 社交媒体',
    closeAria: '关闭联系菜单'
  }
}

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useSitePreferences()
  const content = contentDict[language]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanding Contact Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 bg-[#101820] border border-white/10 rounded-2xl shadow-2xl p-5 w-72 relative overflow-hidden text-left text-white"
          >
            {/* Header Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#EF3B43]"></div>

            {/* Close button inside card */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label={content.closeAria}
            >
              <X size={14} weight="bold" />
            </button>

            {/* Card Content */}
            <div className="space-y-4 pt-1">
              
              {/* Title & Info */}
              <div className="space-y-1">
                <h5 className="font-display text-xs font-black text-white tracking-tight flex items-center gap-1.5">
                  <ChatCircleDots size={16} className="text-[#EF3B43]" />
                  {content.title}
                </h5>
                <p className="text-[10px] text-gray-400 leading-normal">
                  {content.subtitle}
                </p>
              </div>

              {/* Big WhatsApp button */}
              <a
                href="https://wa.me/528008305990"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-green-500/10 cursor-pointer active:scale-95"
              >
                <WhatsappLogo size={18} weight="fill" />
                {content.whatsappCta}
              </a>

              {/* Social networks container */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                  {content.socialTitle}
                </span>
                
                <div className="flex justify-around pt-1">
                  
                  {/* LinkedIn link */}
                  <div className="flex flex-col items-center space-y-1">
                    <a
                      href="https://www.linkedin.com/company/gsi-seguridadprivada/posts/?feedView=all"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0A66C2] text-white hover:text-white border border-white/10 hover:border-transparent transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-90"
                      aria-label="LinkedIn"
                    >
                      <LinkedinLogo size={18} weight="fill" />
                    </a>
                    <span className="text-[9px] font-bold text-white">LinkedIn</span>
                  </div>

                  {/* Instagram link */}
                  <div className="flex flex-col items-center space-y-1">
                    <a
                      href="https://www.instagram.com/gsisegprivada/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] text-white hover:text-white border border-white/10 hover:border-transparent transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-90"
                      aria-label="Instagram"
                    >
                      <InstagramLogo size={18} weight="fill" />
                    </a>
                    <span className="text-[9px] font-bold text-white">Instagram</span>
                  </div>

                  {/* TikTok link */}
                  <div className="flex flex-col items-center space-y-1">
                    <a
                      href="https://tiktok.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white hover:text-black text-white border border-white/10 hover:border-transparent transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-90"
                      aria-label="TikTok"
                    >
                      <TiktokLogo size={18} weight="fill" />
                    </a>
                    <span className="text-[9px] font-bold text-white">TikTok</span>
                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button (WhatsApp Pulsing Widget) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white flex items-center justify-center shadow-xl shadow-green-500/20 relative z-10 transition-transform duration-300 active:scale-90 hover:scale-105 cursor-pointer focus:outline-none"
        aria-label="Abrir opciones de contacto y WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/45 animate-ping pointer-events-none"></span>
        <WhatsappLogo size={32} weight="fill" className="relative z-10" />
      </button>

    </div>
  )
}
