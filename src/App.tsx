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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'careers'>('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any })
  }, [currentPage])

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#fafafa] antialiased overflow-x-hidden">
      {/* Floating Navigation Header */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Moving Tech Grid Background for the entire page */}
      <div className="fixed inset-0 z-0 animate-tech-grid opacity-35 pointer-events-none"></div>

      {/* Organic Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-red-100/25 rounded-full filter blur-[100px] animate-blob-1"></div>
        <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-[#101820]/5 rounded-full filter blur-[120px] animate-blob-2"></div>
        <div className="absolute top-2/3 left-1/4 w-[350px] h-[350px] bg-red-50/20 rounded-full filter blur-[80px] animate-blob-1" style={{ animationDelay: '5s' }}></div>
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
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Floating Cookie Consent Banner */}
      <CookieBanner />

      {/* Floating WhatsApp and Social Channels Widget */}
      <FloatingContact />

      {/* Global Info Modals */}
      <InfoModal />
    </div>
  )
}
