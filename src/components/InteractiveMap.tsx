import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Envelope, Clock, Broadcast, Shield, CheckCircle } from '@phosphor-icons/react'
import { useSitePreferences } from '../lib/sitePreferences'

interface Branch {
  id: string
  name: string
  region: string
  phone: string
  email: string
  address: string
  x: number // Map coordinate percentage X
  y: number // Map coordinate percentage Y
  coverage: string[]
}

const branches: Branch[] = [
  {
    id: 'tijuana',
    name: 'Sucursal Tijuana',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Paseo de los Héroes 95, Zona Río, Tijuana, B.C.',
    x: 8.7,
    y: 15.8,
    coverage: ['Baja California', 'Ensenada', 'Mexicali', 'Tecate']
  },
  {
    id: 'hermosillo',
    name: 'Sucursal Hermosillo',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Blvd. Kino 310, Col. Pitic, Hermosillo, Sonora.',
    x: 24.5,
    y: 25.5,
    coverage: ['Sonora', 'Nogales', 'Guaymas', 'Navojoa']
  },
  {
    id: 'lapaz',
    name: 'Sucursal La Paz',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Calle Álvaro Obregón 450, Col. Centro, La Paz, B.C.S.',
    x: 21.75,
    y: 42.75,
    coverage: ['Baja California Sur', 'Los Cabos', 'Loreto']
  },
  {
    id: 'obregon',
    name: 'Sucursal Ciudad Obregón',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Calle Sinaloa 200, Centro, Ciudad Obregón, Sonora.',
    x: 27.5,
    y: 30.0,
    coverage: ['Sonora Sur', 'Guaymas', 'Navojoa']
  },
  {
    id: 'culiacan',
    name: 'Sucursal Culiacán',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Blvd. Pedro Anaya 45, Col. Centro, Culiacán, Sinaloa.',
    x: 34.0,
    y: 42.5,
    coverage: ['Sinaloa', 'Mazatlán', 'Los Mochis']
  },
  {
    id: 'juarez',
    name: 'Sucursal Ciudad Juárez',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Tecnológico 2400, Col. Partido Romero, Ciudad Juárez, Chihuahua.',
    x: 36.2,
    y: 19.5,
    coverage: ['Chihuahua Norte', 'El Paso Area']
  },
  {
    id: 'chihuahua',
    name: 'Sucursal Chihuahua',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Universidad 900, Col. San Felipe, Chihuahua, Chihuahua.',
    x: 39.5,
    y: 27.0,
    coverage: ['Chihuahua Centro-Sur', 'Delicias', 'Parral', 'Cuauhtémoc']
  },
  {
    id: 'vallarta',
    name: 'Sucursal Puerto Vallarta',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Francisco Medina Ascencio 1800, Zona Hotelera, Puerto Vallarta, Jalisco.',
    x: 42.5,
    y: 60.0,
    coverage: ['Jalisco Costa', 'Nayarit Sur', 'Bahía de Banderas']
  },
  {
    id: 'manzanillo',
    name: 'Sucursal Manzanillo',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Blvd. Miguel de la Madrid 1200, Zona Costera, Manzanillo, Colima.',
    x: 45.8,
    y: 62.5,
    coverage: ['Colima Costa', 'Manzanillo Puerto']
  },
  {
    id: 'lazaro',
    name: 'Sucursal Lázaro Cárdenas',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Lázaro Cárdenas 110, Col. Centro, Lázaro Cárdenas, Michoacán.',
    x: 52.2,
    y: 66.0,
    coverage: ['Michoacán Costa', 'Guerrero Norte-Occidente']
  },
  {
    id: 'tepic',
    name: 'Sucursal Tepic',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Insurgentes Este 350, Col. Centro, Tepic, Nayarit.',
    x: 40.8,
    y: 54.8,
    coverage: ['Nayarit', 'Acaponeta', 'Santiago Ixcuintla']
  },
  {
    id: 'zihuatanejo',
    name: 'Sucursal Zihuatanejo',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Paseo de Zihuatanejo s/n, Col. Centro, Zihuatanejo, Guerrero.',
    x: 54.2,
    y: 67.5,
    coverage: ['Guerrero Costa Grande', 'Ixtapa']
  },
  {
    id: 'guadalajara',
    name: 'Sucursal Guadalajara',
    region: 'Región Occidente',
    phone: '33 3812 0000',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Vallarta 2300, Col. Americana, Guadalajara, Jalisco.',
    x: 45.0,
    y: 59.1,
    coverage: ['Jalisco', 'Nayarit', 'Colima', 'Michoacán']
  },
  {
    id: 'morelia',
    name: 'Sucursal Morelia',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Madero Poniente 1400, Col. Centro, Morelia, Michoacán.',
    x: 51.7,
    y: 63.7,
    coverage: ['Michoacán', 'Uruapan', 'Zamora', 'Zitácuaro']
  },
  {
    id: 'leon',
    name: 'Sucursal León',
    region: 'Región Bajío',
    phone: '800 8305 990',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Blvd. Adolfo López Mateos 1800, Col. Jardines del Jerez, León, Guanajuato.',
    x: 49.9,
    y: 56.7,
    coverage: ['Guanajuato', 'Irapuato', 'Celaya', 'Salamanca']
  },
  {
    id: 'colima',
    name: 'Sucursal Colima',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Felipe Sevilla del Río 450, Col. Lomas de Circunvalación, Colima, Colima.',
    x: 44.8,
    y: 63.9,
    coverage: ['Colima', 'Villa de Álvarez', 'Tecomán']
  },
  {
    id: 'aguascalientes',
    name: 'Sucursal Aguascalientes',
    region: 'Región Bajío',
    phone: '800 8305 990',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Av. Convención de 1914 Norte 102, Col. Gremial, Aguascalientes, Ags.',
    x: 47.4,
    y: 53.3,
    coverage: ['Aguascalientes', 'Zacatecas Sur', 'Jalisco Norte']
  },
  {
    id: 'chilpancingo',
    name: 'Sucursal Chilpancingo',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Lázaro Cárdenas 40, Col. Centro, Chilpancingo, Guerrero.',
    x: 56.5,
    y: 68.5,
    coverage: ['Guerrero Centro', 'Iguala', 'Taxco']
  },
  {
    id: 'acapulco',
    name: 'Sucursal Acapulco',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Costera Miguel Alemán 220, Fracc. Magallanes, Acapulco, Guerrero.',
    x: 58.0,
    y: 68.8,
    coverage: ['Guerrero Costa Chica', 'Acapulco Zona Diamante']
  },
  {
    id: 'queretaro',
    name: 'Sucursal Querétaro',
    region: 'Región Bajío',
    phone: '442 215 0000',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Av. 5 de Febrero 100, Col. Centro, Querétaro, Qro.',
    x: 53.1,
    y: 60.7,
    coverage: ['Querétaro', 'Guanajuato', 'San Luis Potosí']
  },
  {
    id: 'toluca',
    name: 'Sucursal Toluca',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Paseo Tollocan 850, Col. Santa Ana Tlapaltitlán, Toluca, Estado de México.',
    x: 54.9,
    y: 64.6,
    coverage: ['Estado de México Poniente', 'Lerma', 'Metepec']
  },
  {
    id: 'monterrey',
    name: 'Sucursal Monterrey',
    region: 'Región Norte',
    phone: '81 8300 0000',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Constitución 450, Col. Obispado, Monterrey, Nuevo León.',
    x: 55.7,
    y: 39.0,
    coverage: ['Nuevo León', 'Coahuila', 'Tamaulipas', 'San Luis Potosí']
  },
  {
    id: 'cdmx',
    name: 'Corporativo CDMX & Centro',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Insurgentes Sur 1200, Col. Del Valle, Ciudad de México.',
    x: 56.6,
    y: 65.7,
    coverage: ['Ciudad de México', 'Estado de México', 'Puebla', 'Morelos', 'Hidalgo']
  },
  {
    id: 'slp',
    name: 'Sucursal San Luis Potosí',
    region: 'Región Bajío',
    phone: '800 8305 990',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Av. Venustiano Carranza 1400, Col. Tequisquiapan, San Luis Potosí, S.L.P.',
    x: 50.3,
    y: 52.1,
    coverage: ['San Luis Potosí', 'Matehuala', 'Rioverde', 'Ciudad Valles']
  },
  {
    id: 'cuernavaca',
    name: 'Sucursal Cuernavaca',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Plan de Ayala 400, Col. Teopanzolco, Cuernavaca, Morelos.',
    x: 56.3,
    y: 68.0,
    coverage: ['Morelos', 'Cuautla', 'Jiutepec']
  },
  {
    id: 'saltillo',
    name: 'Sucursal Saltillo',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Blvd. Venustiano Carranza 2800, Col. República, Saltillo, Coahuila.',
    x: 52.7,
    y: 40.0,
    coverage: ['Coahuila', 'Ramos Arizpe', 'Monclova', 'Piedras Negras']
  },
  {
    id: 'pachuca',
    name: 'Sucursal Pachuca',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Blvd. Everardo Márquez 150, Col. Centro, Pachuca, Hidalgo.',
    x: 56.6,
    y: 62.4,
    coverage: ['Hidalgo', 'Tulancingo', 'Tula', 'Actopan']
  },
  {
    id: 'puebla',
    name: 'Sucursal Puebla',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Juárez 2900, Col. La Paz, Puebla, Puebla.',
    x: 59.1,
    y: 66.6,
    coverage: ['Puebla', 'Tlaxcala', 'Tehuacán', 'San Martín Texmelucan']
  },
  {
    id: 'tampico',
    name: 'Sucursal Tampico',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Hidalgo 3500, Col. Guadalupe, Tampico, Tamaulipas.',
    x: 60.9,
    y: 52.1,
    coverage: ['Tamaulipas Sur', 'Altamira', 'Madero', 'Veracruz Norte']
  },
  {
    id: 'oaxaca',
    name: 'Sucursal Oaxaca',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Calzada Madero 200, Col. Centro, Oaxaca, Oaxaca.',
    x: 64.5,
    y: 71.8,
    coverage: ['Oaxaca', 'Salina Cruz', 'Huatulco', 'Puerto Escondido']
  },
  {
    id: 'veracruz',
    name: 'Sucursal Veracruz',
    region: 'Región Sureste & Golfo',
    phone: '229 931 0000',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Díaz Mirón 120, Col. Centro, Veracruz, Ver.',
    x: 64.9,
    y: 66.2,
    coverage: ['Veracruz', 'Xalapa', 'Córdoba', 'Orizaba']
  },
  {
    id: 'coatzacoalcos',
    name: 'Sucursal Coatzacoalcos',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Universidad 1100, Col. Centro, Coatzacoalcos, Veracruz.',
    x: 69.1,
    y: 69.8,
    coverage: ['Veracruz Sur', 'Minatitlán', 'Acayucan']
  },
  {
    id: 'villahermosa',
    name: 'Sucursal Villahermosa',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Paseo Tabasco 1200, Col. Tabasco 2000, Villahermosa, Tabasco.',
    x: 75.5,
    y: 71.0,
    coverage: ['Tabasco', 'Cárdenas', 'Comalcalco', 'Campeche Poniente']
  },
  {
    id: 'tuxtla',
    name: 'Sucursal Tuxtla Gutiérrez',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Blvd. Belisario Domínguez 2200, Col. Centro, Tuxtla Gutiérrez, Chiapas.',
    x: 75.7,
    y: 71.5,
    coverage: ['Chiapas', 'Tapachula', 'San Cristóbal de las Casas']
  },
  {
    id: 'cancun',
    name: 'Sucursal Cancún',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Tulum 15, Supermanzana 4, Cancún, Quintana Roo.',
    x: 91.3,
    y: 60.0,
    coverage: ['Quintana Roo', 'Playa del Carmen', 'Cozumel', 'Chetumal', 'Yucatán']
  }
]

