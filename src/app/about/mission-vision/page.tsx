"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Building2,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Target,
  Eye,
  MapPin,
  Quote,
  Home,
  ChevronRight,
  Compass,
  History,
  Globe2,
  Rocket,
  Lightbulb,
  Cpu,
  Network,
  Leaf
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from "framer-motion"

// ==========================================
// 1. IMPORT NAVBAR & TOPBAR HERE
// ==========================================
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from "@/components/ui/footer-section"

export default function MissionVisionPage() {
  const [isVisible, setIsVisible] = useState(false)

  // Refs for InView Triggers
  const fullImageRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const genesisRef = useRef<HTMLDivElement>(null)
  const competenciesRef = useRef<HTMLDivElement>(null)
  const mandatesRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const isFullImageInView = useInView(fullImageRef, { once: false, amount: 0.1 })
  const isIntroInView = useInView(introRef, { once: false, amount: 0.1 })
  const isGenesisInView = useInView(genesisRef, { once: false, amount: 0.2 })
  const isCompetenciesInView = useInView(competenciesRef, { once: false, amount: 0.1 })
  const isMandatesInView = useInView(mandatesRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

  // Parallax: Decorative elements remain, but incredibly subtle
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Refined, tweened animation variants for professional feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  // ==========================================
  // DATA PAYLOADS (From Original Mission Page)
  // ==========================================
  const services = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Youth Empowerment",
      description: "Arming students with a sophisticated blend of advanced technical knowledge, rigorous practical expertise, and a resilient spirit of innovation to tackle global challenges.",
      position: "left",
    },
    {
      icon: <Globe2 className="w-5 h-5" />,
      title: "Democratizing Education",
      description: "Creating a high-speed, transparent pathway for students from every corner of Bihar to reach the global stage through standardized, merit-driven admission processes.",
      position: "left",
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Bridging the Gap",
      description: "Aggressively connecting traditional academia with the modern industrial landscape, ensuring our students transition smoothly from classrooms to corporate boardrooms.",
      position: "left",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Breeding Visionaries",
      description: "Serving as the ultimate incubator for competent, ethical professionals who will become the primary driving force behind India’s rapid economic and technological progress.",
      position: "right",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Industry Synergy",
      description: "Constructing an ecosystem where industry and academia exist in friction-less synergy, applying laboratory breakthroughs directly to solve complex real-world market demands.",
      position: "right",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Global R&D Hubs",
      description: "Aspiring to elevate local institutions into global hubs of research and development, actively contributing to the world’s repository of knowledge through breakthrough patents.",
      position: "right",
    },
  ]

  const mandates = [
    { icon: <Cpu className="w-5 h-5" />, title: "Cognitive Infrastructure", desc: "Upgrading all member campuses with state-of-the-art Artificial Intelligence and Machine Learning laboratories. Making AI fluency a mandatory competency." },
    { icon: <Network className="w-5 h-5" />, title: "Global Faculty Exchange", desc: "Establishing robust MOUs with international universities to facilitate global exposure, participating in cross-border R&D programs." },
    { icon: <Leaf className="w-5 h-5" />, title: "Zero-Carbon Campuses", desc: "Commitment to sustainability by transforming our technical institutions into green, energy-efficient campuses powered heavily by solar technology." },
    { icon: <Lightbulb className="w-5 h-5" />, title: "Incubation & Enterprise", desc: "Moving from 'job-seekers' to 'job-creators'. Every campus will house a dedicated incubation center providing seed funding and mentorship." },
  ]

  const stats = [
    { icon: <ShieldCheck className="w-6 h-6" />, value: 100, label: "Absolute Integrity", suffix: "%" },
    { icon: <Zap className="w-6 h-6" />, value: 4, label: "Industry 4.0 Focus", suffix: ".0" },
    { icon: <Target className="w-6 h-6" />, value: 1, label: "Unified Vision", suffix: "" },
    { icon: <Users className="w-6 h-6" />, value: 100, label: "Universal Empowerment", suffix: "%" },
  ]

  return (
    <main className="w-full bg-[#f8f9fa] text-textmain min-h-screen relative selection:bg-brandGreen/20 font-sans overflow-x-hidden">

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-sm border-b border-slate-200">
        <TopBar />
        <NavBar />
      </div>

      {/* Global decorative backgrounds */}
      <motion.div className="fixed top-40 left-10 w-80 h-80 rounded-full bg-brandOrange/5 blur-3xl pointer-events-none z-0" style={{ y: y1, rotate: rotate1 }} />

      {/* ========================================== */}
      {/* SECTION 1: FULL SCREEN IMAGE SECTION (HERO) */}
      {/* ========================================== */}
      <section
        ref={fullImageRef}
        className="w-full h-screen min-h-[80vh] pt-[210px] md:pt-[170px] relative z-10 bg-white overflow-hidden flex items-center justify-center text-center"
      >
        {/* --- FULL SCREEN BACKGROUND IMAGE --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="/missionandvision/missionandvisionsection.png"
            alt="Students collaborating"
            className="w-full h-full object-cover" 
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10 px-4 md:px-8 text-white"
          initial="hidden"
          animate={isFullImageInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Main header block */}
          <motion.div className="flex flex-col items-center mb-8" variants={itemVariants}>
            <motion.span className="text-white font-semibold mb-3 flex items-center gap-2 tracking-widest text-sm md:text-base uppercase [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
              <Compass className="w-5 h-5 text-brandOrange shrink-0" /> Our Purpose & Trajectory
            </motion.span>

            {/* Title: Pure White, Formal Boldness, Clean Shadow for elegant readability */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl m-0 text-center text-white font-bold leading-tight max-w-5xl tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              ARCHITECTING THE FUTURE OF BIHAR
            </h1>
            
            <div className="w-20 h-1 bg-brandOrange rounded-full mt-6 mx-auto shadow-sm" />
          </motion.div>

          {/* Subtitle text inside the glassmorphism bordered box */}
          <motion.div 
            variants={itemVariants} 
            className="max-w-3xl mx-auto mb-10 border border-white/25 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl"
          >
            <p className="text-white text-sm md:text-lg leading-relaxed text-center font-medium m-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              Driven by a profound commitment to social, intellectual, and economic transformation, our mission is a living, breathing blueprint for a resurgent Bihar.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: INTRO CARD (BREADCRUMB & QUOTE) */}
      {/* ========================================== */}
      <section ref={introRef} className="w-full py-16 px-4 md:px-8 relative z-10 bg-white border-b border-slate-100">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isIntroInView ? "visible" : "hidden"} variants={containerVariants}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-8 font-medium">
            <Link href="/" className="hover:text-brandOrange transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-500">Who We Are?</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brandGreen font-bold">Mission & Vision</span>
          </nav>

          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="heading-xl text-center">Building Ecosystems, Not Just Colleges</h2>
            <div className="w-16 h-1 bg-brandGreen mx-auto rounded-full mt-4" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-5 gap-8 bg-slate-50/90 backdrop-blur-sm border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-xl p-8 md:p-10 relative overflow-hidden"
          >
            <Quote className="absolute top-4 right-6 w-16 h-16 text-brandGreen/10 -z-0 pointer-events-none" />

            <div className="lg:col-span-3 relative z-10">
              <p className="text-textmain text-sm md:text-base leading-relaxed text-justify font-medium m-0 relative z-10">
                We are dedicated to providing the nation with a new generation of high-caliber, ethically grounded technocrats. At BPTPIA, we build ecosystems where curiosity meets technology, where local talent is polished to meet global standards, and where every student is empowered to rewrite their destiny.
              </p>
            </div>

            <div className="lg:col-span-2 rounded-lg border border-slate-200/60 p-2 bg-white relative z-10 shadow-sm shrink-0 flex items-center justify-center">
              <Building2 className="w-20 h-20 text-brandGreen" />
              <div className="absolute top-2 right-2 flex gap-1">
                <Target className="w-4 h-4 text-brandOrange" />
                <MapPin className="w-4 h-4 text-brandGreen" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: THE GENESIS & EVOLUTION (2 CARDS) */}
      {/* ========================================== */}
      <section ref={genesisRef} className="w-full py-12 px-4 md:px-8 relative z-10 bg-white">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isGenesisInView ? "visible" : "hidden"} variants={containerVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Genesis Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-200 hover:border-brandGreen/30 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-6 text-brandGreen">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-center text-textmain mb-3">The Genesis</h3>
              <p className="text-sm text-textmain leading-relaxed text-justify w-full font-medium">
                Founded in 2014, BPTPIA emerged not merely as an organization, but as a critical response to a pressing statewide need. For decades, brilliant minds migrated seeking quality education. Our visionary founders recognized the need to establish a gold standard of technical infrastructure right here in our homeland.
              </p>
            </motion.div>

            {/* Evolution Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-200 hover:border-brandOrange/30 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-6 text-brandOrange">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-center text-textmain mb-3">The Evolution</h3>
              <p className="text-sm text-textmain leading-relaxed text-justify w-full font-medium">
                What started as a collective of a few pioneering institutions has now grown into a massive unified front. Today, BPTPIA stands as the apex body ensuring that private engineering, polytechnic, and management colleges in Bihar operate with impeccable transparency and a student-first philosophy.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: CORE COMPETENCIES (CENTER IMAGE GRID) */}
      {/* ========================================== */}
      <section ref={competenciesRef} className="w-full py-16 px-4 md:px-8 relative z-10 bg-slate-50 border-y border-slate-200">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isCompetenciesInView ? "visible" : "hidden"} variants={containerVariants}>

          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="heading-xl text-center">Core Competencies</h2>
            <p className="text-textmain text-sm font-medium mt-1">The fundamental pillars that define our operational philosophy and educational approach.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-center">
            {/* Left Column */}
            <div className="space-y-8 md:space-y-10">
              {services.filter(s => s.position === "left").map((service, index) => (
                <ServiceItem key={`service-left-${index}`} {...service} variants={itemVariants} delay={index * 0.1} />
              ))}
            </div>

            {/* Center Image Component */}
            <div className="flex justify-center order-first md:order-none mb-8 md:mb-0">
              <motion.div className="relative w-full max-w-[16rem]" variants={itemVariants}>
                <motion.div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white" whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                  <img src="/missionandvision/missionandvisionsection3.png" alt="Campus" className="w-full h-full object-cover aspect-[3/4]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent flex items-end justify-center p-5">
                    <div className="text-center">
                      <Target className="w-6 h-6 text-brandOrange mx-auto mb-1" />
                      <h4 className="text-white font-bold text-base m-0 text-center">Architectural Vision</h4>
                      <p className="text-white/80 text-[10px] font-bold uppercase m-0 mt-1">Building a legacy of excellence</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8 md:space-y-10">
              {services.filter(s => s.position === "right").map((service, index) => (
                <ServiceItem key={`service-right-${index}`} {...service} variants={itemVariants} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: STRATEGIC MANDATES 2030 (HOVER GRID) */}
      {/* ========================================== */}
      <section ref={mandatesRef} className="w-full py-16 px-4 md:px-8 bg-white relative z-10">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isMandatesInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <span className="text-brandOrange font-bold tracking-widest uppercase text-xs mb-2 block">Beyond The Horizon</span>
            <h2 className="heading-xl text-center">Strategic Mandates 2030</h2>
            <div className="w-16 h-1 bg-brandOrange mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {mandates.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative z-10 group h-full">
                <div className="bg-white h-full p-6 rounded-md border border-slate-200 group-hover:bg-brandGreen group-hover:text-white transition-all duration-300 flex flex-col items-center">

                  <div className="absolute -top-4 -right-2 text-[100px] font-black text-slate-100/50 leading-none group-hover:text-white/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none">
                    {index + 1}
                  </div>

                  <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-brandGreen rounded-sm flex items-center justify-center shrink-0 mb-5 relative z-10 group-hover:bg-white transition-colors">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold text-center text-textmain mb-2 relative z-10 group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-xs text-textmain group-hover:text-white/90 leading-relaxed font-medium relative z-10 text-center md:text-justify">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 6: STATS & CTA BANNER */}
      {/* ========================================== */}
      <section ref={statsRef} className="w-full py-16 px-4 md:px-8 relative z-10 bg-slate-50 border-t border-slate-200">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isStatsInView ? "visible" : "hidden"} variants={containerVariants}>

          {/* Stats Formalized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <StatCounter key={index} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 0.1} />
            ))}
          </div>

          {/* ========================================== */}
          {/* SECTION 7: CTA BANNER */}
          {/* ========================================== */}
          <motion.div
            className="mt-16 bg-brandGreen p-8 md:p-10 rounded-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] relative overflow-hidden text-white"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none flex items-center justify-end transform translate-x-12">
              <Building2 className="w-64 h-64 text-white" />
            </div>

            <div className="flex-1 relative z-10 text-center flex flex-col items-center md:items-start md:text-left">
              <span className="inline-block bg-white text-brandGreen text-[10px] font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-full">
                Admissions Open
              </span>
              <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight text-white m-0">Ready to engineer your future?</h3>
              <p className="text-sm md:text-base max-w-2xl leading-relaxed font-medium text-white/90 m-0">
                Join the unified platform of premier technical institutions in Bihar. Register for the upcoming CET today.
              </p>
            </div>

            <div className="relative z-10 shrink-0 mx-auto md:mx-0 mt-4 md:mt-0">
              <a href="/contact" className="bg-brandOrange hover:bg-red-800 text-white px-8 py-3 rounded text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap uppercase tracking-wider">
                Contact Us <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

