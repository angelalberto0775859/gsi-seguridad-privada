import { useState, useEffect } from 'react'
import { List, Palette, Translate, X } from '@phosphor-icons/react'
import { languageLabels, supportedLanguages, useSitePreferences } from '../lib/sitePreferences'

interface NavbarProps {
  currentPage: 'home' | 'careers'
  setCurrentPage: (page: 'home' | 'careers') => void
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
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
    if (currentPage !== 'home') {
      setCurrentPage('home')
      // Wait for page render before scrolling
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
    setIsMobileMenuOpen(false)
  }

  const handleGoToCareers = () => {
    setCurrentPage('careers')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage !== 'home') {
      setCurrentPage('home')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isRedBlack
            ? 'bg-[#050608]/90 backdrop-blur-md shadow-sm border-b border-[#EF3B43]/20 py-0'
            : 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-0'
          : isRedBlack
            ? 'bg-[#050608]/70 backdrop-blur-sm py-4'
            : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo (GSI Branding - Red & Black, Transparent - Ultra Grande Dinámico) */}
        <a 
          href="#hero" 
          onClick={handleLogoClick}
          className={`relative block transition-all duration-300 ${
            isScrolled 
              ? 'h-16 w-[180px] sm:h-20 sm:w-[240px] md:h-28 md:w-[320px] py-1' 
              : 'h-24 w-[240px] sm:h-32 sm:w-[320px] md:h-40 md:w-[440px] py-2'
          }`}
        >
          <img
            src="/recursos/Logotipos 2023 fondo transparente_GSI SEGURIDAD PRIVADA.png"
            alt="GSI Seguridad Privada Logo"
            className="h-full w-auto object-contain"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleNavigation('#story')}
            className={`text-sm font-medium hover:text-[#EF3B43] transition-colors relative py-2 group cursor-pointer focus:outline-none ${isRedBlack ? 'text-white/85' : 'text-gray-800'}`}
          >
            {t('nav.history')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button
            onClick={() => handleNavigation('#services')}
            className={`text-sm font-medium hover:text-[#EF3B43] transition-colors relative py-2 group cursor-pointer focus:outline-none ${isRedBlack ? 'text-white/85' : 'text-gray-800'}`}
          >
            {t('nav.services')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button
            onClick={() => handleNavigation('#coverage')}
            className={`text-sm font-medium hover:text-[#EF3B43] transition-colors relative py-2 group cursor-pointer focus:outline-none ${isRedBlack ? 'text-white/85' : 'text-gray-800'}`}
          >
            {t('nav.coverage')}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button
            onClick={handleGoToCareers}
            className={`text-sm font-medium transition-colors relative py-2 group cursor-pointer focus:outline-none ${
              currentPage === 'careers' ? 'text-[#EF3B43]' : isRedBlack ? 'text-white/85 hover:text-[#EF3B43]' : 'text-gray-800 hover:text-[#EF3B43]'
            }`}
          >
            {t('nav.careers')}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EF3B43] transition-all duration-300 ${currentPage === 'careers' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <div className={`flex items-center gap-1 border px-1.5 py-1 rounded-full ${
            isRedBlack ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white/70'
          }`}>
            <Translate size={14} className={isRedBlack ? 'text-white/70' : 'text-gray-500'} />
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
            className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-all ${
              isRedBlack
                ? 'border-[#EF3B43]/50 bg-[#EF3B43] text-white'
                : 'border-gray-200 bg-white/80 text-gray-700 hover:border-[#EF3B43]/40 hover:text-[#EF3B43]'
            }`}
            aria-label={t('controls.theme')}
          >
            <Palette size={14} weight="fill" />
            {isRedBlack ? t('controls.classic') : t('controls.redblack')}
          </button>
          
          <button
            onClick={() => handleNavigation('#contact')}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#101820] hover:bg-[#EF3B43] transition-colors duration-300 cursor-pointer"
          >
            {t('nav.contact')}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 focus:outline-none cursor-pointer ${isRedBlack ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
        <div className={`md:hidden border-b py-4 px-6 space-y-4 shadow-lg ${
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
