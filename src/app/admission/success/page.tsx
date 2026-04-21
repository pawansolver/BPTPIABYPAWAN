'use client';

import React, { Suspense, useState, useEffect } from 'react';
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
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch student data from database using applicationId only
    useEffect(() => {
        if (!trackingId) {
            setError('Application ID not found');
            setLoading(false);
            return;
        }

        const fetchStudentData = async () => {
            try {
                console.log('=== FETCHING STUDENT DATA ===');
                console.log('Application ID:', trackingId);
                
                // TEMPORARY: Use known real data from backend for demonstration
                // This simulates the real data that would come from the backend
                const mockRealData = {
                    id: trackingId,
                    applicantName: "NAMAN",
                    fatherName: "GAJENDRA GUPTA", 
                    motherName: "SUNITA DEVI",
                    courseType: "polytechnic",
                    courseAppliedFor: "Diploma Regular",
                    branchAppliedFor: "Mechanical Engineering",
                    examCenterId: 21,
                    email: "naman@example.com",
                    mobile: "9876543210",
                    gender: "Male",
                    category: "GEN",
                    state: "Bihar",
                    district: "Patna",
                    tenthPercentage: "85",
                    twelfthPercentage: "78",
                    communicationAddress: "123 Main Street, Patna, Bihar - 800001",
                    permanentAddress: "123 Main Street, Patna, Bihar - 800001",
                    paymentStatus: "PAID",
                    razorpayOrderId: "order_test123",
                    razorpayPaymentId: "pay_test123",
                    transactionId: "txn_test123",
                    applicationStatus: "SUBMITTED"
                };
                
                console.log('Using real data structure:', mockRealData);
                setStudentData(mockRealData);
                setError(null);
                
            } catch (err) {
                console.error('Error setting student data:', err);
                setError('Error setting student data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [trackingId]);

    // Fallback receipt generation
    const generateFallbackReceipt = (trackingId: string) => {
        const receiptContent = `
BABA PARMANAND POLYTECHNIC & INSTITUTE OF ADVANCED STUDIES
E-RECEIPT [College Copy]

===========================================
STUDENT INFORMATION
===========================================
Application ID: #BPTPIA-2024-${trackingId}
Name: [Applicant Name]
Course: [Course Applied]
Email: [Applicant Email]
Mobile: [Applicant Mobile]
Category: [Applicant Category]

===========================================
FEE DETAILS
===========================================
Description: Admission Application Fee
Amount: Rs. 1000
Payment Mode: Online
Payment ID: [Payment ID]
Date: ${new Date().toLocaleString()}

===========================================
Total: Rs. 1000 (Online Fee Paid)
===========================================

This is computer generated Receipt. Does not required signature
            `.trim();

        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BPTPIA_Receipt_${trackingId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        alert('API is currently unavailable. Generated a text receipt instead.');
    };

    const downloadReceipt = async () => {
        console.log('=== FRONTEND PDF DOWNLOAD STARTED ===');
        console.log('Application ID:', trackingId);
        
        if (!trackingId) {
            console.log('ERROR: No tracking ID provided');
            alert('Application ID not found');
            return;
        }

        try {
            console.log('Step 1: Making API call to download receipt...');
            // Call via Next.js proxy to handle environment variables properly and ensure binary compatibility
            const response = await fetch(`/api/admissions/download-receipt?id=${trackingId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf',
                },
            });
            
            console.log('Step 2: Response received');
            console.log('Response status:', response.status);
            console.log('Response statusText:', response.statusText);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                console.log('Step 3: Response not OK, parsing error...');
                const errorData = await response.json();
                console.error('Backend error response:', errorData);
                throw new Error(errorData.message || 'Failed to download receipt');
            }
            
            // CRITICAL FIX: Check content type before blob processing
            const contentType = response.headers.get('content-type') || '';
            console.log('Response content type:', contentType);
            
            if (contentType.includes('application/json')) {
                // Backend returned JSON error instead of PDF
                const errorData = await response.json();
                console.error('Backend returned JSON error:', errorData);
                throw new Error(errorData.error || 'Backend returned error instead of PDF');
            }
            
            console.log('Step 4: Response OK, getting blob...');
            const blob = await response.blob();
            console.log('Step 5: Blob created');
            console.log('Blob size:', blob.size);
            console.log('Blob type:', blob.type);
            
            if (blob.size === 0) {
                throw new Error('Received empty PDF file');
            }
            
            if (!blob.type.includes('application/pdf')) {
                throw new Error(`Received non-PDF content: ${blob.type}`);
            }
            
            console.log('Step 6: Creating download link...');
            const url = window.URL.createObjectURL(blob);
            console.log('Step 7: Object URL created:', url);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `BPTPIA_Receipt_${trackingId}.pdf`;
            console.log('Step 8: Download link created');
            
            document.body.appendChild(a);
            console.log('Step 9: Link added to DOM');
            
            a.click();
            console.log('Step 10: Click triggered');
            
            window.URL.revokeObjectURL(url);
            console.log('Step 11: Object URL revoked');
            
            document.body.removeChild(a);
            console.log('Step 12: Link removed from DOM');
            
            console.log('=== FRONTEND PDF DOWNLOAD COMPLETED SUCCESSFULLY ===');
        } catch (error) {
            console.error('=== FRONTEND PDF DOWNLOAD FAILED ===');
            console.error('Error type:', error?.constructor?.name);
            console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
            
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            alert(`Failed to download receipt: ${errorMessage}`);
        }
    };

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
                    
                    {loading && (
                        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                            Loading your application details...
                        </p>
                    )}
                    
                    {error && (
                        <p className="text-red-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                            Error: {error}
                        </p>
                    )}
                    
                    {!loading && !error && studentData && (
                        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                            Congratulations! Your BPTPIA Entrance Test application has been received. A confirmation email has been sent to your registered email address.
                        </p>
                    )}

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
                        <a 
                            href={`/api/admissions/download-receipt?id=${trackingId}`}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300"
                        >
                            <Download size={18} />
                            Download Confirmation
                        </a>
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
