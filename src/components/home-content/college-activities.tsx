'use client';

import React from "react";
import { Carousel, TestimonialCard, iTestimonial } from "@/components/ui/retro-testimonial";

// ==========================================
// REALISTIC COLLEGE ACTIVITY DATA
// ==========================================
const activitiesData = [
    {
        id: "activity-1",
        name: "Annual Tech Fest 2026",
        designation: "Technology & Innovation",
        description: "A three-day mega event showcasing robotics, coding hackathons, and innovative project exhibitions by students from all over Bihar. A platform to nurture future engineers.",
        profileImage: "/college-activities/slide1activities.png",
        bgImage: "/college-activities/slide1activities.png",
    },
    {
        id: "activity-2",
        name: "State Robotics Challenge",
        designation: "STEM & Innovation",
        description: "An intense competition where students from across Bihar design and build autonomous robots. This event encourages hands-on learning in electronics, mechanics, and AI logic.",
        profileImage: "/college-activities/slide2activities.png",
        bgImage: "/college-activities/slide2activities.png",
    },
    {
        id: "activity-3",
        name: "National AI Seminar",
        designation: "Academic Workshop",
        description: "Industry experts and researchers gathered to discuss the impact of Artificial Intelligence on modern engineering. Students received hands-on practical sessions.",
        profileImage: "/college-activities/slide3activities.png",
        bgImage: "/college-activities/slide3activities.png",
    },
    {
        id: "activity-4",
        name: "Cultural Symposium",
        designation: "Arts & Culture",
        description: "Celebrating diversity and heritage through dance, drama, and musical performances. An evening of vibrant cultural exchange among students.",
        profileImage: "/college-activities/slide4activities.png",
        bgImage: "/college-activities/slide4activities.png",
    },
    {
        id: "activity-5",
        name: "Industrial Visit 2025",
        designation: "Practical Learning",
        description: "Final year engineering students visited top manufacturing plants to bridge the gap between theoretical knowledge and practical industry applications.",
        profileImage: "/college-activities/slide5activities.png",
        bgImage: "/college-activities/slide5activities.png",
    }
];

export default function CollegeActivitiesSection() {
    // Generate cards from the data
    const activityCards = activitiesData.map((activity, index) => (
        <TestimonialCard
            key={activity.id}
            testimonial={{
                name: activity.name,
                designation: activity.designation,
                description: activity.description,
                profileImage: activity.profileImage,
            }}
            index={index}
            backgroundImage={activity.bgImage}
        />
    ));

    const universityBgImage = "/hero/Campus life on a sunny day.png";

    return (
        // STRICT CSS SYNC: Applied .section with tight padding override
        <section
            className="section !py-8 md:!py-12 relative overflow-hidden w-full"
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('${universityBgImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>

            {/* STRICT CSS SYNC: Applied .container-custom */}
            <div className="container-custom relative z-10 w-full flex flex-col items-center">

                <div className="flex flex-col items-center mb-2 w-full max-w-3xl">

                    {/* STRICT CSS SYNC: .heading-xl applies Red color, Bold font, and Center alignment */}
                    <h2 className="heading-xl">
                        Association Activities
                    </h2>

                    {/* ✅ FIX: Added !text-white and drop-shadow-md to override the blue color and make it pop out */}
                    <p className="text-muted mt-2">
                        Glimpses of vibrant campus life, workshops, and major events organized across our associated institutions.
                    </p>

                    <div className="w-16 h-1 bg-[#fbc02d] mt-6 rounded-full mx-auto shadow-sm"></div>
                </div>

                <div className="w-full max-w-[100vw] mt-2">
                    <Carousel items={activityCards} />
                </div>

            </div>
        </section>
    );
}