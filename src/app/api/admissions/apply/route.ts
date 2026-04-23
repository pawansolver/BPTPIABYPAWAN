import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        console.log('=== FRONTEND API: SUBMITTING APPLICATION TO BACKEND ===');
        
        // Create FormData for backend
        const backendFormData = new FormData();
        
        // Add all form fields to backend FormData
        const fields = [
            'applicantName', 'fatherName', 'motherName', 'dob', 'aadharNo', 
            'email', 'mobile', 'gender', 'category', 'state', 'district',
            'tenthPercentage', 'twelfthPercentage', 'communicationAddress', 
            'permanentAddress', 'courseType', 'courseAppliedFor', 'branchAppliedFor',
            'examCenterId', 'razorpayOrderId', 'razorpayPaymentId', 'transactionId'
        ];
        
        fields.forEach(field => {
            const value = formData.get(field);
            if (value) backendFormData.append(field, value.toString());
        });
        
        // Add payment status
        backendFormData.append('paymentStatus', 'PAID');

        // Send to backend Express API
        const API_BASE = process.env.NEXT_PUBLIC_LOCAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.bihartechassociation.com';
        const backendUrl = `${API_BASE}/api/admissions/apply`;
        
        const response = await fetch(backendUrl, {
            method: 'POST',
            body: backendFormData,
        });

        const result = await response.json();
        
        console.log('Backend response:', result);

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: result.message || 'Failed to submit application' },
                { status: response.status }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('=== FRONTEND API: APPLICATION SUBMISSION FAILED ===');
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit application' },
            { status: 500 }
        );
    }
}
