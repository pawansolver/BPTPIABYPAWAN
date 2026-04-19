"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Building2,
  Award,
  Users,
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
  ChevronRight,
  UserCheck,
  Sparkles,
  Shield,
  CheckCircle2,
  Globe2,
  Monitor,
  Trophy,
  Rocket,
  Server,
  Activity,
  Network,
  Compass,
  Heart,
  Lightbulb
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from "framer-motion"

// ==========================================
// 1. IMPORT NAVBAR & TOPBAR HERE
// ==========================================
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from "@/components/ui/footer-section"

export default function SecretaryMessagePage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Minimized parallax for a formal, stable look
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -10])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <main className="w-full bg-gray-50 text-textmain overflow-hidden relative selection:bg-brandOrange/20 font-sans">

      {/* ========================================== */}
      {/* STICKY HEADER CONTAINER */}
      {/* ========================================== */}
      <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-sm border-b border-gray-200">
        <TopBar />
        <NavBar />
      </div>

      {/* ========================================== */}
      {/* SECTION 1: THE EXECUTIVE DESK (Perfect Viewport) */}
      {/* ========================================== */}
      <section
        ref={sectionRef}
        className="min-h-[100dvh] pt-[120px] md:pt-[140px] pb-8 px-4 md:px-8 relative border-b border-gray-200 z-10 flex flex-col justify-center overflow-hidden"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        {/* White Overlay to make the background subtle and formal */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-[2px] z-0"></div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

        <div className="container-custom max-w-6xl mx-auto relative z-10 flex flex-col gap-6 w-full">

          {/* Title Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="w-full flex flex-col items-center text-center">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gray-50 border border-gray-200 shadow-sm mb-3">
              <Compass className="w-3.5 h-3.5 text-brandOrange" />
              <span className="text-brandOrange text-[10px] font-bold tracking-[0.15em] uppercase">Administrative Desk</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="heading-xl !text-3xl md:!text-4xl m-0 text-center">
              A Vision for Tomorrow's <span className="text-brandOrange">Innovators</span>
            </motion.h1>
          </motion.div>

          {/* Content Grid (Balanced 5/7 Split) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid lg:grid-cols-12 gap-8 items-center w-full">

            {/* Photo Column (5-Span) */}
            <motion.div className="lg:col-span-5 w-full mx-auto max-w-md lg:max-w-full flex flex-col gap-4" variants={itemVariants}>
              {/* Formal Image Frame */}
              <div className="relative p-2 bg-white border border-gray-200 shadow-md rounded-sm w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-brandOrange"></div>
                <div className="relative aspect-[4/5] max-h-[50vh] lg:max-h-[55vh] overflow-hidden bg-gray-100">
                  <img
                    src="https://bihartechassociation.com/wp-content/uploads/2025/04/secre.jpg"
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                    alt="Er. Awadhesh Kumar"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-0 left-0 w-full p-4 text-white flex justify-between items-end">
                    <div>
                      <p className="font-bold text-[11px] uppercase tracking-wider m-0">Visionary</p>
                      <p className="text-[9px] uppercase font-bold text-brandGreen m-0">Administration</p>
                    </div>
                    <Quote className="w-6 h-6 text-brandOrange opacity-60" />
                  </div>
                </div>
              </div>

              {/* Integrated Excellence Card under Photo */}
              <div className="bg-white border border-gray-200 rounded-sm p-3 shadow-sm w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-brandOrange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-textmain text-[11px] m-0">Administrative Excellence</h4>
                    <p className="text-[9px] text-brandGreen uppercase tracking-wider font-bold m-0">State Recognized</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Letter Column (7-Span) */}
            <motion.div className="lg:col-span-7 bg-transparent rounded-sm w-full flex flex-col justify-center" variants={itemVariants}>

              <div className="flex flex-col items-start gap-1 pb-4 border-b border-gray-200 text-left mb-4">
                <h2 className="text-2xl md:text-3xl font-black text-textmain uppercase tracking-tight leading-tight m-0">
                  Er. Awadhesh Kumar
                </h2>
                <p className="text-brandGreen font-bold text-xs uppercase tracking-widest m-0 mt-1">Secretary, BPTPIA</p>
              </div>

              <div className="text-textmain text-[14px] md:text-[15px] leading-relaxed space-y-4 text-justify font-medium">
                <p className="text-base font-bold text-brandOrange leading-snug m-0 italic">
                  "Aspiration to excel in technology and innovation is the definitive first step toward shaping a stronger, economically independent, and highly progressive society."
                </p>

                <p className="m-0 pt-2">
                  <span className="text-3xl md:text-4xl font-black text-brandGreen float-left mr-2 leading-[0.8]">A</span>
                  t the very outset, I extend my heartfelt greetings to all the aspirants who carry the passion, determination, and vision to become successful engineers and professionals. We at BPTPIA are deeply committed to providing a comprehensive, transparent, and high-quality educational ecosystem.
                </p>

                <blockquote className="pl-4 py-1.5 border-l-4 border-brandOrange bg-gray-50/50 italic text-textmain text-[13px] md:text-[14px] leading-relaxed my-4 pr-3">
                  "A successful institution is built on robust administrative frameworks. My role is to bridge the gap between academic intent and operational execution. From maintaining strict zero-ragging policies to ensuring seamless examination schedules, our administration works 24/7 to create a friction-free environment."
                </blockquote>

                <p className="m-0">
                  Furthermore, we are heavily investing in digital campus initiatives. By unifying all streams under one coordinated platform, we are optimizing our resources to deliver maximum value. We are building a legacy of excellence for the youth of Bihar.
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-200 flex flex-col items-start gap-1">
                <p className="font-bold text-textmain text-sm m-0">Looking forward to welcoming you to our campuses,</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Stylized_signature_sample.svg/1280px-Stylized_signature_sample.svg.png"
                  alt="Signature"
                  className="h-10 md:h-12 opacity-60 mix-blend-multiply mt-1 mb-1 pointer-events-none"
                />
                <h4 className="font-black text-textmain uppercase tracking-tight m-0 text-xs">Er. Awadhesh Kumar</h4>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 1.5: CORE VISION HIGHLIGHT (Official Executive Plaque) */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden flex flex-col justify-center px-4 md:px-8 border-b border-gray-200">
        
        {/* Subtle mesh background for the section */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>

        <div className="container-custom max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-10 bg-[#0B1527] rounded-sm shadow-2xl border border-gray-800 overflow-hidden"
          >
            {/* Premium Glows inside the dark box */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandGreen/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brandOrange/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            {/* Left Side: The Quote */}
            <div className="flex-1 relative z-10 flex flex-col items-start gap-4 text-left w-full">
              <Quote className="w-10 h-10 text-white/10 absolute -top-4 -left-2" />
              <h2 className="text-xl md:text-2xl lg:text-[28px] font-bold text-white leading-snug m-0 tracking-tight relative z-10">
                "Our ultimate vision is to cultivate a generation of <span className="text-brandOrange">innovative job creators</span>, rather than mere job seekers."
              </h2>
            </div>

            {/* Right Side: The Official Mandate Stamp */}
            <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-8 relative z-10 shrink-0">
              <div className="w-8 h-1 bg-brandGreen rounded-sm hidden md:block mb-1"></div>
              <div className="text-left md:text-left">
                <p className="font-extrabold text-[10px] uppercase tracking-[0.25em] text-white/60 m-0">The Secretary's</p>
                <p className="text-xs font-bold text-brandGreen uppercase tracking-widest m-0 mt-1">Official Mandate</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-white/10 hidden md:block absolute right-0 bottom-0 md:-right-4 md:-bottom-2" />
            </div>

          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: FRAMEWORK FOR EXCELLENCE (Perfect Viewport) */}
      {/* ========================================== */}
      <section className="min-h-[100dvh] py-12 bg-gray-50 border-b border-gray-200 relative z-10 flex flex-col justify-center px-4 md:px-8">
        <div className="container-custom max-w-6xl mx-auto w-full">

          <div className="text-center mb-10">
            <h2 className="heading-xl m-0 !text-brandOrange">A Framework for Excellence</h2>
            <div className="w-12 h-1 bg-brandGreen mx-auto my-3" />
            <p className="text-muted text-sm m-0 max-w-2xl mx-auto">Empowering Students with Knowledge, Administrative Efficiency, and Core Values</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-stretch">

            {/* Left Side: Highlight Pillar + Image (5-Span) */}
            <div className="md:col-span-5 flex flex-col gap-5 h-full">
              <div className="p-6 bg-white rounded-sm border border-gray-200 flex flex-col justify-center text-center hover:shadow-md hover:border-brandGreen/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-brandGreen transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center mx-auto mb-3 group-hover:bg-brandGreen/5 transition-colors">
                  <Network className="w-6 h-6 text-brandGreen" />
                </div>
                <h3 className="text-lg font-black uppercase text-textmain mb-2 w-full m-0 tracking-tight">Unified Platform</h3>
                <p className="text-textmain text-xs leading-relaxed font-medium m-0">
                  Bringing UG to PG Programs together to optimize educational initiatives efficiently across all member colleges.
                </p>
              </div>

              <div className="flex-1 relative rounded-sm overflow-hidden shadow-sm border border-gray-200 bg-gray-100 min-h-[160px]">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop"
                  alt="Campus Integrity"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/40 to-transparent flex flex-col justify-end p-4">
                  <div className="w-8 h-8 rounded-sm bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-white font-bold text-sm uppercase mb-1 m-0 tracking-tight">Administrative Integrity</h3>
                  <p className="text-white/80 text-[10px] font-medium m-0">Ensuring a transparent and secure educational ecosystem for all.</p>
                </div>
              </div>
            </div>

            {/* Right Side: 5 Grid Items (7-Span) */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Briefcase, title: "Industry Readiness", desc: "Aligning curricula strictly with current industry standards." },
                { icon: Heart, title: "Holistic Development", desc: "Ensuring growth ethically and socially in a safe environment." },
                { icon: Globe2, title: "Nation Building", desc: "Contributing to the social and economic development of India." },
                { icon: Lightbulb, title: "Research Orientation", desc: "Nurturing innovation, critical thinking, and R&D." },
                { icon: Users, title: "Conscious Citizens", desc: "Developing individuals who contribute positively to society." }
              ].map((item, i) => (
                <div key={i} className={`p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-sm border border-gray-200 flex flex-col gap-2 group justify-center ${i === 4 ? 'sm:col-span-2 sm:flex-row sm:items-center sm:gap-4' : ''}`}>
                  <div className="w-10 h-10 shrink-0 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center text-brandGreen group-hover:bg-brandGreen group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm mb-1 uppercase tracking-tight text-textmain m-0">{item.title}</h4>
                    <p className="text-textmain text-xs leading-relaxed font-medium m-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: ROADMAP + STATS (Combined Viewport) */}
      {/* ========================================== */}
      <section className="min-h-[100dvh] py-12 bg-white relative border-b border-gray-200 flex flex-col justify-center px-4 md:px-8">
        <div className="container-custom max-w-6xl mx-auto w-full flex flex-col gap-10">

          {/* Top Half: Roadmap Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Left Roadmap Text */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-5">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center gap-1.5 text-brandGreen font-bold uppercase tracking-widest text-[9px] bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-sm mb-3 shadow-sm">
                  <Target className="w-3 h-3" /> Roadmap 2025
                </span>
                <h2 className="heading-xl !text-3xl m-0 !text-left !text-brandOrange">
                  Modernizing Campus Administration
                </h2>
                <div className="w-12 h-1 bg-brandGreen mt-3" />
              </div>

              <div className="text-textmain text-sm font-medium">
                <p className="text-justify leading-relaxed m-0 text-[14px]">
                  To deliver world-class education, the underlying operational machinery must be equally sophisticated and transparent.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    { title: "Digital Governance", desc: "Implementing ERP solutions for paperless admissions." },
                    { title: "Student Welfare Cells", desc: "Establishing dedicated 24/7 counseling and support." },
                    { title: "Infrastructural Audits", desc: "Routine technical audits to maintain highest quality standards." }
                  ].map((list, i) => (
                    <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-sm border border-gray-200 shadow-sm transition hover:border-brandGreen/30">
                      <Server className="w-4 h-4 text-brandGreen shrink-0 mt-0.5" />
                      <span className="text-xs text-textmain text-justify leading-relaxed m-0">
                        <strong className="text-textmain uppercase tracking-tight block mb-0.5 text-[12px]">{list.title}</strong>
                        {list.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Quote Callout */}
            <motion.div style={{ y: yParallaxSlow }} className="relative rounded-sm bg-textmain p-8 border border-textmain shadow-lg w-full text-center flex flex-col items-center justify-center h-full min-h-[250px]">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              <Shield className="w-8 h-8 text-brandGreen mb-4 relative z-10" />
              <div className="relative z-10 space-y-4 w-full">
                <p className="text-[15px] md:text-base font-medium text-white italic leading-relaxed text-center m-0">
                  "Efficiency in administration translates directly to excellence in academics. We give our students the gift of time—time they can invest in innovation."
                </p>
                <div className="pt-4 border-t border-gray-600 flex flex-col items-center">
                  <h4 className="font-bold text-xs text-white uppercase tracking-widest text-center m-0">Secretary's Directive</h4>
                  <p className="text-brandGreen font-bold text-[9px] uppercase tracking-wider mt-1 text-center m-0">BPTPIA Foundation</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Half: Stats (Combined into same viewport) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" ref={statsRef}>
            <StatItem icon={<CheckCircle2 className="w-5 h-5" />} val={100} label="Commitment" suffix="%" delay={0.1} />
            <StatItem icon={<Users className="w-5 h-5" />} val={5000} label="Aspirants" suffix="+" delay={0.2} />
            <StatItem icon={<GraduationCap className="w-5 h-5" />} val={360} label="Holistic Growth" suffix="°" delay={0.3} />
            <StatItem icon={<Network className="w-5 h-5" />} val={1} label="Unified Platform" suffix="" delay={0.4} />
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: CTA SECTION & FOOTER */}
      {/* ========================================== */}
      <section className="py-16 bg-gray-50 px-4 md:px-8 flex flex-col justify-center">
        <div className="container-custom w-full max-w-5xl mx-auto mb-16">
          <motion.div
            className="bg-brandGreen p-10 md:p-12 rounded-sm text-white relative overflow-hidden shadow-sm w-full flex flex-col items-center text-center border border-brandGreen"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <Building2 className="w-80 h-80 text-white" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full max-w-3xl mx-auto">
              <div className="inline-block px-4 py-1.5 rounded-sm bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                ADMISSIONS OPEN
              </div>
              <h3 className="text-3xl md:text-4xl font-black leading-tight text-white text-center m-0 uppercase tracking-tight">
                Ready to engineer your future?
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium text-center m-0 max-w-2xl">
                Join the unified platform of premier technical institutions in Bihar. Register for the upcoming CET today.
              </p>
              <div className="mt-3">
                <a href="/contact" className="btn-primary !bg-brandOrange hover:!bg-red-800 uppercase tracking-wider !rounded-sm !py-3 !px-8 !text-sm flex items-center gap-2">
                  Contact Us <ArrowRight className="w-4 h-4 arrow" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer sits at the bottom of the CTA screen */}
        <Footer />
      </section>

    </main>
  )
}

// ==========================================
// COMPONENT: STAT ITEM (FORMAL & COMPACT)
// ==========================================
function StatItem({ icon, val, label, suffix, delay }: any) {
  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: "-30px" })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (isInView) springValue.set(val)
  }, [isInView, val, springValue])

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center p-5 bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md hover:border-brandGreen/30 transition-all duration-300 w-full h-full"
    >
      <div className="mb-3 text-brandGreen bg-gray-50 p-2.5 rounded-sm border border-gray-100">
        {icon}
      </div>
      <div ref={countRef} className="text-2xl md:text-3xl font-black text-textmain flex items-center justify-center mb-1 tracking-tight">
        <motion.span>{displayValue}</motion.span>
        <span className="text-brandOrange ml-0.5">{suffix}</span>
      </div>
      <div className="text-[9px] md:text-[10px] text-textmain font-bold uppercase tracking-widest mt-0.5 m-0">{label}</div>
    </motion.div>
  )
}