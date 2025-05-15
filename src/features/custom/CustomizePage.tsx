import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import type { QRConfig } from '@/types';

const CustomizePage = () => {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const rawData =
        location.state?.qrConfig || JSON.parse(sessionStorage.getItem('pendingQRConfig') || 'null');
    const initialConfig = rawData?.config || rawData;

    const [qrConfig, setQrConfig] = useState<QRConfig>({
        width: 300,
        height: 300,
        data: initialConfig?.data || '',
        dotsOptions: initialConfig?.dotsOptions || {
            color: '#000000',
            type: 'rounded',
        },
        dotsOptionsHelper: initialConfig?.dotsOptionsHelper || {
            colorType: { single: true, gradient: false },
            gradient: {
                linear: true,
                radial: false,
                color1: '#db073d',
                color2: '#dba507',
                rotation: 45,
            },
        },
        backgroundOptions: initialConfig?.backgroundOptions || {
            color: '#ffffff',
        },
        cornersSquareOptions: initialConfig?.cornersSquareOptions || {
            type: 'extra-rounded',
            color: '#db073d',
        },
        cornersDotOptions: initialConfig?.cornersDotOptions || {
            type: 'dot',
            color: '#0d6986',
        },
    });

    useEffect(() => {
        if (!isLoaded) return;
        if (!isSignedIn) {
            navigate('/signin');
            return;
        }

        // Limpiar el storage después de usar los datos
        if (sessionStorage.getItem('pendingQRConfig')) {
            sessionStorage.removeItem('pendingQRConfig');
        }

        // Si no hay datos del QR, redirigir al inicio
        if (!initialConfig) {
            navigate('/');
        }
    }, [isLoaded, isSignedIn, navigate, initialConfig]);

    if (!initialConfig) {
        return <div>Loading...</div>;
    }

    const handleContentChange = (content: string) => {
        setQrConfig((prev) => ({
            ...prev,
            data: content,
        }));
    };

    return (
        <div className="flex flex-col lg:flex-row items-start justify-center py-32 gap-8">
            <QRCustomizer
                qrConfig={qrConfig}
                onConfigChange={setQrConfig}
                onContentChange={handleContentChange}
            />
            <div className="sticky top-32 h-full">
                <QRPreview qrConfig={qrConfig} content={qrConfig.data} />
            </div>
        </div>
    );
};

export default CustomizePage;
