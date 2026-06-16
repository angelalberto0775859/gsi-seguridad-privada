import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowDown, MapPin } from '@phosphor-icons/react'
import { useSitePreferences } from '../lib/sitePreferences'

export default function Hero() {
  const { isRedBlack, t } = useSitePreferences()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    const playVideo = () => {
      void video.play().catch(() => {
        // Some browsers defer autoplay until the media is ready.
      })
    }

    playVideo()
    video.addEventListener('canplay', playVideo)

    return () => {
      video.removeEventListener('canplay', playVideo)
    }
  }, [])

  return (
    <section
      id="hero"
      className={`relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden transition-colors duration-500 ${
        isRedBlack ? 'bg-[#050608]' : 'bg-[#101820]'
      }`}
    >
      {/* Background Video - keeps the security team in motion */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-[0.96] contrast-[1.01] saturate-[1.05]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/recursos/gsi-equipo-rostros-distintos.png"
        aria-label="Equipo de seguridad privada GSI en movimiento"
      >
        <source src="/recursos/IDLE.mp4" type="video/mp4" />
      </video>

      {/* Header Vignette - Keeps logo/navbar perfectly readable */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black/70 via-black/25 to-transparent z-10 pointer-events-none"></div>

      {/* Reddish overlay and left shadow gradients for maximum legibility & theme styling */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none ${
          isRedBlack
            ? 'bg-[radial-gradient(circle_at_75%_50%,rgba(239,59,67,0.14),transparent_62%),linear-gradient(90deg,#050608_0%,rgba(5,6,8,0.42)_48%,transparent_100%),linear-gradient(180deg,transparent_76%,#050608_100%)]'
            : 'bg-[radial-gradient(circle_at_75%_50%,rgba(239,59,67,0.12),transparent_62%),linear-gradient(90deg,#101820_0%,rgba(16,24,32,0.42)_48%,transparent_100%),linear-gradient(180deg,transparent_76%,#fafafa_100%)]'
        }`}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Typography Content directly on background */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 text-white">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 border rounded-full ${
                isRedBlack ? 'bg-black/35 border-[#EF3B43]/45' : 'bg-white/10 border-white/20'
              }`}
            >
              <ShieldCheck size={16} className="text-[#EF3B43]" weight="fill" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-white/90">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Main H1 Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white tracking-tight text-balance">
              {t('hero.title.before')} <br />
              <span className="text-[#EF3B43]">{t('hero.title.accent')}</span>.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base font-medium leading-relaxed text-white/90 max-w-[54ch]">
              {t('hero.description')}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-lg shadow-black/10 rounded-full hover:scale-105 active:scale-95 ${
                  isRedBlack ? 'bg-[#EF3B43] hover:bg-white hover:text-[#050608]' : 'bg-[#EF3B43] hover:bg-[#101820]'
                }`}
              >
                {t('hero.primary')}
              </a>
              <a
                href="#services"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider border text-white bg-white/5 border-white/15 rounded-full hover:bg-white/10 hover:border-[#EF3B43] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {t('hero.secondary')}
              </a>
            </div>

          </div>

          {/* Right Column: Subtle HUD & Interactive Staggered Metrics */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Live Status indicator */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
              className="flex items-center space-x-2 px-1 pb-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-white/85 uppercase">
                {t('hero.liveStatus')}
              </span>
            </motion.div>

            {/* Metric 1: Continuity (Clickable Link to cert-iso modal) */}
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
              onClick={() => window.dispatchEvent(new CustomEvent('open-info-modal', { detail: { type: 'cert-iso' } }))}
              className="group text-left border border-[#EF3B43]/30 hover:border-[#EF3B43] bg-black/35 hover:bg-[#EF3B43]/5 p-5 rounded-xl transition-all duration-300 cursor-pointer w-full"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-4xl font-black leading-none text-white tracking-tight">
                    99.8%
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white/90 transition-colors">
                    {t('hero.metric.continuity')}
                  </p>
                </div>
                <ShieldCheck size={20} className="text-[#EF3B43]/70 group-hover:text-[#EF3B43] transition-colors" weight="fill" />
              </div>
            </motion.button>

            {/* Metric 2: Coverage (Clickable Link to map) */}
            <motion.a
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.28 }}
              href="#coverage"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('coverage')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group text-left border border-[#EF3B43]/30 hover:border-[#EF3B43] bg-black/35 hover:bg-[#EF3B43]/5 p-5 rounded-xl transition-all duration-300 cursor-pointer w-full block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-4xl font-black leading-none text-white tracking-tight">
                    +35
                  </p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white/90 transition-colors">
                    {t('hero.metric.branches')}
                  </p>
                </div>
                <MapPin size={20} className="text-[#EF3B43]/70 group-hover:text-[#EF3B43] transition-colors" weight="fill" />
              </div>
            </motion.a>

          </div>

        </div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <motion.a
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          href="#story"
          className={`p-3 border rounded-full shadow-md hover:shadow-lg inline-flex items-center justify-center hover:text-[#EF3B43] hover:border-[#EF3B43] transition-all ${
            isRedBlack ? 'bg-white/5 border-white/10 text-white/70' : 'bg-white border-gray-200 text-gray-600'
          }`}
        >
          <ArrowDown size={18} strokeWidth={2.5} />
        </motion.a>
      </div>
    </section>
  )
}
