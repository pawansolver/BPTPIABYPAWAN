'use server';

export async function submitContactAction(formData: any) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
        const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (!response.ok) {
            return { success: false, message: result.error || 'Something went wrong!' };
        }
        return { success: true, message: result.message };
    } catch (error) {
        console.error('Frontend Action Error:', error);
        return { success: false, message: 'Could not connect to the backend server.' };
    }
}
