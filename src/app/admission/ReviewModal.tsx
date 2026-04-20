'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, CreditCard, User, GraduationCap, MapPin, FileText, CheckCircle2 } from 'lucide-react';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: any;
}

const InfoRow = ({ label, value, icon: Icon }: { label: string, value: string | null | undefined, icon: any }) => (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
        <div className="mt-0.5 p-1.5 bg-[#004d80]/5 rounded-lg text-[#004d80]">
            <Icon size={14} />
        </div>
        <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{label}</p>
            <p className="text-[14px] text-slate-900 font-semibold leading-tight">{value || 'N/A'}</p>
        </div>
    </div>
);

export default function ReviewModal({ isOpen, onClose, onConfirm, data }: ReviewModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                        <div>
                            <h2 className="text-2xl font-bold text-[#004d80] tracking-tight uppercase">Review Application</h2>
                            <p className="text-slate-500 text-sm mt-1">Please verify your details before proceeding to payment.</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Personal Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2 text-[#cc0000]">
                                    <User size={18} className="font-bold" />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Personal Details</h3>
                                </div>
                                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 shadow-sm">
                                    <InfoRow icon={User} label="Applicant Name" value={data.applicantName} />
                                    <InfoRow icon={User} label="Father's Name" value={data.fatherName} />
                                    <InfoRow icon={User} label="Mother's Name" value={data.motherName} />
                                    <InfoRow icon={FileText} label="Aadhar Number" value={data.aadharNo} />
                                    <InfoRow icon={FileText} label="Date of Birth" value={data.dob} />
                                    <InfoRow icon={FileText} label="Gender / Category" value={`${data.gender} / ${data.category}`} />
                                </div>
                            </div>

                            {/* Academic & Course */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2 text-[#cc0000]">
                                    <GraduationCap size={18} />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Academics & Course</h3>
                                </div>
                                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 shadow-sm">
                                    <InfoRow icon={GraduationCap} label="Course Applied" value={data.courseAppliedFor} />
                                    <InfoRow icon={GraduationCap} label="Branch" value={data.branchAppliedFor} />
                                    <InfoRow icon={MapPin} label="Exam Center ID" value={data.examCenterId} />
                                    <InfoRow icon={FileText} label="10th Percentage" value={`${data.tenthPercentage}%`} />
                                    <InfoRow icon={FileText} label="12th/ITI Percentage" value={data.twelfthPercentage ? `${data.twelfthPercentage}%` : 'N/A'} />
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center gap-2 mb-2 text-[#cc0000]">
                                    <MapPin size={18} />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Contact & Address</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 border border-slate-100 rounded-2xl p-5 shadow-sm">
                                    <InfoRow icon={FileText} label="Email Address" value={data.email} />
                                    <InfoRow icon={FileText} label="Mobile Number" value={data.mobile} />
                                    <div className="md:col-span-2">
                                        <InfoRow icon={MapPin} label="Communication Address" value={data.communicationAddress} />
                                    </div>
                                </div>
                            </div>

                            {/* Document Previews */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center gap-2 mb-2 text-[#cc0000]">
                                    <FileText size={18} />
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Documents Uploaded</h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {data.passportPreview && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-slate-500 uppercase font-black px-1 tracking-widest">Passport Photo</p>
                                            <div className="relative group overflow-hidden rounded-xl border border-slate-200">
                                                <img src={data.passportPreview} className="w-full h-36 object-cover" alt="Passport" />
                                            </div>
                                        </div>
                                    )}
                                    {data.signaturePreview && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-slate-500 uppercase font-black px-1 tracking-widest">Signature</p>
                                            <div className="relative group overflow-hidden rounded-xl border border-slate-200 bg-white">
                                                <img src={data.signaturePreview} className="w-full h-36 object-contain p-2" alt="Signature" />
                                            </div>
                                        </div>
                                    )}
                                    {data.identityPreview && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-slate-500 uppercase font-black px-1 tracking-widest">Identity ID</p>
                                            <div className="w-full h-36 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200">
                                                <FileText className="text-slate-300" size={40} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-slate-100 bg-slate-50/80 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-[#cc0000]/10 rounded-2xl flex items-center justify-center">
                                <CreditCard className="text-[#cc0000]" size={28} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Application Fee</p>
                                <p className="text-3xl font-black text-[#cc0000] leading-tight">₹515.00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button 
                                onClick={onClose}
                                className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-slate-600 hover:text-slate-900 transition-all border border-slate-200 hover:bg-slate-100 uppercase text-xs tracking-widest"
                            >
                                <Edit2 size={16} />
                                Edit Details
                            </button>
                            <button 
                                onClick={onConfirm}
                                className="flex-1 md:flex-none flex items-center justify-center gap-3 px-12 py-4 rounded-full font-bold bg-[#004d80] text-white hover:bg-[#cc0000] transition-all shadow-xl shadow-[#004d80]/20 hover:shadow-[#cc0000]/20 uppercase text-xs tracking-widest"
                            >
                                <CheckCircle2 size={16} />
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
