'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DollarSign, AlertCircle, Clock, XCircle, CheckCircle, Receipt, HelpCircle, AlertTriangle } from 'lucide-react';

// Global Components
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

export default function RefundPolicyPage() {
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
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Refund Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Clear guidelines about our refund policy for application fees and other services.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {new Date().toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              variants={itemVariants}
              className="bg-red-50 border border-red-200 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
                Important Notice
              </h2>
              <div className="text-red-800 space-y-3">
                <p className="font-semibold">
                  Please read this policy carefully before making any payments.
                </p>
                <p>
                  The application fee for BPTPIA admissions is <strong>non-refundable</strong> under any circumstances. This policy applies to all applicants and transactions.
                </p>
              </div>
            </motion.div>

            {/* Application Fee Policy */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Receipt className="w-6 h-6 text-blue-600" />
                Application Fee Policy
              </h2>
              <div className="space-y-6 text-gray-700">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3">Application Fee: Rs. 515</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Non-Refundable:</strong> The application fee is completely non-refundable once paid.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Session Specific:</strong> Fee is valid only for the current academic session.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong>Processing Fee:</strong> This fee covers application processing and administrative costs.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">What the Application Fee Covers:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Application processing and verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Document verification and validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Administrative and operational costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Technical infrastructure and maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* No Refund Scenarios */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Refund Scenarios</h2>
              <div className="space-y-4 text-gray-700">
                <p>Refunds will not be provided in any of the following situations:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Application Withdrawal:</strong> If you decide to withdraw your application for any reason
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Ineligible Application:</strong> If your application is rejected due to eligibility criteria
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Incomplete Application:</strong> If you fail to complete the application process
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Incorrect Information:</strong> If you provide false or misleading information
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Document Issues:</strong> If your documents are found to be invalid or forged
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Technical Issues:</strong> If you face technical problems on your end
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">·</span>
                    <div>
                      <strong>Change of Mind:</strong> If you simply change your mind about applying
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Payment Processing */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Processing</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Payment Methods:</h3>
                  <p>
                    We accept payments through Razorpay, a secure payment gateway. All transactions are processed securely.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Payment Confirmation:</h3>
                  <p>
                    Once payment is successfully processed, you will receive a confirmation receipt with transaction details. This receipt serves as proof of payment.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Failed Transactions:</h3>
                  <p>
                    If a payment transaction fails due to technical reasons, the amount will not be deducted from your account. You can attempt the payment again.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Dispute Resolution */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In case of any payment-related disputes, please follow these steps:
                </p>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <strong>Contact Support:</strong> Reach out to our support team within 7 days of the transaction
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <strong>Provide Details:</strong> Share your transaction ID, application details, and the issue
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <strong>Review Process:</strong> Our team will review your case and respond within 7-10 working days
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <strong>Final Decision:</strong> The decision made by BPTPIA will be final and binding
                    </div>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Exceptions */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exceptions</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  While the application fee is generally non-refundable, BPTPIA reserves the right to consider refunds in exceptional circumstances such as:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>System-wide technical failures on our end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>Double payment due to technical issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>Other exceptional cases as determined by BPTPIA management</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  Any refund decisions are at the sole discretion of BPTPIA management and will be considered on a case-by-case basis.
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
                  For any questions about our refund policy or payment-related issues, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Support Email:</strong> support@bptpia.org</p>
                  <p><strong>Phone:</strong> +91-9934005543</p>
                  <p><strong>Address:</strong> BPTPIA Office, Patna, Bihar - 800001</p>
                  <p><strong>Support Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Important Note */}
            <motion.div
              variants={itemVariants}
              className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-yellow-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                Important Note
              </h2>
              <div className="text-yellow-800 space-y-3">
                <p className="font-semibold">
                  By proceeding with the payment, you acknowledge that you have read, understood, and agreed to this refund policy.
                </p>
                <p>
                  BPTPIA reserves the right to modify this refund policy at any time without prior notice. Any changes will be effective immediately upon posting on our website.
                </p>
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
