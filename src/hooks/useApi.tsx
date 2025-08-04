
import { useState, useEffect } from 'react';
import { apiService, ApiResponse } from '@/services/api';
import { toast } from 'react-hot-toast';

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  options: {
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    successMessage?: string;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showErrorToast = true, showSuccessToast = false, successMessage } = options;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      
      if (response.success) {
        setData(response.data);
        if (showSuccessToast && successMessage) {
          toast.success(successMessage);
        }
      } else {
        setError(response.error);
        if (showErrorToast && response.error) {
          toast.error(response.error);
        }
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (showErrorToast) {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData
  };
}

// Specific hooks for common operations
export function useUserProfile(userId: string) {
  return useApi(
    () => apiService.getProfile(userId),
    [userId],
    { showErrorToast: false }
  );
}

export function useUserBookings(userId: string) {
  return useApi(
    () => apiService.getUserBookings(userId),
    [userId]
  );
}

export function useUserRole(userId: string) {
  return useApi(
    () => apiService.getUserRole(userId),
    [userId],
    { showErrorToast: false }
  );
}

export function useAllBookings() {
  return useApi(() => apiService.getAllBookings(), []);
}

export function useAllRoutes() {
  return useApi(() => apiService.getAllRoutes(), []);
}

export function useAllBuses() {
  return useApi(() => apiService.getAllBuses(), []);
}

export function useAllLocations() {
  return useApi(() => apiService.getAllLocations(), []);
}

export function useUserAnalytics(userId: string) {
  return useApi(
    () => apiService.getUserAnalytics(userId),
    [userId]
  );
}

export function useAdminAnalytics() {
  return useApi(() => apiService.getAdminAnalytics(), []);
}

// Hook for mutations (create, update, delete operations)
export function useApiMutation<T, P = any>(
  apiCall: (params: P) => Promise<ApiResponse<T>>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
  } = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    onSuccess,
    onError,
    showSuccessToast = true,
    showErrorToast = true,
    successMessage
  } = options;

  const mutate = async (params: P) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall(params);
      
      if (response.success && response.data) {
        if (showSuccessToast) {
          toast.success(successMessage || 'Operation completed successfully');
        }
        onSuccess?.(response.data);
        return response.data;
      } else {
        setError(response.error);
        if (showErrorToast && response.error) {
          toast.error(response.error);
        }
        onError?.(response.error || 'Operation failed');
        throw new Error(response.error || 'Operation failed');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      if (showErrorToast) {
        toast.error(errorMessage);
      }
      onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    mutate,
    loading,
    error,
    reset: () => {
      setError(null);
      setLoading(false);
    }
  };
}
