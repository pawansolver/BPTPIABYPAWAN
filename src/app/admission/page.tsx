'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Wrench, X, Edit2, CreditCard, User, MapPin, FileText, CheckCircle2, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewModal from './ReviewModal';

import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

type FormType = 'engineering' | 'polytechnic';

// ============================================================================
// DATA ARRAYS FOR DROPDOWNS
// ============================================================================
const genders = ["Male", "Female", "Others"];
const categories = ["GEN", "BC-1", "BC-2", "SC", "ST"];
const paymentPrefs = ["Cash / Online", "Student Loan (Credit Card)"];

// Dynamic arrays will be fetched from the backend API.

// ============================================================================
// REUSABLE TAILWIND CLASSES
// ============================================================================
const inputClass = "block w-full bg-white px-4 pt-5 pb-2 text-gray-900 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-[15px] rounded-md transition-all shadow-sm peer placeholder-transparent";
const labelClass = "absolute left-3 -top-2.5 text-[13px] text-gray-500 bg-white px-1.5 transition-all duration-200 pointer-events-none " +
    "peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:bg-transparent " +
    "peer-focus:-top-2.5 peer-focus:text-[13px] peer-focus:bg-white peer-focus:text-blue-600 z-10";

// ============================================================================
// CUSTOM SEARCHABLE DROPDOWN COMPONENT 
// ============================================================================
// LOGIC ADDED: 'isBoldOptions' prop to specifically target rendering bold text in dropdown
interface LocationOption {
    id: string | number;
    name: string;
}

