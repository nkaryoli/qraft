import { useEffect, useState } from 'react';
import { useSession } from '@clerk/clerk-react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getAuthenticatedClient, resetSupabaseClient } from '@/supabase/supabaseClient';

export const useSupabase = () => {
	const { session } = useSession();
	const [client, setClient] = useState<SupabaseClient | null>(null);

	useEffect(() => {
		const initSupabase = async () => {

		if (!session) {
			resetSupabaseClient();
			setClient(null);
			return;
		}

		try {

			const token = await session.getToken({ template: 'supabase' });

			if (!token) {
				throw new Error('No authentication token available');
			}
			
			const supabase = await getAuthenticatedClient(token);
			setClient(supabase);

		} catch (error) {
			console.error('Supabase auth error:', error);
			resetSupabaseClient();
		}
		};

		initSupabase();
	}, [session]);

	return client;
};