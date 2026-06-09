import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Envelope, Clock, Broadcast, Shield, CheckCircle } from '@phosphor-icons/react'

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
    x: 12.0,
    y: 16.5,
    coverage: ['Baja California', 'Ensenada', 'Mexicali', 'Tecate']
  },
  {
    id: 'hermosillo',
    name: 'Sucursal Hermosillo',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Blvd. Kino 310, Col. Pitic, Hermosillo, Sonora.',
    x: 21.0,
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
    x: 21.0,
    y: 47.0,
    coverage: ['Baja California Sur', 'Los Cabos', 'Loreto']
  },
  {
    id: 'obregon',
    name: 'Sucursal Ciudad Obregón',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Calle Sinaloa 200, Centro, Ciudad Obregón, Sonora.',
    x: 24.0,
    y: 30.5,
    coverage: ['Sonora Sur', 'Guaymas', 'Navojoa']
  },
  {
    id: 'culiacan',
    name: 'Sucursal Culiacán',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Blvd. Pedro Anaya 45, Col. Centro, Culiacán, Sinaloa.',
    x: 29.5,
    y: 43.5,
    coverage: ['Sinaloa', 'Mazatlán', 'Los Mochis']
  },
  {
    id: 'juarez',
    name: 'Sucursal Ciudad Juárez',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Tecnológico 2400, Col. Partido Romero, Ciudad Juárez, Chihuahua.',
    x: 38.5,
    y: 16.5,
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
    x: 38.0,
    y: 63.0,
    coverage: ['Jalisco Costa', 'Nayarit Sur', 'Bahía de Banderas']
  },
  {
    id: 'manzanillo',
    name: 'Sucursal Manzanillo',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Blvd. Miguel de la Madrid 1200, Zona Costera, Manzanillo, Colima.',
    x: 41.5,
    y: 68.0,
    coverage: ['Colima Costa', 'Manzanillo Puerto']
  },
  {
    id: 'lazaro',
    name: 'Sucursal Lázaro Cárdenas',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Lázaro Cárdenas 110, Col. Centro, Lázaro Cárdenas, Michoacán.',
    x: 47.5,
    y: 72.5,
    coverage: ['Michoacán Costa', 'Guerrero Norte-Occidente']
  },
  {
    id: 'tepic',
    name: 'Sucursal Tepic',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Insurgentes Este 350, Col. Centro, Tepic, Nayarit.',
    x: 41.0,
    y: 58.0,
    coverage: ['Nayarit', 'Acaponeta', 'Santiago Ixcuintla']
  },
  {
    id: 'zihuatanejo',
    name: 'Sucursal Zihuatanejo',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Paseo de Zihuatanejo s/n, Col. Centro, Zihuatanejo, Guerrero.',
    x: 49.5,
    y: 75.0,
    coverage: ['Guerrero Costa Grande', 'Ixtapa']
  },
  {
    id: 'guadalajara',
    name: 'Sucursal Guadalajara',
    region: 'Región Occidente',
    phone: '33 3812 0000',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Vallarta 2300, Col. Americana, Guadalajara, Jalisco.',
    x: 44.5,
    y: 61.5,
    coverage: ['Jalisco', 'Nayarit', 'Colima', 'Michoacán']
  },
  {
    id: 'morelia',
    name: 'Sucursal Morelia',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Madero Poniente 1400, Col. Centro, Morelia, Michoacán.',
    x: 50.0,
    y: 66.5,
    coverage: ['Michoacán', 'Uruapan', 'Zamora', 'Zitácuaro']
  },
  {
    id: 'leon',
    name: 'Sucursal León',
    region: 'Región Bajío',
    phone: '800 8305 990',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Blvd. Adolfo López Mateos 1800, Col. Jardines del Jerez, León, Guanajuato.',
    x: 49.5,
    y: 60.0,
    coverage: ['Guanajuato', 'Irapuato', 'Celaya', 'Salamanca']
  },
  {
    id: 'colima',
    name: 'Sucursal Colima',
    region: 'Región Occidente',
    phone: '800 8305 990',
    email: 'contacto.occidente@gsiseguridad.com.mx',
    address: 'Av. Felipe Sevilla del Río 450, Col. Lomas de Circunvalación, Colima, Colima.',
    x: 43.5,
    y: 67.5,
    coverage: ['Colima', 'Villa de Álvarez', 'Tecomán']
  },
  {
    id: 'aguascalientes',
    name: 'Sucursal Aguascalientes',
    region: 'Región Bajío',
    phone: '800 8305 990',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Av. Convención de 1914 Norte 102, Col. Gremial, Aguascalientes, Ags.',
    x: 47.5,
    y: 56.5,
    coverage: ['Aguascalientes', 'Zacatecas Sur', 'Jalisco Norte']
  },
  {
    id: 'chilpancingo',
    name: 'Sucursal Chilpancingo',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Lázaro Cárdenas 40, Col. Centro, Chilpancingo, Guerrero.',
    x: 55.0,
    y: 76.0,
    coverage: ['Guerrero Centro', 'Iguala', 'Taxco']
  },
  {
    id: 'acapulco',
    name: 'Sucursal Acapulco',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Costera Miguel Alemán 220, Fracc. Magallanes, Acapulco, Guerrero.',
    x: 54.5,
    y: 79.0,
    coverage: ['Guerrero Costa Chica', 'Acapulco Zona Diamante']
  },
  {
    id: 'queretaro',
    name: 'Sucursal Querétaro',
    region: 'Región Bajío',
    phone: '442 215 0000',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Av. 5 de Febrero 100, Col. Centro, Querétaro, Qro.',
    x: 53.0,
    y: 63.5,
    coverage: ['Querétaro', 'Guanajuato', 'San Luis Potosí']
  },
  {
    id: 'toluca',
    name: 'Sucursal Toluca',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Paseo Tollocan 850, Col. Santa Ana Tlapaltitlán, Toluca, Estado de México.',
    x: 54.5,
    y: 68.5,
    coverage: ['Estado de México Poniente', 'Lerma', 'Metepec']
  },
  {
    id: 'monterrey',
    name: 'Sucursal Monterrey',
    region: 'Región Norte',
    phone: '81 8300 0000',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Constitución 450, Col. Obispado, Monterrey, Nuevo León.',
    x: 53.2,
    y: 40.5,
    coverage: ['Nuevo León', 'Coahuila', 'Tamaulipas', 'San Luis Potosí']
  },
  {
    id: 'cdmx',
    name: 'Corporativo CDMX & Centro',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Insurgentes Sur 1200, Col. Del Valle, Ciudad de México.',
    x: 56.0,
    y: 67.5,
    coverage: ['Ciudad de México', 'Estado de México', 'Puebla', 'Morelos', 'Hidalgo']
  },
  {
    id: 'slp',
    name: 'Sucursal San Luis Potosí',
    region: 'Región Bajío',
    phone: '800 8305 990',
    email: 'contacto.bajio@gsiseguridad.com.mx',
    address: 'Av. Venustiano Carranza 1400, Col. Tequisquiapan, San Luis Potosí, S.L.P.',
    x: 50.5,
    y: 55.0,
    coverage: ['San Luis Potosí', 'Matehuala', 'Rioverde', 'Ciudad Valles']
  },
  {
    id: 'cuernavaca',
    name: 'Sucursal Cuernavaca',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Plan de Ayala 400, Col. Teopanzolco, Cuernavaca, Morelos.',
    x: 56.0,
    y: 69.5,
    coverage: ['Morelos', 'Cuautla', 'Jiutepec']
  },
  {
    id: 'saltillo',
    name: 'Sucursal Saltillo',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Blvd. Venustiano Carranza 2800, Col. República, Saltillo, Coahuila.',
    x: 51.2,
    y: 41.0,
    coverage: ['Coahuila', 'Ramos Arizpe', 'Monclova', 'Piedras Negras']
  },
  {
    id: 'pachuca',
    name: 'Sucursal Pachuca',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Blvd. Everardo Márquez 150, Col. Centro, Pachuca, Hidalgo.',
    x: 56.0,
    y: 64.5,
    coverage: ['Hidalgo', 'Tulancingo', 'Tula', 'Actopan']
  },
  {
    id: 'puebla',
    name: 'Sucursal Puebla',
    region: 'Región Centro',
    phone: '800 8305 990',
    email: 'contacto.centro@gsiseguridad.com.mx',
    address: 'Av. Juárez 2900, Col. La Paz, Puebla, Puebla.',
    x: 58.0,
    y: 68.5,
    coverage: ['Puebla', 'Tlaxcala', 'Tehuacán', 'San Martín Texmelucan']
  },
  {
    id: 'tampico',
    name: 'Sucursal Tampico',
    region: 'Región Norte',
    phone: '800 8305 990',
    email: 'contacto.norte@gsiseguridad.com.mx',
    address: 'Av. Hidalgo 3500, Col. Guadalupe, Tampico, Tamaulipas.',
    x: 59.0,
    y: 53.0,
    coverage: ['Tamaulipas Sur', 'Altamira', 'Madero', 'Veracruz Norte']
  },
  {
    id: 'oaxaca',
    name: 'Sucursal Oaxaca',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Calzada Madero 200, Col. Centro, Oaxaca, Oaxaca.',
    x: 63.5,
    y: 78.5,
    coverage: ['Oaxaca', 'Salina Cruz', 'Huatulco', 'Puerto Escondido']
  },
  {
    id: 'veracruz',
    name: 'Sucursal Veracruz',
    region: 'Región Sureste & Golfo',
    phone: '229 931 0000',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Díaz Mirón 120, Col. Centro, Veracruz, Ver.',
    x: 64.5,
    y: 69.0,
    coverage: ['Veracruz', 'Xalapa', 'Córdoba', 'Orizaba']
  },
  {
    id: 'coatzacoalcos',
    name: 'Sucursal Coatzacoalcos',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Universidad 1100, Col. Centro, Coatzacoalcos, Veracruz.',
    x: 69.2,
    y: 74.5,
    coverage: ['Veracruz Sur', 'Minatitlán', 'Acayucan']
  },
  {
    id: 'villahermosa',
    name: 'Sucursal Villahermosa',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Paseo Tabasco 1200, Col. Tabasco 2000, Villahermosa, Tabasco.',
    x: 74.5,
    y: 75.0,
    coverage: ['Tabasco', 'Cárdenas', 'Comalcalco', 'Campeche Poniente']
  },
  {
    id: 'tuxtla',
    name: 'Sucursal Tuxtla Gutiérrez',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Blvd. Belisario Domínguez 2200, Col. Centro, Tuxtla Gutiérrez, Chiapas.',
    x: 73.8,
    y: 80.0,
    coverage: ['Chiapas', 'Tapachula', 'San Cristóbal de las Casas']
  },
  {
    id: 'cancun',
    name: 'Sucursal Cancún',
    region: 'Región Sureste & Golfo',
    phone: '800 8305 990',
    email: 'contacto.golfo@gsiseguridad.com.mx',
    address: 'Av. Tulum 15, Supermanzana 4, Cancún, Quintana Roo.',
    x: 93.0,
    y: 61.5,
    coverage: ['Quintana Roo', 'Playa del Carmen', 'Cozumel', 'Chetumal', 'Yucatán']
  }
]

