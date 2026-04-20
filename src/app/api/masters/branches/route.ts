import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Mock branches data
  const engineeringBranches = [
    { id: 1, branchName: 'Computer Science Engineering (CSE)' },
    { id: 2, branchName: 'Mechanical Engineering (ME)' },
    { id: 3, branchName: 'Electrical Engineering (EE)' },
    { id: 4, branchName: 'Electronics & Communication Engineering (ECE)' },
    { id: 5, branchName: 'Civil Engineering (CE)' },
    { id: 6, branchName: 'Chemical Engineering (CHE)' },
    { id: 7, branchName: 'Biotechnology Engineering (BTE)' },
    { id: 8, branchName: 'Information Technology (IT)' }
  ];

  const polytechnicBranches = [
    { id: 11, branchName: 'Computer Science & Engineering (CSE)' },
    { id: 12, branchName: 'Mechanical Engineering (ME)' },
    { id: 13, branchName: 'Electrical Engineering (EE)' },
    { id: 14, branchName: 'Electronics & Communication Engineering (ECE)' },
    { id: 15, branchName: 'Civil Engineering (CE)' },
    { id: 16, branchName: 'Automobile Engineering (AE)' },
    { id: 17, branchName: 'Chemical Engineering (CHE)' },
    { id: 18, branchName: 'Information Technology (IT)' }
  ];

  const branches = type?.toUpperCase() === 'ENGINEERING' ? engineeringBranches : polytechnicBranches;

  return NextResponse.json({
    success: true,
    data: branches
  });
}
