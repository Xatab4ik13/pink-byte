CREATE TABLE public.brief_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL,
 email text NOT NULL,
 phone text,
 brief text NOT NULL,
 consent_at timestamptz NOT NULL DEFAULT now(),
 consent_version text NOT NULL DEFAULT '2026-10-24'
);
GRANT ALL ON public.brief_submissions TO service_role;
ALTER TABLE public.brief_submissions ENABLE ROW LEVEL SECURITY;