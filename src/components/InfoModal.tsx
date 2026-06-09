import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Certificate, Medal, Buildings, FileText, Globe } from '@phosphor-icons/react'

export type ModalType =
  | 'privacy'
  | 'terms'
  | 'compliance'
  | 'service-intramuros'
  | 'service-armada'
  | 'service-monitoreo'
  | 'service-confianza'
  | 'cert-iso'
  | 'cert-basc'
  | 'cert-dgsp'
  | 'cert-esr'
  | 'cert-repse'
  | 'cert-ctpat'
  | 'cert-amesp'

interface ModalContent {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  badge?: string
  content: React.ReactNode
  ctaText?: string
  ctaAction?: () => void
}

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType | null>(null)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: ModalType }>
      if (customEvent.detail && customEvent.detail.type) {
        setModalType(customEvent.detail.type)
        setIsOpen(true)
        document.body.style.overflow = 'hidden'
      }
    }

    window.addEventListener('open-info-modal', handleOpen)
    return () => {
      window.removeEventListener('open-info-modal', handleOpen)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleCtaClick = (messageText: string) => {
    closeModal()
    // Scroll to contact form
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      
      // Find and prefill message input
      setTimeout(() => {
        const textarea = document.querySelector('textarea[placeholder*="Describe brevemente"]') as HTMLTextAreaElement
        if (textarea) {
          textarea.value = messageText
          // Trigger React onChange manually
          const event = new Event('input', { bubbles: true })
          textarea.dispatchEvent(event)
          textarea.focus()
        }
      }, 500)
    }
  }

  const getModalContent = (): ModalContent => {
    switch (modalType) {
      case 'privacy':
        return {
          title: 'Aviso de Privacidad',
          subtitle: 'GSI Seguridad Privada S.A. de C.V.',
          icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                <strong>GSI Seguridad Privada S.A. de C.V.</strong>, con domicilio en la Ciudad de México, es responsable del tratamiento de sus datos personales proporcionados a través de este portal comercial.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">¿Para qué fines utilizaremos sus datos?</h5>
              <p>
                Los datos personales que recabamos de usted serán utilizados para las siguientes finalidades principales que son necesarias para el servicio solicitado:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Analizar y cotizar propuestas personalizadas de seguridad privada intramuros, armada y tecnológica.</li>
                <li>Verificar y confirmar su identidad y representación comercial de la empresa solicitante.</li>
                <li>Dar seguimiento comercial, atender dudas y coordinar visitas de factibilidad técnica a sus instalaciones.</li>
                <li>Establecer la relación contractual y el cumplimiento de las normativas de seguridad pública correspondientes.</li>
              </ul>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Datos recabados</h5>
              <p>
                Para las finalidades señaladas, recabamos datos de identificación y contacto como: nombre completo, correo electrónico corporativo, teléfono de oficina/móvil, nombre de la empresa y comentarios operativos específicos. No recabamos datos sensibles por este medio.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Derechos ARCO</h5>
              <p>
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
              </p>
              <p>
                Para el ejercicio de cualquiera de los derechos ARCO o revocación de consentimiento, puede enviar un correo a: <a href="mailto:privacidad@gsiseguridad.com.mx" className="text-[#EF3B43] hover:underline font-semibold">privacidad@gsiseguridad.com.mx</a>.
              </p>
            </div>
          ),
          ctaText: 'Entendido',
          ctaAction: closeModal
        }
      case 'terms':
        return {
          title: 'Términos y Condiciones del Servicio',
          subtitle: 'Marco Regulatorio y de Uso Web',
          icon: <FileText size={36} className="text-[#EF3B43]" weight="fill" />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                Bienvenido al portal web de <strong>GSI Seguridad Privada</strong>. Al acceder y utilizar este sitio web, usted acepta y se compromete a cumplir con los siguientes términos y condiciones de uso.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Uso de Información y Contenidos</h5>
              <p>
                Todo el material en este sitio, incluyendo diseños, textos, gráficos, logotipos, imágenes, mapas y códigos de software, está protegido bajo los derechos de autor de GSI Seguridad Privada y del Grupo Seguridad Integral. Queda estrictamente prohibida la reproducción total o parcial con fines comerciales sin autorización previa por escrito.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Cotizaciones y Propuestas de Servicio</h5>
              <p>
                Cualquier solicitud de cotización enviada por este sitio representa una solicitud de información pre-contractual. Los costos y alcances definitivos están sujetos a la elaboración de un análisis de riesgos físico en sitio, factibilidad operativa local y a la firma oficial del contrato de prestación de servicios de seguridad privada regulado por las leyes federales.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Responsabilidad Limitada</h5>
              <p>
                GSI Seguridad Privada hace esfuerzos para mantener la información actualizada y verídica. Sin embargo, no se garantiza la total ausencia de errores técnicos temporales en el mapa interactivo o información de sucursales. GSI no se hace responsable por daños derivados del uso de este sitio o enlaces externos.
              </p>
            </div>
          ),
          ctaText: 'Aceptar Términos',
          ctaAction: closeModal
        }
      case 'compliance':
      case 'cert-dgsp':
        return {
          title: 'Autorización Federal y Permisos DGSP',
          subtitle: 'Secretaría de Seguridad y Protección Ciudadana',
          icon: <Medal size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'Registro: DGSP/008-24/SP',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                <strong>GSI Seguridad Privada S.A. de C.V.</strong> opera en estricto cumplimiento con la Ley Federal de Seguridad Privada vigente en la República Mexicana.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-4 space-y-2 rounded-xl">
                <p className="text-xs font-bold text-gray-700">Licencias y Oficios Oficiales:</p>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  <li><strong>Permiso Federal Vigente:</strong> Oficio DGSP/008-24/SP otorgado por la Dirección General de Seguridad Privada de la CNS.</li>
                  <li><strong>Modalidades Autorizadas:</strong> Modalidad I (Seguridad y vigilancia en bienes) y Modalidad II (Protección y custodia de personas y bienes).</li>
                  <li><strong>Portación de Armas de Fuego:</strong> Licencia Particular Colectiva (LPC) autorizada por la Secretaría de la Defensa Nacional (SEDENA) para la portación de armas de fuego en servicio exclusivo de seguridad privada.</li>
                </ul>
              </div>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Cumplimiento Fiscal y Laboral (REPSE)</h5>
              <p>
                Para total tranquilidad jurídica de nuestros clientes B2B, contamos con el registro REPSE activo ante la STPS. Garantizamos que el 100% de nuestra plantilla operativa cuenta con Seguro Social activo (IMSS), aportaciones del Infonavit y prestaciones de ley superiores, mitigando cualquier riesgo de responsabilidad solidaria laboral.
              </p>
            </div>
          ),
          ctaText: 'Verificar Permiso Federal',
          ctaAction: () => {
            window.open('https://www.gob.mx/sspc', '_blank')
          }
        }
      case 'service-intramuros':
        return {
          title: 'Vigilancia Física Intramuros',
          subtitle: 'Protección perimetral y de accesos en sitio',
          icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                Nuestra división de seguridad física intramuros proporciona guardias de seguridad altamente capacitados para la prevención de pérdidas y control total de accesos en parques industriales, almacenes, plantas de manufactura y corporativos.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Atributos Clave del Servicio:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Control de Accesos</p>
                  <p className="text-[11px] text-gray-500">Registro riguroso de personal, proveedores, visitantes y báscula vehicular.</p>
                </div>
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Supervisión 24/7</p>
                  <p className="text-[11px] text-gray-500">Supervisores zonales en patrullas equipadas que realizan auditorías constantes.</p>
                </div>
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Consignas de Operación</p>
                  <p className="text-[11px] text-gray-500">Diseño a la medida de protocolos específicos ante incendios, robos o intrusión.</p>
                </div>
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Imagen Corporativa</p>
                  <p className="text-[11px] text-gray-500">Uniformes tácticos homologados e impecables que reflejan seriedad y control.</p>
                </div>
              </div>
            </div>
          ),
          ctaText: 'Cotizar Servicio Intramuros',
          ctaAction: () => handleCtaClick('Hola, me interesa cotizar el servicio de Vigilancia Intramuros para mi empresa.')
        }
      case 'service-armada':
        return {
          title: 'Protección y Custodia Armada',
          subtitle: 'Seguridad disuasiva para activos de alto valor',
          icon: <Globe size={36} className="text-[#EF3B43]" weight="fill" />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                Ofrecemos custodias armadas en tránsito comercial terrestre y elementos armados fijos para resguardar instalaciones industriales críticas, valores e infraestructura estratégica nacional.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Características del Personal Armado:</h5>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Portación Legal de Armas:</strong> Respaldados por la Licencia Particular Colectiva autorizada por la SEDENA.</li>
                <li><strong>Entrenamiento Avanzado:</strong> Capacitación periódica en prácticas de tiro de precisión y tácticas defensivas urbanas y en carretera.</li>
                <li><strong>Evaluación de Confianza:</strong> Filtros rigurosos con polígrafo, perfiles psicológicos y toxicológicos continuos.</li>
                <li><strong>Comunicación Satelital:</strong> Enlace constante a través de radios encriptados con el Centro de Control GSI.</li>
              </ul>
            </div>
          ),
          ctaText: 'Cotizar Custodia Armada',
          ctaAction: () => handleCtaClick('Hola, requiero una propuesta de seguridad armada y custodias logísticas para mis activos.')
        }
      case 'service-monitoreo':
        return {
          title: 'Monitoreo GPS y CCTV Avanzado',
          subtitle: 'Seguridad integral asistida por tecnología',
          icon: <Certificate size={36} className="text-[#EF3B43]" weight="fill" />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                GSI fusiona la seguridad física con tecnología de monitoreo activa. Gestionamos flujos de video en tiempo real, rastreo vehicular y botones de pánico con respuesta coordinada con autoridades públicas.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Soluciones Tecnológicas:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 font-sans">
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Rastreo Satelital Activo</p>
                  <p className="text-[11px] text-gray-500">Geocercas, alertas por desvío de ruta o apertura de puertas no autorizada.</p>
                </div>
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Monitoreo de CCTV</p>
                  <p className="text-[11px] text-gray-500">Análisis inteligente de video para detección perimetral temprana de intrusos.</p>
                </div>
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Centro de Control 24/7</p>
                  <p className="text-[11px] text-gray-500">Operadores certificados supervisando permanentemente sucursales y transportes.</p>
                </div>
                <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                  <p className="font-bold text-xs text-[#101820]">Enlace de Emergencia</p>
                  <p className="text-[11px] text-gray-500">Respuesta rápida ante llamadas de pánico y coordinación con el C5/C4.</p>
                </div>
              </div>
            </div>
          ),
          ctaText: 'Cotizar Soluciones Tecnológicas',
          ctaAction: () => handleCtaClick('Hola, me gustaría cotizar servicios de monitoreo satelital GPS y cámaras de videovigilancia CCTV.')
        }
      case 'service-confianza':
        return {
          title: 'Evaluaciones y Control de Confianza',
          subtitle: 'Filtros conductuales e integridad para tu empresa',
          icon: <Buildings size={36} className="text-[#EF3B43]" weight="fill" />,
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                Protegemos la integridad interna de su corporación mediante rigurosos exámenes que evalúan la confiabilidad de sus empleados actuales y candidatos a puestos críticos de confianza.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Nuestros Métodos de Evaluación:</h5>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Prueba de Polígrafo:</strong> Aplicada por examinadores certificados bajo estándares internacionales para detectar riesgos de deshonestidad o infiltración.</li>
                <li><strong>Evaluación Psicocomportamental:</strong> Análisis de personalidad y tendencias de conducta ante situaciones de estrés o manejo de valores.</li>
                <li><strong>Estudios Socioeconómicos:</strong> Verificación de antecedentes laborales, personales, historial crediticio y visitas de validación domiciliaria.</li>
                <li><strong>Exámenes Toxicológicos:</strong> Paneles completos para descartar el uso de sustancias psicotrópicas o prohibidas.</li>
              </ul>
            </div>
          ),
          ctaText: 'Cotizar Control de Confianza',
          ctaAction: () => handleCtaClick('Hola, me interesa realizar evaluaciones de confianza y polígrafo para el personal de mi empresa.')
        }
      case 'cert-iso':
        return {
          title: 'Certificación ISO 9001:2015',
          subtitle: 'Estandarización Internacional de Calidad',
          icon: <Certificate size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'Calidad Estandarizada',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                La norma <strong>ISO 9001:2015</strong> es la base del sistema de gestión de calidad de GSI Seguridad Privada a nivel nacional.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">¿Qué garantiza a nuestros clientes?</h5>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Procesos Homologados:</strong> Desde el reclutamiento hasta la supervisión nocturna en su planta, todo se rige bajo protocolos internacionales claros.</li>
                <li><strong>Mejora Continua:</strong> Evaluaciones trimestrales de desempeño y atención inmediata a incidencias para optimizar constantemente el servicio.</li>
                <li><strong>Enfoque al Cliente B2B:</strong> Métricas objetivas orientadas a garantizar la continuidad de negocio del contratante.</li>
              </ul>
            </div>
          ),
          ctaText: 'Solicitar Información',
          ctaAction: () => handleCtaClick('Hola, me gustaría saber más sobre sus procesos certificados bajo ISO 9001:2015.')
        }
      case 'cert-basc':
        return {
          title: 'Certificación BASC',
          subtitle: 'Business Alliance for Secure Commerce',
          icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'Código MX-MEX00249',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                La certificación <strong>BASC</strong> valida que GSI Seguridad Privada cumple con altos estándares de seguridad para mitigar riesgos como narcotráfico, contrabando y terrorismo en la cadena de suministro internacional.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Aplicabilidad Logística:</h5>
              <p>
                Indispensable para empresas exportadoras e importadoras en México. Garantiza que nuestras custodias carreteras y resguardos de patios logísticos operan bajo los lineamientos globales de comercio seguro.
              </p>
              <p className="text-xs text-gray-400">
                Auditorías periódicas de instalaciones y procesos logísticos aseguran la vigencia de nuestro código comercial internacional.
              </p>
            </div>
          ),
          ctaText: 'Solicitar Propuesta Logística BASC',
          ctaAction: () => handleCtaClick('Hola, requiero guardias y custodias con certificación BASC activa para exportaciones.')
        }
      case 'cert-amesp':
        return {
          title: 'Asociación Mexicana de Empresas de Seguridad Privada',
          subtitle: 'Miembro Activo Certificado',
          icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'Asociación AMESP',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                <strong>GSI Seguridad Privada</strong> es un miembro activo y certificado de la <strong>AMESP (Asociación Mexicana de Empresas de Seguridad Privada A.C.)</strong>, la asociación sectorial más representativa e influyente en la República Mexicana.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Garantía de Formalidad y Solvencia:</h5>
              <p>
                Pertenecer a la AMESP exige el cumplimiento riguroso de auditorías operativas, legales y éticas:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Garantía de permisos federales y estatales vigentes (DGSP/SEDENA).</li>
                <li>Garantía de estabilidad fiscal y cumplimiento con obligaciones laborales (REPSE/SAT).</li>
                <li>Coordinación directa con cámaras empresariales y autoridades de seguridad pública.</li>
                <li>Acceso prioritario a capacitación especializada y certificaciones de vanguardia para nuestra plantilla.</li>
              </ul>
            </div>
          ),
          ctaText: 'Verificar en AMESP',
          ctaAction: () => {
            window.open('https://amesp.mx/', '_blank')
          }
        }
      case 'cert-esr':
        return {
          title: 'Distintivo Empresa Socialmente Responsable (ESR)',
          subtitle: 'Compromiso Ético y Humano',
          icon: <Buildings size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'Acreditación Activa',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                El distintivo <strong>ESR</strong> avala que en GSI Seguridad Privada tratamos a nuestro personal con la máxima dignidad laboral y ética corporativa.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Beneficios e Impacto:</h5>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Rotación Mitigada:</strong> Guardias con salarios competitivos pagados al 100% por vías legales y prestaciones completas reducen sustancialmente la rotación en su servicio.</li>
                <li><strong>Ética Profesional:</strong> Cero esquemas fiscales dudosos o malas prácticas de nómina.</li>
                <li><strong>Responsabilidad Social:</strong> Programas de capacitación y desarrollo integral para nuestros guardias y sus familias.</li>
              </ul>
            </div>
          ),
          ctaText: 'Conocer más de GSI ESR',
          ctaAction: closeModal
        }
      case 'cert-repse':
        return {
          title: 'Registro REPSE Activo',
          subtitle: 'Secretaría del Trabajo y Previsión Social (STPS)',
          icon: <FileText size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'STPS / REPSE-2023',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                GSI cuenta con su registro activo ante el padrón de <strong>Prestadoras de Servicios Especializados o Obras Especializadas (REPSE)</strong> de la Secretaría del Trabajo.
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Seguridad Jurídica Total:</h5>
              <p>
                Garantizamos el cumplimiento fiscal (opinión positiva 32-D ante el SAT) e INFONAVIT/IMSS de manera transparente. Proveemos mensualmente a nuestros clientes la documentación comprobatoria de ley para asegurar la deducibilidad al 100% de la factura del servicio de seguridad.
              </p>
            </div>
          ),
          ctaText: 'Verificar REPSE comercial',
          ctaAction: () => handleCtaClick('Hola, requiero que me envíen copia de su registro REPSE y opinión de cumplimiento SAT.')
        }
      case 'cert-ctpat':
        return {
          title: 'Homologación C-TPAT',
          subtitle: 'Customs-Trade Partnership Against Terrorism',
          icon: <Globe size={36} className="text-[#EF3B43]" weight="fill" />,
          badge: 'Alineación Homologada',
          content: (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
              <p>
                Los servicios de custodia y seguridad perimetral de GSI están alineados con los criterios de seguridad de aduanas de los Estados Unidos (<strong>C-TPAT</strong>).
              </p>
              <h5 className="font-bold text-[#101820] text-sm mt-4">Criterios Cumplidos:</h5>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Inspección física y fotográfica rigurosa de contenedores y tractocamiones en caseta de acceso.</li>
                <li>Sistemas de control de marchas, sellos y perfiles de conductores antes de iniciar ruta.</li>
                <li>Monitoreo activo de la ruta con geocercas específicas del sector de transporte binacional.</li>
              </ul>
            </div>
          ),
          ctaText: 'Cotizar Custodia C-TPAT',
          ctaAction: () => handleCtaClick('Hola, me interesa cotizar custodias locales y en ruta alineadas a C-TPAT.')
        }
      default:
        return {
          title: 'Información GSI',
          content: <p>Contenido no disponible.</p>
        }
    }
  }

  const { title, subtitle, icon, badge, content, ctaText, ctaAction } = getModalContent()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-[#101820]/80 backdrop-blur-md"
          ></motion.div>

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white w-full max-w-2xl overflow-hidden shadow-2xl z-10 border border-gray-150 rounded-[32px]"
          >
            {/* Red Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#EF3B43]"></div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-[#101820] hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X size={20} weight="bold" />
            </button>

            {/* Modal Body */}
            <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6 text-left">
                {icon && (
                  <div className="w-16 h-16 bg-red-50 border border-red-100 flex items-center justify-center shrink-0 rounded-2xl">
                    {icon}
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl md:text-2xl font-black text-[#101820]">
                      {title}
                    </h3>
                    {badge && (
                      <span className="text-[9px] font-bold text-gray-500 uppercase bg-gray-50 px-2 py-0.5 border border-gray-100 rounded-full">
                        {badge}
                      </span>
                    )}
                  </div>
                  {subtitle && (
                    <p className="text-xs font-bold text-[#EF3B43] tracking-widest uppercase mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="mt-2 pr-2">
                {content}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full uppercase cursor-pointer"
                >
                  Cerrar
                </button>
                {ctaText && ctaAction && (
                  <button
                    onClick={ctaAction}
                    className="px-8 py-3 text-xs font-bold text-white bg-[#EF3B43] hover:bg-[#101820] transition-colors rounded-full uppercase shadow-md shadow-[#EF3B43]/20 cursor-pointer"
                  >
                    {ctaText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
