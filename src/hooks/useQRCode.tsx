import type { QRConfig } from '../types';
import { useUser } from '@clerk/clerk-react';
import { useSupabase } from './useSupabaseAuth';
import { QRCodeAPI } from '@/api/apiQRCode';
import { useState } from 'react';

export function useQRCode() {
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const supabase = useSupabase();

    const handleSaveQRCode = async (title: string, qr_data: string, qr_template: QRConfig) => {
        if (!supabase || !user?.id) return;

        try {
            setLoading(true);

            const newQR = {
                qr_data,
                user_id: user.id,
                qr_template,
                title,
            };
            const qrApi = QRCodeAPI(supabase);
            await qrApi.create(newQR);
        } catch (error) {
            console.log('Error saving qr:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleSaveQRCode };
}
