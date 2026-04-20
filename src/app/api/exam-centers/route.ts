import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Mock exam centers data
  const engineeringCenters = [
    { id: 1, name: 'BPTPIA, Main Campus - Patna' },
    { id: 2, name: 'BPTPIA, City Center - Patna' },
    { id: 3, name: 'NIT Patna' },
    { id: 4, name: 'IIT Patna' },
    { id: 5, name: 'Muzaffarpur Engineering College' },
    { id: 6, name: 'Bhagalpur Engineering College' },
    { id: 7, name: 'Gaya Engineering College' },
    { id: 8, name: 'Darbhanga Engineering College' }
  ];

  const polytechnicCenters = [
    { id: 11, name: 'BPTPIA, Main Campus - Patna' },
    { id: 12, name: 'BPTPIA, City Center - Patna' },
    { id: 13, name: 'Government Polytechnic, Patna' },
    { id: 14, name: 'Women Polytechnic, Patna' },
    { id: 15, name: 'Muzaffarpur Polytechnic' },
    { id: 16, name: 'Bhagalpur Polytechnic' },
    { id: 17, name: 'Gaya Polytechnic' },
    { id: 18, name: 'Darbhanga Polytechnic' }
  ];

  const centers = type?.toUpperCase() === 'ENGINEERING' ? engineeringCenters : polytechnicCenters;

  return NextResponse.json({
    success: true,
    data: centers
  });
}
