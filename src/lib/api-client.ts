import { ApiResponse } from "@/lib/api-response";

// Client-side error handling utility
export class ApiError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = "ApiError";
  }
}

// Parse API error response
export function parseApiError(response: ApiResponse<any>): ApiError {
  return new ApiError(
    response.error?.message || "An unexpected error occurred",
    response.error?.code === "VALIDATION_ERROR" ? 400 : 500,
    response.error?.code,
    response.error?.details,
  );
}

// Generic API client with error handling
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data: ApiResponse<T> = await response.json();

      if (!data.success) {
        throw parseApiError(data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors or invalid JSON
      throw new ApiError(
        "Network error or invalid response",
        0,
        "NETWORK_ERROR",
      );
    }
  }

  // GET request
  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;

    return this.request<T>(url, { method: "GET" });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

// Default API client instance
export const apiClient = new ApiClient();

// Error handling hooks for React (if using React)
export function useApiError() {
  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      // Handle specific API errors
      switch (error.code) {
        case "VALIDATION_ERROR":
          console.error("Validation error:", error.details);
          break;
        case "UNAUTHORIZED":
          // Redirect to login or refresh token
          window.location.href = "/login";
          break;
        case "FORBIDDEN":
          console.error("Access denied");
          break;
        case "NOT_FOUND":
          console.error("Resource not found");
          break;
        default:
          console.error("API error:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  };

  return { handleError };
}

// Usage examples:
/*
// Basic usage
try {
  const response = await apiClient.get<Farmer[]>('/farmers');
  console.log(response.data);
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message);
    console.error('Status:', error.statusCode);
    console.error('Code:', error.code);
  }
}

// With pagination
try {
  const response = await apiClient.get<Farmer[]>('/farmers', {
    page: '1',
    limit: '10'
  });
  console.log('Data:', response.data);
  console.log('Pagination:', response.meta);
} catch (error) {
  const { handleError } = useApiError();
  handleError(error);
}
*/
