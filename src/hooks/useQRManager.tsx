import { useUser } from "@clerk/clerk-react";
import { useSupabase } from "./useSupabaseAuth";
import { useCallback, useMemo, useState } from "react";
import type { QRConfig } from "@/types";
import { QRCodeAPI } from "@/api/apiQRCode";
import { toast } from "sonner";
import { useQR } from "./QRContext";

export const useQRManager = () => {
    const { user } = useUser();
    const supabase = useSupabase();
    const [isSaving, setIsSaving] = useState(false);

    const { qrRef, qrConfig } = useQR();

	const handleDownload = useCallback(() => {
        qrRef.current?.download('my-qr-code');
    }, [qrRef]);

    const handleSaveQRCode = useCallback(async (title: string, qr_data: string = qrConfig.data, qr_template: QRConfig = qrConfig) => {
        if (!supabase || !user?.id) return;

        try {
            setIsSaving(true);

            const newQR = {
                qr_data,
                user_id: user.id,
                qr_template,
                title,
            }
            const qrApi = QRCodeAPI(supabase);
            console.log('Saving QR:', newQR);
            await qrApi.create(newQR);
            
            if (sessionStorage.getItem('pendingQRConfig')) {
                sessionStorage.removeItem('pendingQRConfig');
            }
            toast("Nice! QR saved 🎉", {
                description: "Check it out in your list of saved codes.",
                duration: 4000,
                style: {backgroundColor: '#eaeaea', color:'#07485b'}
            })
            // return true;
        } catch (error) {
            console.error('Error saving QR:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [supabase, user?.id, qrConfig]);

    return useMemo(() => (
        { isSaving, handleDownload, handleSaveQRCode}), 
        [ isSaving, handleDownload, handleSaveQRCode ]
    );
};