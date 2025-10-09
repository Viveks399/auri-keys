// Utility functions for API calls from the frontend

const API_BASE_URL = "/api";

export async function fetchProperties(filters?: {
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  propertyType?: string;
  minBedrooms?: number;
  status?: string;
}) {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
  }

  const url = `${API_BASE_URL}/properties${
    params.toString() ? `?${params.toString()}` : ""
  }`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

export async function fetchPropertyById(id: string) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

export async function createProperty(data: any) {
  const response = await fetch(`${API_BASE_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create property");
  }

  return response.json();
}

export async function updateProperty(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update property");
  }

  return response.json();
}

export async function deleteProperty(id: string) {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete property");
  }

  return response.json();
}
