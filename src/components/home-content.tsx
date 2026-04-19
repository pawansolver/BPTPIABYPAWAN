"use client"

import React from 'react'
import HeroSection from "@/components/hero-section";

export default function HomeContent() {
    return (
        <main>
            {/* 1. Hero Section (Slider + Particle Text) */}
            <HeroSection />

            {/* 2. Welcome/About Section (Using the new design system from globals.css) */}
            <section className="section bg-white">
                <div className="container-custom">
                    <h2 className="heading-xl">Empowering Technical Education</h2>
                    <p className="text-muted mb-10">
                        Bihar Private Technical & Professional Institutions Association (BPTPIA) is 
                        dedicated to maintaining the highest standards of professional and technical 
                        education across the state of Bihar.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                        <button className="btn-primary">
                            Explore Institutions
                            <span className="arrow">→</span>
                        </button>
                        <button className="btn-inverse border border-gray-200">
                            Our Mission
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Responsive Grid Section Example */}
            <section className="section bg-gray-50">
                <div className="container-custom">
                    <h2 className="heading-xl">Key Features</h2>
                    <div className="responsive-grid mt-12">
                        {[
                            { title: "Quality Education", desc: "Ensuring top-tier standards in all member institutions." },
                            { title: "Policy Advocacy", desc: "Representing private technical institutions at state levels." },
                            { title: "Student Support", desc: "Providing resources and guidance for technical aspirants." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-textmain mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