export default function InteractiveMap() {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[22]) // CDMX default

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
  }

  return (
    <section id="coverage" className="py-24 bg-white border-b border-gray-100 relative overflow-hidden">
      
      {/* Sliding tech grid background inside this section */}
      <div className="absolute inset-0 animate-tech-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43]">
            Presencia Estratégica
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black text-[#101820] tracking-tight leading-none">
            Cobertura Nacional Real
          </h3>
          <p className="text-sm md:text-base text-gray-500 max-w-[55ch] mx-auto leading-relaxed">
            Haz clic directamente en cualquiera de las sucursales sobre el mapa de la república para ver la información operativa de la delegación en la tarjeta de control izquierda.
          </p>
        </div>

        {/* Separated Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Panel (Displays ONLY the selected branch, limited and formatted text) */}
          <div className="lg:col-span-4 order-2 lg:order-1 bg-white border border-gray-150 shadow-2xl p-6 md:p-7 rounded-[28px] flex flex-col justify-between overflow-hidden relative min-h-[520px] transition-all duration-300 hover:shadow-gray-200/50">
            
            {/* Top Header & Instructions info */}
            <div className="space-y-4">
              
              {/* Header Title inside panel */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[#EF3B43]">
                  <Shield size={16} weight="fill" className="animate-pulse" />
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#EF3B43]/90">
                    Centro de Mando Nacional GSI
                  </span>
                </div>
                <h4 className="font-display text-lg font-black text-[#101820] tracking-tight">
                  Detalles de Delegación
                </h4>
              </div>

              {/* Minimalist user instructions */}
              <p className="text-[11px] text-gray-400 font-medium">
                Haz clic en cualquier punto del mapa para ver los datos de la sucursal.
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
                        Conexión Operativa Activa
                      </span>
                    </div>

                    {/* Region and Branch Name */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">
                        {selectedBranch.region}
                      </span>
                      <h5 className="font-display text-xl font-black text-[#101820] tracking-tight leading-tight">
                        {selectedBranch.name}
                      </h5>
                    </div>

                    {/* Ficha Técnica structured list - stacked cleanly to prevent overflow */}
                    <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-4 space-y-4 text-xs text-gray-650">
                      
                      {/* Dirección */}
                      <div className="flex items-start space-x-3">
                        <MapPin size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Dirección Operativa</p>
                          <p className="font-medium text-gray-700 leading-relaxed text-[11px] line-clamp-2">
                            {selectedBranch.address}
                          </p>
                        </div>
                      </div>
                      
                      {/* Teléfono */}
                      <div className="flex items-start space-x-3">
                        <Phone size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Teléfono de Enlace</p>
                          <a href={`tel:${selectedBranch.phone}`} className="hover:text-[#EF3B43] transition-colors font-semibold text-gray-700 text-[11px]">
                            {selectedBranch.phone}
                          </a>
                        </div>
                      </div>

                      {/* Correo */}
                      <div className="flex items-start space-x-3">
                        <Envelope size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Correo Electrónico</p>
                          <a href={`mailto:${selectedBranch.email}`} className="hover:text-[#EF3B43] transition-colors font-semibold text-gray-700 block truncate text-[11px]">
                            {selectedBranch.email}
                          </a>
                        </div>
                      </div>

                      {/* Soporte */}
                      <div className="flex items-start space-x-3">
                        <Clock size={16} className="text-[#EF3B43] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Soporte Operativo</p>
                          <p className="font-medium text-gray-700 text-[11px]">24 Horas / 365 Días al Año</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Coverage list - beautifully limited to prevent stretching */}
                  <div className="space-y-2 pt-4 border-t border-gray-100 mt-auto">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      Cobertura y Despliegue:
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
          <div className="lg:col-span-8 order-1 lg:order-2 flex items-center justify-center p-0 relative min-h-[450px]">
            
            {/* The Map Frame (Completely borderless, flat, blends with page) */}
            <div className="relative w-full max-w-[720px] aspect-square rounded-[36px] overflow-hidden bg-white select-none">
              
              {/* Realistic Green Satellite Map with blue Ocean */}
              <img
                src="/recursos/mexico_map_background.png"
                alt="Mapa satelital de México verde realista con mar"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Grid overlay for B2B aesthetics */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,24,32,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,24,32,0.012)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>

              {/* Active Status Indicator (Blinking green dot) */}
              <div className="absolute top-6 right-6 z-10 flex items-center space-x-2.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 border border-gray-100 shadow-md rounded-full">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-90"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-sm shadow-green-500/50"></span>
                </span>
                <span className="text-[8px] font-mono font-bold text-gray-650 tracking-wider uppercase flex items-center gap-1">
                  <Broadcast size={12} className="text-[#EF3B43] animate-pulse" />
                  Supervisión: Activa
                </span>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-6 right-6 z-10 text-[8px] font-mono text-gray-550 select-none bg-white/90 backdrop-blur-md px-3.5 py-2 border border-gray-150 rounded-lg shadow-sm">
                <p className="font-bold text-green-600 flex items-center gap-1 uppercase">
                  <Shield size={10} weight="fill" />
                  Presencia GSI Nacional
                </p>
                <p className="uppercase mt-0.5 font-bold text-gray-700">ESTACIÓN: {selectedBranch.name.replace('Sucursal ', '').replace('Corporativo ', '')}</p>
              </div>

              {/* Branch Node Markers (Blink from red to green upon selection) */}
              {branches.map((b) => {
                const isSelected = selectedBranch.id === b.id

                return (
                  <div
                    key={b.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                    style={{ 
                      left: `${b.x}%`, 
                      top: `${b.y}%`, 
                      zIndex: isSelected ? 30 : 10,
                      transform: isSelected ? 'scale(1.2)' : 'scale(1.0)'
                    }}
                    onClick={() => handleSelectBranch(b)}
                  >
                    <div className="relative flex items-center justify-center group/node">
                      
                      {/* Pulsing Green Outer Rings (Active only when selected, GPU-Accelerated) */}
                      {isSelected && (
                        <>
                          <span className="absolute inline-flex h-9 w-9 rounded-full bg-green-500/40 animate-ping-custom-1 pointer-events-none"></span>
                          <span className="absolute inline-flex h-5 w-5 rounded-full bg-green-500/30 animate-ping-custom-2 pointer-events-none"></span>
                        </>
                      )}

                      {/* Main Node Dot: Red when unselected, turns Green when selected/hovered (GPU Compositor) */}
                      <span
                        className={`relative inline-flex rounded-full shadow-md border border-white z-10 transition-all duration-300 ${
                          isSelected 
                            ? 'h-2 w-2 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 bg-green-500 ring-2 sm:ring-4 ring-green-500/20' 
                            : 'h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 bg-[#EF3B43] group-hover/node:bg-green-500'
                        }`}
                      />



                    </div>
                  </div>
                )
              })}

            </div>
          </div>

        </div>

        {/* Footnote text */}
        <div className="text-center mt-12 relative z-10">
          <p className="text-xs md:text-sm font-bold text-[#101820] tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF3B43] animate-pulse shadow-sm shadow-[#EF3B43]/50"></span>
            Contamos con más de 30 sucursales en todo México.
          </p>
        </div>

      </div>
    </section>
  )
}
