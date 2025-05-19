import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { QRConfig } from '@/types';
import { defaultQRConfig } from '@/constanst';
import type { QRDisplayRef } from '@/components/qrCode/QRDisplay';
import { useLocation } from 'react-router-dom';

interface QRContextType {
	title: string;
	setTitle: (title: string) => void;
	qrConfig: QRConfig;
	setQrConfig: (config: QRConfig) => void;
	qrRef: React.RefObject<QRDisplayRef | null>;
	handleContentChange: (content: string) => void;           
    handleChange: <K extends keyof QRConfig>(key: K, value: QRConfig[K]) => void;
    handleNestedChange: <
        T extends keyof QRConfig,
        K extends keyof NonNullable<QRConfig[T]>
    >(
        parentKey: T,
        key: K,
        value: NonNullable<QRConfig[T]>[K]
    ) => void;
}

const QRContext = createContext<QRContextType | undefined>(undefined);

export const QRProvider = ({ children }: { children: React.ReactNode }) => {
	const [title, setTitle] = useState('');
	const [qrConfig, setQrConfig] = useState<QRConfig>(defaultQRConfig);
	const qrRef = useRef<QRDisplayRef>(null);
	const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

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
        }
        
        setIsLoading(false);
    }, [location.state]);

	useEffect(() => {
			loadQRConfigData();
	}, [loadQRConfigData]);
	
	const handleContentChange = useCallback((content: string) => {
        setQrConfig((prev) => ({ ...prev, data: content }));
    }, []);

	const handleChange = useCallback(<K extends keyof QRConfig>(key: K, value: QRConfig[K]) => {
        setQrConfig(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleNestedChange = useCallback(<
        T extends keyof QRConfig,
        K extends keyof NonNullable<QRConfig[T]>
    >(
        parentKey: T,
        key: K,
        value: NonNullable<QRConfig[T]>[K]
    ) => {
        setQrConfig(prev => ({
            ...prev,
            [parentKey]: {
                ...(prev[parentKey] as object),
                [key]: value
            }
        }));
    }, []);

	const value = useMemo(() => ({
        title, 
        setTitle,
		qrConfig, 
        setQrConfig,
		isLoading, 
		qrRef, 
        handleContentChange, 
        handleChange,
        handleNestedChange
	}), [title, qrConfig, isLoading, handleContentChange, handleChange, handleNestedChange]);

	return (
		<QRContext.Provider value={value}>
			{children}
		</QRContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQR = () => {
	const context = useContext(QRContext);
	if (!context) throw new Error('useQR must be used within a QRProvider');
	return context;
};