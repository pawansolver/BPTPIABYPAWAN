'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Users, Gavel, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

// Global Components
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

export default function TermsOfServicePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <>
      <TopBar />
      <NavBar />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                By using our admission services, you agree to these terms and conditions.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {new Date().toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </motion.div>

            {/* Agreement */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Gavel className="w-6 h-6 text-blue-600" />
                Agreement to Terms
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  By accessing and using Bihar Private Technical & Professional Institutions Association (BPTPIA) admission services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
                <p>
                  These terms apply to all users of the BPTPIA admission portal, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                </p>
              </div>
            </motion.div>

            {/* Eligibility */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                Eligibility Criteria
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>To use our admission services, you must:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Be at least 17 years of age or have parental consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Have completed 10+2 or equivalent examination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Meet the minimum eligibility criteria for the applied course</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Have a valid email address and phone number</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Application Process */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
              <div className="space-y-4 text-gray-700">
                <p>The admission process involves the following steps:</p>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <strong>Registration:</strong> Create an account and fill out the application form
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <strong>Document Upload:</strong> Upload required documents and photographs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <strong>Payment:</strong> Pay the application fee of Rs. 515
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <strong>Confirmation:</strong> Receive application confirmation and further instructions
                    </div>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>As a user of our services, you agree to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Provide accurate, current, and complete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Maintain and update your information regularly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Use the services for lawful purposes only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Not share your login credentials with others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Comply with all applicable laws and regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Respect the rights of other users and BPTPIA</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Prohibited Activities */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Prohibited Activities
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>You agree not to engage in any of the following prohibited activities:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">·</span>
                    <span>Submitting false or misleading information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">·</span>
                    <span>Using fake documents or forged certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">·</span>
                    <span>Attempting to gain unauthorized access to our systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">·</span>
                    <span>Interfering with or disrupting our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">·</span>
                    <span>Violating any applicable laws or regulations</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Application Fees */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Fees</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Application Fee: Rs. 515</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Non-refundable application processing fee</li>
                    <li>Must be paid online through Razorpay</li>
                    <li>Valid for the current academic session only</li>
                    <li>Payment confirmation is required for application processing</li>
                  </ul>
                </div>
                <p>
                  The application fee is non-refundable under any circumstances. Payment of the fee does not guarantee admission, which is subject to merit and availability of seats.
                </p>
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-blue-600" />
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content, trademarks, service marks, logos, and other intellectual property displayed on our website are the exclusive property of BPTPIA or its licensors.
                </p>
                <p>
                  You may not use, reproduce, distribute, or create derivative works of any content from our website without prior written consent from BPTPIA.
                </p>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  BPTPIA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the services.
                </p>
                <p>
                  Our total liability to you for any cause of action whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us for the services during the six (6) month period prior to the cause of action.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> info@bptpia.org</p>
                  <p><strong>Phone:</strong> +91-9934005543</p>
                  <p><strong>Address:</strong> BPTPIA Office, Patna, Bihar - 800001</p>
                </div>
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
