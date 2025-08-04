
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

// Types for our API responses
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Generic API service class
class ApiService {
  private async handleResponse<T>(operation: Promise<any>): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await operation;
      
      if (error) {
        console.error('API Error:', error);
        return {
          data: null,
          error: error.message,
          success: false
        };
      }

      return {
        data,
        error: null,
        success: true
      };
    } catch (error: any) {
      console.error('API Exception:', error);
      return {
        data: null,
        error: error.message || 'An unexpected error occurred',
        success: false
      };
    }
  }

  // User Profile Operations
  async getProfile(userId: string) {
    return this.handleResponse(
      supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    );
  }

  async updateProfile(userId: string, updates: any) {
    return this.handleResponse(
      supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
    );
  }

  // User Roles Operations
  async getUserRole(userId: string) {
    return this.handleResponse(
      supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .single()
    );
  }

  async getAllUserRoles() {
    return this.handleResponse(
      supabase
        .from('user_roles')
        .select(`
          *,
          profiles!inner(email, full_name)
        `)
        .order('created_at', { ascending: false })
    );
  }

  async createUserRole(userRole: any) {
    return this.handleResponse(
      supabase
        .from('user_roles')
        .insert(userRole)
        .select()
        .single()
    );
  }

  async updateUserRole(id: string, updates: any) {
    return this.handleResponse(
      supabase
        .from('user_roles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );
  }

  async deleteUserRole(id: string) {
    return this.handleResponse(
      supabase
        .from('user_roles')
        .delete()
        .eq('id', id)
    );
  }

  // Bookings Operations
  async getUserBookings(userId: string) {
    return this.handleResponse(
      supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    );
  }

  async getAllBookings() {
    return this.handleResponse(
      supabase
        .from('bookings')
        .select(`
          *,
          profiles!inner(email, full_name, phone)
        `)
        .order('created_at', { ascending: false })
    );
  }

  async createBooking(booking: any) {
    return this.handleResponse(
      supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single()
    );
  }

  async updateBooking(id: string, updates: any) {
    return this.handleResponse(
      supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );
  }

  async getBookingById(id: string) {
    return this.handleResponse(
      supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  // Routes Operations
  async getAllRoutes() {
    return this.handleResponse(
      supabase
        .from('routes')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true })
    );
  }

  async getRouteById(id: string) {
    return this.handleResponse(
      supabase
        .from('routes')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  async createRoute(route: any) {
    return this.handleResponse(
      supabase
        .from('routes')
        .insert(route)
        .select()
        .single()
    );
  }

  async updateRoute(id: string, updates: any) {
    return this.handleResponse(
      supabase
        .from('routes')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );
  }

  async deleteRoute(id: string) {
    return this.handleResponse(
      supabase
        .from('routes')
        .update({ is_active: false })
        .eq('id', id)
    );
  }

  // Buses Operations
  async getAllBuses() {
    return this.handleResponse(
      supabase
        .from('buses')
        .select(`
          *,
          routes(name, start_location, end_location)
        `)
        .eq('is_active', true)
        .order('bus_number', { ascending: true })
    );
  }

  async getBusById(id: string) {
    return this.handleResponse(
      supabase
        .from('buses')
        .select(`
          *,
          routes(*)
        `)
        .eq('id', id)
        .single()
    );
  }

  async createBus(bus: any) {
    return this.handleResponse(
      supabase
        .from('buses')
        .insert(bus)
        .select()
        .single()
    );
  }

  async updateBus(id: string, updates: any) {
    return this.handleResponse(
      supabase
        .from('buses')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );
  }

  async deleteBus(id: string) {
    return this.handleResponse(
      supabase
        .from('buses')
        .update({ is_active: false })
        .eq('id', id)
    );
  }

  // Locations Operations
  async getAllLocations() {
    return this.handleResponse(
      supabase
        .from('locations')
        .select('*')
        .order('name', { ascending: true })
    );
  }

  async getLocationById(id: string) {
    return this.handleResponse(
      supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single()
    );
  }

  async createLocation(location: any) {
    return this.handleResponse(
      supabase
        .from('locations')
        .insert(location)
        .select()
        .single()
    );
  }

  async updateLocation(id: string, updates: any) {
    return this.handleResponse(
      supabase
        .from('locations')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    );
  }

  async deleteLocation(id: string) {
    return this.handleResponse(
      supabase
        .from('locations')
        .delete()
        .eq('id', id)
    );
  }

  // Search Operations
  async searchBuses(from: string, to: string, date: string) {
    return this.handleResponse(
      supabase
        .from('buses')
        .select(`
          *,
          routes!inner(*)
        `)
        .eq('is_active', true)
        .or(`start_location.ilike.%${from}%,end_location.ilike.%${to}%`, { foreignTable: 'routes' })
    );
  }

  // Analytics Operations
  async getUserAnalytics(userId: string) {
    const bookingsResponse = await this.handleResponse(
      supabase
        .from('bookings')
        .select('amount, booking_status')
        .eq('user_id', userId)
    );

    if (!bookingsResponse.success || !bookingsResponse.data) {
      return bookingsResponse;
    }

    const bookings = bookingsResponse.data;
    const totalSpent = bookings.reduce((sum: number, booking: any) => sum + (booking.amount || 0), 0);
    const completedTrips = bookings.filter((booking: any) => booking.booking_status === 'confirmed').length;
    const averageRating = 4.5; // Placeholder since we don't have ratings yet

    return {
      data: {
        totalSpent,
        completedTrips,
        averageRating,
        totalBookings: bookings.length
      },
      error: null,
      success: true
    };
  }

  async getAdminAnalytics() {
    const [bookingsRes, usersRes, busesRes] = await Promise.all([
      this.handleResponse(
        supabase
          .from('bookings')
          .select('amount, booking_status, created_at')
      ),
      this.handleResponse(
        supabase
          .from('profiles')
          .select('created_at')
      ),
      this.handleResponse(
        supabase
          .from('buses')
          .select('id')
          .eq('is_active', true)
      )
    ]);

    if (!bookingsRes.success || !usersRes.success || !busesRes.success) {
      return {
        data: null,
        error: 'Failed to fetch analytics data',
        success: false
      };
    }

    const bookings = bookingsRes.data || [];
    const users = usersRes.data || [];
    const buses = busesRes.data || [];

    const totalRevenue = bookings.reduce((sum: number, booking: any) => sum + (booking.amount || 0), 0);
    const totalBookings = bookings.length;
    const totalUsers = users.length;
    const totalBuses = buses.length;

    return {
      data: {
        totalRevenue,
        totalBookings,
        totalUsers,
        totalBuses
      },
      error: null,
      success: true
    };
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export individual services for convenience
export default apiService;
