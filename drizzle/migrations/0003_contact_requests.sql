CREATE TABLE public.contact_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
 contact text NOT NULL CHECK (char_length(contact) BETWEEN 3 AND 254),
 service text CHECK (char_length(service) <= 120),
 about text CHECK (char_length(about) <= 4000),
 file_names text[] NOT NULL DEFAULT '{}',
 consent_version text NOT NULL DEFAULT '2026-10-24',
 status text NOT NULL DEFAULT 'new',
 read_at timestamptz
);
GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT SELECT, UPDATE ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors send requests" ON public.contact_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND read_at IS NULL);
CREATE POLICY "Staff read requests" ON public.contact_requests FOR SELECT TO authenticated
 USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));
CREATE POLICY "Staff update requests" ON public.contact_requests FOR UPDATE TO authenticated
 USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'))
 WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));

GRANT INSERT ON public.brief_submissions TO anon, authenticated;
GRANT SELECT ON public.brief_submissions TO authenticated;
CREATE POLICY "Visitors send briefs" ON public.brief_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff read briefs" ON public.brief_submissions FOR SELECT TO authenticated
 USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'manager'));