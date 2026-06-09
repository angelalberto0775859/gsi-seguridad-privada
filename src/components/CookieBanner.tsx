import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from '@phosphor-icons/react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('gsi-cookies-accepted')
    if (!consent) {
      // Small delay to make the entrance look natural
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('gsi-cookies-accepted', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('gsi-cookies-accepted', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-50"
        >
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 p-6 shadow-2xl rounded-[24px] relative flex flex-col space-y-4">
            
            {/* Header / Info */}
            <div className="flex items-start space-x-3 text-left">
              <div className="p-2.5 bg-red-50 text-[#EF3B43] rounded-xl shrink-0">
                <Cookie size={22} weight="fill" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display text-sm font-bold text-[#101820]">
                  Control de Privacidad
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Utilizamos cookies para optimizar la navegación y analizar el tráfico de nuestro sitio de seguridad privada. Al continuar, aceptas el uso de cookies.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={handleDecline}
                className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors rounded-full border border-gray-200 hover:border-gray-300"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#101820] hover:bg-[#EF3B43] transition-colors rounded-full shadow-lg shadow-[#101820]/10"
              >
                Aceptar
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Cerrar"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
