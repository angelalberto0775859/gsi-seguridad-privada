import { ShieldCheck, LinkedinLogo, InstagramLogo, TiktokLogo, WhatsappLogo } from '@phosphor-icons/react'
import { useSitePreferences } from '../lib/sitePreferences'

interface FooterProps {
  currentPage?: 'home' | 'careers'
  setCurrentPage?: (page: 'home' | 'careers') => void
}

export default function Footer({ currentPage, setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const { isRedBlack, t } = useSitePreferences()

  const handleNavigation = (hash: string) => {
    if (setCurrentPage && currentPage && currentPage !== 'home') {
      setCurrentPage('home')
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    } else {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleGoToCareers = () => {
    if (setCurrentPage) {
      setCurrentPage('careers')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleGoToHome = () => {
    if (setCurrentPage) {
      setCurrentPage('home')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className={`text-white border-t py-16 relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-black border-[#EF3B43]/20' : 'bg-[#101820] border-white/5'
    }`}>
      {/* Background design accents */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/[0.01] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-left">
          
          {/* Logo and Intro */}
          <div className="space-y-4">
            <div className="block h-20">
              <img
                src="/recursos/Logotipos 2023 colo blanco fondo transparente_GSI SEGURIDAD PRIVADA.png"
                alt="GSI Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-[35ch]">
              {t('footer.description')}
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.linkedin.com/company/gsi-seguridadprivada/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#EF3B43] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="LinkedIn GSI"
              >
                <LinkedinLogo size={16} weight="fill" />
              </a>
              <a 
                href="https://www.instagram.com/gsisegprivada/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#EF3B43] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Instagram GSI"
              >
                <InstagramLogo size={16} weight="fill" />
              </a>
              <a 
                href="https://tiktok.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#EF3B43] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="TikTok GSI"
              >
                <TiktokLogo size={16} weight="fill" />
              </a>
              <a 
                href="https://wa.me/528008305990" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-green-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="WhatsApp GSI"
              >
                <WhatsappLogo size={16} weight="fill" />
              </a>
            </div>
          </div>

          {/* Mapa del Sitio (Sitemap) */}
          <div className="space-y-4">
            <h5 className="font-display text-xs font-bold uppercase tracking-wider text-[#EF3B43]">
              {t('footer.sitemap')}
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button 
                  onClick={handleGoToHome} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {t('footer.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#story')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {t('nav.history')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#coverage')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {t('nav.coverage')}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleGoToCareers} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {t('nav.careers')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#contact')} 
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div className="space-y-4">
            <h5 className="font-display text-xs font-bold uppercase tracking-wider text-[#EF3B43]">
              {t('footer.accreditations')}
            </h5>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'cert-iso' } }))}
                className="flex items-center space-x-2 border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-[#EF3B43]/30 px-3 py-2 transition-all rounded-xl text-left text-gray-400 hover:text-white cursor-pointer w-full text-xs focus:outline-none"
              >
                <ShieldCheck size={14} className="text-[#EF3B43] shrink-0" />
                <span className="truncate">Certificación ISO 9001:2015</span>
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'cert-basc' } }))}
                className="flex items-center space-x-2 border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-[#EF3B43]/30 px-3 py-2 transition-all rounded-xl text-left text-gray-400 hover:text-white cursor-pointer w-full text-xs focus:outline-none"
              >
                <ShieldCheck size={14} className="text-[#EF3B43] shrink-0" />
                <span className="truncate">Certificación BASC Activa</span>
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'compliance' } }))}
                className="flex items-center space-x-2 border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-[#EF3B43]/30 px-3 py-2 transition-all rounded-xl text-left text-gray-400 hover:text-white cursor-pointer w-full text-xs focus:outline-none"
              >
                <ShieldCheck size={14} className="text-[#EF3B43] shrink-0" />
                <span className="truncate">Autorización Federal DGSP</span>
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'cert-esr' } }))}
                className="flex items-center space-x-2 border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-[#EF3B43]/30 px-3 py-2 transition-all rounded-xl text-left text-gray-400 hover:text-white cursor-pointer w-full text-xs focus:outline-none"
              >
                <ShieldCheck size={14} className="text-[#EF3B43] shrink-0" />
                <span className="truncate">Empresa Socialmente Responsable</span>
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <h5 className="font-display text-xs font-bold uppercase tracking-wider text-[#EF3B43]">
              {t('footer.support')}
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>{t('footer.hours')}</li>
              <li>{t('footer.operational')}</li>
              <li>Línea Directa: 800 8305 990</li>
              <li>contacto@gsiseguridad.com.mx</li>
            </ul>
          </div>

        </div>

        <div className="h-[1px] bg-white/5 my-12"></div>

        {/* Legal Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} GSI Seguridad Privada. {t('footer.rights')}</p>
          <div className="flex flex-wrap gap-3 mt-2 sm:mt-0 justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'privacy' } }))}
              className="px-3 py-1.5 border border-white/10 hover:border-[#EF3B43]/50 hover:text-white transition-all text-gray-400 bg-white/5 rounded-lg cursor-pointer text-[10px] font-medium focus:outline-none"
            >
              {t('footer.privacy')}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'terms' } }))}
              className="px-3 py-1.5 border border-white/10 hover:border-[#EF3B43]/50 hover:text-white transition-all text-gray-400 bg-white/5 rounded-lg cursor-pointer text-[10px] font-medium focus:outline-none"
            >
              {t('footer.terms')}
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'compliance' } }))}
              className="px-3 py-1.5 border border-white/10 hover:border-[#EF3B43]/50 hover:text-white transition-all text-gray-400 bg-white/5 rounded-lg cursor-pointer text-[10px] font-medium focus:outline-none"
            >
              {t('footer.dgsp')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
