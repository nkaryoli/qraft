import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSupabase } from "./useSupabaseAuth";
import { useCallback, useEffect, useRef, useState } from "react";
import type { QRConfig } from "@/types";
import { defaultQRConfig } from "@/constanst";
import { QRCodeAPI } from "@/api/apiQRCode";
import type { QRDisplayRef } from "@/components/qrCode/QRDisplay";

export const useQRManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const supabase = useSupabase();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [qrConfig, setQrConfig] = useState<QRConfig>(defaultQRConfig);
	const qrRef = useRef<QRDisplayRef>(null);
	
    const loadQRConfigData = useCallback(() => {

        if (location.state?.qrConfig) {
            setQrConfig(prevConfig => ({
                ...prevConfig,
                ...location.state.qrConfig
            }));
            setIsLoading(false);
            return;
        }

        const pendingQRConfig = sessionStorage.getItem('pendingQRConfig');

        if (pendingQRConfig) {
            try {
                const parsedData = JSON.parse(pendingQRConfig);
                const configData = parsedData.config || parsedData;
                
                if (configData) {
                    setQrConfig(prevConfig => ({
                        ...prevConfig,
                        ...configData,
                        data: configData.data || ''
                    }));
                }
            } catch (error) {
                console.error('Error parsing QR config from sessionStorage:', error);
            }
        } else if (!location.state?.qrConfig) {
            navigate('/');
            return;
        }
        
        setIsLoading(false);
    }, [location, navigate]);

    useEffect(() => {
        loadQRConfigData();
    }, [loadQRConfigData]);

    const handleContentChange = (content: string) => {
        setQrConfig((prev) => ({
            ...prev,
            data: content,
        }));
    };

	const handleDownload = () => {
        qrRef.current?.download('my-qr-code');
    };

    const handleSaveQRCode = async (title: string, qr_data: string = qrConfig.data, qr_template: QRConfig = qrConfig) => {
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
            await qrApi.create(newQR);
            
            if (sessionStorage.getItem('pendingQRConfig')) {
                sessionStorage.removeItem('pendingQRConfig');
            }
            
            return true;
        } catch (error) {
            console.error('Error saving QR:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        // Estado
        isLoading,
        isSaving,
        title,
        setTitle,
        qrConfig,
        setQrConfig,
        qrRef,

        // Métodos
		handleDownload,
        handleContentChange,
        handleSaveQRCode
    };
};