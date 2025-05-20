import { useUser } from '@clerk/clerk-react';
import { useSupabase } from './useSupabaseAuth';
import { useCallback, useState } from 'react';

import { QRBadgeAPI } from '@/api/apiBadge';
import { toast } from 'sonner';
import type { BadgeConfig } from '@/types';

export function useQRBadge() {
	const [loading, setLoading] = useState(false);
	const { user } = useUser();
	const supabase = useSupabase();

	const loadBadges = useCallback(async () => {
        if (!supabase || !user?.id) return [];
        try {
            setLoading(true);
            const qrApi = QRBadgeAPI(supabase);
            const userQRs = await qrApi.getQRBadges(user.id);
            return userQRs || [];
        } catch (error) {
            console.error("Error loading QRs:", error);
            toast.error("Failed to load QRs.");
            return [];
        } finally {
            setLoading(false);
        }
    },[supabase, user?.id]);

	const handleSaveBadge = async ( badgeConfig: BadgeConfig ) => {
		if (!badgeConfig.content.employeeName || !badgeConfig.content.organization) {
			alert('Please fill in required fields: Employee Name and Organization');
			return;
		}

		if (!supabase || !user?.id) {
			alert('Authentication error. Please try again.');
			return;
		}

		try {
			setLoading(true);
			const newBadge = {
				config: badgeConfig,
				expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
				user_id: user.id,
			}
			const badgeApi = QRBadgeAPI(supabase);
			await badgeApi.create(newBadge);
		}catch (error) {
			console.error('Error saving badge:', error);
		} finally {
			setLoading(false);
		}
	}

	return { loading, handleSaveBadge, loadBadges };
}