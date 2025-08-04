export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          amount: number
          arrival_time: string | null
          boarding_point: string | null
          booking_date: string
          booking_status: string | null
          bus_operator: string | null
          created_at: string
          departure_time: string | null
          dropping_point: string | null
          id: string
          passenger_details: Json | null
          payment_status: string | null
          route_from: string
          route_to: string
          seat_number: string | null
          transaction_id: string
          travel_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          arrival_time?: string | null
          boarding_point?: string | null
          booking_date?: string
          booking_status?: string | null
          bus_operator?: string | null
          created_at?: string
          departure_time?: string | null
          dropping_point?: string | null
          id?: string
          passenger_details?: Json | null
          payment_status?: string | null
          route_from: string
          route_to: string
          seat_number?: string | null
          transaction_id: string
          travel_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          arrival_time?: string | null
          boarding_point?: string | null
          booking_date?: string
          booking_status?: string | null
          bus_operator?: string | null
          created_at?: string
          departure_time?: string | null
          dropping_point?: string | null
          id?: string
          passenger_details?: Json | null
          payment_status?: string | null
          route_from?: string
          route_to?: string
          seat_number?: string | null
          transaction_id?: string
          travel_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      buses: {
        Row: {
          base_price: number
          bus_number: string
          bus_type: string
          created_at: string
          driver_name: string
          driver_phone: string
          helper_name: string | null
          helper_phone: string | null
          id: string
          images: Json | null
          is_active: boolean | null
          route_id: string | null
          seating_type: string
          total_seats: number
          updated_at: string
        }
        Insert: {
          base_price: number
          bus_number: string
          bus_type: string
          created_at?: string
          driver_name: string
          driver_phone: string
          helper_name?: string | null
          helper_phone?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          route_id?: string | null
          seating_type: string
          total_seats: number
          updated_at?: string
        }
        Update: {
          base_price?: number
          bus_number?: string
          bus_type?: string
          created_at?: string
          driver_name?: string
          driver_phone?: string
          helper_name?: string | null
          helper_phone?: string | null
          id?: string
          images?: Json | null
          is_active?: boolean | null
          route_id?: string | null
          seating_type?: string
          total_seats?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "buses_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string
          contact_number: string | null
          created_at: string
          id: string
          manager_id: string | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          address: string
          contact_number?: string | null
          created_at?: string
          id?: string
          manager_id?: string | null
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          address?: string
          contact_number?: string | null
          created_at?: string
          id?: string
          manager_id?: string | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          boarding_points: string[] | null
          created_at: string
          dropping_points: string[] | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          boarding_points?: string[] | null
          created_at?: string
          dropping_points?: string[] | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          boarding_points?: string[] | null
          created_at?: string
          dropping_points?: string[] | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          distance_km: number | null
          duration_hours: number | null
          end_location: string
          id: string
          is_active: boolean | null
          name: string
          start_location: string
          stops: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          distance_km?: number | null
          duration_hours?: number | null
          end_location: string
          id?: string
          is_active?: boolean | null
          name: string
          start_location: string
          stops?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          distance_km?: number | null
          duration_hours?: number | null
          end_location?: string
          id?: string
          is_active?: boolean | null
          name?: string
          start_location?: string
          stops?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_transaction_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      user_role: "superadmin" | "agent" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["superadmin", "agent", "user"],
    },
  },
} as const
