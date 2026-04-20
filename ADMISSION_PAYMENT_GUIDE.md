# Admission Form: Review & Razorpay Integration Guide

This document explains the "Review Before Submit" flow and Razorpay integration step-by-step.

## 🚀 The Flow
1. **Fill Form**: User fills out the admission details.
2. **Review**: Clicking "Review Application" captures all data and shows a clean, Stripe-style summary in a modal.
3. **Payment**: Clicking "Confirm & Pay" in the modal triggers the Razorpay Checkout.
4. **Finalize**: After successful payment, the data is sent to the backend and saved as `PAID`.
5. **Success**: User is redirected to a premium success confirmation page.

---

## 🛠️ Step 1: Configuration

### Backend (.env)
Add your Razorpay credentials to your backend `.env` file:
```env
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### Frontend (.env.local)
Add your Public Key ID to your frontend environment:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

---

## 📦 Step 2: Dependencies

### Backend
You need to install the Razorpay SDK:
```bash
npm install razorpay
```

---

## 📂 Step 3: File Structure

### 1. Backend Extensions
- `controllers/paymentController.js`: Handles Order ID generation and signature verification.
- `routes/paymentRoutes.js`: Defines `/api/payments/create-order` and `/api/payments/verify`.
- `models/Admission.js`: Updated with `razorpayOrderId` and `razorpayPaymentId` fields.

### 2. Frontend Extensions
- `admission/ReviewModal.tsx`: The high-end UI component for summarizing data.
- `admission/success/page.tsx`: The success redirect page.
- `admission/page.tsx`: Main logic for triggering the modal and handling Razorpay callbacks.

---

## 🔒 Security Note
- **Signature Verification**: The `verify` route on the backend ensures that the payment was legitimate by checking the HMAC SHA256 signature against your `RAZORPAY_KEY_SECRET`.
- **Amount**: The amount (₹515) is set on the backend for the order creation to prevent client-side tampering.

---

## 📈 Database Schema
The `admissions` table now includes:
- `paymentStatus`: ENUM('PENDING', 'PAID')
- `razorpayOrderId`: String
- `razorpayPaymentId`: String
- `transactionId`: String (Stores the payment ID)

---

**Happy Coding!** 🚀
