CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  service text,
  about text NOT NULL,
  files text[] NOT NULL DEFAULT '{}',
  consent boolean NOT NULL DEFAULT false,
  consent_version text NOT NULL DEFAULT '2026-10-24',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can send a contact request"
  ON public.contact_submissions FOR INSERT TO anon
  WITH CHECK (consent = true AND char_length(name) >= 2 AND char_length(contact) >= 5 AND char_length(about) >= 10);
GRANT INSERT ON public.brief_submissions TO anon;
CREATE POLICY "Visitors can send a brief"
  ON public.brief_submissions FOR INSERT TO anon
  WITH CHECK (char_length(brief) >= 20 AND char_length(name) >= 2 AND char_length(email) >= 5);