'use client';

import React, { useState } from 'react';
import { Search, FileText, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

// Type definition for search result
interface SearchResult {
    id: number;
    applicantName: string;
    email: string;
    mobile: string;
    fatherName: string;
    courseAppliedFor: string;
    branchAppliedFor: string;
    examCenterId: string;
    paymentStatus: string;
    applicationStatus: string;
    razorpayPaymentId?: string;
    createdAt: string;
    updatedAt: string;
}

export default function TrackingPage() {
    const [applicationId, setApplicationId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!applicationId.trim() || !phoneNumber.trim()) {
            setError('Please enter both Application ID and Phone Number');
            return;
        }

        setIsLoading(true);
        setError('');
        setSearched(true);

        try {
            // Extract numeric ID from Application ID (e.g., BPTPIA-2024-123 -> 123)
            const numericId = applicationId.replace(/[^0-9]/g, '');
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admissions/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    applicationId: numericId,
                    phoneNumber: phoneNumber
                })
            });

            const data = await response.json();

            if (data.success) {
                setSearchResult(data.data);
            } else {
                setError(data.message || 'Application not found');
                setSearchResult(null);
            }
        } catch (error) {
            setError('Failed to fetch application details. Please try again.');
            setSearchResult(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PAID':
            case 'SUBMITTED':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'PENDING':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'FAILED':
            case 'REJECTED':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PAID':
            case 'SUBMITTED':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'FAILED':
            case 'REJECTED':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <TopBar />
            <NavBar />

            <main className="flex-grow py-16 px-4 relative bg-cover bg-center bg-no-repeat bg-fixed"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')` }}>
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl">
                        
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-white mb-4">Application Tracking</h1>
                            <p className="text-gray-300 text-lg">
                                Track your BPTPIA application status and download documents
                            </p>
                        </div>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Application ID
                                    </label>
                                    <input
                                        type="text"
                                        value={applicationId}
                                        onChange={(e) => setApplicationId(e.target.value)}
                                        placeholder="e.g., BPTPIA-2024-123 or just 123"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="10-digit mobile number"
                                        maxLength={10}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Search size={20} />
                                {isLoading ? 'Searching...' : 'Track Application'}
                            </button>
                        </form>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        {/* Search Results */}
                        {searchResult && (
                            <div className="space-y-6">
                                {/* Application Status Card */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h2 className="text-2xl font-bold text-white mb-4">Application Status</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                                            <div className="space-y-2 text-gray-300">
                                                <p><span className="font-medium">Name:</span> {searchResult.applicantName}</p>
                                                <p><span className="font-medium">Email:</span> {searchResult.email}</p>
                                                <p><span className="font-medium">Mobile:</span> {searchResult.mobile}</p>
                                                <p><span className="font-medium">Father's Name:</span> {searchResult.fatherName}</p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-3">Application Details</h3>
                                            <div className="space-y-2 text-gray-300">
                                                <p><span className="font-medium">Application ID:</span> #BPTPIA-2024-{searchResult.id}</p>
                                                <p><span className="font-medium">Course:</span> {searchResult.courseAppliedFor}</p>
                                                <p><span className="font-medium">Branch:</span> {searchResult.branchAppliedFor}</p>
                                                <p><span className="font-medium">Exam Center:</span> {searchResult.examCenterId}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Badges */}
                                    <div className="flex flex-wrap gap-4 mt-6">
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(searchResult.paymentStatus)}`}>
                                            {getStatusIcon(searchResult.paymentStatus)}
                                            <span className="font-medium">
                                                Payment: {searchResult.paymentStatus}
                                            </span>
                                        </div>
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(searchResult.applicationStatus)}`}>
                                            {getStatusIcon(searchResult.applicationStatus)}
                                            <span className="font-medium">
                                                Status: {searchResult.applicationStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Documents Section */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Documents</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-8 h-8 text-blue-400" />
                                                <div>
                                                    <p className="text-white font-medium">Admission Receipt</p>
                                                    <p className="text-gray-400 text-sm">Official payment receipt</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/pdfs/admission_receipt_${searchResult.id}.pdf`, '_blank')}
                                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                            >
                                                <Download size={20} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-8 h-8 text-green-400" />
                                                <div>
                                                    <p className="text-white font-medium">Application Summary</p>
                                                    <p className="text-gray-400 text-sm">Complete application details</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/pdfs/application_summary_${searchResult.id}.pdf`, '_blank')}
                                                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                            >
                                                <Download size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Application Timeline</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Application Submitted</p>
                                                <p className="text-gray-400 text-sm">
                                                    {new Date(searchResult.createdAt).toLocaleDateString()} at {new Date(searchResult.createdAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        {searchResult.paymentStatus === 'PAID' && (
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">Payment Completed</p>
                                                    <p className="text-gray-400 text-sm">Transaction ID: {searchResult.razorpayPaymentId}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <Clock className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Under Review</p>
                                                <p className="text-gray-400 text-sm">Your application is being processed</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                <Clock className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Admit Card Generation</p>
                                                <p className="text-gray-400 text-sm">Will be sent 7 days before exam</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {searched && !searchResult && !error && (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-300 text-lg">No application found with the provided details</p>
                                <p className="text-gray-400 text-sm mt-2">
                                    Please check your Application ID and Phone Number
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
