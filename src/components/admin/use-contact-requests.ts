import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ContactRequest = { id: string; created_at: string; name: string; contact: string; service: string | null; about: string | null; read_at: string | null };

/** Polls new site requests so staff see them without reloading the CRM. */
export function useContactRequests(intervalMs = 30000) {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from('contact_requests').select('id, created_at, name, contact, service, about, read_at').order('created_at', { ascending: false }).limit(20);
    if (data) setRequests(data);
  }, []);
  useEffect(() => {
    void load();
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') void load(); }, intervalMs);
    return () => window.clearInterval(timer);
  }, [load, intervalMs]);
  const markRead = useCallback(async (id: string) => {
    const read_at = new Date().toISOString();
    setRequests(list => list.map(item => item.id === id ? { ...item, read_at } : item));
    await supabase.from('contact_requests').update({ read_at, status: 'read' }).eq('id', id);
  }, []);
  return { requests, unread: requests.filter(item => !item.read_at).length, markRead };
}
