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
  Rocket
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from "framer-motion"

// ==========================================
// 1. IMPORT NAVBAR & TOPBAR HERE
// ==========================================
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from "@/components/ui/footer-section"

export default function PresidentMessagePage() {
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
    <main className="w-full bg-gray-50 text-textmain overflow-hidden relative selection:bg-brandGreen/20 font-sans">

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
        className="min-h-[100dvh] pt-[120px] md:pt-[140px] pb-10 px-4 md:px-8 relative bg-white border-b border-gray-200 z-10 flex flex-col justify-center"
      >
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="container-custom max-w-6xl mx-auto relative z-10 flex flex-col gap-6 w-full">

          {/* Title Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="w-full flex flex-col items-center text-center">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gray-50 border border-gray-200 shadow-sm mb-3">
              <Landmark className="w-3.5 h-3.5 text-brandGreen" />
              <span className="text-brandGreen text-[10px] font-bold tracking-[0.15em] uppercase">Office of the President</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="heading-xl !text-3xl md:!text-4xl m-0 text-center">
              A Vision for Tomorrow's <span className="text-brandGreen">Innovators</span>
            </motion.h1>
          </motion.div>

          {/* Content Grid (Balanced 5/7 Split) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="grid lg:grid-cols-12 gap-8 items-center w-full">

            {/* Photo Column */}
            <motion.div className="lg:col-span-5 w-full mx-auto max-w-md lg:max-w-full" variants={itemVariants}>
              <div className="relative p-2 bg-white border border-gray-200 shadow-md rounded-sm w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-brandGreen"></div>
                <div className="relative aspect-[4/5] max-h-[55vh] lg:max-h-[60vh] overflow-hidden bg-gray-100">
                  <img
                    src="https://bihartechassociation.com/wp-content/uploads/2025/05/chairman.jpeg"
                    className="w-full h-full object-cover filter contrast-[1.05]"
                    alt="President Er. Ravi Shankar"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white text-center">
                    <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-brandOrange" />
                    <p className="text-[10px] font-bold uppercase tracking-widest m-0">Leading Since 2014</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Letter Column */}
            <motion.div className="lg:col-span-7 bg-transparent rounded-sm w-full flex flex-col justify-center" variants={itemVariants}>

              <div className="flex flex-col items-start gap-1 pb-4 border-b border-gray-200 text-left mb-4">
                <h2 className="text-2xl md:text-3xl font-black text-textmain uppercase tracking-tight leading-tight m-0">
                  Er. Ravi Shankar Prasad Singh
                </h2>
                <p className="text-brandGreen font-bold text-xs uppercase tracking-widest m-0 mt-1">Honorable President, BPTPIA</p>
              </div>

              <div className="text-textmain text-[14px] md:text-[15px] leading-relaxed space-y-4 text-justify font-medium">
                <p className="m-0">
                  <span className="text-3xl md:text-4xl font-black text-brandGreen float-left mr-2 leading-[0.8]">W</span>
                  elcome to the Bihar Private Technical & Professional Institutions Association (BPTPIA). It gives me immense pride to address the future leaders, innovators, and architects of our nation.
                </p>

                <p className="m-0">
                  When we established BPTPIA in 2014, our vision was crystal clear: to create an educational ecosystem that doesn't just produce degree holders, but molds highly skilled, ethically grounded, and globally competitive professionals.
                </p>

                <blockquote className="pl-4 py-1.5 border-l-4 border-brandOrange bg-gray-50/50 italic text-textmain text-[13px] md:text-[14px] leading-relaxed my-4 pr-3">
                  "At BPTPIA, our curriculum methodology is heavily tilted towards experiential learning. We continuously upgrade our laboratories, partner with tech giants, and encourage our students to solve real-world problems."
                </blockquote>

                <p className="m-0">
                  From maintaining a ragging-free, disciplined campus to providing modern hostels and world-class digital libraries, we ensure every student feels secure and empowered. Let me assure you, we treat this trust as our highest responsibility.
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-200 flex flex-col items-start gap-1">
                <p className="font-bold text-textmain text-sm m-0">Wishing you a transformative journey ahead,</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Stylized_signature_sample.svg/1280px-Stylized_signature_sample.svg.png"
                  alt="Signature"
                  className="h-10 md:h-12 opacity-60 mix-blend-multiply mt-1 mb-1 pointer-events-none"
                />
                <h4 className="font-black text-textmain uppercase tracking-tight m-0 text-xs">Er. Ravi Shankar Prasad Singh</h4>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: PILLARS OF EXCELLENCE (Perfect Viewport) */}
      {/* ========================================== */}
      <section className="min-h-[100dvh] py-12 bg-gray-50 border-b border-gray-200 relative z-10 flex flex-col justify-center px-4 md:px-8">
        <div className="container-custom max-w-6xl mx-auto w-full">

          <div className="text-center mb-10">
            <h2 className="heading-xl m-0">Pillars of Excellence</h2>
            <div className="w-12 h-1 bg-brandGreen mx-auto my-3" />
            <p className="text-muted text-sm m-0 max-w-2xl mx-auto">Our strategic approach to holistic development ensures that every student is equipped for global success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Highlight Pillar */}
            <div className="md:col-span-1 p-8 bg-white rounded-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-brandGreen/40 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-brandGreen transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center mb-5 group-hover:bg-brandGreen/5 transition-colors">
                <Globe2 className="w-8 h-8 text-brandGreen" />
              </div>
              <h3 className="text-lg font-black uppercase text-textmain mb-3 w-full m-0 tracking-tight">Global Perspective</h3>
              <p className="text-textmain text-sm leading-relaxed text-center font-medium m-0">
                We prepare our students not just for local markets, but to be global citizens. Our training modules include cross-cultural communication and modern leadership ethics.
              </p>
            </div>

            {/* Grid of Sub-Pillars */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Shield, title: "Safe Environment", desc: "A nurturing, ragging-free campus prioritizing well-being." },
                { icon: Monitor, title: "Tech-Driven", desc: "Smart classrooms and IoT-enabled infrastructure." },
                { icon: BookOpen, title: "Advanced Research", desc: "Access to digital libraries and innovation labs." },
                { icon: Trophy, title: "Holistic Growth", desc: "Investment in sports, cultural fests, and tech symposiums." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-sm border border-gray-200 flex flex-col gap-3 group h-full justify-center">
                  <div className="w-10 h-10 shrink-0 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center text-brandGreen group-hover:bg-brandGreen group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm mb-1.5 uppercase tracking-tight text-textmain m-0">{item.title}</h4>
                    <p className="text-textmain text-xs leading-relaxed font-medium m-0 text-justify">{item.desc}</p>
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
                <span className="inline-flex items-center justify-center gap-1.5 text-brandOrange font-bold uppercase tracking-widest text-[9px] bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-sm mb-3 shadow-sm">
                  <Target className="w-3 h-3" /> The Future Roadmap
                </span>
                <h2 className="heading-xl !text-3xl m-0 !text-left">
                  Empowering Youth for a <span className="text-brandGreen">Digital Era</span>
                </h2>
                <div className="w-12 h-1 bg-brandGreen mt-3" />
              </div>

              <div className="text-textmain text-sm font-medium">
                <p className="text-justify leading-relaxed m-0 text-[14px]">
                  Historically, Bihar has been the cradle of knowledge. We envision a future where our graduates are the preferred choice for top-tier multinational corporations.
                </p>
                <ul className="space-y-2 mt-4">
                  {[
                    { title: "100% Placement Assistance", desc: "Dedicated training for global market readiness." },
                    { title: "Incubation Centers", desc: "Supporting student startups directly from the campus." },
                    { title: "Global Alumni Network", desc: "Strong international community for mentorship." }
                  ].map((list, i) => (
                    <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-sm border border-gray-200 shadow-sm transition hover:border-brandGreen/30">
                      <CheckCircle2 className="w-4 h-4 text-brandGreen shrink-0 mt-0.5" />
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
              <Quote className="w-8 h-8 text-brandGreen mb-4 relative z-10" />
              <div className="relative z-10 space-y-4 w-full">
                <p className="text-[15px] md:text-base font-medium text-white italic leading-relaxed text-center m-0">
                  "We do not just build engineers and managers; we build the nation's future. Every single student holds the potential to change the world."
                </p>
                <div className="pt-4 border-t border-gray-600 flex flex-col items-center">
                  <h4 className="font-bold text-xs text-white uppercase tracking-widest text-center m-0">Strategic Directive</h4>
                  <p className="text-brandGreen font-bold text-[9px] uppercase tracking-wider mt-1 text-center m-0">BPTPIA Foundation 2030</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Half: Stats (Combined into same viewport) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" ref={statsRef}>
            <StatItem icon={<CheckCircle2 className="w-5 h-5" />} val={2014} label="Established" suffix="" delay={0.1} />
            <StatItem icon={<GraduationCap className="w-5 h-5" />} val={15000} label="Alumni Worldwide" suffix="+" delay={0.2} />
            <StatItem icon={<Award className="w-5 h-5" />} val={95} label="Placement Record" suffix="%" delay={0.3} />
            <StatItem icon={<Users className="w-5 h-5" />} val={50} label="Expert Faculties" suffix="+" delay={0.4} />
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