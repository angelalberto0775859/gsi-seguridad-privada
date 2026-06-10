import { motion } from 'framer-motion'
import { ShieldCheck, Target, Sparkle } from '@phosphor-icons/react'
import { useSitePreferences, type Language } from '../lib/sitePreferences'

const contentDict: Record<Language, {
  eyebrow: string
  title: string
  description: string
  cards: {
    card1: {
      badge: string
      title: string
      desc: string
      tags: string[]
    }
    card2: {
      badge: string
      title: string
      desc: string
      tags: string[]
    }
  }
}> = {
  es: {
    eyebrow: 'Fuerza de Custodia Armada',
    title: 'Capacidad Operativa y Adiestramiento',
    description: 'Nuestro cuerpo de seguridad privada armada opera bajo el más estricto control de licencias federales, combinando una presencia disuasiva equipada con entrenamientos de reacción táctica.',
    cards: {
      card1: {
        badge: 'Presencia Disuasiva: Equipado',
        title: 'Vigilancia Estática y Patrullaje Armado',
        desc: 'Personal equipado con armamento reglamentario homologado y portación de licencia oficial (LFE). Su rol principal es el control de accesos críticos, patrullaje perimetral y disuasión de amenazas en parques industriales y corporativos.',
        tags: ['Armamento Fundado en Funda', 'Portación Legal Regulada']
      },
      card2: {
        badge: 'Adiestramiento: Reacción y Alineación',
        title: 'Capacitación Táctica y Prácticas de Precisión',
        desc: 'Nuestros guardias y escoltas armados asisten a entrenamientos periódicos en campos de tiro certificados. Reciben instrucción en posturas de tiro, tiro de reacción, despeje de áreas e intervención ante situaciones de riesgo letal inmediato.',
        tags: ['Postura Táctica de Reacción', 'Campo de Tiro Autorizado']
      }
    }
  },
  en: {
    eyebrow: 'Armed Custody Force',
    title: 'Operational Capacity & Training',
    description: 'Our body of armed private security operates under the strictest control of federal licenses, combining an equipped deterrent presence with tactical reaction training.',
    cards: {
      card1: {
        badge: 'Deterrent Presence: Equipped',
        title: 'Static Vigilance & Armed Patrolling',
        desc: 'Personnel equipped with approved standard weaponry and official carrying license (LFE). Their main role is the control of critical access points, perimeter patrolling, and threat deterrence in industrial parks and corporate offices.',
        tags: ['Weapon Holstered', 'Regulated Legal Carrying']
      },
      card2: {
        badge: 'Training: Reaction & Alignment',
        title: 'Tactical Training & Precision Practices',
        desc: 'Our armed guards and escorts attend periodic training in certified shooting ranges. They receive instruction in shooting stances, reaction shooting, area clearing, and immediate lethal threat response.',
        tags: ['Tactical Reaction Stance', 'Authorized Shooting Range']
      }
    }
  },
  zh: {
    eyebrow: '武装护卫力量',
    title: '实战能力与战术培训',
    description: '我们的武装私人安保队伍在最严格的联邦许可证管理之下运行，结合了专业装备的威慑存在与敏捷的战术应急训练。',
    cards: {
      card1: {
        badge: '安全防范威慑：已装备',
        title: '定点防守与武装巡逻',
        desc: '配备合格标准武器并持有官方携枪许可证 (LFE) 的安全人员。他们的主要职责是控制关键准入点，实施周界巡逻，并在工业园区和企业写字楼实施安全威胁防范。',
        tags: ['武器入套', '合法受监管携枪']
      },
      card2: {
        badge: '战术打靶与射击：专业训练',
        title: '战术技能与实弹射击演练',
        desc: '我们的武装警卫和随护定期在核准的靶场参加实弹训练。接受射击姿势、应急射击、区域清剿以及应对紧急致命威胁等技能的专业指导。',
        tags: ['战术应急射击姿势', '核准授权射击靶场']
      }
    }
  }
}

export default function ArmedGallery() {
  const { language } = useSitePreferences()
  const content = contentDict[language]

  return (
    <section className="py-24 bg-[#101820] text-white relative overflow-hidden">
      

      
      {/* Floating background glowing red blur blobs */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#EF3B43]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-[#EF3B43]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-[#EF3B43] flex items-center justify-center gap-2">
            <Sparkle size={14} weight="fill" className="animate-spin-slow text-[#EF3B43]" />
            {content.eyebrow}
          </h2>
          <h3 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none text-white">
            {content.title}
          </h3>
          <p className="text-sm md:text-base text-gray-400 max-w-[60ch] mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Side-by-side Guard Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Armed Guard Alert */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="group relative flex flex-col justify-between overflow-hidden bg-slate-900 border border-white/5 shadow-2xl rounded-[36px] min-h-[500px]"
          >
            {/* Image container */}
            <div className="absolute inset-0 z-0">
              <img
                src="/recursos/gsi-guardia-armado-alerta.png"
                alt="Guardia Armado GSI en Vigilancia"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                loading="lazy"
              />
              {/* Vignette dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Top Badge */}
            <div className="p-8 z-10 self-start">
              <span className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                <ShieldCheck size={14} className="text-[#EF3B43]" weight="fill" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                  {content.cards.card1.badge}
                </span>
              </span>
            </div>

            {/* Bottom Content Card */}
            <div className="p-8 z-10 space-y-4 bg-slate-950/70 backdrop-blur-sm border-t border-white/5">
              <h4 className="font-display text-xl font-extrabold text-white leading-tight">
                {content.cards.card1.title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {content.cards.card1.desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {content.cards.card1.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[9px] font-bold bg-white/5 border border-white/10 rounded-lg text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Left accent line indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#EF3B43] transition-colors duration-300"></div>
          </motion.div>

          {/* Card 2: Tactical Training */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="group relative flex flex-col justify-between overflow-hidden bg-slate-900 border border-white/5 shadow-2xl rounded-[36px] min-h-[500px]"
          >
            {/* Image container */}
            <div className="absolute inset-0 z-0">
              <img
                src="/recursos/gsi-guardia-armado-apuntando.png"
                alt="Entrenamiento de Tiro GSI"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                loading="lazy"
              />
              {/* Vignette dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            </div>

            {/* Top Badge */}
            <div className="p-8 z-10 self-start">
              <span className="inline-flex items-center space-x-1.5 bg-[#EF3B43]/20 backdrop-blur-md border border-[#EF3B43]/45 px-3 py-1.5 rounded-full">
                <Target size={14} className="text-[#EF3B43]" weight="fill" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                  {content.cards.card2.badge}
                </span>
              </span>
            </div>

            {/* Bottom Content Card */}
            <div className="p-8 z-10 space-y-4 bg-slate-950/70 backdrop-blur-sm border-t border-white/5">
              <h4 className="font-display text-xl font-extrabold text-white leading-tight">
                {content.cards.card2.title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {content.cards.card2.desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {content.cards.card2.tags.map((tag, idx) => (
                  <span key={tag} className={`px-2.5 py-1 text-[9px] font-bold rounded-lg ${
                    idx === 0
                      ? 'bg-[#EF3B43]/10 border border-[#EF3B43]/30 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-300'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Left accent line indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#EF3B43] transition-colors duration-300"></div>
          </motion.div>

        </div>
        
      </div>
    </section>
  )
}
