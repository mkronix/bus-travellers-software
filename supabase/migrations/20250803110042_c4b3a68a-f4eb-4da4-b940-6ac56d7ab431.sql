-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('superadmin', 'agent', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  permissions JSONB DEFAULT '{}', -- Store module permissions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, role)
);

-- Create locations table
CREATE TABLE public.locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('head_branch', 'sub_branch')),
  address TEXT NOT NULL,
  manager_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  start_location TEXT NOT NULL,
  end_location TEXT NOT NULL,
  distance_km INTEGER,
  duration_hours DECIMAL(4,2),
  stops JSONB DEFAULT '[]', -- Array of stop objects with location and order
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create buses table
CREATE TABLE public.buses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bus_number TEXT UNIQUE NOT NULL,
  bus_type TEXT NOT NULL CHECK (bus_type IN ('ac', 'non_ac')),
  seating_type TEXT NOT NULL CHECK (seating_type IN ('sleeper', 'semi_sleeper', 'seater')),
  total_seats INTEGER NOT NULL,
  driver_name TEXT NOT NULL,
  driver_phone TEXT NOT NULL,
  helper_name TEXT,
  helper_phone TEXT,
  route_id UUID REFERENCES public.routes(id) ON DELETE SET NULL,
  base_price DECIMAL(10,2) NOT NULL,
  images JSONB DEFAULT '[]', -- Array of image URLs
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role AS $$
  SELECT role FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- User roles policies (only superadmin can manage roles)
CREATE POLICY "Superadmin can view all user roles" ON public.user_roles
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Superadmin can insert user roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Superadmin can update user roles" ON public.user_roles
  FOR UPDATE USING (public.get_user_role(auth.uid()) = 'superadmin');

CREATE POLICY "Superadmin can delete user roles" ON public.user_roles
  FOR DELETE USING (public.get_user_role(auth.uid()) = 'superadmin');

-- Locations policies (superadmin and agents can view, only superadmin can modify)
CREATE POLICY "Admin and agents can view locations" ON public.locations
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('superadmin', 'agent'));

CREATE POLICY "Superadmin can manage locations" ON public.locations
  FOR ALL USING (public.get_user_role(auth.uid()) = 'superadmin');

-- Routes policies (admin and agents can view, only superadmin can modify)
CREATE POLICY "Admin and agents can view routes" ON public.routes
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('superadmin', 'agent'));

CREATE POLICY "Superadmin can manage routes" ON public.routes
  FOR ALL USING (public.get_user_role(auth.uid()) = 'superadmin');

-- Buses policies (admin and agents can view, only superadmin can modify)
CREATE POLICY "Admin and agents can view buses" ON public.buses
  FOR SELECT USING (public.get_user_role(auth.uid()) IN ('superadmin', 'agent'));

CREATE POLICY "Superadmin can manage buses" ON public.buses
  FOR ALL USING (public.get_user_role(auth.uid()) = 'superadmin');

-- Update bookings policies to allow admin access
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;

CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (
    auth.uid() = user_id OR 
    public.get_user_role(auth.uid()) IN ('superadmin', 'agent')
  );

CREATE POLICY "Users can insert their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update all bookings" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    public.get_user_role(auth.uid()) IN ('superadmin', 'agent')
  );

-- Create triggers for updated_at
CREATE TRIGGER user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER routes_updated_at
  BEFORE UPDATE ON public.routes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER buses_updated_at
  BEFORE UPDATE ON public.buses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial route data (Sidhpur-Patan to Mumbai Jogeshwari West)
INSERT INTO public.routes (name, start_location, end_location, distance_km, duration_hours, stops) VALUES
('Sidhpur-Patan to Mumbai Route', 'Sidhpur', 'Mumbai Jogeshwari West', 520, 12.5, '[
  {"name": "Sidhpur", "order": 1, "distance_km": 0},
  {"name": "Patan", "order": 2, "distance_km": 15},
  {"name": "Unjha", "order": 3, "distance_km": 45},
  {"name": "Mehsana", "order": 4, "distance_km": 65},
  {"name": "Kalol", "order": 5, "distance_km": 85},
  {"name": "Ahmedabad", "order": 6, "distance_km": 120},
  {"name": "Nadiad", "order": 7, "distance_km": 165},
  {"name": "Anand", "order": 8, "distance_km": 185},
  {"name": "Bharuch", "order": 9, "distance_km": 220},
  {"name": "Ankleshwar", "order": 10, "distance_km": 240},
  {"name": "Surat", "order": 11, "distance_km": 280},
  {"name": "Navsari", "order": 12, "distance_km": 315},
  {"name": "Mumbai Jogeshwari West", "order": 13, "distance_km": 520}
]'::jsonb);

-- Insert initial buses (2 AC, 2 Non-AC sleeper buses)
DO $$
DECLARE
    route_uuid UUID;
BEGIN
    SELECT id INTO route_uuid FROM public.routes WHERE name = 'Sidhpur-Patan to Mumbai Route' LIMIT 1;
    
    INSERT INTO public.buses (bus_number, bus_type, seating_type, total_seats, driver_name, driver_phone, helper_name, helper_phone, route_id, base_price) VALUES
    ('GJ-01-RJ-1001', 'ac', 'sleeper', 42, 'Rajesh Kumar', '9876543210', 'Suresh Patel', '9876543211', route_uuid, 1200),
    ('GJ-01-RJ-1002', 'ac', 'sleeper', 42, 'Mahesh Shah', '9876543212', 'Ramesh Modi', '9876543213', route_uuid, 1200),
    ('GJ-01-RJ-2001', 'non_ac', 'sleeper', 45, 'Prakash Joshi', '9876543214', 'Dinesh Amin', '9876543215', route_uuid, 800),
    ('GJ-01-RJ-2002', 'non_ac', 'sleeper', 45, 'Kiran Dave', '9876543216', 'Hitesh Patel', '9876543217', route_uuid, 800);
END $$;