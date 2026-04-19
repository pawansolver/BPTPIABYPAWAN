'use client';

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { submitContactAction } from "@/app/actions/contactActions";

export default function ContactSection() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            contactName: formData.get('contactName'),
            contactEmail: formData.get('contactEmail'),
            contactPhone: formData.get('contactPhone'),
            contactMessage: message,
        };

        const result = await submitContactAction(data);
        if (result.success) {
            alert("Success: " + result.message);
            // Reset form
            setMessage("");
            (e.target as HTMLFormElement).reset();
        } else {
            alert("Error: " + result.message);
        }
    };

    // ============================================================================
    // REUSABLE CLASSES FOR FLOATING LABELS
    // ============================================================================
    const inputClass = "block w-full h-[42px] px-3 bg-white/95 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 text-[13px] text-gray-800 placeholder-transparent transition-all shadow-sm peer";
    const textareaClass = "block w-full min-h-[90px] p-3 pb-7 bg-white/95 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 text-[13px] text-gray-800 placeholder-transparent resize-none transition-all shadow-sm peer h-full"; // Added h-full here so text area fills extra space if needed
    const labelClass = "absolute left-3 -top-2 text-[11px] font-bold text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-[13px] peer-placeholder-shown:font-medium peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:bg-white peer-focus:text-gray-800 z-10 rounded-sm";

    return (
        // COMPACT: Reduced padding (py-12 md:py-16 instead of py-20)
        <section className="w-full py-10 md:py-16 relative overflow-hidden border-t border-gray-200">

            {/* ENTIRE SECTION BACKGROUND IMAGE (UNTOUCHED) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="/hero/du-bg.png"
                    alt="Contact Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[3px]" />
            </div>

            <div className="container-custom relative z-10">

                {/* SECTION HEADER */}
                {/* COMPACT: Reduced bottom margin */}
                <div className="flex flex-col items-center text-center w-full mb-6 md:mb-8">
                    <h2 className="heading-xl !mb-0 text-[1.75rem] md:text-3xl">
                        Get In Touch
                    </h2>
                    <p className="text-muted mt-1 max-w-2xl text-[13px] md:text-[15px] font-semibold">
                        Have questions or want to collaborate? Reach out to our offices across Bihar.
                    </p>
                    <div className="w-12 h-1 bg-[#fbc02d] mt-2.5 rounded-full mx-auto shadow-sm"></div>
                </div>

                {/* MAIN GRID LAYOUT */}
                {/* COMPACT: Reduced gap between columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">

                    {/* LEFT SIDE: CONTACT FORM */}
                    {/* Added h-full to make sure it stretches to the max height */}
                    <div className="lg:col-span-5 h-full bg-white/70 backdrop-blur-md border border-gray-100 p-4 md:p-5 shadow-xl shadow-gray-200/50 rounded-xl relative overflow-hidden flex flex-col justify-between">
                        {/* FORM INTERNAL BG DECORATION */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <img
                                src="/hero/du-bg.png"
                                alt=""
                                className="w-full h-full object-cover opacity-10"
                            />
                        </div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-0.5">Send a Message</h3>
                                <p className="text-[11.5px] text-gray-500 font-medium">Fill out the form below and we'll get back to you.</p>
                            </div>

                            {/* INCREASED GAP slightly to accommodate floating labels, flex-grow added to push button down */}
                            <form className="flex flex-col gap-4 flex-grow" onSubmit={handleSubmit}>
                                <div className="relative shrink-0">
                                    <input type="text" id="contactName" name="contactName" placeholder=" " className={inputClass} required />
                                    <label htmlFor="contactName" className={labelClass}>Full Name</label>
                                </div>

                                <div className="relative shrink-0">
                                    <input type="email" id="contactEmail" name="contactEmail" placeholder=" " className={inputClass} required />
                                    <label htmlFor="contactEmail" className={labelClass}>Email Address</label>
                                </div>

                                <div className="relative shrink-0">
                                    <input type="tel" id="contactPhone" name="contactPhone" placeholder=" " className={inputClass} required />
                                    <label htmlFor="contactPhone" className={labelClass}>Contact Number</label>
                                </div>

                                {/* Text area gets flex-grow to occupy remaining space inside the form */}
                                <div className="relative flex-grow flex flex-col">
                                    <textarea id="contactMessage" name="contactMessage" placeholder=" " value={message} onChange={(e) => setMessage(e.target.value)} maxLength={180} className={textareaClass} required />
                                    <label htmlFor="contactMessage" className={labelClass}>Message</label>
                                    <div className="absolute bottom-2 right-2 flex items-center z-10">
                                        <span className={`text-[10px] font-medium ${message.length > 150 ? 'text-red-500' : 'text-gray-400'}`}>{message.length} / 180</span>
                                    </div>
                                </div>

                                <button type="submit" className="mt-2 shrink-0 w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 text-[13.5px] font-bold rounded-lg transition-all hover:shadow-md active:scale-[0.98] group">
                                    Send Message
                                    <motion.div animate={{ x: [0, 3, 0], y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                        <Send className="w-3.5 h-3.5" />
                                    </motion.div>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT SIDE: ADDRESS DETAILS */}
                    {/* Added h-full to make the wrapper equal height */}
                    <div className="lg:col-span-7 flex flex-col h-full gap-3 text-textmain lg:pl-1">
                        {/* Added h-full to the inner grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 h-full">

                            {/* Card 1: Registered Office - Added h-full */}
                            <div className="bg-white/70 backdrop-blur-md p-3.5 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group/card">
                                <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-gray-200 relative z-10">
                                    {/* COMPACT: Icon size reduced w-8 h-8 */}
                                    <div className="w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                                        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                                            <Building2 className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-gray-900 text-[15px] font-bold">Registered Office</h3>
                                </div>
                                <p className="leading-relaxed text-gray-700 text-[13px] font-medium relative z-10">
                                    <span className="font-bold text-gray-900">Address: </span>
                                    C/o R.P.S. Head Office, East of Canal, Under Fly Over Bridge, Near Appolo Tyres, Bailey Road, P.O.- B.V. College, Rukanpura, Patna-800014
                                </p>
                            </div>

                            {/* Card 2: Secretary Office - Added h-full */}
                            <div className="bg-white/70 backdrop-blur-md p-3.5 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group/card">
                                <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-gray-200 relative z-10">
                                    <div className="w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                            <MapPin className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-gray-900 text-[15px] font-bold">Secretary Office</h3>
                                </div>
                                <p className="leading-relaxed text-gray-700 text-[13px] font-medium relative z-10">
                                    <span className="font-bold text-gray-900">Address: </span>
                                    141/83, Ashok Nagar, Gaya-823001 (Bihar)
                                </p>
                            </div>

                            {/* Card 3: State Office - Added h-full */}
                            <div className="bg-white/70 backdrop-blur-md p-3.5 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group/card">
                                <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-gray-200 relative z-10">
                                    <div className="w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                                            <MapPin className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-gray-900 text-[15px] font-bold">State Office</h3>
                                </div>
                                <p className="leading-relaxed text-gray-700 text-[13px] font-medium relative z-10">
                                    <span className="font-bold text-gray-900">Address: </span>
                                    Maa Gayatri Residency, 2nd Floor, Mahua Bagh, Gandhi Puram, Jagdev Path, Patna-800014, (Bihar)
                                </p>
                            </div>

                            {/* Card 4: Branch Office - Added h-full */}
                            <div className="bg-white/70 backdrop-blur-md p-3.5 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden group/card">
                                <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-gray-200 relative z-10">
                                    <div className="w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shrink-0 border border-gray-200 shadow-sm">
                                        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                                            <Building2 className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                    <h3 className="text-gray-900 text-[15px] font-bold">Branch Office</h3>
                                </div>
                                <p className="leading-relaxed text-gray-700 text-[13px] mb-2.5 font-medium relative z-10">
                                    <span className="font-bold text-gray-900">Address: </span>
                                    Office of All Engineering & Polytechnic Colleges
                                </p>

                                {/* FIXED: Removed mt-auto from here to eliminate the large gap */}
                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <a href="tel:+919934005543" className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group/link w-max">
                                        <div className="bg-white p-1 rounded border border-gray-200 shadow-sm group-hover/link:bg-gray-100 transition-colors text-gray-900">
                                            <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                                                <Phone className="w-3 h-3" />
                                            </motion.div>
                                        </div>
                                        <span className="font-bold text-[13px]">+91-9934005543</span>
                                    </a>
                                    <a href="mailto:biharpvtassociation@gmail.com" className="flex items-center gap-2 text-gray-800 hover:text-black transition-colors group/link w-max">
                                        <div className="bg-white p-1 rounded border border-gray-200 shadow-sm group-hover/link:bg-gray-100 transition-colors text-gray-900">
                                            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                                                <Mail className="w-3 h-3" />
                                            </motion.div>
                                        </div>
                                        <span className="font-bold text-[13px] break-all">biharpvtassociation@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}