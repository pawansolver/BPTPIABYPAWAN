import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const applicationData = {
      applicantName: formData.get('applicantName'),
      fatherName: formData.get('fatherName'),
      motherName: formData.get('motherName'),
      dob: formData.get('dob'),
      aadharNo: formData.get('aadharNo'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      gender: formData.get('gender'),
      category: formData.get('category'),
      state: formData.get('state'),
      district: formData.get('district'),
      tenthPercentage: formData.get('tenthPercentage'),
      twelfthPercentage: formData.get('twelfthPercentage'),
      communicationAddress: formData.get('communicationAddress'),
      permanentAddress: formData.get('permanentAddress'),
      courseAppliedFor: formData.get('courseAppliedFor'),
      branchAppliedFor: formData.get('branchAppliedFor'),
      examCenterId: formData.get('examCenterId'),
      razorpayOrderId: formData.get('razorpayOrderId'),
      razorpayPaymentId: formData.get('razorpayPaymentId'),
      transactionId: formData.get('transactionId'),
      paymentStatus: 'PAID'
    };

    // Mock saving to database
    // In production, this would save to your actual database
    const mockApplicationId = `APP_${Date.now()}`;
    
    console.log('Mock application saved:', applicationData);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: mockApplicationId
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
