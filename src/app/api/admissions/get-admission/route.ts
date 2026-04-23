import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    try {
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Application ID is required' },
                { status: 400 }
            );
        }

        console.log('=== FRONTEND API: FETCHING ADMISSION DATA FROM BACKEND ===');
        console.log('Application ID:', id);

        // Fetch from backend Express API
        const API_BASE = process.env.NEXT_PUBLIC_LOCAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.bihartechassociation.com';
        const backendUrl = `${API_BASE}/api/admissions/get-admission?id=${id}`;
        
        console.log('Attempting to fetch from:', backendUrl);
        
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        console.log('Backend response status:', response.status);
        console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend error response:', errorText);
            return NextResponse.json(
                { success: false, error: `Backend error: ${response.status} - ${errorText}` },
                { status: response.status }
            );
        }

        const result = await response.json();
        console.log('Backend response data received:', result);

        return NextResponse.json(result);

    } catch (error) {
        console.error('=== FRONTEND API: FETCH ADMISSION DATA FAILED ===');
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch admission data' },
            { status: 500 }
        );
    }
}
