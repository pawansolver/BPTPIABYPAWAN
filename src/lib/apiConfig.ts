/**
 * Central API configuration
 * - Local dev:  uses NEXT_PUBLIC_LOCAL_API_URL (http://localhost:5000)
 * - Production: uses NEXT_PUBLIC_API_URL (https://api.bihartechassociation.com)
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_LOCAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://api.bihartechassociation.com';
