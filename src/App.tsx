import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HistoryTimeline from './components/HistoryTimeline'
import ServicesBento from './components/ServicesBento'
import CertificationsCarousel from './components/CertificationsCarousel'
import ArmedGallery from './components/ArmedGallery'
import InteractiveMap from './components/InteractiveMap'
import CareersSection from './components/CareersSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import FloatingContact from './components/FloatingContact'
import InfoModal from './components/InfoModal'
import { SitePreferencesProvider, useSitePreferences } from './lib/sitePreferences'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'careers'>('home')
  const { isRedBlack } = useSitePreferences()

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#careers')) {
        setCurrentPage('careers')
        window.scrollTo({ top: 0, behavior: 'instant' })
      } else {
        setCurrentPage('home')
        if (hash && hash !== '#' && hash !== '#home') {
          // Wait for DOM to render if switching sections
          setTimeout(() => {
            const target = document.getElementById(hash.substring(1))
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' })
            }
          }, 150)
        }
      }
    }

    // Initialize on mount
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <div className={`relative w-full min-h-[100dvh] antialiased overflow-x-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-[#050608] text-white' : 'bg-[#fafafa]'
    }`}>
      {/* Floating Navigation Header */}
      <Navbar currentPage={currentPage} />

      {/* Organic Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full filter blur-[100px] animate-blob-1 ${
          isRedBlack ? 'bg-[#EF3B43]/30' : 'bg-red-100/25'
        }`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-[550px] h-[550px] rounded-full filter blur-[120px] animate-blob-2 ${
          isRedBlack ? 'bg-black/40' : 'bg-[#101820]/5'
        }`}></div>
        <div className={`absolute top-2/3 left-1/4 w-[350px] h-[350px] rounded-full filter blur-[80px] animate-blob-1 ${
          isRedBlack ? 'bg-[#EF3B43]/18' : 'bg-red-50/20'
        }`} style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Main Sections (z-10 to sit above animated background) */}
      <main className="relative z-10">
        {currentPage === 'home' ? (
          <>
            {/* Cinematic Hero Section */}
            <Hero />

            {/* Narrative / History Storytelling Timeline */}
            <HistoryTimeline />

            {/* Interactive Bento Grid Services */}
            <ServicesBento />

            {/* Certifications Carousel (Trust and Compliance) */}
            <CertificationsCarousel />

            {/* Armed Custody Operational Gallery */}
            <ArmedGallery />

            {/* National Coverage Interactive Hub (Large Immersive Map Dashboard) */}
            <InteractiveMap />

            {/* B2B Secure Contact & Consultation */}
            <ContactSection />
          </>
        ) : (
          /* Separate view for Careers (Bolsa de trabajo) */
          <CareersSection />
        )}
      </main>

      {/* Footer Block */}
      <Footer />

      {/* Floating Cookie Consent Banner */}
      <CookieBanner />

      {/* Floating WhatsApp and Social Channels Widget */}
      <FloatingContact />

      {/* Global Info Modals */}
      <InfoModal />
    </div>
  )
}

export default function App() {
  return (
    <SitePreferencesProvider>
      <AppContent />
    </SitePreferencesProvider>
  )
}
