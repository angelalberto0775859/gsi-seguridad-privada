import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'

interface NavbarProps {
  currentPage: 'home' | 'careers'
  setCurrentPage: (page: 'home' | 'careers') => void
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-0'
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
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavigation('#story')}
            className="text-sm font-medium text-gray-800 hover:text-[#EF3B43] transition-colors relative py-2 group cursor-pointer focus:outline-none"
          >
            Nuestra Historia
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button
            onClick={() => handleNavigation('#services')}
            className="text-sm font-medium text-gray-800 hover:text-[#EF3B43] transition-colors relative py-2 group cursor-pointer focus:outline-none"
          >
            Servicios
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button
            onClick={() => handleNavigation('#coverage')}
            className="text-sm font-medium text-gray-800 hover:text-[#EF3B43] transition-colors relative py-2 group cursor-pointer focus:outline-none"
          >
            Cobertura
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EF3B43] transition-all duration-300 group-hover:w-full"></span>
          </button>
          
          <button
            onClick={handleGoToCareers}
            className={`text-sm font-medium transition-colors relative py-2 group cursor-pointer focus:outline-none ${
              currentPage === 'careers' ? 'text-[#EF3B43]' : 'text-gray-800 hover:text-[#EF3B43]'
            }`}
          >
            Bolsa de Trabajo
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#EF3B43] transition-all duration-300 ${currentPage === 'careers' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          
          <button
            onClick={() => handleNavigation('#contact')}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#101820] hover:bg-[#EF3B43] transition-colors duration-300 cursor-pointer"
          >
            Contacto
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
            aria-label="Abrir menú"
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
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-6 space-y-4 shadow-lg">
          <button
            onClick={() => handleNavigation('#story')}
            className="block w-full text-left text-base font-semibold text-gray-800 hover:text-[#EF3B43] cursor-pointer"
          >
            Nuestra Historia
          </button>
          <button
            onClick={() => handleNavigation('#services')}
            className="block w-full text-left text-base font-semibold text-gray-800 hover:text-[#EF3B43] cursor-pointer"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavigation('#coverage')}
            className="block w-full text-left text-base font-semibold text-gray-800 hover:text-[#EF3B43] cursor-pointer"
          >
            Cobertura
          </button>
          <button
            onClick={handleGoToCareers}
            className={`block w-full text-left text-base font-semibold cursor-pointer ${
              currentPage === 'careers' ? 'text-[#EF3B43]' : 'text-gray-800 hover:text-[#EF3B43]'
            }`}
          >
            Bolsa de Trabajo
          </button>
          <button
            onClick={() => handleNavigation('#contact')}
            className="block w-full text-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#101820] cursor-pointer"
          >
            Contacto
          </button>
        </div>
      )}
    </nav>
  )
}
