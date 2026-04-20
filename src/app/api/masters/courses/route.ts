import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Mock courses data
  const engineeringCourses = [
    { id: 1, courseName: 'B.Tech Regular' },
    { id: 2, courseName: 'B.Tech Lateral Entry' },
    { id: 3, courseName: 'B.Tech Part Time' }
  ];

  const polytechnicCourses = [
    { id: 11, courseName: 'Diploma Regular' },
    { id: 12, courseName: 'Diploma Lateral Entry' },
    { id: 13, courseName: 'Diploma Part Time' }
  ];

  const courses = type?.toUpperCase() === 'ENGINEERING' ? engineeringCourses : polytechnicCourses;

  return NextResponse.json({
    success: true,
    data: courses
  });
}
