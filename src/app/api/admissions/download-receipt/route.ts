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

        console.log('=== NEXT.JS API PROXY: PDF DOWNLOAD STARTED ===');
        console.log('Fetching PDF from backend for ID:', id);

        // Fetch PDF from Express backend
        const backendUrl = `${"https://api.bihartechassociation.com"}/api/admissions/download-receipt?id=${id}`;
        
        const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        });

        console.log('Backend response status:', response.status);
        console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

        // CRITICAL FIX: Check if response is OK before proceeding
        if (!response.ok) {
            console.log('ERROR: Backend response not OK:', response.status);
            // Only parse as JSON if it's actually an error response
            const contentType = response.headers.get('content-type') || '';
            console.log('Error response content type:', contentType);
            
            try {
                if (contentType.includes('application/json')) {
                    const errorData = await response.json();
                    console.error('Backend error:', errorData);
                    return NextResponse.json(
                        { success: false, error: errorData.message || 'Failed to download receipt' },
                        { status: response.status }
                    );
                } else {
                    const errorText = await response.text();
                    console.error('Backend error (non-JSON):', errorText);
                    return NextResponse.json(
                        { success: false, error: `Backend error: ${response.status} - ${errorText}` },
                        { status: response.status }
                    );
                }
            } catch (parseError) {
                console.error('Failed to parse error response:', parseError);
                return NextResponse.json(
                    { success: false, error: `Backend error: ${response.status} - Failed to parse error response` },
                    { status: response.status }
                );
            }
        }

        // CRITICAL FIX: Check content type to ensure we got a PDF, not an error
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/pdf')) {
            console.error('Backend returned non-PDF content:', contentType);
            const errorText = await response.text();
            console.error('Response content:', errorText);
            return NextResponse.json(
                { success: false, error: `Backend returned invalid content type: ${contentType}` },
                { status: 500 }
            );
        }

        // CRITICAL FIX: Stream the raw binary proxy body directly to prevent any edge-runtime arrayBuffer parsing corruption
        return new NextResponse(response.body, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="BPTPIA_Receipt_${id}.pdf"`,
                'Content-Length': response.headers.get('content-length') || '',
                'Cache-Control': 'no-cache',
            },
        });

    } catch (error) {
        console.error('=== NEXT.JS API PROXY: PDF DOWNLOAD FAILED ===');
        console.error('Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to download receipt' },
            { status: 500 }
        );
    }
}
