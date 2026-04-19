"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Array of images only (indexes 1 through 5 in the carousel)
const SLIDE_IMAGES = [
    "/hero/slide1.png",
    "/hero/slide2.png",
    "/hero/slide3.png",
    "/hero/slide4.png",
    "/hero/slide5.png"
]

export default function HeroSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    // ==========================================
    // CUSTOM DYNAMIC AUTOPLAY LOGIC
    // ==========================================
    useEffect(() => {
        if (!emblaApi) return

        let timeoutId: NodeJS.Timeout

        const startAutoplay = () => {
            const currentIdx = emblaApi.selectedScrollSnap()

            // LOGIC: Agar pehli slide (particles) hai, toh 17 seconds wait karo. 
            // Agar images hain, toh 4 seconds wait karo.
            const delay = currentIdx === 0 ? 17000 : 4000

            timeoutId = setTimeout(() => {
                emblaApi.scrollNext()
            }, delay)
        }

        const handleSelect = () => {
            clearTimeout(timeoutId)
            onSelect()
            startAutoplay()
        }

        onSelect()
        startAutoplay()

        emblaApi.on('select', handleSelect)
        emblaApi.on('pointerDown', () => clearTimeout(timeoutId))

        return () => {
            clearTimeout(timeoutId)
            emblaApi.off('select', handleSelect)
        }
    }, [emblaApi, onSelect])

    const universityWords = ["BIHAR", "PRIVATE", "TECHNICAL", "BPTPIA"]

    return (
        <section className="relative w-full h-[450px] sm:h-[500px] md:h-[calc(100vh-171px)] md:min-h-[450px] overflow-hidden bg-black group flex flex-col justify-center items-center">

            {/* Slider Container */}
            <div className="absolute inset-0 z-0" ref={emblaRef}>
                <div className="flex h-full">

                    {/* Slide 0: The Particle Text Effect (No Image Background) */}
                    <div className="relative flex-[0_0_100%] min-w-0 h-full bg-black flex flex-col items-center justify-center">
                        <div className="w-full max-w-5xl h-[280px] sm:h-[350px] md:h-[500px] flex items-center justify-center px-4">
                            {selectedIndex === 0 && <ParticleTextEffect words={universityWords} />}
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: selectedIndex === 0 ? 1 : 0, y: 0 }}
                            className="text-white/80 text-xs sm:text-sm md:text-lg lg:text-xl font-medium tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase absolute bottom-4 sm:bottom-8 md:bottom-32 z-30 text-center px-4 max-w-[95%] md:max-w-full"
                        >
                            Bihar Private Technical & Professional Institutions Association
                        </motion.p>
                    </div>

                    {/* Slides 1-5: The Images (Fully Clear, No Blur) */}
                    {SLIDE_IMAGES.map((src, index) => (
                        <div key={index + 1} className="relative flex-[0_0_100%] min-w-0 h-full bg-black">
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                // Yahan se opacity-60 hata diya gaya hai taaki image 100% clear dikhe
                                className="w-full h-full object-cover"
                            />
                            {/* Yahan se blur aur overlay wala div puri tarah hata diya gaya hai */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider Navigation Arrows - Always visible on mobile */}
            <button
                onClick={scrollPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-2 rounded-full bg-black/40 sm:bg-black/20 text-white backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-2 rounded-full bg-black/40 sm:bg-black/20 text-white backdrop-blur-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
        </section>
    )
}