// hooks/useSupabase.ts
import { useSession } from '@clerk/clerk-react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

export const useSupabase = (): SupabaseClient | null => {
    const { session } = useSession();

    return useMemo(() => {
        if (!session) return null;

        return createClient( import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_ANON_KEY!,
            {
                global: {
                fetch: async (url, options = {}) => {
                    const token = await session.getToken({ template: 'supabase' });
                    const headers = new Headers(options?.headers);
                    if (token) headers.set('Authorization', `Bearer ${token}`);
                    return fetch(url, { ...options, headers });
                },
                },
            },
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.id]);
};
