'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, Home, ArrowRight } from 'lucide-react';
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

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
                        Application Submitted!
                    </h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        Your application for entrance test has been received successfully. We have sent a confirmation email to your registered address.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 inline-block w-full max-w-sm">
                        <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2">Tracking ID</p>
                        <p className="text-3xl font-mono font-bold text-blue-400">
                            #{trackingId || 'BPTPIA-2024-XXXX'}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
                        >
                            <Home size={18} />
                            Go Home
                        </Link>
                        <button 
                            onClick={() => window.print()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300"
                        >
                            <Download size={18} />
                            Download Receipt
                        </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-gray-400 text-sm">
                            Need help? <Link href="/contact" className="text-blue-400 hover:underline">Contact Admissions Office</Link>
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
