import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import QRCodeStyling, { type Options as QRCodeOptions } from 'qr-code-styling';

export interface QRDisplayRef {
    download: (fileName?: string) => void;
}

interface QRDisplayProps {
    config: QRCodeOptions;
    className?: string;
}

const QRDisplay = forwardRef<QRDisplayRef, QRDisplayProps>(({ config, className }, ref) => {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCodeRef = useRef<QRCodeStyling | null>(null);

    useEffect(() => {
        if (!qrCodeRef.current) {
            qrCodeRef.current = new QRCodeStyling(config);
            if (qrRef.current) qrCodeRef.current.append(qrRef.current);
        } else {
            qrCodeRef.current.update(config);
        }
    }, [config]);

    useImperativeHandle(ref, () => ({
        download: (fileName = 'qr-code') => {
            qrCodeRef.current?.download({ name: fileName, extension: 'png' });
        },
    }));

    return (
        <div className={`flex justify-center ${className || ''}`}>
            <div ref={qrRef} />
        </div>
    );
});

export default memo(QRDisplay);
