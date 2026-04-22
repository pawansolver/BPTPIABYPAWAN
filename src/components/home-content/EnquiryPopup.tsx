'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Phone, ChevronsRight, ShieldCheck, ChevronDown } from "lucide-react";

export default function EnquiryPopup() {
    const [isOpen, setIsOpen] = useState(false);

    // Form Data State
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        stateId: "",
        districtId: "",
        programme: ""
    });

    // Custom Searchable Dropdown States
    const [stateSearch, setStateSearch] = useState("");
    const [districtSearch, setDistrictSearch] = useState("");
    const [isStateOpen, setIsStateOpen] = useState(false);
    const [isDistrictOpen, setIsDistrictOpen] = useState(false);

    // Refs for closing dropdowns when clicking outside
    const stateRef = useRef<HTMLDivElement>(null);
    const districtRef = useRef<HTMLDivElement>(null);

    const [statesList, setStatesList] = useState<any[]>([]);
    const [districtsList, setDistrictsList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = "https://api.bihartechassociation.com";

    // Captcha States
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaAns, setCaptchaAns] = useState("");

    const colors = {
        navy: "#003366",
        golden: "#f2a900",
    };

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
                setIsStateOpen(false);
            }
            if (districtRef.current && !districtRef.current.contains(event.target as Node)) {
                setIsDistrictOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        generateCaptcha();
        fetchStates();
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const fetchStates = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/locations/states`);
            const json = await response.json();
            if (json.success) setStatesList(json.data);
        } catch (error) {
            console.error("Failed to fetch states:", error);
        }
    };

    const fetchDistricts = async (stateId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/locations/districts/${stateId}`);
            const json = await response.json();
            if (json.success) setDistrictsList(json.data);
        } catch (error) {
            console.error("Failed to fetch districts:", error);
        }
    };

    useEffect(() => {
        if (formData.stateId) {
            fetchDistricts(formData.stateId);
        } else {
            setDistrictsList([]);
        }
    }, [formData.stateId]);

    const generateCaptcha = () => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setCaptchaAns("");
    };

    // Standard input handler for Name, Contact, Email, Programme
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Extra Validation to ensure they clicked an option from dropdown
        if (!formData.stateId || !formData.districtId) {
            alert("Please select a State and District from the dropdown list.");
            return;
        }

        if (parseInt(captchaAns) !== num1 + num2) {
            alert("Incorrect Captcha! Please try again.");
            generateCaptcha();
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const json = await response.json();

            if (json.success) {
                alert("Enquiry Submitted Successfully!");
                setIsOpen(false);
                setFormData({ name: "", contact: "", email: "", stateId: "", districtId: "", programme: "" });
                setStateSearch("");
                setDistrictSearch("");
            } else {
                // Show detailed validation errors if available
                const errorDetail = json.errors ? json.errors.map((e: any) => `${e.field}: ${e.message}`).join('\n') : json.message;
                alert("Error: " + errorDetail);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to submit enquiry. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getLabelClass = (value: string) => `
        absolute left-3 px-1 transition-all duration-200 pointer-events-none bg-white z-10 uppercase tracking-widest
        ${value ? '-top-2 text-[10px] font-bold text-[#003366]' : 'top-3 text-xs text-gray-500 font-bold'}
        peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#003366]
    `;

    return (
        <>
            {/* LEFT SIDE SOCIAL FLOATING BUTTONS - Premium Dark Blue Theme */}
            <div className="fixed left-0 top-1/3 z-40 flex flex-col gap-1.5 md:gap-2">
                {/* Phone Button - Premium Dark Blue */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="group relative"
                >
                    <a href="tel:+91-
                       9934005543" className="flex items-center">
                        {/* Icon Square */}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFB800] rounded-r-lg md:rounded-r-xl flex items-center justify-center shadow-[0_8px_32px_rgba(255,184,0,0.4)] border-r border-[#FFC107] z-10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#f2a900]">
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        {/* Expanding Text - White Background */}
                        <div className="h-10 md:h-12 flex flex-col justify-center bg-white text-[#1a1a1a] px-0 overflow-hidden rounded-r-lg md:rounded-r-xl -ml-2 transition-all duration-300 w-0 group-hover:w-48 group-hover:px-4 shadow-[0_8px_32px_rgba(255,255,255,0.6)]">
                            <span className="whitespace-nowrap font-bold text-sm text-[#1a1a1a]">Call Us Now</span>
                            <span className="whitespace-nowrap text-xs text-[#666]">+91-9934005543</span>
                        </div>
                    </a>
                </motion.div>

                {/* WhatsApp Button - Gold/Yellow */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="group relative"
                >
                    <a href="https://wa.me/919934005543" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        {/* Icon Square */}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFB800] rounded-r-lg md:rounded-r-xl flex items-center justify-center shadow-[0_8px_32px_rgba(255,184,0,0.4)] border-r border-[#FFC107] z-10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#f2a900]">
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                            </svg>
                        </div>
                        {/* Expanding Text - White Background */}
                        <div className="h-10 md:h-12 flex flex-col justify-center bg-white text-[#1a1a1a] px-0 overflow-hidden rounded-r-lg md:rounded-r-xl -ml-2 transition-all duration-300 w-0 group-hover:w-44 group-hover:px-4 shadow-[0_8px_32px_rgba(255,255,255,0.6)]">
                            <span className="whitespace-nowrap font-bold text-sm text-[#1a1a1a]">WhatsApp</span>
                            <span className="whitespace-nowrap text-xs text-[#666]">+91-9934005543</span>
                        </div>
                    </a>
                </motion.div>

                {/* Website/Globe Button - Gold/Yellow with Facebook on hover */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="group relative"
                >
                    <a href="https://www.facebook.com/people/Bptpia-Patna/61559957417187/?rdid=ClHYgZRIe8VugLZp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18TrhQGRVF%2F" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        {/* Icon Square */}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFB800] rounded-r-lg md:rounded-r-xl flex items-center justify-center shadow-[0_8px_32px_rgba(255,184,0,0.4)] border-r border-[#FFC107] z-10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#f2a900] relative overflow-hidden">
                            {/* Globe Icon - Default */}
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-300 group-hover:opacity-0 group-hover:scale-0 absolute" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                            </svg>
                            {/* Facebook Icon - Show on hover */}
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </div>
                        {/* Expanding Text - White Background */}
                        <div className="h-10 md:h-12 flex flex-col justify-center bg-white text-[#1a1a1a] px-0 overflow-hidden rounded-r-lg md:rounded-r-xl -ml-2 transition-all duration-300 w-0 group-hover:w-40 group-hover:px-4 shadow-[0_8px_32px_rgba(255,255,255,0.6)]">
                            <span className="whitespace-nowrap font-bold text-sm text-[#1a1a1a] group-hover:hidden">Visit Website</span>
                            <span className="whitespace-nowrap font-bold text-sm text-[#1a1a1a] hidden group-hover:block">Facebook</span>
                            <span className="whitespace-nowrap text-xs text-[#666] group-hover:hidden">www.bptpia.org</span>
                            <span className="whitespace-nowrap text-xs text-[#666] hidden group-hover:block">Follow Us</span>
                        </div>
                    </a>
                </motion.div>
            </div>

            {/* RIGHT SIDE FLOATING BUTTONS - Admission */}
            <div className="fixed right-0 top-1/3 z-40 flex flex-col gap-2 md:gap-3">
                {/* Apply Now Button */}
                <motion.button
                    onClick={() => window.open('/admission', '_blank')}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                    whileHover={{ x: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' } as any}
                >
                    <div className="relative bg-gradient-to-br from-[#FFB800] via-[#f2a900] to-[#e09500] text-white py-3 px-2 md:py-6 md:px-3 rounded-l-lg md:rounded-l-xl shadow-[0_8px_30px_rgba(242,169,0,0.4)] border-l-2 border-y border-white/30 backdrop-blur-sm">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative font-bold tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-[12px] uppercase flex items-center gap-1.5 md:gap-2">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="hidden md:inline">Apply Now</span>
                            <span className="md:hidden">Apply</span>
                        </span>
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 border-t-2 border-r-2 border-white/60 rotate-45" />
                        </div>
                    </div>
                </motion.button>

                {/* Admission Enquiry Button */}
                <motion.button
                    onClick={() => setIsOpen(true)}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                    whileHover={{ x: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' } as any}
                >
                    <div className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#002244] text-white py-3 px-2 md:py-6 md:px-3 rounded-l-lg md:rounded-l-xl shadow-[0_8px_30px_rgba(0,51,102,0.35)] border-l-2 border-y border-white/20 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative font-bold tracking-[0.12em] md:tracking-[0.15em] text-[9px] md:text-[11px] uppercase flex items-center gap-1.5 md:gap-2">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#FFB800]" />
                            <span className="hidden md:inline">Admission Enquiry</span>
                            <span className="md:hidden">Enquiry</span>
                        </span>
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 border-t-2 border-r-2 border-white/60 rotate-45" />
                        </div>
                    </div>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/70 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-sm shadow-2xl w-full max-w-[550px] relative border border-gray-200 overflow-visible"
                        >
                            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: colors.golden }}></div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-red-600 rounded-sm transition-colors z-20 border border-gray-200"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-b border-gray-200 mt-1">
                                <div className="flex items-center gap-4 text-[11px] font-bold tracking-wider uppercase" style={{ color: colors.navy }}>
                                    <a href="tel:+91-9934005543" className="flex items-center gap-1.5 hover:text-brandOrange transition-colors">
                                        <Smartphone className="w-3.5 h-3.5 text-brandOrange" /> +91-9934005543
                                    </a>
                                    <a href="https://wa.me/919934005543" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
                                        <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>

                            <div className="px-6 pt-6 pb-2 text-center">
                                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight m-0" style={{ color: colors.navy }}>
                                    Priority Admission Desk
                                </h2>
                                <div className="w-12 h-0.5 mx-auto mt-2" style={{ backgroundColor: colors.golden }}></div>
                                <p className="text-xs text-gray-500 mt-2 font-medium">Please fill out the form below for immediate assistance.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-5">

                                {/* Name Input - Full Width */}
                                <div className="relative">
                                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-[#003366] peer transition-colors" required />
                                    <label htmlFor="name" className={getLabelClass(formData.name)}>Full Name <span className="text-red-500">*</span></label>
                                </div>

                                {/* Mobile & Email in same line */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Contact Input */}
                                    <div className="relative">
                                        <input type="tel" id="contact" value={formData.contact} onChange={handleInputChange} className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-[#003366] peer transition-colors" required />
                                        <label htmlFor="contact" className={getLabelClass(formData.contact)}>Mobile Number <span className="text-red-500">*</span></label>
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative">
                                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-[#003366] peer transition-colors" required />
                                        <label htmlFor="email" className={getLabelClass(formData.email)}>Email Address <span className="text-red-500">*</span></label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5 relative">
                                    {/* STATE SEARCHABLE DROPDOWN */}
                                    <div className="relative" ref={stateRef}>
                                        <input
                                            type="text"
                                            value={stateSearch}
                                            onChange={(e) => {
                                                setStateSearch(e.target.value);
                                                setIsStateOpen(true);
                                                // Reset backend ID if they type something new
                                                setFormData(prev => ({ ...prev, stateId: "", districtId: "" }));
                                                setDistrictSearch("");
                                            }}
                                            onFocus={() => setIsStateOpen(true)}
                                            autoComplete="off"
                                            className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-[#003366] peer transition-colors"
                                            required
                                        />
                                        <label className={getLabelClass(stateSearch)}>State <span className="text-red-500">*</span></label>
                                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />

                                        {isStateOpen && (
                                            <ul className="absolute z-[60] top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl max-h-48 overflow-y-auto rounded-sm custom-scrollbar">
                                                {statesList.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase())).length > 0 ? (
                                                    statesList.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase())).map(state => (
                                                        <li
                                                            key={state.id}
                                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, stateId: state.id, districtId: "" }));
                                                                setStateSearch(state.name);
                                                                setDistrictSearch("");
                                                                setIsStateOpen(false);
                                                            }}
                                                        >
                                                            {state.name}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="px-4 py-2 text-sm text-gray-500">No states found</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>

                                    {/* DISTRICT SEARCHABLE DROPDOWN */}
                                    <div className="relative" ref={districtRef}>
                                        <input
                                            type="text"
                                            value={districtSearch}
                                            onChange={(e) => {
                                                setDistrictSearch(e.target.value);
                                                setIsDistrictOpen(true);
                                                setFormData(prev => ({ ...prev, districtId: "" }));
                                            }}
                                            onFocus={() => setIsDistrictOpen(true)}
                                            disabled={!formData.stateId}
                                            autoComplete="off"
                                            className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-[#003366] peer transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            required
                                        />
                                        <label className={getLabelClass(districtSearch || (formData.stateId ? "" : "Select State First"))}>
                                            District <span className="text-red-500">*</span>
                                        </label>
                                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />

                                        {isDistrictOpen && formData.stateId && (
                                            <ul className="absolute z-[60] top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl max-h-48 overflow-y-auto rounded-sm custom-scrollbar">
                                                {districtsList.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase())).length > 0 ? (
                                                    districtsList.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase())).map(district => (
                                                        <li
                                                            key={district.id}
                                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, districtId: district.id }));
                                                                setDistrictSearch(district.name);
                                                                setIsDistrictOpen(false);
                                                            }}
                                                        >
                                                            {district.name}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="px-4 py-2 text-sm text-gray-500">No districts found</li>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                {/* Programme Select (Standard Select is fine here as it has only 2 options) */}
                                <div className="relative">
                                    <select
                                        id="programme"
                                        value={formData.programme}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-3 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-sm appearance-none focus:outline-none focus:border-[#003366] cursor-pointer peer transition-colors"
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="BTech">B.Tech</option>
                                        <option value="Polytechnic">Polytechnic</option>
                                    </select>
                                    <label htmlFor="programme" className={getLabelClass(formData.programme)}>
                                        Programme <span className="text-red-500">*</span>
                                    </label>
                                    <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Bottom Action Row (Captcha & Submit) */}
                                <div className="flex flex-col md:flex-row items-stretch gap-4 pt-2">
                                    <div className="flex-1 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-between px-4 py-2 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest hidden sm:inline">Verify:</span>
                                            <span className="font-black text-lg ml-1" style={{ color: colors.navy }}>{num1} + {num2}</span>
                                            <span className="font-black text-lg text-gray-400">=</span>
                                        </div>
                                        <input
                                            type="number"
                                            required
                                            value={captchaAns}
                                            onChange={(e) => setCaptchaAns(e.target.value)}
                                            className="w-16 h-9 border border-gray-300 rounded-sm px-2 text-center text-sm font-bold focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-white"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        style={{ backgroundColor: colors.navy }}
                                        className="md:w-[160px] text-white font-bold py-3 px-4 rounded-sm transition-all hover:bg-opacity-90 flex items-center justify-center gap-2 shadow-sm uppercase text-[11px] tracking-widest group disabled:opacity-50"
                                    >
                                        {isLoading ? "Submitting..." : "Submit Request"}
                                        {!isLoading && <ChevronsRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Custom Scrollbar Style for Dropdown */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1; 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8; 
                }
            `}</style>
        </>
    );
}