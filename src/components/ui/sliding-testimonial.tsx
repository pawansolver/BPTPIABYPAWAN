'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Dr. Anjali Desai",
        profession: "Principal, Tech Institute",
        description: "BPTPIA has streamlined our affiliation process remarkably. Their digital initiatives have made administrative tasks effortless and highly transparent.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Rahul Verma",
        profession: "Director of Admissions",
        description: "The centralized guidance for new colleges and standardized admission procedures have saved us countless hours. Highly recommend their cooperative approach.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Dr. Priya Sharma",
        profession: "Head of Department",
        description: "From handling exams to academic calendars, BPTPIA's framework is a benchmark for technical institutions in Bihar. Truly a world-class association.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Vikram Singh",
        profession: "Chairman, Sunrise College",
        description: "A truly professional association. The regional coordination helps us stay connected with state-level educational policies instantly.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
        name: "Neha Gupta",
        profession: "Registrar",
        description: "The grievance redressal and standard fee structures have brought immense transparency. Our students and staff feel much more secure and supported.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
];

// Duplicate for seamless loop
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function SlidingTestimonial() {
    return (
        <div className='w-full py-12 md:py-16 bg-white overflow-hidden'>
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className='mb-10 text-center flex flex-col items-center'>
                    <h2 className="heading-xl">
                        What Our Members Say
                    </h2>
                    <p className="text-muted mt-2">
                        Hear from the Principals, Directors, and Educators who have partnered with BPTPIA to elevate technical education in Bihar.
                    </p>
                    <div className="w-24 h-1 bg-[var(--color-brandOrange)] mt-4 rounded-full mx-auto"></div>
                </div>

                {/* Mask for fading edges */}
                <div
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                    className="flex relative overflow-hidden shrink-0 w-full"
                >
                    <motion.div 
                        className="flex gap-6 w-max py-4"
                        animate={{
                            x: [0, -1350], // Adjust based on item width (approx 450px * 3)
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, indx) => (
                            <div
                                key={indx}
                                className="flex flex-col bg-gray-50 border border-gray-200 rounded-2xl shrink-0 w-[300px] md:w-[450px] shadow-sm hover:shadow-md transition-shadow"
                            >
                                <p className="px-6 py-6 text-[14px] md:text-[16px] text-gray-700 leading-relaxed italic">
                                    &quot;{testimonial.description}&quot;
                                </p>

                                <div className="border-t border-gray-200 w-full flex items-center px-6 py-4 mt-auto bg-white rounded-b-2xl">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm border border-gray-100"
                                    />
                                    <div className='flex flex-col ml-4'>
                                        <h5 className='text-[14px] md:text-[15px] font-bold text-[var(--color-brandGreen)]'>{testimonial.name}</h5>
                                        <p className='text-[12px] md:text-[13px] font-medium text-[var(--color-brandOrange)] uppercase tracking-wider'>{testimonial.profession}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}