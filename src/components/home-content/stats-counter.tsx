'use client';

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// =========================================================================
// 1. BPTPIA STATS DATA
// =========================================================================
const associationStats = [
    {
        id: 1,
        endValue: 100,
        suffix: "+",
        label: "Associated Colleges",
    },
    {
        id: 2,
        endValue: 38,
        suffix: "",
        label: "Districts Covered in Bihar",
    },
    {
        id: 3,
        endValue: 50,
        suffix: " Lakh+",
        label: "Students Empowered",
    },
    {
        id: 4,
        endValue: 99,
        suffix: "%",
        label: "Quality Assurance Standard",
    },
];

// =========================================================================
// 2. FORMAL MONOCHROME ICON (White variant to pop on dark bg)
// =========================================================================
const CorporateShieldIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 text-white opacity-90 drop-shadow-lg"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
    </svg>
);

// =========================================================================
// 3. ANIMATED COUNTER ITEM COMPONENT
// =========================================================================
function CounterItem({ endValue, suffix, label }: { endValue: number, suffix: string, label: string }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && nodeRef.current) {
            const controls = animate(0, endValue, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate: (value) => {
                    if (nodeRef.current) {
                        nodeRef.current.textContent = Math.round(value).toString() + suffix;
                    }
                },
            });

            return () => controls.stop();
        }
    }, [isInView, endValue, suffix]);

    return (
        <div className="flex flex-col items-center justify-center space-y-2 text-center px-4 md:px-6 w-full relative z-10">
            <span
                ref={nodeRef}
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md whitespace-nowrap"
            >
                0{suffix}
            </span>
            {/* Added subtle yellow/gold tint to labels to match logo handshake */}
            <p className="text-[13px] md:text-sm lg:text-[15px] text-[#ffeb99] font-medium tracking-wide uppercase drop-shadow-sm">
                {label}
            </p>
        </div>
    );
}

// =========================================================================
// 4. MAIN COMPONENT 
// =========================================================================
export default function StatsCounterSection() {
    return (
        // BRANDED BACKGROUND: Deep Navy Blue to Dark Red gradient, inspired directly by the BPTPIA logo.
        <section className="w-full relative py-12 md:py-16 overflow-hidden z-10 min-h-[320px] flex items-center bg-gradient-to-br from-[#002b5e] via-[#00173d] to-[#660000] shadow-inner">

            {/* ========================================= */}
            {/* VECTOR & TEXTURE OVERLAYS FOR WORLD-CLASS FEEL */}
            {/* ========================================= */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Noise texture for premium matte finish */}
                <div aria-hidden className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

                {/* Large circular glows mimicking the screenshot style, but using brand colors */}
                <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[#cc0000]/15 blur-[100px] mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#0055ff]/10 blur-[80px] mix-blend-screen"></div>
            </div>

            {/* CONTENT CONTAINER */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center w-full relative z-10">

                {/* Top Icon */}
                <div className="mb-3">
                    <CorporateShieldIcon />
                </div>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-[38px] text-white font-bold tracking-tight mb-10 md:mb-12 text-center drop-shadow-md">
                    Why trust <span className="text-[#fbc02d] drop-shadow-lg">BPTPIA?</span>
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 w-full divide-y sm:divide-y-0 md:divide-x divide-white/20">
                    {associationStats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className={`flex justify-center w-full ${index !== 0 ? "pt-8 sm:pt-0" : ""}`}
                        >
                            <CounterItem
                                endValue={stat.endValue}
                                suffix={stat.suffix}
                                label={stat.label}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}