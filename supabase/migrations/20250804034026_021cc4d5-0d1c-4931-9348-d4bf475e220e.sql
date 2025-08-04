-- Create default superadmin user function and trigger
CREATE OR REPLACE FUNCTION create_default_superadmin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if superadmin already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@rajdhani.com'
  ) THEN
    -- Insert default superadmin user
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_user_meta_data,
      aud,
      role
    ) VALUES (
      gen_random_uuid(),
      'admin@rajdhani.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"full_name": "Super Admin"}',
      'authenticated',
      'authenticated'
    );

    -- Get the created user ID and assign superadmin role
    INSERT INTO public.user_roles (user_id, role, permissions)
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
      }'::jsonb
    FROM auth.users 
    WHERE email = 'admin@rajdhani.com';
  END IF;
END;
$$;

-- Execute the function to create the default superadmin
SELECT create_default_superadmin();