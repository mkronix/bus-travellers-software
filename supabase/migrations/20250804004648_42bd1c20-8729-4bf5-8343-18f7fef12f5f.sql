
-- Create a default superadmin user in profiles table
-- This will be a placeholder entry that gets updated when the actual user signs up
INSERT INTO public.profiles (id, email, full_name, phone, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@rajdhani.com',
  'Super Administrator',
  '+91-9876543210',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Create the superadmin role for this user
INSERT INTO public.user_roles (user_id, role, permissions, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'superadmin',
  '{}'::jsonb,
  now(),
  now()
)
ON CONFLICT (user_id, role) DO NOTHING;

-- Update the handle_new_user function to check for admin email and assign role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  
  -- Check if this is the admin email and assign superadmin role
  IF new.email = 'admin@rajdhani.com' THEN
    -- Update the placeholder profile with the real user ID
    UPDATE public.profiles 
    SET id = new.id 
    WHERE email = 'admin@rajdhani.com' AND id = '00000000-0000-0000-0000-000000000000'::uuid;
    
    -- Update the user role with the real user ID
    UPDATE public.user_roles 
    SET user_id = new.id 
    WHERE user_id = '00000000-0000-0000-0000-000000000000'::uuid;
    
    -- If the update didn't affect any rows, insert a new role
    IF NOT FOUND THEN
      INSERT INTO public.user_roles (user_id, role, permissions)
      VALUES (new.id, 'superadmin', '{}'::jsonb);
    END IF;
  END IF;
  
  RETURN new;
END;
$$;
