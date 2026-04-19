'use server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/government-letters`;

// 1. Get All Letters (Public Website ke liye)
export async function getAllLetters() {
    try {
        const response = await fetch(`${API_URL}?active=true`, {
            cache: 'no-store' // Always fresh data
        });
        const result = await response.json();
        if (!response.ok) {
            return { success: false, message: result.message || 'Failed to fetch letters', data: [] };
        }
        return { success: true, data: result.data };
    } catch (error) {
        console.error('Fetch Letters Error:', error);
        return { success: false, message: 'Could not connect to the backend server.', data: [] };
    }
}

// 1. Get All Letters (for listing)
export async function getAllGovernmentLetters() {
    try {
        console.log('[DEBUG] Fetching all letters from:', `${API_URL}?active=true`);
        const response = await fetch(`${API_URL}?active=true`, {
            cache: 'no-store'
        });
        const result = await response.json();
        console.log('[DEBUG] All letters response:', result);
        if (!response.ok) {
            return { success: false, message: result.message || 'Failed to fetch letters', data: [] };
        }
        return { success: true, data: result.data, totalRecords: result.totalRecords };
    } catch (error) {
        console.error('[DEBUG] Fetch Letters Error:', error);
        return { success: false, message: 'Could not connect to the backend server.', data: [] };
    }
}

// 2. Get Single Letter by ID
export async function getLetterById(id: string) {
    try {
        console.log('[DEBUG] Fetching letter with ID:', id);
        console.log('[DEBUG] API URL:', `${API_URL}/${id}`);
        
        const response = await fetch(`${API_URL}/${id}`, {
            cache: 'no-store'
        });
        const result = await response.json();
        
        console.log('[DEBUG] API Response:', result);
        console.log('[DEBUG] Response status:', response.status);
        console.log('[DEBUG] Letter images:', result.data?.images);
        
        if (!response.ok) {
            return { success: false, message: result.message || 'Letter not found', data: null };
        }
        return { success: true, data: result.data };
    } catch (error) {
        console.error('[DEBUG] Fetch Letter Error:', error);
        return { success: false, message: 'Could not connect to the backend server.', data: null };
    }
}
