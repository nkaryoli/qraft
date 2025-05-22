import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { cn } from '@/lib/utils';
import { UserPen } from 'lucide-react';
import type { BadgeConfig } from '@/types';

export function BadgePreview({ config }: { config: BadgeConfig }) {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling | null>(null);

    const qrSizes = {
        classic: {
            width: 80,
            height: 80,
        },
        modern: {
            width: 60,
            height: 60,
        },
        minimal: {
            width: 50,
            height: 50,
        }
    };

    useEffect(() => {
        const currentQrRef = qrRef.current;
        const currentSize = qrSizes[config.design.layout];

        qrCode.current = new QRCodeStyling({
            width: currentSize.width,
            height: currentSize.height,
            type: 'svg',
            data: config.qrConfig.data || 'https://example.com',
            image: config.qrConfig.includeLogoInQR && config.content.logoUrl
                ? config.content.logoUrl
                : undefined,
            dotsOptions: {
                color: config.qrConfig.color,
                type: 'rounded',
            },
            backgroundOptions: {
                color: config.qrConfig.backgroundColor,
            },
            imageOptions: {
                crossOrigin: 'anonymous',
                margin: 4,
                imageSize: 0.4,
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: config.qrConfig.color,
            },
            cornersDotOptions: {
                type: 'dot',
                color: config.qrConfig.color,
            },
        });

        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qrCode.current.append(qrRef.current);
        }

        return () => {
            if (currentQrRef) {
                currentQrRef.innerHTML = '';
            }
            qrCode.current = null;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        config.qrConfig.data,
        config.qrConfig.color,
        config.qrConfig.backgroundColor,
        config.qrConfig.includeLogoInQR,
        config.content.logoUrl,
        config.design.layout,
    ]);

    useEffect(() => {
        if (qrCode.current) {
            qrCode.current.update({
                data: config.qrConfig.data || 'https://example.com',
                image: config.qrConfig.includeLogoInQR && config.content.logoUrl
                    ? config.content.logoUrl
                    : undefined,
                dotsOptions: {
                    color: config.qrConfig.color,
                },
                backgroundOptions: {
                    color: config.qrConfig.backgroundColor,
                },
            });
        }
    }, [
        config.qrConfig.data,
        config.qrConfig.color,
        config.qrConfig.backgroundColor,
        config.qrConfig.includeLogoInQR,
        config.content.logoUrl,
    ]);

    const renderQRCode = () => (
        <div className="flex bg-black bg-opacity-10 rounded-xl p-2 w-fit">
            <div ref={qrRef} className="flex-shrink-0" />
        </div>
    );

    const layouts = {
        classic: (
            <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex w-full justify-center items-center gap-3 mb-6">
                        {config.content.logoUrl && (
                            <img
                                src={config.content.logoUrl}
                                alt="Organization Logo"
                                className="h-6 object-contain"
                            />
                        )}
                        <span className='h-6'></span>
                        <p className="text-lg font-medium opacity-90">
                            {config.content.organization || 'Organization Name'}
                        </p>
                    </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        {config.content.profileImageUrl ? (
                            <img
                                src={config.content.profileImageUrl}
                                alt="Profile"
                                className="w-36 h-40 rounded-sm object-cover border-4"
                                style={{ borderColor: config.design.primaryColor }}
                            />
                        ) : (
                            <div
                                className="w-36 h-40 rounded-sm border-4 flex flex-col items-center justify-center bg-black/10"
                                style={{ borderColor: config.design.primaryColor }}
                            >
                                <UserPen size={48} className="opacity-50" />
                                <p>Profile Picture</p>
                            </div>
                        )}
                    </div>

                    <h2 className="text-3xl font-bold my-3" style={{ color: config.design.primaryColor }}>
                        {config.content.employeeName || 'Full Name'}
                    </h2>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-medium opacity-90">
                            {config.content.position || 'Position'}
                        </p>
                        <p className="text-sm opacity-75">
                            {config.content.department || 'Department'}
                        </p>
                    </div>
                </div>

                {/* QR Code at bottom */}
                <div className="mt-auto">{renderQRCode()}</div>
            </div>
        ),
        modern: (
            <div className="flex h-full gap-6">
                {/* Left Side - Info */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-8">
                        {config.content.logoUrl && (
                            <img
                                src={config.content.logoUrl}
                                alt="Organization Logo"
                                className="h-8 object-contain mb-4"
                            />
                        )}
                        <h2 className="text-4xl font-bold mb-2" style={{ color: config.design.primaryColor }}>
                            {config.content.employeeName || 'Full Name'}
                        </h2>
                        <p className="text-xl font-medium opacity-90">
                            {config.content.position || 'Position'}
                        </p>
                        <p className="text-sm opacity-75 mt-1">
                            {config.content.department || 'Department'}
                        </p>
                    </div>
                </div>

                {/* Right Side - Photo & QR */}
                <div className="flex flex-col items-center justify-between">
                    <div className="relative">
                        {config.content.profileImageUrl ? (
                            <img
                                src={config.content.profileImageUrl}
                                alt="Profile"
                                className="w-40 h-44 rounded-xl object-cover border-4"
                                style={{ borderColor: config.design.primaryColor }}
                            />
                        ) : (
                            <div
                                className="w-40 h-44 rounded-xl border-4 flex flex-col items-center justify-center bg-black/10"
                                style={{ borderColor: config.design.primaryColor }}
                            >
                                <UserPen size={48} className="opacity-50" />
                            </div>
                        )}
                    </div>
                    {renderQRCode()}
                </div>
            </div>
        ),
        minimal: (
            <div className="relative h-full p-4">
                {/* QR Code Overlay */}
                <div className="absolute top-4 right-4">
                    {renderQRCode()}
                </div>

                {/* Content */}
                <div className="flex flex-col h-full justify-center items-center">
                    {config.content.logoUrl && (
                        <img
                            src={config.content.logoUrl}
                            alt="Organization Logo"
                            className="h-6 object-contain mb-8"
                        />
                    )}
                    <h2 className="text-3xl font-bold mb-2" style={{ color: config.design.primaryColor }}>
                        {config.content.employeeName || 'Full Name'}
                    </h2>
                    <p className="text-lg font-medium opacity-90">
                        {config.content.position || 'Position'}
                    </p>
                    {config.content.department && (
                        <p className="text-sm opacity-75 mt-1">
                            {config.content.department}
                        </p>
                    )}
                </div>
            </div>
        ),
    };

    const templateSizes = {
        classic: {
            width: '350px',
            height: '600px',
            padding: 'p-8',
        },
        modern: {
            width: '600px',
            height: '350px',
            padding: 'p-6',
        },
        minimal: {
            width: '400px',
            height: '250px',
            padding: 'p-0',
        },
    };

    const currentSize = templateSizes[config.design.layout];

    return (
        <div
            className={cn(
                'rounded-lg transition-all',
                currentSize.padding,
                config.design.shadow && 'shadow-2xl',
                'border border-opacity-20  hover:border-opacity-30',
                'mx-auto',
                'my-2'
            )}
            style={{
                backgroundColor: config.design.backgroundColor,
                color: config.design.textColor,
                borderRadius: `${config.design.cornerRadius}px`,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0))',
                width: currentSize.width,
                height: currentSize.height,
            }}
        >
            <div className="w-full h-full">
                {layouts[config.design.layout]}
            </div>
        </div>
    );
}