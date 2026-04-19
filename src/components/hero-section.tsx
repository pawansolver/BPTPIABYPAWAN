"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
// Note: Humne yahan se Autoplay plugin hata diya hai kyunki hum apna custom smart timer use karenge
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
    // Sirf loop enable kiya hai, default autoplay hata diya
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

        // Jab bhi slide change ho, purana timer clear karke naya timer start karo
        const handleSelect = () => {
            clearTimeout(timeoutId)
            onSelect() // Update UI state
            startAutoplay() // Restart timer based on new slide
        }

        // Initialize first timer
        onSelect()
        startAutoplay()

        // Event listeners
        emblaApi.on('select', handleSelect)
        emblaApi.on('pointerDown', () => clearTimeout(timeoutId)) // Agar user drag kare toh roko

        return () => {
            clearTimeout(timeoutId)
            emblaApi.off('select', handleSelect)
        }
    }, [emblaApi, onSelect])

    const universityWords = ["BIHAR", "PRIVATE", "TECHNICAL", "BPTPIA"]

    return (
        <section className="relative w-full h-[85vh] overflow-hidden bg-black group">

            {/* Slider Container */}
            <div className="absolute inset-0 z-0" ref={emblaRef}>
                <div className="flex h-full">

                    {/* Slide 0: The Particle Text Effect (No Image Background) */}
                    <div className="relative flex-[0_0_100%] min-w-0 h-full bg-black flex flex-col items-center justify-center">
                        <div className="w-full max-w-5xl h-[500px]">
                            {/* Render particles only when on the first slide to save resources */}
                            {selectedIndex === 0 && <ParticleTextEffect words={universityWords} />}
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: selectedIndex === 0 ? 1 : 0, y: 0 }}
                            className="text-white/80 text-lg md:text-xl font-medium tracking-[0.2em] uppercase mt-[-100px] absolute bottom-32 z-30"
                        >
                            Bihar Private Technical & Professional Institutions Association
                        </motion.p>
                    </div>

                    {/* Slides 1-5: The Images with Glassy Overlay */}
                    {SLIDE_IMAGES.map((src, index) => (
                        <div key={index + 1} className="relative flex-[0_0_100%] min-w-0 h-full">
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover opacity-100"
                            />
                            {/* Glassmorphism Layer applied individually to image slides */}
                            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider Navigation Arrows (Visible on hover) */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
        </section>
    )
}