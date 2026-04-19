'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, Landmark, Lightbulb, Users, ShieldCheck } from "lucide-react";

// ==========================================
// DATA: WHY CHOOSE BPTPIA
// ==========================================
const features = [
    {
       
    id: 1,
    title: "Quality Standards",
    tagline: "Academic Rigor",
    description: "We ensure all our member institutions maintain the highest level of academic rigor and standardized curriculum for technical education in Bihar.",
    icon: ShieldCheck,
    imageSrc: "/why-choose-us/slide1wcu.png",
},
    {
        id: 2,
        title: "Government Liaison",
        tagline: "Strong Network",
        description: "Acting as a vital bridge between private colleges and state/central regulatory bodies to ensure smooth operations and compliance.",
        icon: Landmark,
        imageSrc: "/why-choose-us/slide2wcu.png",
    },
    {
        id: 3,
        title: "Exceptional Placements",
        tagline: "Career Growth",
        description: "A centralized effort to bring top IT and core industry recruiters to our campuses, ensuring a bright future for our aspiring engineers.",
        icon: Briefcase,
        imageSrc: "/why-choose-us/slide3wcu.png",
    },
    {
        id: 4,
        title: "Modern Infrastructure",
        tagline: "Innovation Hub",
        description: "Promoting state-of-the-art skill labs, startup incubation centers, and modern digital classrooms across all associated colleges.",
        icon: Lightbulb,
        imageSrc: "/why-choose-us/slide4wcu.png",
    },
    {
        id: 5,
        title: "Student-Centric Approach",
        tagline: "Welfare First",
        description: "From standardized testing to centralized grievance redressal, we prioritize student welfare and transparent evaluation systems.",
        icon: Users,
        imageSrc: "/why-choose-us/slide5wcu.png",
    },
    {
        id: 6,
        title: "Recognized Excellence",
        tagline: "Global Reach",
        description: "Our colleges are repeatedly ranked among the top private institutions, producing alumni who lead global tech organizations.",
        icon: Award,
        imageSrc: "/why-choose-us/slide6wcu.png",
    }
];

export default function WhyChooseUsSection() {
    const [activeId, setActiveId] = useState<number>(features[0].id);

    return (
        // COMPACT: Custom padding (!py-8 md:!py-10) directly applied
        <section className="section !py-8 md:!py-10 bg-[#f8fafc] w-full border-t border-gray-100 relative overflow-hidden">

            <div className="container-custom relative z-10 w-full">

                {/* ========================================= */}
                {/* SECTION HEADER (COMPACT MARGINS)          */}
                {/* ========================================= */}
                <div className="flex flex-col items-center text-center w-full mb-6 md:mb-8">
                    <h2 className="heading-xl !mb-0 tracking-tight">
                        Why Choose <span className="text-[var(--color-brandGreen)]">BPTPIA?</span>
                    </h2>
                    <p className="text-muted mt-1 max-w-2xl text-sm md:text-base font-medium">
                        Empowering Bihar's private technical institutions to deliver world-class education, innovation, and career opportunities.
                    </p>
                    <div className="w-16 h-1 bg-[#fbc02d] mt-3 rounded-full mx-auto shadow-sm"></div>
                </div>

                {/* ========================================= */}
                {/* TCS-STYLE HORIZONTAL ACCORDION (COMPACT)  */}
                {/* ========================================= */}
                {/* COMPACT HEIGHT: Mobile 450px, Desktop 420px */}
                <div className="flex flex-col md:flex-row gap-2 w-full h-[480px] md:h-[400px] lg:h-[420px]">
                    {features.map((feature) => {
                        const isActive = activeId === feature.id;
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.id}
                                layout
                                onClick={() => setActiveId(feature.id)}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={`
                                    relative overflow-hidden rounded-xl cursor-pointer group shadow-sm
                                    /* COMPACT WIDTH: Inactive width reduced to 56px/64px */
                                    ${isActive ? "flex-grow h-full" : "h-[50px] md:h-full md:w-[56px] lg:w-[64px] shrink-0"}
                                `}
                            >
                                {/* Background Image */}
                                <motion.img
                                    layout="position"
                                    src={feature.imageSrc}
                                    alt={feature.title}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlays */}
                                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' : 'bg-black/60 group-hover:bg-black/50'}`}></div>

                                {/* Content: Active State with AnimatedList Style */}
                                <AnimatePresence mode="wait">
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute bottom-0 left-0 p-4 md:p-6 w-full flex flex-col justify-end h-full"
                                        >
                                            {/* Icon - AnimatedList Style */}
                                            <motion.div
                                                initial={{ scale: 0.7, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                className="flex items-center gap-2.5 mb-2"
                                            >
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color-brandOrange)] flex items-center justify-center shadow-md">
                                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                </div>
                                                <span className="text-[var(--color-brandOrange)] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-sm">
                                                    {feature.tagline}
                                                </span>
                                            </motion.div>
                                            
                                            {/* Title - AnimatedList Style */}
                                            <motion.h3
                                                initial={{ scale: 0.7, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold mb-1.5 leading-tight drop-shadow-md"
                                            >
                                                {feature.title}
                                            </motion.h3>
                                            
                                            {/* Description - AnimatedList Style */}
                                            <motion.p
                                                initial={{ scale: 0.7, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                className="text-gray-200 text-xs md:text-sm lg:text-[15px] font-medium max-w-2xl drop-shadow-sm leading-relaxed"
                                            >
                                                {feature.description}
                                            </motion.p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Content: Inactive State (TCS Vertical Text Style) */}
                                <AnimatePresence mode="popLayout">
                                    {!isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            // COMPACT INACTIVE LAYOUT
                                            className="absolute inset-0 flex md:flex-col items-center justify-center md:justify-between px-3 md:px-0 py-0 md:py-6 h-full"
                                        >
                                            {/* Icon */}
                                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shrink-0">
                                                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-white font-bold text-[11px] md:text-xs tracking-widest md:[writing-mode:vertical-rl] md:rotate-180 whitespace-nowrap ml-3 md:ml-0 md:mt-3 flex-grow md:flex-grow-0 flex items-center text-left md:text-center uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                                                {feature.title}
                                            </h3>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}