export default function InteractiveMap() {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[22]) // CDMX default
  const { isRedBlack, t } = useSitePreferences()

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  return (
    <section id="coverage" className={`py-24 border-b relative overflow-hidden transition-colors duration-500 ${
      isRedBlack ? 'bg-[#07080b] border-[#EF3B43]/15' : 'bg-white border-gray-100'
    }`}>
      
      {/* Sliding tech grid background inside this section */}
      <div className="absolute inset-0 animate-tech-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            {t('map.eyebrow')}
          </h2>
          <h3 className={`font-display text-3xl md:text-5xl font-black tracking-tight leading-none ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
            {t('map.title')}
          </h3>
          <p className={`text-sm md:text-base max-w-[55ch] mx-auto leading-relaxed ${isRedBlack ? 'text-white/65' : 'text-gray-500'}`}>
            {t('map.description')}
          </p>
        </div>

        {/* Separated Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Panel (Displays ONLY the selected branch, limited and formatted text) */}
          <div className={`lg:col-span-4 order-2 lg:order-1 border shadow-2xl p-6 md:p-7 rounded-[28px] flex flex-col justify-between overflow-hidden relative min-h-[520px] transition-all duration-300 ${
            isRedBlack ? 'bg-[#0b0d11] border-[#EF3B43]/30 shadow-[#EF3B43]/10' : 'bg-white border-gray-150 hover:shadow-gray-200/50'
          }`}>
            
            {/* Top Header & Instructions info */}
            <div className="space-y-4">
              
              {/* Header Title inside panel */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[#EF3B43]">
                  <Shield size={16} weight="fill" className="animate-pulse" />
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#EF3B43]/90">
                    {t('map.command')}
                  </span>
                </div>
                <h4 className={`font-display text-lg font-black tracking-tight ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                  {t('map.details')}
                </h4>
              </div>

              {/* Minimalist user instructions */}
              <p className={`text-[11px] font-medium ${isRedBlack ? 'text-white/45' : 'text-gray-400'}`}>
                {t('map.instructions')}
              </p>

            </div>

            {/* Selected Branch Active Details Block (Limited and structured layout) */}
            <div className="mt-5 pt-5 border-t border-gray-100 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBranch.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-5 flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Status Indicator inside card */}
                    <div className="inline-flex items-center space-x-2 bg-green-50/80 border border-green-150 px-3 py-1 rounded-full">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">
                        {t('map.status')}
                      </span>
                    </div>

                    {/* Region and Branch Name */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">
                        {selectedBranch.region}
                      </span>
                      <h5 className={`font-display text-xl font-black tracking-tight leading-tight ${isRedBlack ? 'text-white' : 'text-[#101820]'}`}>
                        {selectedBranch.name}
                      </h5>
                    </div>

                    {/* Ficha Técnica structured list - stacked cleanly to prevent overflow */}
                    <div className={`border rounded-2xl p-4 space-y-4 text-xs ${
                      isRedBlack ? 'bg-white/[0.03] border-white/10 text-white/70' : 'bg-gray-50/70 border-gray-100 text-gray-650'
                    }`}>
                      
                      {/* Dirección */}
                      <div className="flex items-start space-x-3">
                        <MapPin size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('map.address')}</p>
                          <p className={`font-medium leading-relaxed text-[11px] line-clamp-2 ${isRedBlack ? 'text-white/75' : 'text-gray-700'}`}>
                            {selectedBranch.address}
                          </p>
                        </div>
                      </div>
                      
                      {/* Teléfono */}
                      <div className="flex items-start space-x-3">
                        <Phone size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('map.phone')}</p>
                          <a href={`tel:${selectedBranch.phone}`} className={`hover:text-[#EF3B43] transition-colors font-semibold text-[11px] ${isRedBlack ? 'text-white/75' : 'text-gray-700'}`}>
                            {selectedBranch.phone}
                          </a>
                        </div>
                      </div>

                      {/* Correo */}
                      <div className="flex items-start space-x-3">
                        <Envelope size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('map.email')}</p>
                          <a href={`mailto:${selectedBranch.email}`} className={`hover:text-[#EF3B43] transition-colors font-semibold block truncate text-[11px] ${isRedBlack ? 'text-white/75' : 'text-gray-700'}`}>
                            {selectedBranch.email}
                          </a>
                        </div>
                      </div>

                      {/* Soporte */}
                      <div className="flex items-start space-x-3">
                        <Clock size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{t('map.support')}</p>
                          <p className={`font-medium text-[11px] ${isRedBlack ? 'text-white/75' : 'text-gray-700'}`}>{t('map.supportValue')}</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Coverage list - beautifully limited to prevent stretching */}
                  <div className="space-y-2 pt-4 border-t border-gray-100 mt-auto">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      {t('map.coverage')}
                    </p>
                    <div className="flex flex-wrap gap-1.5 max-h-[76px] overflow-y-auto custom-scrollbar pr-1">
                      {selectedBranch.coverage.map((state, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[9px] font-bold bg-white border border-gray-200 text-gray-600 rounded-md flex items-center gap-1 shadow-sm hover:border-[#EF3B43]/30 transition-colors"
                        >
                          <CheckCircle size={10} className="text-green-500 shrink-0" weight="fill" />
                          {state}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Brand subtle indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EF3B43]"></div>
          </div>

          {/* Right Map Canvas (Massive, borderless, floating directly on the page, showing ocean) */}
          <div className="lg:col-span-8 order-1 lg:order-2 flex items-center justify-center p-0 relative min-h-0 sm:min-h-[420px] lg:min-h-[450px]">
            
            {/* The Map Frame (wider crop so Mexico fills the available space) */}
            <div className="relative w-full max-w-[900px] aspect-[4/3] rounded-[32px] overflow-hidden bg-white select-none">
              
              <div className="absolute left-0 top-1/2 w-full aspect-square -translate-y-1/2">
                {/* Realistic Green Satellite Map with blue Ocean */}
                <img
                  src="/recursos/mexico_map_background.png"
                  alt="Mapa satelital de México verde realista con mar"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Grid overlay for B2B aesthetics */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,32,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,32,0.012)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>

                {/* Branch Node Markers */}
                {branches.map((b) => {
                  const isSelected = selectedBranch.id === b.id

                  return (
                    <button
                      key={b.id}
                      type="button"
                      aria-label={`Ver información de ${b.name}`}
                      aria-pressed={isSelected}
                      title={b.name}
                      className="absolute flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF3B43] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      style={{ 
                        left: `${b.x}%`, 
                        top: `${b.y}%`, 
                        zIndex: isSelected ? 30 : 10,
                        transform: `translate(-50%, -50%) scale(${isSelected ? 1.2 : 1})`
                      }}
                      onClick={() => handleSelectBranch(b)}
                    >
                      {isSelected && (
                        <span className="absolute h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-green-500/35 bg-green-500/10 pointer-events-none" />
                      )}
                      <span className={`relative flex items-center justify-center rounded-full border border-white shadow-[0_2px_7px_rgba(16,24,32,0.3)] transition-[background-color,box-shadow] duration-200 ${
                        isSelected
                          ? 'h-3.5 w-3.5 sm:h-4 sm:w-4 bg-[#101820] shadow-[0_0_0_3px_rgba(255,255,255,0.9),0_8px_18px_rgba(16,24,32,0.28)]'
                          : 'h-2.5 w-2.5 sm:h-3 sm:w-3 bg-white/90 hover:bg-[#101820]'
                      }`}>
                        <span className={`rounded-full transition-colors duration-200 ${
                          isSelected
                            ? 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.75)]'
                            : 'h-1.5 w-1.5 bg-[#EF3B43]'
                        }`} />
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Status Indicator (Blinking green dot) */}
              <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center space-x-2.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 border border-gray-100 shadow-md rounded-full">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm shadow-green-500/50"></span>
                </span>
                <span className="text-[8px] font-mono font-bold text-gray-650 tracking-wider uppercase flex items-center gap-1">
                  <Broadcast size={12} className="text-[#EF3B43] animate-pulse" />
                  {t('map.supervision')}
                </span>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-6 right-6 z-10 hidden sm:block text-[8px] font-mono text-gray-550 select-none bg-white/90 backdrop-blur-md px-3.5 py-2 border border-gray-150 rounded-lg shadow-sm">
                <p className="font-bold text-green-600 flex items-center gap-1 uppercase">
                  <Shield size={10} weight="fill" />
                  {t('map.legend')}
                </p>
                <p className="uppercase mt-0.5 font-bold text-gray-700">{t('map.station')} {selectedBranch.name.replace('Sucursal ', '').replace('Corporativo ', '')}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Footnote text */}
        <div className="text-center mt-12 relative z-10">
          <p className="text-xs md:text-sm font-bold text-[#101820] tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF3B43] animate-pulse shadow-sm shadow-[#EF3B43]/50"></span>
                  {t('map.footer')}
          </p>
        </div>

      </div>
    </section>
  )
}
