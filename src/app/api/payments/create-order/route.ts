import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, receipt } = body;

    // Mock Razorpay order creation
    // In production, this would call the actual Razorpay API
    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      entity: 'order',
      amount: amount, // Amount already in paise from frontend
      amount_paid: 0,
      amount_due: amount,
      currency: 'INR',
      receipt: receipt,
      status: 'created',
      attempts: 0,
      notes: [],
      created_at: Math.floor(Date.now() / 1000)
    };

    return NextResponse.json({
      success: true,
      data: mockOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
