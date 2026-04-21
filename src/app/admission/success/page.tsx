'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, Download, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

// Update page title
if (typeof window !== 'undefined') {
    document.title = 'BPTPIA Admission - Payment Successful';
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const trackingId = searchParams.get('id');

    return (
        <main
            className="flex-grow py-20 px-4 relative bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')` }}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="max-w-[700px] mx-auto relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl text-center">
                    <div className="mb-6 inline-flex p-4 bg-green-500/20 rounded-full">
                        <CheckCircle className="h-16 w-16 text-green-400" />
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        Application Submitted Successfully!
                    </h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        Congratulations! Your BPTPIA Entrance Test application has been received. A confirmation email has been sent to your registered email address.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 inline-block w-full max-w-sm">
                        <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2">Application Tracking ID</p>
                        <p className="text-3xl font-mono font-bold text-blue-400">
                            #BPTPIA-2024-{trackingId || 'XXXX'}
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                        <h3 className="text-white font-bold mb-4 text-center">What Happens Next?</h3>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">1</span>
                                </div>
                                <p className="text-sm">Admit card will be sent to your email 7 days before the exam</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">2</span>
                                </div>
                                <p className="text-sm">Check your email regularly for exam updates and notifications</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">3</span>
                                </div>
                                <p className="text-sm">Exam date and venue details will be communicated via email</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">4</span>
                                </div>
                                <p className="text-sm">Results will be announced after the examination</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                        <h3 className="text-white font-bold mb-4 text-center">Contact Information</h3>
                        <div className="space-y-2 text-gray-300 text-sm">
                            <p><span className="font-semibold">Phone:</span> +91-9934005543</p>
                            <p><span className="font-semibold">Email:</span> biharpvtassociation@gmail.com</p>
                            <p><span className="font-semibold">Website:</span> www.bptpia.org</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
                        >
                            <Home size={18} />
                            Go to Homepage
                        </Link>
                        <button 
                            onClick={() => window.print()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300"
                        >
                            <Download size={18} />
                            Download Confirmation
                        </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-gray-400 text-sm mb-2">
                            Need help? <Link href="/contact" className="text-blue-400 hover:underline">Contact Admissions Office</Link>
                        </p>
                        <p className="text-gray-400 text-xs">
                            This is an automated confirmation. Please save your Application ID for future reference.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function AdmissionSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 font-sans">
            <TopBar />
            <NavBar />
            
            <Suspense fallback={<div className="flex-grow flex items-center justify-center bg-gray-900 text-white">Loading...</div>}>
                <SuccessContent />
            </Suspense>

            <Footer />
        </div>
    );
}
