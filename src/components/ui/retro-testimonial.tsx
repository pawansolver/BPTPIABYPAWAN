"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
    name: string;
    designation: string;
    description: string;
    profileImage: string;
}

interface iCarouselProps {
    items: React.ReactElement<{
        testimonial: iTestimonial;
        index: number;
        layout?: boolean;
        onCardClose: () => void;
    }>[];
    initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement | null>,
    onOutsideClick: () => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            onOutsideClick();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [ref, onOutsideClick]);
};

// ===== Components =====
const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const handleScrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
        }
    };

    const handleScrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 240 : 280;
            const gap = isMobile() ? 12 : 16;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        }
    };

    const isMobile = () => {
        return window && window.innerWidth < 768;
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    return (
        <div className="relative w-full mt-6">
            <div
                className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-4"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                <div
                    className={cn(
                        "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
                    )}
                />
                <div
                    className={cn(
                        "flex flex-row justify-start gap-4 pl-2",
                        "max-w-6xl mx-auto",
                    )}
                >
                    {items.map((item, index) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.4,
                                        delay: 0.05 * index,
                                        ease: "easeOut",
                                    },
                                }}
                                viewport={{ once: true }}
                                key={`card-${index}`}
                                className="last:pr-[5%] md:last:pr-[20%] rounded-2xl"
                            >
                                {React.cloneElement(item, {
                                    onCardClose: () => {
                                        return handleCardClose(index);
                                    },
                                })}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-2 pr-4 md:pr-0">
                <button
                    className="relative z-40 h-8 w-8 rounded-full bg-[#004d80] flex items-center justify-center disabled:opacity-50 hover:bg-[#cc0000] transition-colors duration-300"
                    onClick={handleScrollLeft}
                    disabled={!canScrollLeft}
                >
                    <ArrowLeft className="h-4 w-4 text-white" />
                </button>
                <button
                    className="relative z-40 h-8 w-8 rounded-full bg-[#004d80] flex items-center justify-center disabled:opacity-50 hover:bg-[#cc0000] transition-colors duration-300"
                    onClick={handleScrollRight}
                    disabled={!canScrollRight}
                >
                    <ArrowRight className="h-4 w-4 text-white" />
                </button>
            </div>
        </div>
    );
};

const TestimonialCard = ({
    testimonial,
    index,
    layout = false,
    onCardClose = () => { },
    backgroundImage = "https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop",
}: {
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose?: () => void;
    backgroundImage?: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleExpand = () => setIsExpanded(true);
    const handleCollapse = () => {
        setIsExpanded(false);
        onCardClose();
    };

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") handleCollapse();
        };

        if (isExpanded) {
            const scrollY = window.scrollY;
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
            document.body.dataset.scrollY = scrollY.toString();
        } else {
            const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            window.scrollTo({ top: scrollY, behavior: "instant" });
        }

        window.addEventListener("keydown", handleEscapeKey);
        return () => window.removeEventListener("keydown", handleEscapeKey);
    }, [isExpanded]);

    useOutsideClick(containerRef, handleCollapse);

    return (
        <>
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 h-screen overflow-hidden z-[100]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/60 backdrop-blur-md h-full w-full fixed inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${testimonial.name}` : undefined}
                            className="max-w-3xl mx-auto bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] h-[75vh] md:h-[55vh] z-[110] p-6 md:p-10 rounded-2xl relative mt-24 shadow-2xl flex flex-col"
                        >
                            <button
                                className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center bg-[#cc0000] hover:bg-red-700 transition-colors"
                                onClick={handleCollapse}
                            >
                                <X className="h-5 w-5 text-white" />
                            </button>

                            <div className="flex flex-col h-full overflow-y-auto pr-4">
                                <motion.p
                                    layoutId={layout ? `category-${testimonial.name}` : undefined}
                                    className="text-[#004d80] font-bold text-xs md:text-sm tracking-widest uppercase mb-2"
                                >
                                    {testimonial.designation}
                                </motion.p>
                                <motion.h3
                                    layoutId={layout ? `title-${testimonial.name}` : undefined}
                                    className="text-xl md:text-3xl font-bold text-gray-900 mb-4"
                                >
                                    {testimonial.name}
                                </motion.h3>
                                <div className="text-gray-700 text-base md:text-lg leading-relaxed flex gap-3">
                                    <Quote className="h-8 w-8 text-[#fbc02d] shrink-0 mt-1" fill="currentColor" />
                                    <p>{testimonial.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                layoutId={layout ? `card-${testimonial.name}` : undefined}
                onClick={handleExpand}
                className="text-left w-full"
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" },
                }}
            >
                {/* COMPACT CARD SIZES APPLIED HERE */}
                <div
                    className="rounded-2xl bg-gradient-to-b from-[#f2f0eb] to-[#fff9eb] h-[300px] md:h-[360px] w-[240px] md:w-[280px] overflow-hidden flex flex-col relative z-10 shadow-md border border-white/50 group"
                >
                    {/* Main Background Image */}
                    <div className="absolute inset-0 z-0 h-[60%] w-full overflow-hidden">
                        <Image
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src={backgroundImage}
                            alt={testimonial.name}
                            fill
                            sizes="(max-width: 768px) 240px, 280px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#f2f0eb] via-transparent to-transparent"></div>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 mt-auto p-4 pt-8 flex flex-col bg-gradient-to-b from-transparent to-[#fff9eb] h-[60%] justify-end">
                        <div className="absolute -top-8 right-4">
                            <ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
                        </div>

                        <motion.p
                            layoutId={layout ? `category-${testimonial.name}` : undefined}
                            className="text-[#cc0000] text-[10px] font-bold uppercase tracking-wider mb-1"
                        >
                            {testimonial.designation}
                        </motion.p>
                        <motion.h4
                            layoutId={layout ? `title-${testimonial.name}` : undefined}
                            className="text-gray-900 text-lg font-bold mb-1.5 leading-tight"
                        >
                            {testimonial.name}
                        </motion.h4>
                        <motion.p
                            className="text-gray-600 text-xs line-clamp-3 leading-snug"
                        >
                            {testimonial.description}
                        </motion.p>
                    </div>
                </div>
            </motion.button>
        </>
    );
};

const ProfileImage = ({ src, alt, ...rest }: ImageProps) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="w-[45px] h-[45px] md:w-[55px] md:h-[55px] bg-white rounded-full p-1 shadow-sm relative z-20">
            <div className="w-full h-full relative overflow-hidden rounded-full">
                <Image
                    className={cn(
                        "transition duration-300 object-cover",
                        isLoading ? "blur-sm" : "blur-0",
                    )}
                    onLoad={() => setLoading(false)}
                    src={src}
                    fill
                    sizes="55px"
                    alt={alt || "Icon"}
                    {...rest}
                />
            </div>
        </div>
    );
};

export { Carousel, TestimonialCard, ProfileImage };