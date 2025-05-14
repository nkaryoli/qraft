import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QRConfig } from '../../features/qrGenerator/components/types';

interface QRDisplayProps {
    config: QRConfig;
    className?: string;
}

export interface QRDisplayRef {
    download: (fileName?: string) => void;
}

export const QRDisplay = forwardRef<QRDisplayRef, QRDisplayProps>(({ config, className }, ref) => {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<QRCodeStyling | null>(null);

    useImperativeHandle(ref, () => ({
        download: (fileName = 'qr-code') => {
            qrCodeRef.current?.download({
                name: fileName,
                extension: 'png'
            });
        }
    }));
    
    useEffect(() => {
        if (!qrCodeRef.current) {
            qrCodeRef.current = new QRCodeStyling(config);
        } else {
            qrCodeRef.current.update(config);
        }

        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qrCodeRef.current.append(qrRef.current);
        }
    }, [config]);

    return (
        <div className={`flex justify-center ${className}`}>
            <div ref={qrRef} />
        </div>
    );
});
