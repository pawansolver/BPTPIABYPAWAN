"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Building2,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  BookOpen,
  Landmark,
  MonitorPlay,
  Briefcase,
  ShieldCheck,
  Target,
  Eye,
  GraduationCap,
  MapPin,
  FileText,
  Quote,
  Home,
  ChevronRight
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion"

// ==========================================
// 1. IMPORT NAVBAR & TOPBAR HERE
// ==========================================
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from "@/components/ui/footer-section"

export default function AboutBPTPIAExpanded() {
  const [isVisible, setIsVisible] = useState(false)

  // Refs for InView Triggers
  const fullImageRef = useRef<HTMLDivElement>(null) // New ref for the full image section
  const heroRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const isFullImageInView = useInView(fullImageRef, { once: false, amount: 0.1 })
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.1 })
  const isVisionInView = useInView(visionRef, { once: false, amount: 0.2 })
  const isServicesInView = useInView(servicesRef, { once: false, amount: 0.1 })
  const isJourneyInView = useInView(journeyRef, { once: false, amount: 0.1 })
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

  // Formalized Data Objects (NO CONTENT CHANGE)
  const services = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Standardized Entrance (CET)",
      description: "Conducting the official BPTPIA Common Entrance Test (CET) to facilitate streamlined, strictly merit-based admissions into B.Tech and Diploma programs across the state.",
      position: "left",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: "Academic Quality Benchmarking",
      description: "Mandating that affiliated institutions maintain advanced laboratory infrastructure, contemporary curricula, and highly credentialed faculty to ensure academic excellence.",
      position: "left",
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      title: "Statutory Policy Advocacy",
      description: "Serving as the definitive administrative liaison between private educational trusts and state statutory bodies, ensuring strict compliance with regulatory frameworks.",
      position: "left",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Rigorous Accreditation Status",
      description: "Ensuring that every institution operating under the BPTPIA consortium is anchored by appropriate regulatory approvals, state validations, and recognized university affiliations.",
      position: "right",
    },
    {
      icon: <MonitorPlay className="w-5 h-5" />,
      title: "Technological Advancement",
      description: "Prioritizing enhanced career outcomes by integrating industry-aligned curricula that encompass emerging paradigms such as Artificial Intelligence, Data Science, and Robotics.",
      position: "right",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Corporate Relations & Placement",
      description: "Cultivating a collaborative recruitment ecosystem that provides candidates with access to centralized placement drives and a comprehensive global alumni network.",
      position: "right",
    },
  ]

  const journeySteps = [
    { icon: <FileText className="w-5 h-5" />, title: "Online Application", desc: "Candidates submit their formal applications for the Common Entrance Test (CET) via the centralized digital portal." },
    { icon: <Target className="w-5 h-5" />, title: "Entrance Examination", desc: "A transparent, state-level assessment designed to evaluate the analytical aptitude and technical proficiency of candidates." },
    { icon: <Award className="w-5 h-5" />, title: "Publication of Merit List", desc: "Results are officially published featuring state-wise rankings, maintaining absolute transparency in the evaluation process." },
    { icon: <Building2 className="w-5 h-5" />, title: "Counselling & Allotment", desc: "Structured counseling sessions are conducted to allocate candidates to recognized private institutions based on their secured merit." },
  ]

  const stats = [
    { icon: <ShieldCheck />, value: "100", label: "Regulatory Compliance", suffix: "%" },
    { icon: <Users />, value: "15,000", label: "Enrolled Candidates", suffix: "+" },
    { icon: <Building2 />, value: "50", label: "Affiliated Institutions", suffix: "+" },
    { icon: <BookOpen />, value: "01", label: "Centralized Examination", suffix: "" },
  ]

  return (
    <main className="w-full bg-[#f8f9fa] text-black min-h-screen relative selection:bg-[#cc0000]/20 font-sans overflow-x-hidden">

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-sm border-b border-slate-200">
        <TopBar />
        <NavBar />
      </div>

      {/* Global decorative backgrounds */}
      <motion.div className="fixed top-40 left-10 w-80 h-80 rounded-full bg-brandOrange/3 blur-3xl pointer-events-none z-0" style={{ y: y1, rotate: rotate1 }} />

      {/* ========================================== */}
      {/* (NEW) SECTION 1: FULL SCREEN IMAGE SECTION (FIRST FOLD) */}
      {/* ========================================== */}
      <section
        ref={fullImageRef}
        className="w-full h-screen min-h-[80vh] pt-[210px] md:pt-[170px] relative z-10 bg-white overflow-hidden flex items-center justify-center text-center"
      >
        {/* --- FULL SCREEN BACKGROUND IMAGE --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="/about/bgimage.png"
            alt="BPTPIA Administrative Pillar"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>
        {/* ------------------------------- */}

        <motion.div
          className="max-w-6xl mx-auto relative z-10 px-4 md:px-8 text-white"
          initial="hidden"
          animate={isFullImageInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Main header block */}
          <motion.div className="flex flex-col items-center mb-8" variants={itemVariants}>
            {/* Sub-heading */}
            <motion.span className="text-white font-semibold mb-3 flex items-center gap-2 tracking-widest text-sm md:text-base uppercase [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
              <Zap className="w-5 h-5 text-brandGreen shrink-0" /> discovers BPTPIA
            </motion.span>

            {/* Title: Pure White, Formal Boldness, Clean Shadow for elegant readability */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl m-0 text-center text-white font-bold leading-tight max-w-5xl tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              THE BIHAR PRIVATE TECHNICAL & PROFESSIONAL INSTITUTIONS ASSOCIATION
            </h1>

            {/* Accent line: Formal Navy Blue */}
            <div className="w-20 h-1 bg-[#004d80] rounded-full mt-6 mx-auto shadow-sm" />
          </motion.div>

          {/* Subtitle text inside the glassmorphism bordered box - preserved */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-10 border border-white/25 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl"
          >
            <p className="text-white text-sm md:text-lg leading-relaxed text-center font-medium m-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
              A unified directive ensuring statewide technical education frameworks are rigorous, accessible, and compliant with statutory merit standards.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* (MOVED) SECTION 2: INTRO CARD (MODIFIED FROM ORIGINAL SECTION 1) */}
      {/* ========================================== */}
      <section ref={heroRef} className="w-full py-16 px-4 md:px-8 relative z-10 bg-white border-b border-slate-100">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isHeroInView ? "visible" : "hidden"} variants={containerVariants}>
          {/* Breadcrumb - Formalised */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-8 font-medium">
            <Link href="/" className="hover:text-[#cc0000] transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-500">Who We Are?</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#004d80] font-bold">About BPTPIA</span>
          </nav>

          {/* New centered heading for this section after the full image */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="heading-xl text-center">Discover BPTPIA's Administrative Role</h2>
            <div className="w-16 h-1 bg-[#004d80] mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Simplified card with formal borders and photo photo */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-5 gap-8 bg-slate-50/90 backdrop-blur-sm border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-xl p-8 md:p-10 relative overflow-hidden text-black"
          >
            <Quote className="absolute top-4 right-6 w-16 h-16 text-[#004d80]/10 -z-0 pointer-events-none" />

            <div className="lg:col-span-3 relative z-10">
              <p className="text-black text-sm md:text-base leading-relaxed text-justify font-medium m-0 relative z-10">
                The Bihar Private Technical & Professional Institutions Association (BPTPIA) serves as the primary administrative bridge between aspiring students and the advancing landscape of technical education in Bihar. By unifying the state's private technical institutions under a singular directive, we ensure that educational frameworks remain universally rigorous, accessible, and compliant with statutory standards.
              </p>
            </div>

            <div className="lg:col-span-2 rounded-lg border border-slate-200/60 p-2 bg-white relative z-10 shadow-sm shrink-0 flex items-center justify-center">
              <Building2 className="w-20 h-20 text-[#004d80]" />
              <div className="absolute top-2 right-2 flex gap-1">
                <ShieldCheck className="w-4 h-4 text-brandGreen" />
                <MapPin className="w-4 h-4 text-[#cc0000]" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: VISION & MISSION */}
      {/* ========================================== */}
      <section ref={visionRef} className="w-full py-12 px-4 md:px-8 relative z-10 bg-white">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isVisionInView ? "visible" : "hidden"} variants={containerVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Vision Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-200 hover:border-[#004d80]/30 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-6 text-[#004d80]">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-center text-[#050505] mb-3">Institutional Vision</h3>
              <p className="text-sm text-black leading-relaxed text-justify w-full font-medium">
                To establish Bihar as a premier national hub for technical and professional education, wherein member institutions are synonymous with global academic standards, transparent ethical practices, and continuous technological innovation.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] border border-slate-200 hover:border-[#cc0000]/30 transition-all duration-300 group flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-6 text-[#cc0000]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-center text-[#050505] mb-3">Institutional Mission</h3>
              <p className="text-sm text-black leading-relaxed text-justify w-full font-medium">
                To standardize academic and administrative frameworks across all affiliated institutions, execute impartial entrance examinations, and cultivate robust industry-academia linkages to maximize the employability and professional readiness of our graduates.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: THE PILLARS (SERVICES GRID) */}
      {/* ========================================== */}
      <section ref={servicesRef} className="w-full py-16 px-4 md:px-8 relative z-10 bg-slate-50 border-y border-slate-200">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isServicesInView ? "visible" : "hidden"} variants={containerVariants}>

          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="heading-xl text-center">Core Competencies</h2>
            <p className="text-black text-sm font-medium mt-1">The fundamental pillars sustaining the quality of technical education.</p>
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
                  <img src="/about/aboutpagepic.png" alt="Campus" className="w-full h-full object-cover aspect-[3/4]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent flex items-end justify-center p-5">
                    <div className="text-center">
                      <ShieldCheck className="w-6 h-6 text-brandGreen mx-auto mb-1" />
                      <h4 className="text-white font-bold text-base m-0 text-center">Guaranteed Excellence</h4>
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
      {/* SECTION 5: THE JOURNEY (PROCESS FLOW) */}
      {/* ========================================== */}
      <section ref={journeyRef} className="w-full py-16 px-4 md:px-8 bg-white relative z-10">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isJourneyInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <span className="text-[#cc0000] font-bold tracking-widest uppercase text-xs mb-2 block">Simplified Procedure</span>
            <h2 className="heading-xl text-center">Admission Protocol</h2>
            <div className="w-16 h-1 bg-[#cc0000] mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {journeySteps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative z-10 group h-full">
                <div className="bg-white h-full p-6 rounded-md border border-slate-200 group-hover:bg-[#004d80] group-hover:text-white transition-all duration-300 flex flex-col items-center">

                  <div className="absolute -top-4 -right-2 text-[100px] font-black text-slate-100/50 leading-none group-hover:text-white/10 group-hover:scale-110 transition-all duration-500 pointer-events-none select-none">
                    {index + 1}
                  </div>

                  <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-[#004d80] rounded-sm flex items-center justify-center shrink-0 mb-5 relative z-10 group-hover:bg-white transition-colors">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold text-center text-[#050505] mb-2 relative z-10 group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-xs text-black group-hover:text-white/90 leading-relaxed font-medium relative z-10 text-center md:text-justify">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SECTION 6: STATS & AFFILIATIONS */}
      {/* ========================================== */}
      <section ref={statsRef} className="w-full py-16 px-4 md:px-8 relative z-10 bg-slate-50 border-t border-slate-200">
        <motion.div className="max-w-7xl mx-auto" initial="hidden" animate={isStatsInView ? "visible" : "hidden"} variants={containerVariants}>

          {/* Stats Formalized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <StatCounter key={index} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 0.1} />
            ))}
          </div>

          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8 items-center border-t border-slate-200 pt-8">
            <div className="lg:col-span-1 text-center lg:text-left flex flex-col items-center text-center">
              <h2 className="text-xl font-bold uppercase text-center text-[#050505] mb-1">Approved Bodies</h2>
              <p className="text-black text-sm font-medium text-center">Affiliated institutions adhere strictly to guidelines prescribed by authorised bodies.</p>
            </div>

            <div className="lg:col-span-2 flex flex-col sm:flex-row flex-wrap gap-4 items-center sm:items-center justify-center lg:justify-start">
              <div className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded text-slate-700 font-bold text-sm w-full sm:w-auto shadow-sm whitespace-nowrap">
                <Landmark className="w-5 h-5 text-brandGreen" /> DST, Govt of Bihar
              </div>
              <div className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded text-slate-700 font-bold text-sm w-full sm:w-auto shadow-sm whitespace-nowrap">
                <GraduationCap className="w-5 h-5 text-[#cc0000]" /> Aryabhatta Univ.
              </div>
              <div className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded text-slate-700 font-bold text-sm w-full sm:w-auto shadow-sm whitespace-nowrap">
                <MapPin className="w-5 h-5 text-brandGreen" /> SBTE Bihar
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* SECTION 7: CTA BANNER */}
          {/* ========================================== */}
          <motion.div
            className="mt-16 bg-[#004d80] p-8 md:p-10 rounded-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_-10px_rgba(0,77,128,0.4)] relative overflow-hidden text-white"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none flex items-center justify-end transform translate-x-12">
              <Building2 className="w-64 h-64 text-white" />
            </div>

            <div className="flex-1 relative z-10 text-center flex flex-col items-center">
              <span className="inline-block bg-white text-[#004d80] text-[10px] font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-full">
                Admissions for Current Academic Session
              </span>
              <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight text-white text-center">Initiate Your Academic Journey</h3>
              <p className="text-sm md:text-base max-w-2xl leading-relaxed text-justify md:text-center font-medium mx-auto text-white/90">
                Enroll through the centralized admission platform representing the premier technical institutions of Bihar. Register for the upcoming Common Entrance Test (CET) today.
              </p>
            </div>

            <div className="relative z-10 shrink-0 mx-auto md:mx-0 mt-4 md:mt-0">
              <a href="/contact" className="bg-[#cc0000] hover:bg-red-800 text-white px-8 py-3 rounded text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 whitespace-nowrap">
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
    <motion.div className="flex flex-col items-center text-center h-full bg-white p-6 border border-slate-200 rounded-sm hover:border-[#004d80]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" variants={variants} transition={{ delay }}>

      <div className="flex flex-col items-center gap-3 mb-3 pb-3 border-b border-slate-100 w-full">
        <div className="text-[#004d80] bg-slate-100 p-2.5 rounded-sm border border-slate-200 relative shrink-0">
          {icon}
        </div>
        <h3 className="text-base font-bold text-[#050505] text-center leading-tight m-0">{title}</h3>
      </div>

      <p className="text-xs text-black leading-relaxed font-medium text-center md:text-justify flex-grow m-0">
        {description}
      </p>

    </motion.div>
  )
}

// ==========================================
// COMPONENT: STAT COUNTER (FORMALISED)
// ==========================================
interface StatCounterProps { icon: React.ReactNode; value: string; label: string; suffix: string; delay: number; }

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  return (
    <motion.div className="flex flex-col items-center justify-center text-center p-4 border-r border-slate-200 last:border-0" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } } }}>
      <div className="text-[#004d80] mb-3">
        {icon}
      </div>
      <div className="text-2xl md:text-3xl font-black text-[#050505] tracking-tight mb-1">
        <span>{value}</span><span>{suffix}</span>
      </div>
      <p className="text-black text-[10px] md:text-xs font-bold uppercase tracking-wider m-0">{label}</p>
    </motion.div>
  )
}