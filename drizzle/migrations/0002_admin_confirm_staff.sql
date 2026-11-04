CREATE OR REPLACE FUNCTION public.admin_add_staff(_user_id uuid, _role public.app_role, _full_name text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id) THEN RAISE EXCEPTION 'already staff'; END IF;
  UPDATE auth.users SET email_confirmed_at = COALESCE(email_confirmed_at, now()) WHERE id = _user_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'user not found'; END IF;
  UPDATE public.profiles SET full_name = left(trim(_full_name), 80) WHERE id = _user_id;
  INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, _role);
END $$;
REVOKE ALL ON FUNCTION public.admin_add_staff(uuid, public.app_role, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.admin_add_staff(uuid, public.app_role, text) TO authenticated;