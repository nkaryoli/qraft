/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { GradientOption, QRConfig } from '../../types';

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
                extension: 'png',
            });
        },
    }));

    useEffect(() => {
        // Función para transformar el gradiente a formato compatible
        const transformGradient = (helper: any) => {
            if (!helper?.colorType.gradient) return undefined;

            return {
                type: (helper.gradient.linear ? 'linear' : 'radial') as GradientOption,
                rotation: Number(helper.gradient.rotation) || 0,
                colorStops: [
                    { offset: 0, color: helper.gradient.color1 },
                    { offset: 1, color: helper.gradient.color2 },
                ],
            };
        };

        const transformedConfig = {
            ...config,
            dotsOptions: config.dotsOptions
                ? {
                      type: config.dotsOptions.type,
                      color: config.dotsOptions.color,
                      gradient: transformGradient(config.dotsOptionsHelper),
                  }
                : undefined,
            backgroundOptions: config.backgroundOptions
                ? {
                      ...config.backgroundOptions,
                      gradient: config.backgroundOptions.gradient
                          ? {
                                type: config.backgroundOptions.gradient.type as GradientOption,
                                rotation: Number(config.backgroundOptions.gradient.rotation) || 0,
                                colorStops: config.backgroundOptions.gradient.colorStops || [
                                    { offset: 0, color: '#000000' },
                                    { offset: 1, color: '#000000' },
                                ],
                            }
                          : undefined,
                  }
                : undefined,
        };

        if (!qrCodeRef.current) {
            qrCodeRef.current = new QRCodeStyling(transformedConfig as any);
        } else {
            qrCodeRef.current.update(transformedConfig as any);
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
