
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type UserRole = Tables['user_roles']['Row'];
type Booking = Tables['bookings']['Row'];
type Route = Tables['routes']['Row'];
type Bus = Tables['buses']['Row'];
type Location = Tables['locations']['Row'];

// Helper function to handle Supabase responses
async function handleResponse<T>(queryPromise: Promise<any>): Promise<ApiResponse<T>> {
  try {
    const { data, error } = await queryPromise;
    
    if (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      data
    };
  } catch (error: any) {
    console.error('API Exception:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}

export const apiService = {
  // Profile operations
  getProfile: async (userId: string): Promise<ApiResponse<Profile>> => {
    return handleResponse(
      supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
        .then()
    );
  },

  updateProfile: async (userId: string, updates: Partial<Profile>): Promise<ApiResponse<Profile>> => {
    return handleResponse(
      supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
        .then()
    );
  },

  // User role operations
  getUserRole: async (userId: string): Promise<ApiResponse<UserRole>> => {
    return handleResponse(
      supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .single()
        .then()
    );
  },

  getAllUserRoles: async (): Promise<ApiResponse<UserRole[]>> => {
    return handleResponse(
      supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false })
        .then()
    );
  },

  createUserRole: async (userRole: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<UserRole>> => {
    return handleResponse(
      supabase
        .from('user_roles')
        .insert(userRole)
        .select()
        .single()
        .then()
    );
  },

  updateUserRole: async (id: string, updates: Partial<Omit<UserRole, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<UserRole>> => {
    return handleResponse(
      supabase
        .from('user_roles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
        .then()
    );
  },

  deleteUserRole: async (id: string): Promise<ApiResponse<void>> => {
    return handleResponse(
      supabase
        .from('user_roles')
        .delete()
        .eq('id', id)
        .then()
    );
  },

  // Booking operations
  getUserBookings: async (userId: string): Promise<ApiResponse<Booking[]>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('booking_date', { ascending: false })
        .then()
    );
  },

  getAllBookings: async (): Promise<ApiResponse<Booking[]>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: false })
        .then()
    );
  },

  getBookingById: async (id: string): Promise<ApiResponse<Booking>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single()
        .then()
    );
  },

  createBooking: async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Booking>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single()
        .then()
    );
  },

  updateBooking: async (id: string, updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Booking>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
        .then()
    );
  },

  deleteBooking: async (id: string): Promise<ApiResponse<void>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .delete()
        .eq('id', id)
        .then()
    );
  },

  // Route operations
  getAllRoutes: async (): Promise<ApiResponse<Route[]>> => {
    return handleResponse(
      supabase
        .from('routes')
        .select('*')
        .order('name', { ascending: true })
        .then()
    );
  },

  getRouteById: async (id: string): Promise<ApiResponse<Route>> => {
    return handleResponse(
      supabase
        .from('routes')
        .select('*')
        .eq('id', id)
        .single()
        .then()
    );
  },

  createRoute: async (route: Omit<Route, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Route>> => {
    return handleResponse(
      supabase
        .from('routes')
        .insert(route)
        .select()
        .single()
        .then()
    );
  },

  updateRoute: async (id: string, updates: Partial<Omit<Route, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Route>> => {
    return handleResponse(
      supabase
        .from('routes')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
        .then()
    );
  },

  deleteRoute: async (id: string): Promise<ApiResponse<void>> => {
    return handleResponse(
      supabase
        .from('routes')
        .delete()
        .eq('id', id)
        .then()
    );
  },

  // Bus operations
  getAllBuses: async (): Promise<ApiResponse<Bus[]>> => {
    return handleResponse(
      supabase
        .from('buses')
        .select('*')
        .order('bus_number', { ascending: true })
        .then()
    );
  },

  getBusById: async (id: string): Promise<ApiResponse<Bus>> => {
    return handleResponse(
      supabase
        .from('buses')
        .select('*')
        .eq('id', id)
        .single()
        .then()
    );
  },

  createBus: async (bus: Omit<Bus, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Bus>> => {
    return handleResponse(
      supabase
        .from('buses')
        .insert(bus)
        .select()
        .single()
        .then()
    );
  },

  updateBus: async (id: string, updates: Partial<Omit<Bus, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Bus>> => {
    return handleResponse(
      supabase
        .from('buses')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
        .then()
    );
  },

  deleteBus: async (id: string): Promise<ApiResponse<void>> => {
    return handleResponse(
      supabase
        .from('buses')
        .delete()
        .eq('id', id)
        .then()
    );
  },

  // Location operations
  getAllLocations: async (): Promise<ApiResponse<Location[]>> => {
    return handleResponse(
      supabase
        .from('locations')
        .select('*')
        .order('name', { ascending: true })
        .then()
    );
  },

  getLocationById: async (id: string): Promise<ApiResponse<Location>> => {
    return handleResponse(
      supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single()
        .then()
    );
  },

  createLocation: async (location: Omit<Location, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Location>> => {
    return handleResponse(
      supabase
        .from('locations')
        .insert(location)
        .select()
        .single()
        .then()
    );
  },

  updateLocation: async (id: string, updates: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>): Promise<ApiResponse<Location>> => {
    return handleResponse(
      supabase
        .from('locations')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
        .then()
    );
  },

  deleteLocation: async (id: string): Promise<ApiResponse<void>> => {
    return handleResponse(
      supabase
        .from('locations')
        .delete()
        .eq('id', id)
        .then()
    );
  },

  // Analytics
  getUserAnalytics: async (userId: string): Promise<ApiResponse<any>> => {
    return handleResponse(
      supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .then()
    );
  },

  getAdminAnalytics: async (): Promise<ApiResponse<any>> => {
    try {
      const [bookingsRes, usersRes, busesRes, routesRes] = await Promise.all([
        supabase.from('bookings').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('buses').select('*'),
        supabase.from('routes').select('*')
      ]);

      if (bookingsRes.error || usersRes.error || busesRes.error || routesRes.error) {
        return {
          success: false,
          error: 'Failed to fetch analytics data'
        };
      }

      return {
        success: true,
        data: {
          totalBookings: bookingsRes.data?.length || 0,
          totalUsers: usersRes.data?.length || 0,
          totalBuses: busesRes.data?.length || 0,
          totalRoutes: routesRes.data?.length || 0,
          bookings: bookingsRes.data || [],
          users: usersRes.data || [],
          buses: busesRes.data || [],
          routes: routesRes.data || []
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch analytics data'
      };
    }
  }
};
