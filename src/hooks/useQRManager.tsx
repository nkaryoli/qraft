import { useUser } from "@clerk/clerk-react";
import { useSupabase } from "./useSupabaseAuth";
import { useCallback, useMemo, useState } from "react";
import type { QRConfig } from "@/types";
import { QRCodeAPI } from "@/api/apiQRCode";
import { toast } from "sonner";
import { useQR } from "./QRContext";
import type { QRDisplayRef } from "@/components/qrCode/QRDisplay";

export const useQRManager = () => {
    const { user } = useUser();
    const supabase = useSupabase();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { qrConfig } = useQR();

	const handleDownload = (qrRef: React.RefObject<QRDisplayRef | null>) => {
        qrRef.current?.download('my-qr-code');
    };

    const handleSaveQRCode = useCallback(async (title: string, qr_data: string = qrConfig.data, qr_template: QRConfig = qrConfig) => {
        if (!supabase || !user?.id || qr_data === '') return;

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
        } catch (error) {
            console.error('Error saving QR:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [supabase, user?.id, qrConfig]);

    const loadQRs = useCallback(async () => {
        if (!supabase || !user?.id) return [];
        try {
            setIsLoading(true);
            const qrApi = QRCodeAPI(supabase);
            const userQRs = await qrApi.getQRCode(user.id);
            return userQRs || [];
        } catch (error) {
            console.error("Error loading QRs:", error);
            toast.error("Failed to load QRs.");
            return [];
        } finally {
            setIsLoading(false);
        }
    },[supabase, user?.id]);

    return useMemo(() => (
        { isSaving, handleDownload, handleSaveQRCode, loadQRs, isLoading}), 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ isSaving, handleDownload, handleSaveQRCode ]
    );
};