const SearchableDropdown = ({
    id,
    label,
    options,
    required,
    isBoldOptions,
    onSelect,
    value,
    disabled
}: {
    id: string,
    label: string,
    options: string[] | LocationOption[],
    required?: boolean,
    isBoldOptions?: boolean,
    onSelect?: (name: string, id?: string | number) => void,
    value?: string,
    disabled?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Helper to get name from option
    const getOptionName = (opt: string | LocationOption) => typeof opt === 'string' ? opt : opt.name;
    const getOptionId = (opt: string | LocationOption) => typeof opt === 'string' ? undefined : opt.id;

    // Case-insensitive filtering
    const filteredOptions = options.filter(opt =>
        getOptionName(opt).toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`relative ${disabled ? 'opacity-60' : ''}`} ref={dropdownRef}>
            <input
                type="text"
                id={id}
                placeholder=" "
                className={`${inputClass} pr-10 ${isOpen ? 'cursor-text' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed' : ''}`}
                required={required}
                value={isOpen ? search : (value || '')}
                onChange={(e) => {
                    if (disabled) return;
                    setSearch(e.target.value);
                    if (!isOpen) setIsOpen(true);
                }}
                onClick={() => !disabled && setIsOpen(true)}
                autoComplete="off"
                disabled={disabled}
            />
            <label htmlFor={id} className={labelClass}>
                {label} {required && <span className="text-red-500 text-lg font-bold ml-1">*</span>}
            </label>

            {/* SVG Arrow Indicator */}
            <div className="absolute right-3 top-[18px] pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown Options Box */}
            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, idx) => {
                            const name = getOptionName(opt);
                            return (
                                <div
                                    key={idx}
                                    className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-[14.5px] border-b last:border-0 border-gray-100 transition-colors"
                                    onClick={() => {
                                        const optId = getOptionId(opt);
                                        if (onSelect) {
                                            onSelect(name, optId);
                                        }
                                        setSearch('');
                                        setIsOpen(false);
                                    }}
                                >
                                    {isBoldOptions && name.includes(',') ? (
                                        <>
                                            <span className="font-bold text-gray-900 block leading-tight">
                                                {name.split(',')[0]}
                                            </span>
                                            <span className="text-gray-400 text-[13px] block mt-0.5 leading-tight">
                                                {name.substring(name.indexOf(',') + 1).trim()}
                                            </span>
                                        </>
                                    ) : (
                                        <span className={isBoldOptions ? 'font-bold text-gray-900' : 'text-gray-800'}>
                                            {name}
                                        </span>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================
export default function AdmissionPage() {
    const [formType, setFormType] = useState<FormType>('polytechnic');
    const [sameAsComm, setSameAsComm] = useState(false);

    // Location States
    const [statesList, setStatesList] = useState<LocationOption[]>([]);
    const [districtsList, setDistrictsList] = useState<LocationOption[]>([]);
    const [selectedState, setSelectedState] = useState<{ id: string | number, name: string } | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<{ id: string | number, name: string } | null>(null);

    // Standard states for other dropdowns
    const [gender, setGender] = useState("");
    const [category, setCategory] = useState("");
    const [dobValue, setDobValue] = useState(() => new Date().toLocaleDateString('en-CA')); // Default to current date

    // Dynamic Master States
    const [examCentersList, setExamCentersList] = useState<LocationOption[]>([]);
    const [coursesList, setCoursesList] = useState<LocationOption[]>([]);
    const [branchesList, setBranchesList] = useState<LocationOption[]>([]);

    const [selectedCourse, setSelectedCourse] = useState<{ id: string | number, name: string } | null>(null);
    const [selectedBranch, setSelectedBranch] = useState<{ id: string | number, name: string } | null>(null);
    const [selectedExamCenter, setSelectedExamCenter] = useState<{ id: string | number, name: string } | null>(null);

    // Form Submission States
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showReview, setShowReview] = useState(false);
    const [reviewData, setReviewData] = useState<any>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    // Toast State
    const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

    // Direct PDF generation from form data
    const generateDirectPDF = async (formData: any, applicationId: string) => {
        try {
            // Build URL parameters from form data
            const params = new URLSearchParams();
            params.append('name', formData.applicantName);
            params.append('fatherName', formData.fatherName);
            params.append('motherName', formData.motherName);
            params.append('dob', formData.dob);
            params.append('aadharNo', formData.aadharNo);
            params.append('email', formData.email);
            params.append('mobile', formData.mobile);
            params.append('course', formData.courseAppliedFor);
            params.append('branch', formData.branchAppliedFor);
            params.append('courseType', formType);
            params.append('category', formData.category);
            params.append('state', formData.state);
            params.append('district', formData.district);
            params.append('gender', gender);
            params.append('tenth', formData.tenthPercentage);
            params.append('twelfth', formData.twelfthPercentage);
            params.append('communicationAddress', formData.communicationAddress);
            params.append('permanentAddress', formData.permanentAddress);
            params.append('identityDocType', formData.identityDocumentType);
            params.append('examCenter', formData.examCenterId);

            const response = await fetch(`/api/admissions/download-receipt?id=${applicationId}&${params.toString()}`);

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `BPTPIA_Receipt_${applicationId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to generate PDF');
            }
        } catch (error) {
            console.error('Error generating direct PDF:', error);
        }
    };

    const showToast = (message: string, type: 'error' | 'success' = 'error') => {
        setToast({ message, type });
        // Auto hide after 4 seconds
        setTimeout(() => setToast(null), 4000);
    };

    // File Preview States
    const [passportFileName, setPassportFileName] = useState<string | null>(null);
    const [passportPreview, setPassportPreview] = useState<string | null>(null);

    const [signatureFileName, setSignatureFileName] = useState<string | null>(null);
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null);

    const [identityFileName, setIdentityFileName] = useState<string | null>(null);
    const [identityPreview, setIdentityPreview] = useState<string | null>(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.com';

    // --------------------------------------------------------
    // Image Compressor: Resize + compress to max 500KB
    // --------------------------------------------------------
    const compressImage = (file: File, maxWidthPx = 500, qualityVal = 0.6): Promise<File> => {
        return new Promise((resolve) => {
            if (!file.type.startsWith('image/')) {
                resolve(file); // Non-images go through as-is
                return;
            }
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;
                if (width > maxWidthPx) {
                    height = Math.round((height * maxWidthPx) / width);
                    width = maxWidthPx;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    URL.revokeObjectURL(objectUrl);
                    if (blob) {
                        const compressed = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
                        resolve(compressed);
                    } else {
                        resolve(file); // fallback: use original if compression fails
                    }
                }, 'image/jpeg', qualityVal);
            };
            img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
            img.src = objectUrl;
        });
    };

    // Store compressed File objects for upload
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [signatureFile, setSignatureFile] = useState<File | null>(null);
    const [identityFile, setIdentityFile] = useState<File | null>(null);

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        setName: React.Dispatch<React.SetStateAction<string | null>>,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        const file = e.target.files?.[0];
        if (!file) { setName(null); setPreview(null); setFile(null); return; }

        // Max size check: 5MB hard limit
        if (file.size > 5 * 1024 * 1024) {
            showToast(`"${file.name}" is too large (max 5MB). Please use a smaller file.`, 'error');
            e.target.value = '';
            return;
        }

        setName(file.name);

        if (file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
            // Compress image before storing for upload
            const compressed = await compressImage(file);
            setFile(compressed);
        } else {
            setPreview(null);
            setFile(file); // PDFs go through unchanged
        }
    };


    useEffect(() => {
        fetchStates();
    }, []);

    const fetchExamCenters = async (type: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/exam-centers?type=${type.toUpperCase()}`);
            const json = await response.json();
            if (json.data) {
                const mapped = json.data.map((c: any) => ({ id: c.id, name: c.name }));
                setExamCentersList(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch exam centers:", error);
        }
    };

    const fetchCourses = async (type: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/masters/courses?type=${type.toUpperCase()}`);
            const json = await response.json();
            if (json.data) {
                const mapped = json.data.map((c: any) => ({ id: c.id, name: c.courseName }));
                setCoursesList(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    const fetchBranches = async (type: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/masters/branches?type=${type.toUpperCase()}`);
            const json = await response.json();
            if (json.data) {
                const mapped = json.data.map((b: any) => ({ id: b.id, name: b.branchName }));
                setBranchesList(mapped);
            }
        } catch (error) {
            console.error("Failed to fetch branches:", error);
        }
    };

    useEffect(() => {
        // Reset selections when form type changes
        setSelectedCourse(null);
        setSelectedBranch(null);
        setSelectedExamCenter(null);
        setBranchesList([]);
        fetchCourses(formType);
        fetchBranches(formType); // Fetch branches based on type immediately
        fetchExamCenters(formType);
    }, [formType]);

    // --- COMMENTED OUT: Course-dependent branch filtering ---
    /*
    useEffect(() => {
        if (selectedCourse?.id) {
            setSelectedBranch(null);
            fetchBranches(selectedCourse.id);
        } else {
            setBranchesList([]);
        }
    }, [selectedCourse]);
    */

    const fetchStates = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/locations/states`);
            const json = await response.json();
            if (json.success) setStatesList(json.data);
        } catch (error) {
            console.error("Failed to fetch states:", error);
        }
    };

    const fetchDistricts = async (stateId: string | number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/locations/districts/${stateId}`);
            const json = await response.json();
            if (json.success) setDistrictsList(json.data);
        } catch (error) {
            console.error("Failed to fetch districts:", error);
        }
    };

    useEffect(() => {
        if (selectedState) {
            fetchDistricts(selectedState.id);
        } else {
            setDistrictsList([]);
        }
    }, [selectedState]);



    // 1. Initial Submit - Triggers Review Modal
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('=== ADMISSION FORM SUBMISSION START ===');
        console.log('Timestamp:', new Date().toISOString());

        const form = e.currentTarget;
        const formData = new FormData(form);

        // --- COMPREHENSIVE VALIDATION ---
        const applicantName = formData.get('applicantName') as string;
        const fatherName = formData.get('fatherName') as string;
        const motherName = formData.get('motherName') as string;
        const aadharNo = formData.get('aadharNo') as string;
        const email = formData.get('email') as string;
        const mobile = formData.get('mobile') as string;
        const tenth = formData.get('tenthPercentage') as string;
        const twelfth = formData.get('twelfthPercentage') as string;
        const commAddress = formData.get('communicationAddress') as string;

        if (!applicantName?.trim()) return showToast("Please enter Applicant Name");
        if (!fatherName?.trim()) return showToast("Please enter Father's Name");
        if (!motherName?.trim()) return showToast("Please enter Mother's Name");
        if (!aadharNo?.trim() || aadharNo.length < 12) return showToast("Please enter valid 12-digit Aadhar Number");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return showToast("Please enter a valid Email Address");

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) return showToast("Please enter valid 10-digit Mobile Number");

        if (!gender) return showToast("Please select Gender");
        if (!category) return showToast("Please select Category");
        if (!selectedState) return showToast("Please select State");
        if (!selectedDistrict) return showToast("Please select District");

        const tenthVal = parseFloat(tenth);
        if (isNaN(tenthVal) || tenthVal < 0 || tenthVal > 100) return showToast("Please enter valid 10th Percentage (0-100)");

        if (twelfth && twelfth.trim()) {
            const twelfthVal = parseFloat(twelfth);
            if (isNaN(twelfthVal) || twelfthVal < 0 || twelfthVal > 100) return showToast("Please enter valid 12th/ITI Percentage (0-100)");
        }

        if (!commAddress?.trim()) return showToast("Please enter Communication Address");
        if (!selectedBranch) return showToast("Please select Branch Applied for");
        if (!selectedExamCenter) return showToast("Please select Examination Centre");

        if (!passportFile) return showToast("Please upload Passport Size Photo");
        if (!signatureFile) return showToast("Please upload Signature");

        // Prepare data for Review Modal
        const dataForReview = {
            applicantName: formData.get('applicantName'),
            fatherName: formData.get('fatherName'),
            motherName: formData.get('motherName'),
            dob: formData.get('dob'),
            aadharNo: formData.get('aadharNo'),
            email: formData.get('email'),
            mobile: formData.get('mobile'),
            gender: gender,
            category: category,
            state: selectedState?.name || '',
            district: selectedDistrict?.name || '',
            tenthPercentage: formData.get('tenthPercentage'),
            twelfthPercentage: formData.get('twelfthPercentage'),
            communicationAddress: formData.get('communicationAddress'),
            permanentAddress: sameAsComm ? formData.get('communicationAddress') : formData.get('permanentAddress'),
            courseAppliedFor: selectedCourse?.name || (formType === 'engineering' ? 'B.Tech Regular' : 'Diploma Regular'),
            branchAppliedFor: selectedBranch.name,
            examCenterId: selectedExamCenter.name, // Display name in modal
            examCenterActualId: selectedExamCenter.id, // Keep ID for backend
            identityDocumentType: formData.get('identityDocType'), // Add identity document type

            // File previews for UI
            passportPreview,
            signaturePreview,
            identityPreview
        };

        setReviewData(dataForReview);
        setShowReview(true);
    };

    // 2. Load Razorpay Script
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // 3. Final Submission (Payment + DB)
    const handleFinalSubmit = async () => {
        console.log('=== PAYMENT PROCESS START ===');
        console.log('Timestamp:', new Date().toISOString());

        setShowReview(false);
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            console.log('STEP 1: Creating Razorpay order...');
            // STEP 1: Create Razorpay Order
            const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 520, // Rs. 520 (backend will convert to paise)
                    receipt: `receipt_${Date.now()}`
                })
            });

            if (!orderRes.ok) {
                console.error('Order creation failed:', orderRes.status, orderRes.statusText);
                throw new Error('Failed to create payment order');
            }

            const orderData = await orderRes.json();
            console.log('Order created successfully:', orderData);

            // STEP 2: Initiate Razorpay Payment
            console.log('STEP 2: Initiating Razorpay payment...');
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_1234567890abcdef', // Fallback test key
                amount: orderData.data.amount,
                currency: 'INR',
                name: 'BPTPIA Admission',
                description: 'Entrance Test Application Fee',
                order_id: orderData.data.id,
                prefill: {
                    email: reviewData.email,
                    contact: reviewData.mobile,
                },
                theme: { color: "#2563eb" },
                handler: async (response: any) => {
                    try {
                        console.log('STEP 3: Payment response received:', response);
                        // STEP 1: Verify payment with backend
                        console.log('STEP 4: Verifying payment with backend...');
                        const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();
                        console.log('STEP 5: Payment verification response:', verifyData);

                        if (verifyData.success) {
                            console.log('STEP 6: Payment verified, proceeding with admission finalization...');
                            // Payment verified -> Final DB Submission
                            await finalizeAdmission(response);
                        } else {
                            console.error('Payment verification failed:', verifyData);
                            setSubmitMessage({ type: 'error', text: 'Payment verification failed' });
                            setIsSubmitting(false);
                        }
                    } catch (error) {
                        console.error("Payment Verification Error:", error);
                        setSubmitMessage({ type: 'error', text: 'Payment verification failed' });
                        setIsSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: () => {
                        console.log('Payment cancelled by user');
                        setIsSubmitting(false);
                        showToast("Payment cancelled. Verification is mandatory for submission.", 'error');
                    }
                }
            };

            const rzp = (window as any).Razorpay(options);
            rzp.open();

        } catch (error: any) {
            console.error("Payment Process Error:", error);
            setSubmitMessage({ type: 'error', text: error.message || "Payment initiation failed" });
            setIsSubmitting(false);
        }
    };

    // 4. Final DB Registration
    const finalizeAdmission = async (paymentResponse: any) => {
        console.log('=== FINAL ADMISSION SUBMISSION START ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Payment response:', paymentResponse);

        if (!formRef.current) {
            console.error('Form reference is null');
            return;
        }

        const formData = new FormData(formRef.current);
        console.log('Form data prepared for submission');

        // Files
        if (passportFile) formData.set('passportPhoto', passportFile, passportFile.name);
        if (signatureFile) formData.set('signature', signatureFile, signatureFile.name);
        if (identityFile) formData.set('identityDoc', identityFile, identityFile.name);

        // Required IDs and Overrides
        formData.append('courseAppliedFor', reviewData.courseAppliedFor);
        formData.append('branchAppliedFor', reviewData.branchAppliedFor);
        formData.append('examCenterId', String(selectedExamCenter?.id));
        formData.append('gender', gender);
        formData.append('category', category);
        formData.append('state', selectedState?.name || '');
        formData.append('district', selectedDistrict?.name || '');

        if (sameAsComm) {
            formData.append('permanentAddress', String(formData.get('communicationAddress')));
        }

        // Add Payment Info
        formData.append('razorpayOrderId', paymentResponse.razorpay_order_id);
        formData.append('razorpayPaymentId', paymentResponse.razorpay_payment_id);
        formData.append('transactionId', paymentResponse.razorpay_payment_id);

        try {
            console.log('STEP 7: Submitting admission application to API...');
            const response = await fetch(`${API_BASE_URL}/api/admissions/apply`, {
                method: 'POST',
                body: formData,
            });

            console.log('STEP 8: API response received:', response.status, response.statusText);
            const json = await response.json();
            console.log('STEP 9: API response data:', json);

            if (json.success) {
                console.log('STEP 10: Admission successful! Application ID:', json.applicationId);
                // Success! Data is saved to DB, redirect with only applicationId
                const applicationId = json.applicationId;

                console.log('STEP 11: Redirecting to success page with ID:', applicationId);
                // Clean redirect with only applicationId (no PII in URL)
                router.push(`/admission/success?id=${applicationId}`);
            } else {
                console.error('STEP 10: Admission submission failed:', json);
                setSubmitMessage({ type: 'error', text: json.error || "Form submission failed" });
            }
        } catch (error) {
            console.error("Final Submit Error:", error);
            setSubmitMessage({ type: 'error', text: "Internal server error during final submission" });
        } finally {
            setIsSubmitting(false);
            console.log('=== FINAL ADMISSION SUBMISSION END ===');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <TopBar />
            <NavBar />

            <main
                className="flex-grow py-16 px-4 relative bg-cover bg-center bg-no-repeat bg-fixed"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')` }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                <div className="max-w-[1100px] mx-auto relative z-10">

                    {/* ========================================= */}
                    {/* FORM UI */}
                    {/* ========================================= */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-8 md:px-10 md:py-10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <h2 className="text-3xl md:text-[34px] font-medium text-white text-center mb-10 tracking-wide drop-shadow-md">
                            Application For Entrance Test                        </h2>

                        <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>

                            {/* --- ROW 0: Course Type Selection --- */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-white text-[15px] font-medium">
                                        Select Course Type <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                    </label>
                                    <select
                                        id="courseType"
                                        name="courseType"
                                        value={formType}
                                        onChange={(e) => setFormType(e.target.value as FormType)}
                                        className="block w-full bg-white px-4 pt-5 pb-2 text-gray-900 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-[15px] rounded-md transition-all shadow-sm"
                                        required
                                    >
                                        <option value="">Select Course Type</option>
                                        <option value="engineering">Engineering (B.Tech)</option>
                                        <option value="polytechnic">Polytechnic (Diploma)</option>
                                    </select>
                                </div>
                            </div>

                            {/* --- ROW 1: Names --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <input type="text" id="appName" name="applicantName" placeholder=" " onInput={(e) => e.currentTarget.value = e.currentTarget.value.toUpperCase()} className={inputClass} required />
                                    <label htmlFor="appName" className={labelClass}>Applicant Name <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                                <div className="relative">
                                    <input type="text" id="fName" name="fatherName" placeholder=" " onInput={(e) => e.currentTarget.value = e.currentTarget.value.toUpperCase()} className={inputClass} required />
                                    <label htmlFor="fName" className={labelClass}>Father's Name <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                                <div className="relative">
                                    <input type="text" id="mName" name="motherName" placeholder=" " onInput={(e) => e.currentTarget.value = e.currentTarget.value.toUpperCase()} className={inputClass} required />
                                    <label htmlFor="mName" className={labelClass}>Mother's Name <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                            </div>

                            {/* --- ROW 2: ID & Contact --- */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <input type="text" id="dob" name="dob" placeholder=" " onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)} className={inputClass} required />
                                    <label htmlFor="dob" className={labelClass}>Date of Birth <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                                <div className="relative">
                                    <input type="text" id="aadhar" name="aadharNo" placeholder=" " maxLength={14} className={inputClass} required />
                                    <label htmlFor="aadhar" className={labelClass}>Aadhar Number <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                                <div className="relative">
                                    <input type="email" id="email" name="email" placeholder=" " className={inputClass} required />
                                    <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                            </div> */}


                            {/* --- ROW 2: ID & Contact --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative min-w-0">
                                    <input
                                        type="text"
                                        id="dob"
                                        name="dob"
                                        placeholder=" "
                                        max={new Date().toLocaleDateString('en-CA')}
                                        min="1900-01-01"
                                        onFocus={(e) => (e.target.type = "date")}
                                        onBlur={(e) => {
                                            if (!e.target.value) e.target.type = "text";
                                        }}
                                        className={`${inputClass} min-w-0 w-full appearance-none`}
                                        required
                                    />
                                    <label htmlFor="dob" className={labelClass}>
                                        Date of Birth <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                    </label>
                                </div>
                                <div className="relative">
                                    <input type="text" id="aadhar" name="aadharNo" placeholder=" " maxLength={14} className={inputClass} required />
                                    <label htmlFor="aadhar" className={labelClass}>Aadhar Number <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                                <div className="relative">
                                    <input type="email" id="email" name="email" placeholder=" " className={inputClass} required />
                                    <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                            </div>

                            {/* --- ROW 3: Phone & Demographics --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative flex bg-white rounded-md border border-gray-300 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all shadow-sm">
                                    <div className="bg-gray-50 px-3 py-3 border-r border-gray-300 text-gray-700 text-[15px] rounded-l-md flex items-center justify-center">
                                        +91
                                    </div>
                                    <div className="relative flex-1">
                                        <input type="tel" id="mobile" name="mobile" placeholder=" " maxLength={10} className="block w-full bg-transparent px-4 pt-5 pb-2 text-gray-900 border-none outline-none text-[15px] peer placeholder-transparent" required />
                                        <label htmlFor="mobile" className="absolute left-3 -top-2.5 text-[13px] text-gray-500 bg-white px-1.5 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-[13px] peer-focus:bg-white peer-focus:text-blue-600 z-10">
                                            Mobile Number <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                        </label>
                                    </div>
                                </div>

                                <SearchableDropdown
                                    id="gender"
                                    label="Select Gender"
                                    options={genders}
                                    required={true}
                                    value={gender}
                                    onSelect={(name) => setGender(name)}
                                />
                                <SearchableDropdown
                                    id="category"
                                    label="Select Category"
                                    options={categories}
                                    required={true}
                                    value={category}
                                    onSelect={(name) => setCategory(name)}
                                />
                            </div>

                            {/* --- ROW 3.5: Location (State & District) --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SearchableDropdown
                                    id="state"
                                    label="Select State"
                                    options={statesList}
                                    required={true}
                                    value={selectedState?.name || ""}
                                    onSelect={(name, id) => {
                                        setSelectedState(id ? { id, name } : null);
                                        setSelectedDistrict(null);
                                    }}
                                />
                                <SearchableDropdown
                                    id="district"
                                    label="Select District"
                                    options={districtsList}
                                    required={true}
                                    value={selectedDistrict?.name || ""}
                                    disabled={!selectedState}
                                    onSelect={(name, id) => {
                                        setSelectedDistrict(id ? { id, name } : null);
                                    }}
                                />
                            </div>

                            {/* --- ROW 4: Academics --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input type="number" id="matric" name="tenthPercentage" step="0.01" placeholder=" " className={inputClass} required />
                                    <label htmlFor="matric" className={labelClass}>10th / Matric Percentage <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>
                                <div className="relative">
                                    <input type="number" id="inter" name="twelfthPercentage" step="0.01" placeholder=" " className={inputClass} />
                                    <label htmlFor="inter" className={labelClass}>12th / ITI Percentage (Optional)</label>
                                </div>
                            </div>

                            {/* --- ROW 5: Addresses --- */}
                            <div className="space-y-4 pt-2">
                                <div className="relative">
                                    <textarea id="commAddr" name="communicationAddress" rows={2} placeholder=" " onInput={(e) => e.currentTarget.value = e.currentTarget.value.toUpperCase()} className={`${inputClass} resize-none`} required></textarea>
                                    <label htmlFor="commAddr" className={labelClass}>Address for Communication with Pincode <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                </div>

                                <div className="flex items-center gap-2 pl-1 my-2">
                                    <input type="checkbox" id="sameAddress" className="w-4 h-4 rounded-md border-0 outline-none cursor-pointer accent-[#00aaff]" onChange={(e) => setSameAsComm(e.target.checked)} />
                                    <label htmlFor="sameAddress" className="text-gray-100 text-[13px] font-medium cursor-pointer select-none hover:text-white transition-colors">
                                        Permanent address is same as above
                                    </label>
                                </div>

                                {!sameAsComm && (
                                    <div className="relative">
                                        <textarea id="permAddr" name="permanentAddress" rows={2} placeholder=" " onInput={(e) => e.currentTarget.value = e.currentTarget.value.toUpperCase()} className={`${inputClass} resize-none`} required></textarea>
                                        <label htmlFor="permAddr" className={labelClass}>Permanent Address with Pincode <span className="text-red-500 text-lg font-bold ml-1">*</span></label>
                                    </div>
                                )}
                            </div>

                            {/* --- ROW 6: Dynamic Course Details --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                {/* 
                                <SearchableDropdown
                                    id="courseApplied"
                                    label="Course Applied for"
                                    options={coursesList}
                                    required={true}
                                    value={selectedCourse?.name || ""}
                                    onSelect={(name, id) => setSelectedCourse(id ? { id, name } : null)}
                                /> 
                                */}

                                <SearchableDropdown
                                    id="branchApplied"
                                    label="Branch Applied for"
                                    options={branchesList}
                                    required={true}
                                    value={selectedBranch?.name || ""}
                                    disabled={!formType}
                                    onSelect={(name, id) => setSelectedBranch(id ? { id, name } : null)}
                                />

                                {/* PASSING isBoldOptions to make only Exam Centers bold */}
                                <SearchableDropdown
                                    id="examCenter"
                                    label="Choice of Examination Centre"
                                    options={examCentersList}
                                    required={true}
                                    isBoldOptions={true}
                                    value={selectedExamCenter?.name || ""}
                                    onSelect={(name, id) => setSelectedExamCenter(id ? { id, name } : null)}
                                />
                            </div>

                            {/* --- ROW 6.5: Photo & Signature Upload --- */}
                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h3 className="text-white text-lg font-medium">Photo & Signature Upload</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Passport Size Photo */}
                                    <div className="space-y-2">
                                        <label className="block text-white text-[15px] font-medium">
                                            Passport Size Photo <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                        </label>
                                        <p className="text-gray-300 text-[13px]">Upload a recent passport size photograph (Max 100KB, JPG/PNG)</p>
                                        <div className={`border-2 border-dashed ${passportFileName ? 'border-green-400 bg-green-400/5' : 'border-gray-400 bg-white/5'} rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer relative overflow-hidden`}>
                                            {passportFileName && (
                                                <button
                                                    title="Remove File"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setPassportFileName(null);
                                                        setPassportPreview(null);
                                                        setPassportFile(null);
                                                        const el = document.getElementById('passportPhoto') as HTMLInputElement;
                                                        if (el) el.value = '';
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors z-10"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                            <input
                                                type="file"
                                                id="passportPhoto"
                                                name="passportPhoto"
                                                accept="image/jpeg,image/png"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, setPassportFileName, setPassportPreview, setPassportFile)}
                                                required
                                            />
                                            <label htmlFor="passportPhoto" className="cursor-pointer block w-full h-full">
                                                {passportPreview ? (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <img src={passportPreview} alt="Passport" className="h-16 w-16 object-cover mb-2 rounded shadow-md border border-white/50" />
                                                        <span className="text-green-400 text-[13px] font-medium truncate w-full px-2">{passportFileName}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        <span className="text-gray-300 text-[14px]">Upload Photo</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Signature */}
                                    <div className="space-y-2">
                                        <label className="block text-white text-[15px] font-medium">
                                            Signature <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                        </label>
                                        <p className="text-gray-300 text-[13px]">Upload your signature on white paper (Max 50KB, JPG/PNG)</p>
                                        <div className={`border-2 border-dashed ${signatureFileName ? 'border-green-400 bg-green-400/5' : 'border-gray-400 bg-white/5'} rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer relative overflow-hidden`}>
                                            {signatureFileName && (
                                                <button
                                                    title="Remove File"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setSignatureFileName(null);
                                                        setSignaturePreview(null);
                                                        setSignatureFile(null);
                                                        const el = document.getElementById('signature') as HTMLInputElement;
                                                        if (el) el.value = '';
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors z-10"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                            <input
                                                type="file"
                                                id="signature"
                                                name="signature"
                                                accept="image/jpeg,image/png"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, setSignatureFileName, setSignaturePreview, setSignatureFile)}
                                                required
                                            />
                                            <label htmlFor="signature" className="cursor-pointer block w-full h-full">
                                                {signaturePreview ? (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <img src={signaturePreview} alt="Signature" className="h-16 w-auto object-contain mb-2 rounded shadow-md border border-white/50 bg-white/90" />
                                                        <span className="text-green-400 text-[13px] font-medium truncate w-full px-2">{signatureFileName}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        <span className="text-gray-300 text-[14px]">Upload Signature</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- ROW 6.8: Photo Identity Document --- */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                    <h3 className="text-white text-lg font-medium">Photo Identity Document</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Identity Document Type */}
                                    <div className="space-y-2">
                                        <label className="block text-white text-[15px] font-medium">
                                            Identity Document Type <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                        </label>
                                        <select
                                            id="identityDocType"
                                            name="identityDocType"
                                            className="block w-full bg-white px-4 pt-5 pb-2 text-gray-900 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-[15px] rounded-md transition-all shadow-sm"
                                            required
                                        >
                                            <option value="">Select Document Type</option>
                                            <option value="aadhaar">Aadhaar Card</option>
                                            <option value="pan">PAN Card</option>
                                            <option value="voter">Voter ID Card</option>
                                            <option value="passport">Passport</option>
                                            <option value="driving">Driving License</option>
                                            <option value="ration">Ration Card</option>
                                        </select>
                                    </div>

                                    {/* Upload Identity Document */}
                                    <div className="space-y-2">
                                        <label className="block text-white text-[15px] font-medium">
                                            Upload Identity Document <span className="text-red-500 text-lg font-bold ml-1">*</span>
                                        </label>
                                        <p className="text-gray-300 text-[13px]">Upload clear scan/photo of your ID (Max 1MB, JPG/PNG/PDF)</p>
                                        <div className={`border-2 border-dashed ${identityFileName ? 'border-green-400 bg-green-400/5' : 'border-gray-400 bg-white/5'} rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer relative overflow-hidden`}>
                                            {identityFileName && (
                                                <button
                                                    title="Remove File"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setIdentityFileName(null);
                                                        setIdentityPreview(null);
                                                        setIdentityFile(null);
                                                        const el = document.getElementById('identityDoc') as HTMLInputElement;
                                                        if (el) el.value = '';
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors z-10"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                            <input
                                                type="file"
                                                id="identityDoc"
                                                name="identityDoc"
                                                accept="image/jpeg,image/png,application/pdf"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e, setIdentityFileName, setIdentityPreview, setIdentityFile)}
                                                required
                                            />
                                            <label htmlFor="identityDoc" className="cursor-pointer block w-full h-full">
                                                {identityPreview ? (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <img src={identityPreview} alt="ID Document" className="h-16 w-auto object-contain mb-2 rounded shadow-md border border-white/50" />
                                                        <span className="text-green-400 text-[13px] font-medium truncate w-full px-2">{identityFileName}</span>
                                                    </div>
                                                ) : identityFileName ? (
                                                    <div className="flex flex-col items-center justify-center h-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-green-400 text-[13px] font-medium truncate w-full px-2">{identityFileName}</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        <span className="text-gray-300 text-[14px]">Upload Identity Document</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- ROW 8: Application Fee & Payment Section --- */}
                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <h3 className="text-white text-lg font-medium">Application Fee & Submission</h3>
                                </div>

                                {/* Payment Card - Matching Form Style */}
                                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 md:p-5">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            {/* Rupee Icon */}
                                            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white text-lg font-bold">Application Fee: ₹520</p>
                                                <p className="text-amber-300 text-sm">Payment required before submission</p>
                                            </div>
                                        </div>

                                        {/* Pay Now Button */}
                                        <button
                                            type="button"
                                            onClick={async (e) => {
                                                e.preventDefault();

                                                // Validate form first
                                                const form = formRef.current;
                                                if (!form) return;

                                                const formData = new FormData(form);

                                                // Basic validation
                                                const applicantName = formData.get('applicantName') as string;
                                                const fatherName = formData.get('fatherName') as string;
                                                const motherName = formData.get('motherName') as string;
                                                const aadharNo = formData.get('aadharNo') as string;
                                                const email = formData.get('email') as string;
                                                const mobile = formData.get('mobile') as string;
                                                const tenth = formData.get('tenthPercentage') as string;
                                                const commAddress = formData.get('communicationAddress') as string;

                                                if (!applicantName?.trim()) return showToast("Please enter Applicant Name");
                                                if (!fatherName?.trim()) return showToast("Please enter Father's Name");
                                                if (!motherName?.trim()) return showToast("Please enter Mother's Name");
                                                if (!aadharNo?.trim() || aadharNo.length < 12) return showToast("Please enter valid 12-digit Aadhar Number");

                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                if (!emailRegex.test(email)) return showToast("Please enter a valid Email Address");

                                                const mobileRegex = /^\d{10}$/;
                                                if (!mobileRegex.test(mobile)) return showToast("Please enter valid 10-digit Mobile Number");

                                                if (!gender) return showToast("Please select Gender");
                                                if (!category) return showToast("Please select Category");
                                                if (!selectedState) return showToast("Please select State");
                                                if (!selectedDistrict) return showToast("Please select District");

                                                const tenthVal = parseFloat(tenth);
                                                if (isNaN(tenthVal) || tenthVal < 0 || tenthVal > 100) return showToast("Please enter valid 10th Percentage (0-100)");

                                                if (!commAddress?.trim()) return showToast("Please enter Communication Address");
                                                if (!selectedBranch) return showToast("Please select Branch Applied for");
                                                if (!selectedExamCenter) return showToast("Please select Examination Centre");

                                                if (!passportFile) return showToast("Please upload Passport Size Photo");
                                                if (!signatureFile) return showToast("Please upload Signature");

                                                // Prepare data for Review Modal
                                                console.log('Preparing review data...');
                                                const dataForReview = {
                                                    applicantName: formData.get('applicantName'),
                                                    fatherName: formData.get('fatherName'),
                                                    motherName: formData.get('motherName'),
                                                    dob: formData.get('dob'),
                                                    aadharNo: formData.get('aadharNo'),
                                                    email: formData.get('email'),
                                                    mobile: formData.get('mobile'),
                                                    gender: gender,
                                                    category: category,
                                                    state: selectedState?.name || '',
                                                    district: selectedDistrict?.name || '',
                                                    tenthPercentage: formData.get('tenthPercentage'),
                                                    twelfthPercentage: formData.get('twelfthPercentage'),
                                                    communicationAddress: formData.get('communicationAddress'),
                                                    permanentAddress: sameAsComm ? formData.get('communicationAddress') : formData.get('permanentAddress'),
                                                    courseAppliedFor: selectedCourse?.name || (formType === 'engineering' ? 'B.Tech Regular' : 'Diploma Regular'),
                                                    branchAppliedFor: selectedBranch.name,
                                                    examCenterId: selectedExamCenter.name,
                                                    examCenterActualId: selectedExamCenter.id,
                                                    identityDocumentType: formData.get('identityDocType'), // Add identity document type

                                                    // File previews for UI
                                                    passportPreview,
                                                    signaturePreview,
                                                    identityPreview
                                                };

                                                console.log('Review data prepared:', {
                                                    applicantName: dataForReview.applicantName,
                                                    email: dataForReview.email,
                                                    mobile: dataForReview.mobile,
                                                    course: dataForReview.courseAppliedFor,
                                                    branch: dataForReview.branchAppliedFor,
                                                    examCenter: dataForReview.examCenterId
                                                });

                                                setReviewData(dataForReview);
                                                setShowReview(true);
                                                console.log('=== ADMISSION FORM SUBMISSION END ===');
                                            }}
                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-[15px] transition-all duration-300 shadow-md hover:shadow-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Pay Now
                                        </button>
                                    </div>
                                </div>

                                {/* OTP Verification Message */}
                                <p className="text-center text-gray-400 text-sm">
                                    Please verify your email address with OTP first to proceed with payment
                                </p>
                            </div>

                            {/* --- ROW 9: Agreement & Submit --- */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mt-4">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-2 pl-1">
                                        <input type="checkbox" id="agree" className="mt-1 w-4 h-4 rounded-md border-0 outline-none cursor-pointer accent-[#00aaff]" required />
                                        <label htmlFor="agree" className="text-gray-100 text-[13px] font-medium cursor-pointer leading-snug select-none">
                                            I agree to receive info regarding my enquiry and confirm all details are correct.
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#dc2626] disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-black text-white px-4 py-4 font-bold text-[15px] transition-all duration-300 rounded-lg cursor-pointer tracking-wide uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    {isSubmitting ? 'Processing...' : 'Review Application'}
                                </button>
                            </div>

                            {submitMessage && (
                                <div className={`mt-4 p-4 rounded-lg font-bold text-center ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
                                    {submitMessage.text}
                                </div>
                            )}

                        </form>
                    </div>

                </div>
            </main>

            <Footer />

            {/* ========================================= */}
            {/* TOAST NOTIFICATION COMPONENT */}
            {/* ========================================= */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] border border-gray-100 min-w-[320px] max-w-[450px]"
                    >
                        <div className={`p-2 rounded-xl ${toast.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                            {toast.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-900 font-bold text-sm leading-tight">
                                {toast.type === 'error' ? 'Required Action' : 'Success'}
                            </p>
                            <p className="text-gray-500 text-[13px] mt-0.5 leading-snug">
                                {toast.message}
                            </p>
                        </div>
                        <button
                            onClick={() => setToast(null)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReviewModal
                isOpen={showReview}
                onClose={() => setShowReview(false)}
                data={reviewData}
                onConfirm={handleFinalSubmit}
            />
        </div>
    );
}
