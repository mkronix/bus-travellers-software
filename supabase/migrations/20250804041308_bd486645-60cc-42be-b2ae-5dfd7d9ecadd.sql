
-- First, let's check and recreate the superadmin user properly
-- Delete existing superadmin if it exists (to start fresh)
DELETE FROM public.user_roles WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'admin@rajdhani.com'
);

DELETE FROM public.profiles WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'admin@rajdhani.com'
);

DELETE FROM auth.users WHERE email = 'admin@rajdhani.com';

-- Create the superadmin user with proper password hashing
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  aud,
  role,
  confirmation_token,
  email_change_token_current,
  email_change_confirm_status,
  recovery_token,
  phone_change_token,
  phone_change_sent_at
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@rajdhani.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Super Admin"}',
  'authenticated',
  'authenticated',
  '',
  '',
  0,
  '',
  '',
  null
);

-- Create profile for the superadmin
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
SELECT 
  id, 
  email, 
  'Super Admin',
  now(),
  now()
FROM auth.users 
WHERE email = 'admin@rajdhani.com';

-- Create user role for superadmin
INSERT INTO public.user_roles (user_id, role, permissions, created_at, updated_at)
SELECT 
  id, 
  'superadmin'::user_role,
  '{
    "buses": true,
    "routes": true,
    "bookings": true,
    "users": true,
    "locations": true,
    "reports": true
  }'::jsonb,
  now(),
  now()
FROM auth.users 
WHERE email = 'admin@rajdhani.com';
