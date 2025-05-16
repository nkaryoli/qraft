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

    const [title, setTitle] = useState('');
    const [qrConfig, setQrConfig] = useState<QRConfig>({
        width: 250,
        height: 250,
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
            type: 'square',
            color: '#db073d',
        },
        cornersSquareOptionsHelper: initialConfig?.cornersSquareOptionsHelper || {
            colorType: { single: true, gradient: false },
            gradient: {
                linear: true,
                radial: false,
                color1: '#db073d',
                color2: '#db073d',
                rotation: 0
            }
        },
        cornersDotOptions: initialConfig?.cornersDotOptions || {
            type: 'dot',
            color: '#0d6986'
        },
        cornersDotOptionsHelper: initialConfig?.cornersDotOptionsHelper || {
            colorType: { single: true, gradient: false },
            gradient: {
                linear: true,
                radial: false,
                color1: '#0d6986',
                color2: '#0d6986',
                rotation: 0
            }
        },
        image: initialConfig?.image,
        imageOptions: initialConfig?.imageOptions || {
            hideBackgroundDots: true,
            imageSize: 0.3,
            margin: 0,
            saveAsBlob: true
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
        <div className="flex flex-col lg:flex-row items-start justify-center pt-32 pb-20 gap-8">
            <QRCustomizer
                title={title}
                setTitle={() => setTitle}
                qrConfig={qrConfig}
                onConfigChange={setQrConfig}
                onContentChange={handleContentChange}
            />
            <div className="lg:sticky top-32 h-full w-full lg:w-auto">
                <QRPreview title={title} qrConfig={qrConfig} content={qrConfig.data} />
            </div>
        </div>
    );
};

export default CustomizePage;
