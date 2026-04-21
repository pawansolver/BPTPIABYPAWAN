'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    data: any;
}

const InfoRow = ({ label, value }: { label: string, value: string | null | undefined }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 py-2 border-b border-gray-300 last:border-0 items-center">
        <div className="text-xs font-bold text-gray-600 md:col-span-1 uppercase">{label}</div>
        <div className="text-sm font-medium text-gray-900 md:col-span-2">{value || 'N/A'}</div>
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
                    className="absolute inset-0 bg-black/60"
                />

                {/* Modal Content */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-gray-400 shadow-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-gray-100">
                        <div>
                            <h2 className="text-xl font-bold text-[#1e3a8a] uppercase tracking-wide">Review Application Details</h2>
                            <p className="text-gray-600 text-xs mt-1">Please verify all information before finalizing your submission.</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors bg-white border border-gray-300 shadow-sm"
                            title="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-grow overflow-y-auto custom-scrollbar p-6 bg-white">
                        <div className="space-y-6">
                            
                            {/* Personal Details Flat Table */}
                            <div>
                                <h3 className="text-sm font-bold text-white bg-[#1e3a8a] px-3 py-1.5 uppercase mb-1 border border-[#1e3a8a]">Personal Details</h3>
                                <div className="px-4 py-1 border border-gray-300">
                                    <InfoRow label="Applicant Name" value={data.applicantName} />
                                    <InfoRow label="Father's Name" value={data.fatherName} />
                                    <InfoRow label="Mother's Name" value={data.motherName} />
                                    <InfoRow label="Aadhar Number" value={data.aadharNo} />
                                    <InfoRow label="Date of Birth" value={data.dob} />
                                    <InfoRow label="Gender / Category" value={`${data.gender} / ${data.category}`} />
                                </div>
                            </div>

                            {/* Academic & Course Flat Table */}
                            <div>
                                <h3 className="text-sm font-bold text-white bg-[#1e3a8a] px-3 py-1.5 uppercase mb-1 border border-[#1e3a8a]">Academic & Course Details</h3>
                                <div className="px-4 py-1 border border-gray-300">
                                    <InfoRow label="Course Applied" value={data.courseAppliedFor} />
                                    <InfoRow label="Branch" value={data.branchAppliedFor} />
                                    <InfoRow label="Exam Center" value={data.examCenterId} />
                                    <InfoRow label="10th Percentage" value={`${data.tenthPercentage}%`} />
                                    <InfoRow label="12th/ITI Percentage" value={data.twelfthPercentage ? `${data.twelfthPercentage}%` : 'N/A'} />
                                </div>
                            </div>

                            {/* Contact Details Flat Table */}
                            <div>
                                <h3 className="text-sm font-bold text-white bg-[#1e3a8a] px-3 py-1.5 uppercase mb-1 border border-[#1e3a8a]">Contact Information</h3>
                                <div className="px-4 py-1 border border-gray-300">
                                    <InfoRow label="Email Address" value={data.email} />
                                    <InfoRow label="Mobile Number" value={data.mobile} />
                                    <InfoRow label="Communication Address" value={data.communicationAddress} />
                                </div>
                            </div>

                            {/* Document Previews */}
                            <div>
                                <h3 className="text-sm font-bold text-white bg-[#1e3a8a] px-3 py-1.5 uppercase mb-1 border border-[#1e3a8a]">Uploaded Documents</h3>
                                
                                {data.identityDocumentType && (
                                    <div className="mb-4 px-4 py-1 border border-gray-300 bg-gray-50">
                                        <InfoRow label="Identity Document Type" value={
                                            data.identityDocumentType === 'aadhaar' ? 'Aadhaar Card' :
                                            data.identityDocumentType === 'pan' ? 'PAN Card' :
                                            data.identityDocumentType === 'voter' ? 'Voter ID Card' :
                                            data.identityDocumentType === 'passport' ? 'Passport' :
                                            data.identityDocumentType === 'driving' ? 'Driving License' :
                                            data.identityDocumentType === 'ration' ? 'Ration Card' :
                                            data.identityDocumentType
                                        } />
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {data.passportPreview && (
                                        <div className="border border-gray-300 bg-gray-50 p-3 text-center">
                                            <p className="text-[11px] font-bold text-gray-700 uppercase mb-2">Passport Photo</p>
                                            <img src={data.passportPreview} className="w-full h-32 object-cover border border-gray-300 bg-white" alt="Passport" />
                                        </div>
                                    )}
                                    {data.signaturePreview && (
                                        <div className="border border-gray-300 bg-gray-50 p-3 text-center">
                                            <p className="text-[11px] font-bold text-gray-700 uppercase mb-2">Signature</p>
                                            <img src={data.signaturePreview} className="w-full h-32 object-contain border border-gray-300 bg-white p-1" alt="Signature" />
                                        </div>
                                    )}
                                    {data.identityPreview && (
                                        <div className="border border-gray-300 bg-gray-50 p-3 text-center">
                                            <p className="text-[11px] font-bold text-gray-700 uppercase mb-2">Identity Document</p>
                                            {data.identityPreview.startsWith('data:image') ? (
                                                <img src={data.identityPreview} className="w-full h-32 object-contain border border-gray-300 bg-white p-1" alt="Identity Document" />
                                            ) : data.identityPreview.startsWith('data:application/pdf') ? (
                                                <div className="w-full h-32 flex flex-col items-center justify-center bg-white border border-gray-300">
                                                    <FileText className="text-gray-400 mb-1" size={24} />
                                                    <a
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const blob = new Blob([atob(data.identityPreview.split(',')[1])], { type: 'application/pdf' });
                                                            const url = URL.createObjectURL(blob);
                                                            window.open(url, '_blank');
                                                        }}
                                                        href="#"
                                                        className="text-xs text-[#1e3a8a] font-bold hover:underline"
                                                    >
                                                        Click to View PDF
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="w-full h-32 flex flex-col items-center justify-center bg-white border border-gray-300">
                                                    <FileText className="text-gray-400 mb-1" size={24} />
                                                    <a 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.open(data.identityPreview, '_blank');
                                                        }}
                                                        href="#"
                                                        className="text-xs text-[#1e3a8a] font-bold hover:underline"
                                                    >
                                                        Click to View Document
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-300 bg-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 bg-white px-4 py-2 border border-gray-300">
                            <span className="text-gray-700 text-xs font-bold uppercase">Application Fee:</span>
                            <span className="text-lg font-black text-[#1e3a8a]">₹520.00</span>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button 
                                onClick={onClose}
                                className="flex-1 md:flex-none px-6 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-400 hover:bg-gray-200 transition-colors uppercase tracking-wider"
                            >
                                Edit Details
                            </button>
                            <button 
                                onClick={onConfirm}
                                className="flex-1 md:flex-none px-8 py-2.5 text-xs font-bold text-white bg-[#1e3a8a] border border-[#1e3a8a] hover:bg-[#152e73] transition-colors uppercase tracking-wider"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
