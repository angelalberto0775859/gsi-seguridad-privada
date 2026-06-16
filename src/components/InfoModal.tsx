import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Certificate, Medal, Buildings, FileText, Globe } from '@phosphor-icons/react'
import { useSitePreferences } from '../lib/sitePreferences'

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
  const { language } = useSitePreferences()

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: ModalType }>
      if (customEvent.detail && customEvent.detail.type) {
        setModalType(customEvent.detail.type)
        setIsOpen(true)
      }
    }

    window.addEventListener('open-info-modal', handleOpen)
    return () => {
      window.removeEventListener('open-info-modal', handleOpen)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
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
        if (language === 'en') {
          return {
            title: 'Privacy Notice',
            subtitle: 'GSI Seguridad Privada S.A. de C.V.',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  <strong>GSI Seguridad Privada S.A. de C.V.</strong>, located in Mexico City, is responsible for the treatment of your personal data provided through this commercial portal.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">For what purposes will we use your data?</h5>
                <p>
                  The personal data we collect from you will be used for the following main purposes necessary for the requested service:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Analyze and quote personalized proposals for on-site, armed, and technological private security.</li>
                  <li>Verify and confirm your identity and the commercial representation of the requesting company.</li>
                  <li>Provide commercial follow-up, answer questions, and coordinate technical feasibility visits to your facilities.</li>
                  <li>Establish the contractual relationship and compliance with corresponding public security regulations.</li>
                </ul>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Data Collected</h5>
                <p>
                  For the purposes indicated, we collect identification and contact data such as: full name, corporate email, office/mobile phone, company name, and specific operational comments. We do not collect sensitive data through this medium.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">ARCO Rights</h5>
                <p>
                  You have the right to know what personal data we have about you, what we use it for, and the conditions of our use of it (Access). Likewise, it is your right to request the correction of your personal information in case it is outdated, inaccurate, or incomplete (Rectification); that we delete it from our records when you consider that it is not being used properly (Cancellation); as well as to oppose the use of your personal data for specific purposes (Opposition).
                </p>
                <p>
                  To exercise any of the ARCO rights or revoke consent, you can send an email to: <a href="mailto:privacidad@gsiseguridad.com.mx" className="text-[#EF3B43] hover:underline font-semibold">privacidad@gsiseguridad.com.mx</a>.
                </p>
              </div>
            ),
            ctaText: 'Understood',
            ctaAction: closeModal
          }
        }
        if (language === 'zh') {
          return {
            title: '隐私声明',
            subtitle: 'GSI Seguridad Privada S.A. de C.V.',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  <strong>GSI Seguridad Privada S.A. de C.V.</strong>（总部位于墨西哥城）负责处理您通过此商务门户提供的个人数据。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">我们将您的数据用于什么目的？</h5>
                <p>
                  我们向您收集的个人数据将用于以下所请求服务所必需的主要目的：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>分析并报价定制的现场物理安防、武装安防和技术安防方案。</li>
                  <li>验证并确认您的身份以及申请公司的商业代表身份。</li>
                  <li>进行商务跟进、解答疑问，并协调对您的设施进行技术可行性实地考察。</li>
                  <li>建立合同关系并遵守相应的公共安全法规。</li>
                </ul>
                <h5 className="font-bold text-[#101820] text-sm mt-4">收集的数据</h5>
                <p>
                  出于所述目的，我们收集身份和联系数据，例如：全名、企业电子邮件、办公/移动电话、公司名称以及特定的运营备注。我们不通过此渠道收集敏感数据。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">ARCO 权利</h5>
                <p>
                  您有权了解我们拥有您的哪些个人数据、我们将其用于什么目的以及我们使用这些数据的条件（访问权）。同样，如果您的个人信息已过时、不准确或不完整，您有权要求予以纠正（更正权）；当您认为我们未妥善使用您的个人信息时，您有权要求将其从我们的记录中删除（删除权）；以及反对将您的个人数据用于特定目的（反对权）。
                </p>
                <p>
                  行使任何 ARCO 权利或撤销同意，可发送电子邮件至：<a href="mailto:privacidad@gsiseguridad.com.mx" className="text-[#EF3B43] hover:underline font-semibold">privacidad@gsiseguridad.com.mx</a>。
                </p>
              </div>
            ),
            ctaText: '已了解',
            ctaAction: closeModal
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Terms and Conditions of Service',
            subtitle: 'Regulatory and Web Use Framework',
            icon: <FileText size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  Welcome to the <strong>GSI Seguridad Privada</strong> web portal. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Use of Information and Content</h5>
                <p>
                  All material on this site, including designs, text, graphics, logos, images, maps, and software codes, is protected under the copyright of GSI Seguridad Privada and Grupo Seguridad Integral. Any total or partial reproduction for commercial purposes without prior written authorization is strictly prohibited.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Quotes and Service Proposals</h5>
                <p>
                  Any quote request submitted through this site represents a request for pre-contractual information. Final costs and scopes are subject to an on-site physical risk analysis, local operational feasibility, and the official signing of a private security service contract regulated by federal laws.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Limited Liability</h5>
                <p>
                  GSI Seguridad Privada makes every effort to keep information updated and accurate. However, we do not guarantee the complete absence of temporary technical errors in the interactive map or branch information. GSI is not liable for damages resulting from the use of this site or external links.
                </p>
              </div>
            ),
            ctaText: 'Accept Terms',
            ctaAction: closeModal
          }
        }
        if (language === 'zh') {
          return {
            title: '服务条款与条件',
            subtitle: '监管与网页使用框架',
            icon: <FileText size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  欢迎访问 <strong>GSI Seguridad Privada</strong> 门户网站。访问和使用本网站即表示您同意并承诺遵守以下使用条款和条件。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">信息和内容的使用</h5>
                <p>
                  本网站上的所有材料，包括设计、文本、图形、标识、图像、地图和软件代码，均受 GSI Seguridad Privada 和 Grupo Seguridad Integral 的著作权保护。未经事先书面许可，严禁出于商业目的进行全部或部分复制。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">报价与服务方案</h5>
                <p>
                  通过本网站发送的任何报价请求均代表对合同前信息的请求。最终费用和范围取决于现场人防安全风险评估、当地运营可行性以及正式签署受联邦法律监管的私人安保服务合同。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">有限责任</h5>
                <p>
                  GSI Seguridad Privada 尽一切努力保持信息的最新和准确。然而，我们不保证互动地图或分支机构信息完全没有临时的技术错误。GSI 对因使用本网站或外部链接而产生的任何损失不承担责任。
                </p>
              </div>
            ),
            ctaText: '接受条款',
            ctaAction: closeModal
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Federal Authorization and DGSP Permits',
            subtitle: 'Ministry of Security and Citizen Protection',
            icon: <Medal size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'Registry: DGSP/008-24/SP',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  <strong>GSI Seguridad Privada S.A. de C.V.</strong> operates in strict compliance with the Federal Private Security Law in force in the Mexican Republic.
                </p>
                <div className="bg-gray-50 border border-gray-200 p-4 space-y-2 rounded-xl">
                  <p className="text-xs font-bold text-gray-700">Official Licenses and Permits:</p>
                  <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                    <li><strong>Active Federal Permit:</strong> Document DGSP/008-24/SP granted by the General Directorate of Private Security of the CNS.</li>
                    <li><strong>Authorized Modalities:</strong> Modality I (Security and surveillance of property) and Modality II (Protection and custody of persons and property).</li>
                    <li><strong>Firearm Possession:</strong> Collective Particular License (LPC) authorized by the Ministry of National Defense (SEDENA) for carrying firearms in exclusive private security service.</li>
                  </ul>
                </div>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Tax and Labor Compliance (REPSE)</h5>
                <p>
                  For the total legal peace of mind of our B2B clients, we have an active REPSE registration with the STPS. We guarantee that 100% of our operational staff has active Social Security (IMSS), Infonavit contributions, and superior statutory benefits, mitigating any risk of joint labor liability.
                </p>
              </div>
            ),
            ctaText: 'Verify Federal Permit',
            ctaAction: () => {
              window.open('https://www.gob.mx/sspc', '_blank')
            }
          }
        }
        if (language === 'zh') {
          return {
            title: '联邦授权与 DGSP 许可',
            subtitle: '安全与公民保护部',
            icon: <Medal size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: '注册号：DGSP/008-24/SP',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  <strong>GSI Seguridad Privada S.A. de C.V.</strong> 严格遵守墨西哥合众国现行的《联邦私人安保法》开展运营。
                </p>
                <div className="bg-gray-50 border border-gray-200 p-4 space-y-2 rounded-xl">
                  <p className="text-xs font-bold text-gray-700">官方许可与资质文件：</p>
                  <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                    <li><strong>现行联邦许可：</strong>由 CNS 国家级私人安全总局颁发的 DGSP/008-24/SP 批文。</li>
                    <li><strong>授权业务模式：</strong>第一模式（财物安全与巡逻）和第二模式（人身及财物保护与护送）。</li>
                    <li><strong>枪支携带许可：</strong>由国防部 (SEDENA) 授权的集体特别许可证 (LPC)，仅限在执行专属私人安保服务时携带枪支。</li>
                  </ul>
                </div>
                <h5 className="font-bold text-[#101820] text-sm mt-4">税务与劳动合规 (REPSE)</h5>
                <p>
                  为了让我们的 B2B 客户完全免除法律后顾之忧，我们拥有在劳动部 (STPS) 注册的活跃 REPSE。我们保证 100% 的运营员工均拥有有效的社会保障 (IMSS)、Infonavit 住房公积金和高于法定标准的福利，规避任何连带劳动责任风险。
                </p>
              </div>
            ),
            ctaText: '验证联邦许可',
            ctaAction: () => {
              window.open('https://www.gob.mx/sspc', '_blank')
            }
          }
        }
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
        if (language === 'en') {
          return {
            title: 'On-site Physical Surveillance',
            subtitle: 'Perimeter and access protection on site',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  Our physical security division provides highly trained security guards for loss prevention and access control in industrial parks, warehouses, manufacturing plants, and corporate offices.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Key Service Attributes:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">Access Control</p>
                    <p className="text-[11px] text-gray-500">Rigorous registration of personnel, suppliers, visitors, and vehicle scale monitoring.</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">24/7 Supervision</p>
                    <p className="text-[11px] text-gray-500">Zonal supervisors in equipped patrol vehicles conducting constant audits.</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">Operational Protocols</p>
                    <p className="text-[11px] text-gray-500">Custom-designed protocols for fire, theft, or intrusion emergencies.</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">Corporate Image</p>
                    <p className="text-[11px] text-gray-500">Approved, clean tactical uniforms reflecting authority, seriousness, and control.</p>
                  </div>
                </div>
              </div>
            ),
            ctaText: 'Quote On-site Service',
            ctaAction: () => handleCtaClick('Hello, I am interested in quoting the On-site Physical Surveillance service for my company.')
          }
        }
        if (language === 'zh') {
          return {
            title: '现场实体安保巡逻',
            subtitle: '现场周边和出入口保护',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  我们的物理防范安保部门提供高素质的保安人员，用于工业园区、仓库、制造工厂和企业办公室的防损和全面出入口控制。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">服务核心要素：</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">出入口控制</p>
                    <p className="text-[11px] text-gray-500">对人员、供应商、访客进行严格登记以及车辆地磅管理。</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">24/7 监督</p>
                    <p className="text-[11px] text-gray-500">区域主管乘坐配备精良的巡逻车进行不间断的审计 and 检查。</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">运营方案指令</p>
                    <p className="text-[11px] text-gray-500">针对火灾、盗窃或侵入等具体紧急情况量身定制协议。</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">企业形象</p>
                    <p className="text-[11px] text-gray-500">规范且无可挑剔的战术制服，体现出严谨和掌控力。</p>
                  </div>
                </div>
              </div>
            ),
            ctaText: '索取现场安保报价',
            ctaAction: () => handleCtaClick('您好，我希望为我的公司索取现场人防安保服务的报价。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Armed Protection and Custody',
            subtitle: 'Deterrent security for high-value assets',
            icon: <Globe size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  We offer armed escorts in commercial land transit and fixed armed elements to safeguard critical industrial facilities, valuables, and national strategic infrastructure.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Characteristics of Armed Personnel:</h5>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>Legal Possession of Weapons:</strong> Backed by the Collective Particular License authorized by SEDENA.</li>
                  <li><strong>Advanced Training:</strong> Periodic training in precision shooting practices and defensive tactics on highways and urban areas.</li>
                  <li><strong>Trust Assessment:</strong> Rigorous screening with polygraph, ongoing psychological and toxicological profiles.</li>
                  <li><strong>Satellite Communication:</strong> Constant link via encrypted radios with the GSI Control Center.</li>
                </ul>
              </div>
            ),
            ctaText: 'Quote Armed Custody',
            ctaAction: () => handleCtaClick('Hello, I require a proposal for armed security and logistics escorts for my assets.')
          }
        }
        if (language === 'zh') {
          return {
            title: '武装保护与护送',
            subtitle: '针对高价值资产的威慑性安保',
            icon: <Globe size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  我们提供商业陆路运输途中的武装护卫以及固定武装哨兵，以保障关键工业设施、贵重物品和国家战略基础设施的安全。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">武装人员特点：</h5>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>合法携带武器：</strong>由 SEDENA 授权的集体特别许可证 (LPC) 提供法律保障。</li>
                  <li><strong>高级训练：</strong>定期进行精准射击训练，以及公路和城市防卫战术演练。</li>
                  <li><strong>信任评估：</strong>利用测谎仪进行严格筛选，并持续进行心理和毒理学评估。</li>
                  <li><strong>卫星通信：</strong>通过加密无线电与 GSI 控制中心保持恒常联络。</li>
                </ul>
              </div>
            ),
            ctaText: '索取武装护送报价',
            ctaAction: () => handleCtaClick('您好，我需要一份关于我的资产武装安保与物流护送的方案建议书。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Advanced GPS and CCTV Monitoring',
            subtitle: 'Technology-assisted comprehensive security',
            icon: <Certificate size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  GSI merges physical security with active monitoring technology. We manage real-time video streams, vehicle tracking, and panic buttons with coordinated response alongside public authorities.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Technological Solutions:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">Active Satellite Tracking</p>
                    <p className="text-[11px] text-gray-500">Geofencing, route deviation alerts, or unauthorized door openings.</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">CCTV Monitoring</p>
                    <p className="text-[11px] text-gray-500">Intelligent video analytics for early perimeter intrusion detection.</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">24/7 Control Center</p>
                    <p className="text-[11px] text-gray-500">Certified operators permanently supervising branches and transit.</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">Emergency Link</p>
                    <p className="text-[11px] text-gray-500">Rapid response to panic calls and coordination with C5/C4 authorities.</p>
                  </div>
                </div>
              </div>
            ),
            ctaText: 'Quote Tech Solutions',
            ctaAction: () => handleCtaClick('Hello, I would like to quote GPS satellite monitoring and CCTV video surveillance camera services.')
          }
        }
        if (language === 'zh') {
          return {
            title: '先进的 GPS 和 CCTV 监控',
            subtitle: '技术辅助的全面安保',
            icon: <Certificate size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  GSI 将物理防范与主动监控技术完美结合。我们管理实时视频流、车辆追踪和紧急报警按钮，并与公共安全部门进行协调应急响应。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">技术解决方案：</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">主动卫星追踪</p>
                    <p className="text-[11px] text-gray-500">设定地理围栏、路线偏离警报或未经授权的开门警报。</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">CCTV 视频监控</p>
                    <p className="text-[11px] text-gray-500">智能视频分析，用于及早发现周边入侵者。</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">24/7 控制中心</p>
                    <p className="text-[11px] text-gray-500">经认证的操作员永久监督各分支机构和运输状况。</p>
                  </div>
                  <div className="border border-gray-100 p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-xs text-[#101820]">应急联动</p>
                    <p className="text-[11px] text-gray-500">对恐慌求助呼叫进行快速响应，并与 C5/C4 机构进行协调。</p>
                  </div>
                </div>
              </div>
            ),
            ctaText: '索取技术方案报价',
            ctaAction: () => handleCtaClick('您好，我希望能为 GPS 卫星定位监控和 CCTV 视频监控摄像服务进行报价。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Trust Evaluations and Background Checks',
            subtitle: 'Behavioral screening and integrity for your company',
            icon: <Buildings size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  We protect the internal integrity of your corporation through rigorous evaluations that assess the reliability of your current employees and candidates for critical trust positions.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Our Assessment Methods:</h5>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>Polygraph Test:</strong> Conducted by certified examiners under international standards to detect risks of dishonesty or infiltration.</li>
                  <li><strong>Psycho-behavioral Assessment:</strong> Personality and behavioral trends analysis under stress or when handling valuables.</li>
                  <li><strong>Socioeconomic Studies:</strong> Verification of employment history, personal background, credit score, and home validation visits.</li>
                  <li><strong>Toxicological Testing:</strong> Complete panels to rule out the use of psychotropic or prohibited substances.</li>
                </ul>
              </div>
            ),
            ctaText: 'Quote Background Checks',
            ctaAction: () => handleCtaClick('Hello, I am interested in conducting trust and polygraph evaluations for my company\'s personnel.')
          }
        }
        if (language === 'zh') {
          return {
            title: '信任评估与背景调查',
            subtitle: '为您公司进行行为筛选和诚信把关',
            icon: <Buildings size={36} className="text-[#EF3B43]" weight="fill" />,
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  我们通过严密科学的测评体系，评估您现有员工和关键涉密岗位候选人的可靠性，从而保护您公司的内部安全与诚信体系。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">我们的测评方法：</h5>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>测谎仪测试：</strong>由经国际标准认证的测评师执行，检测不诚实或被渗透的风险。</li>
                  <li><strong>心理行为评估：</strong>分析在压力下或管理贵重物品时的性格特征和行为倾向。</li>
                  <li><strong>社会经济调查：</strong>核实工作经历、个人历史、信用记录，并进行入户家访核实。</li>
                  <li><strong>毒理学检测：</strong>完整检测排查是否使用精神药物或违禁物质。</li>
                </ul>
              </div>
            ),
            ctaText: '索取信任评估报价',
            ctaAction: () => handleCtaClick('您好，我希望为我的公司员工进行信任评估和测谎测试。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'ISO 9001:2015 Certification',
            subtitle: 'International Quality Standardization',
            icon: <Certificate size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'Standardized Quality',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  The ISO 9001:2015 standard is the cornerstone of GSI Seguridad Privada\'s quality management system nationwide.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">What does this guarantee our clients?</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Approved Processes:</strong> From recruitment to night-shift supervision at your plant, everything is governed by clear international protocols.</li>
                  <li><strong>Continuous Improvement:</strong> Quarterly performance evaluations and immediate attention to incidents to constantly optimize the service.</li>
                  <li><strong>B2B Client Focus:</strong> Objective metrics aimed at guaranteeing the business continuity of the contractor.</li>
                </ul>
              </div>
            ),
            ctaText: 'Request Information',
            ctaAction: () => handleCtaClick('Hello, I would like to learn more about your processes certified under ISO 9001:2015.')
          }
        }
        if (language === 'zh') {
          return {
            title: 'ISO 9001:2015 质量管理体系认证',
            subtitle: '国际质量标准化',
            icon: <Certificate size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: '质量标准化',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  ISO 9001:2015 标准是 GSI Seguridad Privada 全国质量管理体系 of the cornerstone.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">这能给我们的客户带来什么保证？</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>流程标准化：</strong>从招聘选拔到您工厂的夜间巡逻监督，一切都严格遵循清晰的国际协议。</li>
                  <li><strong>持续改进：</strong>每季度进行绩效考评，对突发事件即时响应，不断优化服务质量。</li>
                  <li><strong>专注 B2B 客户：</strong>以目标指标为导向，切实保障承包商的业务连续性。</li>
                </ul>
              </div>
            ),
            ctaText: '索取更多信息',
            ctaAction: () => handleCtaClick('您好，我希望了解更多关于贵司在 ISO 9001:2015 下通过认证的流程信息。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'BASC Certification',
            subtitle: 'Business Alliance for Secure Commerce',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'Code MX-MEX00249',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  BASC certification validates that GSI Seguridad Privada complies with high security standards to mitigate risks such as drug trafficking, smuggling, and terrorism in the international supply chain.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Logistics Applicability:</h5>
                <p>
                  Essential for importing and exporting companies in Mexico. It guarantees that our highway escorts and logistics yard guards operate under global safe commerce guidelines.
                </p>
                <p className="text-xs text-gray-400">
                  Periodic audits of facilities and logistics processes ensure the validity of our international commercial code.
                </p>
              </div>
            ),
            ctaText: 'Request BASC Logistics Proposal',
            ctaAction: () => handleCtaClick('Hello, I require guards and escorts with active BASC certification for export logistics.')
          }
        }
        if (language === 'zh') {
          return {
            title: 'BASC 安全商盟认证',
            subtitle: '商业反恐安全联盟',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: '代码 MX-MEX00249',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  BASC 认证验证了 GSI Seguridad Privada 符合高标准安全规范，可降低国际供应链中诸如贩毒、走私和恐怖主义等安全风险。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">物流适用性：</h5>
                <p>
                  对墨西哥的进出口企业而言必不可少。它确保我们的公路护送和物流货场安保严格按照全球安全贸易指南运营。
                </p>
                <p className="text-xs text-gray-400">
                  对设施和物流流程的定期审计，确保了我们国际商业代码的持续有效性。
                </p>
              </div>
            ),
            ctaText: '索取 BASC 物流安保方案',
            ctaAction: () => handleCtaClick('您好，我需要获得 BASC 认证的安保人员和护卫队，以保障出口物流安全。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Mexican Association of Private Security Companies',
            subtitle: 'Certified Active Member',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'AMESP Association',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  <strong>GSI Seguridad Privada</strong> is an active and certified member of <strong>AMESP (Mexican Association of Private Security Companies A.C.)</strong>, the most representative and influential industry association in the Mexican Republic.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Guarantee of Formality and Solvency:</h5>
                <p>
                  Belonging to AMESP requires strict compliance with operational, legal, and ethical audits:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Guarantee of active federal and state permits (DGSP/SEDENA).</li>
                  <li>Guarantee of fiscal stability and compliance with labor obligations (REPSE/SAT).</li>
                  <li>Direct coordination with business chambers and public safety authorities.</li>
                  <li>Priority access to specialized training and cutting-edge certifications for our staff.</li>
                </ul>
              </div>
            ),
            ctaText: 'Verify on AMESP',
            ctaAction: () => {
              window.open('https://amesp.mx/', '_blank')
            }
          }
        }
        if (language === 'zh') {
          return {
            title: '墨西哥私人安保公司协会',
            subtitle: '经认证的活跃会员',
            icon: <ShieldCheck size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'AMESP 协会',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  <strong>GSI Seguridad Privada</strong> 是 <strong>AMESP（墨西哥私人安保公司协会）</strong>的活跃且经认证的会员，该协会是墨西哥合众国最具代表性和影响力的行业协会。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">正规性与财务偿付能力保证：</h5>
                <p>
                  加入 AMESP 需要严格遵守运营、法律和道德审计：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>现行有效的联邦及州级许可（DGSP/SEDENA）保障。</li>
                  <li>税务稳定以及履行劳动义务（REPSE/SAT）保障。</li>
                  <li>与商会及公共安全部门直接协调。</li>
                  <li>让我们的员工优先获得专业培训和最前沿的资格认证。</li>
                </ul>
              </div>
            ),
            ctaText: '在 AMESP 上验证',
            ctaAction: () => {
              window.open('https://amesp.mx/', '_blank')
            }
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Socially Responsible Company (ESR)',
            subtitle: 'Ethical and Human Commitment',
            icon: <Buildings size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'Active Accreditation',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  The ESR distinction certifies that at GSI Seguridad Privada we treat our personnel with the highest labor dignity and corporate ethics.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Benefits and Impact:</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Mitigated Turnover:</strong> Guards with competitive salaries paid 100% legally and full statutory benefits substantially reduce service turnover.</li>
                  <li><strong>Professional Ethics:</strong> Zero sketchy tax schemes or bad payroll practices.</li>
                  <li><strong>Social Responsibility:</strong> Comprehensive training and development programs for our guards and their families.</li>
                </ul>
              </div>
            ),
            ctaText: 'Learn more about GSI ESR',
            ctaAction: closeModal
          }
        }
        if (language === 'zh') {
          return {
            title: '企业社会责任 (ESR) 标识',
            subtitle: '道德与人文承诺',
            icon: <Buildings size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: '活跃认证',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  ESR 标识证明在 GSI Seguridad Privada，我们以最高的劳动尊严和企业道德对待我们的员工。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">效益与影响：</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>降低流失率：</strong>警卫薪水极具竞争力，100% 合法发放并享有全额法定福利，大幅降低人员流失。</li>
                  <li><strong>职业道德：</strong>杜绝任何灰色避税方案或不良薪酬发放行为。</li>
                  <li><strong>社会责任：</strong>为我们的警卫及其家属提供全面的培训和职业发展计划。</li>
                </ul>
              </div>
            ),
            ctaText: '了解更多 GSI ESR 信息',
            ctaAction: closeModal
          }
        }
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
        if (language === 'en') {
          return {
            title: 'Active REPSE Registry',
            subtitle: 'Ministry of Labor and Social Welfare (STPS)',
            icon: <FileText size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'STPS / REPSE-2023',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  GSI holds an active registration in the Registry of Specialized Service Providers or Specialized Works (REPSE) of the Ministry of Labor.
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Total Legal Compliance:</h5>
                <p>
                  We transparently guarantee tax compliance (positive 32-D opinion before SAT) and INFONAVIT/IMSS payments. We provide our clients monthly with legal supporting documents to ensure 100% deductibility of their security service invoice.
                </p>
              </div>
            ),
            ctaText: 'Verify Commercial REPSE',
            ctaAction: () => handleCtaClick('Hello, I require a copy of your REPSE registration and SAT compliance opinion.')
          }
        }
        if (language === 'zh') {
          return {
            title: '活跃的 REPSE 注册',
            subtitle: '劳动和社会保障部 (STPS)',
            icon: <FileText size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'STPS / REPSE-2023',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  GSI 在劳动部的专业服务提供商或专业工程注册簿 (REPSE) 中拥有活跃的注册资格。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">完备的法律合规性：</h5>
                <p>
                  我们透明地保证税务合规（获得税务局 SAT 32-D 正面合规意见）及社保 INFONAVIT/IMSS 缴纳。我们按月向客户提供法定的证明文件，以确保安保服务发票能 100% 进行抵扣。
                </p>
              </div>
            ),
            ctaText: '验证商业 REPSE 状态',
            ctaAction: () => handleCtaClick('您好，我需要贵司提供一份 REPSE 注册副本和税务局 (SAT) 合规证明。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'C-TPAT Alignment',
            subtitle: 'Customs-Trade Partnership Against Terrorism',
            icon: <Globe size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: 'Aligned Standards',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left">
                <p>
                  GSI\'s security and perimeter custody services are aligned with the United States customs security criteria (<strong>C-TPAT</strong>).
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">Criteria Fulfilled:</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Rigorous physical and photographic inspection of containers and trucks at the entry booth.</li>
                  <li>Control systems for seals, gear status, and driver profiles before route dispatch.</li>
                  <li>Active route monitoring with specific geofencing for the binational transport sector.</li>
                </ul>
              </div>
            ),
            ctaText: 'Quote C-TPAT Custody',
            ctaAction: () => handleCtaClick('Hello, I am interested in quoting local and en-route escorts aligned with C-TPAT.')
          }
        }
        if (language === 'zh') {
          return {
            title: 'C-TPAT 对齐标准',
            subtitle: '海关-商贸反恐伙伴计划',
            icon: <Globe size={36} className="text-[#EF3B43]" weight="fill" />,
            badge: '标准已对齐',
            content: (
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-left font-sans">
                <p>
                  GSI 的护送和周边安保服务均符合美国海关安全标准 (<strong>C-TPAT</strong>)。
                </p>
                <h5 className="font-bold text-[#101820] text-sm mt-4">符合的指标：</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>在入口岗哨对集装箱和卡车进行严格的物理和照片检查。</li>
                  <li>在发车前建立对铅封、运行状态和驾驶员档案的控制系统。</li>
                  <li>对双边运输行业实施带有特定地理围栏的主动路线监控。</li>
                </ul>
              </div>
            ),
            ctaText: '索取 C-TPAT 护送报价',
            ctaAction: () => handleCtaClick('您好，我希望能为符合 C-TPAT 标准的本地和途中安保护卫进行询价。')
          }
        }
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
        if (language === 'en') {
          return {
            title: 'GSI Information',
            content: <p>Information not available.</p>
          }
        }
        if (language === 'zh') {
          return {
            title: 'GSI 信息',
            content: <p>内容暂不可用。</p>
          }
        }
        return {
          title: 'Información GSI',
          content: <p>Contenido no disponible.</p>
        }
    }
  }

  const { title, subtitle, icon, badge, content, ctaText, ctaAction } = getModalContent()

  // Translate modal controls and aria labels
  const closeBtnText = language === 'en' ? 'Close' : language === 'zh' ? '关闭' : 'Cerrar'
  const closeAriaLabel = language === 'en' ? 'Close modal' : language === 'zh' ? '关闭弹框' : 'Cerrar modal'

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
              aria-label={closeAriaLabel}
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
                  {closeBtnText}
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
