/**
 * Download API Service
 * Handles all API calls for downloads and support links
 */

export interface Download {
  id: number;
  title: string;
  description?: string;
  type: 'STUDENT_DOWNLOAD' | 'SUPPORT_LINK' | 'QUICK_LINK';
  fileUrl?: string;
  externalUrl?: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  fileSize?: number;
  mimeType?: string;
  downloadCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDownloadData {
  title: string;
  description?: string;
  type: 'STUDENT_DOWNLOAD' | 'SUPPORT_LINK' | 'QUICK_LINK';
  externalUrl?: string;
  icon: string;
  displayOrder?: number;
  isActive?: boolean;
  file?: File;
}

export interface UpdateDownloadData extends Partial<CreateDownloadData> {}

// API Base URL - local port 5000 takes priority, fallback to production
import { API_BASE_URL } from '@/lib/apiConfig';
const API_URL = `${API_BASE_URL}/api`;


/**
 * Get all downloads
 */
export async function getDownloads(params?: {
  type?: string;
  isActive?: boolean;
  search?: string;
}): Promise<{ success: boolean; data: Download[]; message?: string }> {
  const queryParams = new URLSearchParams();
  
  if (params?.type) queryParams.append('type', params.type);
  if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
  if (params?.search) queryParams.append('search', params.search);
  
  const url = `${API_URL}/downloads?${queryParams.toString()}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch downloads: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Get single download by ID
 */
export async function getDownloadById(id: number): Promise<{ success: boolean; data: Download; message?: string }> {
  const response = await fetch(`${API_URL}/downloads/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch download: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Create new download (with file upload)
 */
export async function createDownload(data: CreateDownloadData): Promise<{ success: boolean; data: Download; message?: string }> {
  const formData = new FormData();
  
  formData.append('title', data.title);
  formData.append('type', data.type);
  formData.append('icon', data.icon);
  
  if (data.description) formData.append('description', data.description);
  if (data.externalUrl) formData.append('externalUrl', data.externalUrl);
  if (data.displayOrder !== undefined) formData.append('displayOrder', String(data.displayOrder));
  if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
  if (data.file) formData.append('file', data.file);
  
  const response = await fetch(`${API_URL}/downloads`, {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create download: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Update download
 */
export async function updateDownload(id: number, data: UpdateDownloadData): Promise<{ success: boolean; data: Download; message?: string }> {
  const formData = new FormData();
  
  if (data.title) formData.append('title', data.title);
  if (data.type) formData.append('type', data.type);
  if (data.icon) formData.append('icon', data.icon);
  if (data.description) formData.append('description', data.description);
  if (data.externalUrl) formData.append('externalUrl', data.externalUrl);
  if (data.displayOrder !== undefined) formData.append('displayOrder', String(data.displayOrder));
  if (data.isActive !== undefined) formData.append('isActive', String(data.isActive));
  if (data.file) formData.append('file', data.file);
  
  const response = await fetch(`${API_URL}/downloads/${id}`, {
    method: "PUT",
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update download: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Delete download
 */
export async function deleteDownload(id: number): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_URL}/downloads/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete download: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Track download and get download URL
 */
export async function trackDownload(id: number): Promise<{ success: boolean; data: { downloadUrl: string; downloadCount: number }; message?: string }> {
  const response = await fetch(`${API_URL}/downloads/${id}/download`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to track download: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Reorder downloads
 */
export async function reorderDownloads(orders: { id: number; displayOrder: number }[]): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_URL}/downloads/reorder`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orders }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to reorder downloads: ${response.statusText}`);
  }
  
  return response.json();
}
