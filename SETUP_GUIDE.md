# BPTPIA Admission Portal - Setup Guide

## Issues Fixed

### 1. Razorpay Payment Error Fixed
**Problem**: `window.Razorpay is not a function`
**Solution**: Added Razorpay script to layout and provided fallback key

### 2. PDF Download Error Fixed  
**Problem**: API Error Response when downloading receipt
**Solution**: Reverted to local HTML generation instead of backend proxy

### 3. Scroll Behavior Warning Fixed
**Problem**: Scroll behavior warning in browser
**Solution**: Added `data-scroll-behavior="smooth"` to html element

## Quick Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY=your_actual_razorpay_key_here

# Optional: Backend API URL (if using external backend)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Test with Fallback
If you don't have Razorpay keys yet, the app will use a test fallback key for development.

### 3. PDF Receipt
The receipt now generates as HTML and opens in a new window for printing. Users can:
- Use Ctrl+P to save as PDF
- Use browser's Print function
- Download as HTML file if popup is blocked

## How It Works Now

### Payment Flow
1. User fills admission form
2. Clicks "Pay Now" 
3. Razorpay payment window opens (using script loaded in layout)
4. Payment verification happens
5. User redirected to success page

### Receipt Download
1. On success page, click "Download Confirmation"
2. HTML receipt opens in new window
3. Print dialog opens automatically
4. User can save as PDF

### API Routes
- `/api/admissions/apply` - Form submission (mock data)
- `/api/admissions/get-admission` - Fetch student data (mock)
- `/api/admissions/download-receipt` - Generate HTML receipt

## Testing the Complete Flow

### Step 1: Test Form
1. Go to `/admission`
2. Fill all required fields
3. Upload photo and signature
4. Click "Pay Now"

### Step 2: Test Payment
1. Razorpay window should open
2. Use test credentials if needed
3. Complete payment

### Step 3: Test Receipt
1. Should redirect to success page
2. Click "Download Confirmation" 
3. Receipt opens in new window
4. Use print to save as PDF

## Common Issues

### Razorpay Not Loading
- Check if script is loaded in browser dev tools
- Verify environment variable is set
- Check network connectivity

### PDF Not Downloading
- Check if popup blocker is enabled
- Try downloading as HTML instead
- Check browser console for errors

### Form Not Submitting
- Check all required fields are filled
- Verify file uploads are complete
- Check browser console for validation errors

## Production Deployment

For production, you'll need:
1. Real Razorpay API keys
2. Backend database integration
3. Real student data storage
4. Proper error handling

## Development Notes

- Currently using mock data for student storage
- PDF generation is HTML-based (not true PDF)
- Payment verification is mocked
- Environment variables should be set for production

The system is now functional for testing and demonstration purposes!
