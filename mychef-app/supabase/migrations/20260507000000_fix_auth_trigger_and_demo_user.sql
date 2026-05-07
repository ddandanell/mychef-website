-- Fix: auth.users trigger was failing because it referenced `profiles`
-- without the `public.` schema prefix. In the auth schema context,
-- unqualified table names don't resolve to public tables.
-- This caused ALL signups to fail with 500 "Database error saving new user".

-- 1. Drop the old trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Recreate the function with schema-qualified reference and error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'), 'staff')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Profile auto-create failed for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 4. Create demo user (if not exists)
-- Note: run this after the trigger is fixed so the profile auto-creates
-- If you prefer to create the user via the Supabase Auth UI instead,
-- skip this section and manually add the profile row.
DO $$
DECLARE
  demo_user_id UUID;
BEGIN
  -- Check if demo user already exists
  SELECT id INTO demo_user_id FROM auth.users WHERE email = 'demo@demo.id';
  
  IF demo_user_id IS NULL THEN
    demo_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      demo_user_id,
      'authenticated',
      'authenticated',
      'demo@demo.id',
      crypt('demodemo', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Demo Admin"}',
      NOW(),
      NOW()
    );
    
    -- The trigger should auto-create the profile, but ensure admin role
    UPDATE public.profiles
    SET role = 'admin', full_name = 'Demo Admin'
    WHERE id = demo_user_id;
  ELSE
    -- Ensure existing demo user has admin profile
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (demo_user_id, 'Demo Admin', 'admin')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin', full_name = 'Demo Admin';
  END IF;
END $$;
