import { useState, useEffect } from 'react'
import { List, Palette, Translate, X } from '@phosphor-icons/react'
import { languageLabels, supportedLanguages, useSitePreferences } from '../lib/sitePreferences'

interface NavbarProps {
  currentPage: 'home' | 'careers'
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, visualMode, setVisualMode, isRedBlack, t } = useSitePreferences()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (hash: string) => {
    if (window.location.hash === hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.hash = hash
    }
    setIsMobileMenuOpen(false)
  }

  const handleGoToCareers = () => {
    window.location.hash = '#careers'
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.location.hash === '' || window.location.hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.hash = '#'
    }
    setIsMobileMenuOpen(false)
  }

  const logoSrc = isRedBlack
    ? '/recursos/Logotipos 2023 colo blanco fondo transparente_GSI SEGURIDAD PRIVADA.png'
    : '/recursos/Logotipos 2023 fondo transparente_GSI SEGURIDAD PRIVADA.png'

  const navButtonClass = `text-[13px] font-semibold transition-colors relative py-2 group cursor-pointer focus:outline-none whitespace-nowrap ${
    isRedBlack ? 'text-white/90 hover:text-white' : 'text-gray-800 hover:text-[#EF3B43]'
  }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isRedBlack
          ? isScrolled
            ? 'bg-[#050608]/75 backdrop-blur-md shadow-sm border-b border-[#EF3B43]/20 py-0'
            : 'bg-[#050608] border-b border-white/5 py-2'
          : isScrolled
            ? 'bg-white/70 backdrop-blur-md shadow-md shadow-black/5 border-b border-gray-200/40 py-0'
            : 'bg-white border-b border-gray-200/80 py-2'
      }`}
    >
      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-2 lg:gap-4 xl:gap-8">
        {/* Brand Logo (GSI Branding - Red & Black, Transparent - Elegant and Compact) */}
        <a 
          href="#hero" 
          onClick={handleLogoClick}
          className={`relative block shrink-0 transition-all duration-300 ${
            isScrolled 
              ? 'h-[60px] w-[180px] sm:h-[70px] sm:w-[210px] lg:h-[80px] lg:w-[240px] py-1' 
              : 'h-[80px] w-[240px] sm:h-[95px] sm:w-[285px] lg:h-[105px] lg:w-[315px] py-1.5'
          }`}
        >
          <img
            src={logoSrc}
            alt="GSI Seguridad Privada Logo"
            className="h-full w-auto object-contain"
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex min-w-0 flex-1 items-center justify-end gap-3 lg:gap-4 xl:gap-6">
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2.5 lg:gap-4 xl:gap-6 2xl:gap-7">
            <button
              onClick={() => handleNavigation('#story')}
              className={navButtonClass}
            >
              {t('nav.history')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button
              onClick={() => handleNavigation('#services')}
              className={navButtonClass}
            >
              {t('nav.services')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button
              onClick={() => handleNavigation('#coverage')}
              className={navButtonClass}
            >
              {t('nav.coverage')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
            </button>
            
            <button
              onClick={handleGoToCareers}
              className={`text-[13px] font-semibold transition-colors relative py-2 group cursor-pointer focus:outline-none whitespace-nowrap ${
                currentPage === 'careers'
                  ? 'text-[#EF3B43]'
                  : isRedBlack
                  ? 'text-white/90 hover:text-white'
                  : 'text-gray-800 hover:text-[#EF3B43]'
              }`}
            >
              {t('nav.careers')}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EF3B43] transition-all duration-300 ${currentPage === 'careers' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:gap-2 xl:gap-3">
            <div className={`flex items-center gap-1 border px-1.5 py-1 rounded-full ${
              isRedBlack ? 'border-white/18 bg-white/12 backdrop-blur-md' : 'border-gray-200 bg-gray-50'
            }`}>
              <Translate size={14} className={isRedBlack ? 'text-white/72' : 'text-gray-500'} />
              {supportedLanguages.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  className={`px-2 py-1 text-[10px] font-black rounded-full transition-colors ${
                    language === option
                      ? 'bg-[#EF3B43] text-white'
                    : isRedBlack
                      ? 'text-white/65 hover:text-white'
                      : 'text-gray-500 hover:text-[#101820]'
                  }`}
                  aria-label={`${t('controls.language')}: ${languageLabels[option]}`}
                >
                  {languageLabels[option]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setVisualMode(visualMode === 'redblack' ? 'classic' : 'redblack')}
              className={`inline-flex h-9 w-9 lg:w-auto items-center justify-center gap-2 border px-0 lg:px-3 text-[10px] font-black uppercase tracking-wider rounded-full transition-all ${
                isRedBlack
                  ? 'border-[#EF3B43]/50 bg-[#EF3B43] text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-[#EF3B43]/40 hover:text-[#EF3B43]'
              }`}
              aria-label={t('controls.theme')}
              title={t('controls.theme')}
            >
              <Palette size={14} weight="fill" />
              <span className="hidden lg:inline">{isRedBlack ? t('controls.classic') : t('controls.redblack')}</span>
            </button>
            
            <button
              onClick={() => handleNavigation('#contact')}
              className="inline-flex items-center justify-center px-3 lg:px-4 xl:px-5 py-2.5 text-[10px] lg:text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-white bg-[#101820] hover:bg-[#EF3B43] transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 focus:outline-none cursor-pointer ${
              isRedBlack ? 'text-white/86 hover:text-white' : 'text-gray-800 hover:text-gray-950'
            }`}
            aria-label={t('nav.menu')}
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={2} />
            ) : (
              <List size={24} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-b py-4 px-6 space-y-4 shadow-lg ${
          isRedBlack ? 'bg-[#07080b] border-[#EF3B43]/20' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {supportedLanguages.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                className={`px-3 py-1.5 text-xs font-black rounded-full ${
                  language === option
                    ? 'bg-[#EF3B43] text-white'
                    : isRedBlack
                      ? 'bg-white/5 text-white/75'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {languageLabels[option]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setVisualMode(visualMode === 'redblack' ? 'classic' : 'redblack')}
              className={`px-3 py-1.5 text-xs font-black rounded-full ${
                isRedBlack ? 'bg-[#EF3B43] text-white' : 'bg-[#101820] text-white'
              }`}
            >
              {isRedBlack ? t('controls.classic') : t('controls.redblack')}
            </button>
          </div>
          <button
            onClick={() => handleNavigation('#story')}
            className={`block w-full text-left text-base font-semibold hover:text-[#EF3B43] cursor-pointer ${isRedBlack ? 'text-white/85' : 'text-gray-800'}`}
          >
            {t('nav.history')}
          </button>
          <button
            onClick={() => handleNavigation('#services')}
            className={`block w-full text-left text-base font-semibold hover:text-[#EF3B43] cursor-pointer ${isRedBlack ? 'text-white/85' : 'text-gray-800'}`}
          >
            {t('nav.services')}
          </button>
          <button
            onClick={() => handleNavigation('#coverage')}
            className={`block w-full text-left text-base font-semibold hover:text-[#EF3B43] cursor-pointer ${isRedBlack ? 'text-white/85' : 'text-gray-800'}`}
          >
            {t('nav.coverage')}
          </button>
          <button
            onClick={handleGoToCareers}
            className={`block w-full text-left text-base font-semibold cursor-pointer ${
              currentPage === 'careers' ? 'text-[#EF3B43]' : isRedBlack ? 'text-white/85 hover:text-[#EF3B43]' : 'text-gray-800 hover:text-[#EF3B43]'
            }`}
          >
            {t('nav.careers')}
          </button>
          <button
            onClick={() => handleNavigation('#contact')}
            className="block w-full text-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#101820] cursor-pointer"
          >
            {t('nav.contact')}
          </button>
        </div>
      )}
    </nav>
  )
}
