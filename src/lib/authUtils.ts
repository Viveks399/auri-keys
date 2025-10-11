// Client-side authentication utilities

export interface AdminData {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Check if user is authenticated (client-side)
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("adminToken");
  const adminData = localStorage.getItem("adminData");

  return !!(token && adminData);
};

/**
 * Get admin data from localStorage
 */
export const getAdminData = (): AdminData | null => {
  if (typeof window === "undefined") return null;

  try {
    const adminData = localStorage.getItem("adminData");
    if (!adminData) return null;

    return JSON.parse(adminData);
  } catch (error) {
    console.error("Failed to parse admin data:", error);
    return null;
  }
};

/**
 * Get auth token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("adminToken");
};

/**
 * Clear authentication data
 */
export const clearAuth = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
};

/**
 * Save authentication data
 */
export const saveAuth = (token: string, adminData: AdminData): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminData", JSON.stringify(adminData));
};

/**
 * Make authenticated API request
 */
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