// ==========================================
// COMPONENT: SERVICE ITEM (FORMALISED)
// ==========================================
interface ServiceItemProps { icon: React.ReactNode; title: string; description: string; variants: Variants; delay: number; }

function ServiceItem({ icon, title, description, variants, delay }: ServiceItemProps) {
  return (
    <motion.div className="flex flex-col items-center text-center h-full bg-white p-6 border border-slate-200 rounded-sm hover:border-brandGreen/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" variants={variants} transition={{ delay }}>
      <div className="flex flex-col items-center gap-3 mb-3 pb-3 border-b border-slate-100 w-full">
        <div className="text-brandGreen bg-slate-100 p-2.5 rounded-sm border border-slate-200 relative shrink-0">
          {icon}
        </div>
        <h3 className="text-base font-bold text-textmain text-center leading-tight m-0 uppercase tracking-tight">{title}</h3>
      </div>
      <p className="text-xs text-textmain leading-relaxed font-medium text-center md:text-justify flex-grow m-0">
        {description}
      </p>
    </motion.div>
  )
}

// ==========================================
// COMPONENT: STAT COUNTER (FORMALISED)
// ==========================================
interface StatCounterProps { icon: React.ReactNode; value: number; label: string; suffix: string; delay: number; }

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: "-30px" })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (isInView) springValue.set(value)
  }, [isInView, value, springValue])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div className="flex flex-col items-center justify-center text-center p-4 border-r border-slate-200 last:border-0" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } } }}>
      <div className="text-brandGreen mb-3">
        {icon}
      </div>
      <div ref={countRef} className="text-2xl md:text-3xl font-black text-textmain tracking-tight mb-1 flex items-center justify-center">
        <motion.span>{displayValue}</motion.span><span className="text-brandOrange">{suffix}</span>
      </div>
      <p className="text-textmain text-[10px] md:text-xs font-bold uppercase tracking-wider m-0">{label}</p>
    </motion.div>
  )
}