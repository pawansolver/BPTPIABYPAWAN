/**
 * College API Service
 * Connects frontend with backend for College CRUD operations
 * Production-ready with error handling and TypeScript support
 */

// API Base URL - adjust based on environment

// ============================================
// Frontend College Type
// ============================================

export interface College {
  id: number;
  name: string;
  address: string;
  email?: string;
  website?: string;
  telephone?: string;
  fees?: string;
  brochureUrl?: string;
  intake: {
    CE: string;
    ME: string;
    EE: string;
    EEE: string;
    ECE: string;
    CSE: string;
    Other: string;
    Total: number;
  };
}
// API Base URL - local port 5000 takes priority, fallback to production
import { API_BASE_URL } from '@/lib/apiConfig';
const API_URL = `${API_BASE_URL}/api`;

// ============================================
// Types (matching backend response structure)
// ============================================

export interface ApiCollege {
  id: number;
  type: "ENGINEERING" | "POLYTECHNIC";
  name: string;
  code?: string;
  address: string;
  city?: string;
  district?: string;
  state: string;
  pincode?: string;
  email?: string;
  website?: string;
  telephone?: string;
  fees?: string;
  feeDetails?: Record<string, string>;
  // Intake fields
  intakeCE?: string;
  intakeME?: string;
  intakeEE?: string;
  intakeEEE?: string;
  intakeECE?: string;
  intakeCSE?: string;
  intakeIT?: string;
  intakeAI?: string;
  intakeOther?: string;
  totalIntake: number;
  // Brochure
  brochureUrl?: string;
  brochureFileName?: string;
  // Status
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  displayOrder: number;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: PaginationData;
  error?: string;
}

export interface CollegeStats {
  engineering: {
    count: number;
    totalSeats: number;
  };
  polytechnic: {
    count: number;
    totalSeats: number;
  };
  status: {
    active: number;
    pending: number;
    inactive: number;
  };
  totalColleges: number;
}

export interface LocationFilters {
  cities: string[];
  districts: string[];
}

// ============================================
// API Functions
// ============================================

/**
 * Fetch all colleges with pagination and filters
 */
export async function getColleges(params?: {
  page?: number;
  limit?: number;
  type?: "ENGINEERING" | "POLYTECHNIC";
  status?: string;
  search?: string;
  city?: string;
  district?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}): Promise<ApiResponse<ApiCollege[]>> {
  console.log("[API getColleges] Called with params:", params);
  console.log("[API getColleges] API_BASE_URL:", API_BASE_URL);
  console.log("[API getColleges] Window location:", typeof window !== 'undefined' ? window.location.origin : 'server-side');
  
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }

  const url = `${API_URL}/colleges?${queryParams.toString()}`;
  console.log("[API getColleges] Full URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("[API getColleges] Response status:", response.status, response.statusText);
    console.log("[API getColleges] Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[API getColleges] Error response body:", errorText);
      throw new Error(`Failed to fetch colleges: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("[API getColleges] Success - data count:", data.data?.length);
    return data;
  } catch (error) {
    console.error("[API getColleges] Exception caught:", error);
    throw error;
  }
}

/**
 * Get colleges by type (Engineering/Polytechnic)
 */
export async function getCollegesByType(
  type: "ENGINEERING" | "POLYTECHNIC",
  params?: {
    page?: number;
    limit?: number;
    search?: string;
  }
): Promise<ApiResponse<ApiCollege[]>> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(
    `${API_URL}/colleges/type/${type}?${queryParams.toString()}`,
    {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch colleges: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get single college by ID
 */
export async function getCollegeById(id: number): Promise<ApiResponse<ApiCollege>> {
  const response = await fetch(`${API_URL}/colleges/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch college: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get college statistics (for admin dashboard)
 */
export async function getCollegeStats(): Promise<ApiResponse<CollegeStats>> {
  const response = await fetch(`${API_URL}/colleges/stats/overview`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get locations for filters
 */
export async function getCollegeLocations(type?: string): Promise<ApiResponse<LocationFilters>> {
  const queryParams = new URLSearchParams();
  if (type) queryParams.append("type", type);

  const response = await fetch(
    `${API_URL}/colleges/filters/locations?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// Admin CRUD Operations (Require Auth Token)
// ============================================

/**
 * Create a new college (Admin only)
 */
export async function createCollege(
  collegeData: Partial<ApiCollege>,
  brochureFile?: File,
  token?: string
): Promise<ApiResponse<ApiCollege>> {
  const formData = new FormData();

  // Append college data
  Object.entries(collegeData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
    }
  });

  // Append brochure file if provided
  if (brochureFile) {
    formData.append("brochure", brochureFile);
  }

  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/colleges`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to create college: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update college (Admin only)
 */
export async function updateCollege(
  id: number,
  collegeData: Partial<ApiCollege>,
  brochureFile?: File,
  token?: string
): Promise<ApiResponse<ApiCollege>> {
  const formData = new FormData();

  // Append college data
  Object.entries(collegeData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
    }
  });

  // Append brochure file if provided
  if (brochureFile) {
    formData.append("brochure", brochureFile);
  }

  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/colleges/${id}`, {
    method: "PUT",
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to update college: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update college status (Admin only)
 */
export async function updateCollegeStatus(
  id: number,
  status: "ACTIVE" | "INACTIVE" | "PENDING",
  token?: string
): Promise<ApiResponse<ApiCollege>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/colleges/${id}/status`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update status: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete college (Admin only)
 */
export async function deleteCollege(
  id: number,
  token?: string
): Promise<ApiResponse<null>> {
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/colleges/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete college: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Bulk delete colleges (Admin only)
 */
export async function bulkDeleteColleges(
  ids: number[],
  token?: string
): Promise<ApiResponse<null>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/colleges/bulk`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete colleges: ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// Helper Functions
// ============================================

/**
 * Transform API college to frontend format
 */
export function transformApiCollegeToFrontend(apiCollege: ApiCollege): College {
  return {
    id: apiCollege.id,
    name: apiCollege.name,
    address: apiCollege.address,
    email: apiCollege.email || "",
    website: apiCollege.website || "",
    telephone: apiCollege.telephone || "",
    fees: apiCollege.fees || "",
    brochureUrl: apiCollege.brochureUrl,
    intake: {
      CE: apiCollege.intakeCE || "-",
      ME: apiCollege.intakeME || "-",
      EE: apiCollege.intakeEE || "-",
      EEE: apiCollege.intakeEEE || "-",
      ECE: apiCollege.intakeECE || "-",
      CSE: apiCollege.intakeCSE || "-",
      Other: apiCollege.intakeOther || "-",
      Total: apiCollege.totalIntake,
    },
  };
}

/**
 * Get full image URL
 */
export function getFullImageUrl(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}
