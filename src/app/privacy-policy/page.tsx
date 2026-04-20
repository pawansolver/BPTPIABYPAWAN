'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';

// Global Components
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from '@/components/ui/footer-section';

export default function PrivacyPolicyPage() {
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
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last updated: {new Date().toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-600" />
                Introduction
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Bihar Private Technical & Professional Institutions Association (BPTPIA) is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our admission services and website.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-600" />
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Full name, date of birth, gender, category</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Contact information (email, phone number, address)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Educational details (qualifications, percentages)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Identity documents (Aadhar card, passport, etc.)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>IP address, browser type, device information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Pages visited, time spent, click patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">·</span>
                      <span>Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-blue-600" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We use your information for the following purposes:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>To process and evaluate your admission application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>To communicate with you about your application status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>To facilitate payment processing and receipt generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>To comply with legal and regulatory requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>To improve our services and user experience</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-blue-600" />
                Data Security
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>SSL encryption for data transmission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Secure servers and databases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Regular security audits and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span>Restricted access to personal data</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span><strong>Access:</strong> Request access to your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span><strong>Correction:</strong> Request correction of inaccurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span><strong>Deletion:</strong> Request deletion of your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">·</span>
                    <span><strong>Portability:</strong> Request transfer of your data</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-4">
                <p>
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@bptpia.org</p>
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
