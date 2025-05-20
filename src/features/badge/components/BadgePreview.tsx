import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { cn } from '@/lib/utils';
import { UserPen } from 'lucide-react';
import type { BadgeConfig } from '@/types';

export function BadgePreview({ config }: { config: BadgeConfig }) {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling | null>(null);

    useEffect(() => {
        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling({
                width: 80,
                height: 80,
                type: 'svg',
                data: config.qrConfig.data || 'https://example.com',
                image:
                    config.qrConfig.includeLogoInQR && config.content.logoUrl
                        ? config.content.logoUrl
                        : '',
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
                qrCode.current.append(qrRef.current);
            }
        } else {
            qrCode.current.update({
                data: config.qrConfig.data || 'https://example.com',
                image:
                    config.qrConfig.includeLogoInQR && config.content.logoUrl
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

    return (
        <div
            className={cn(
                'rounded-lg p-8 shadow-lg transition-all w-[350px] h-[600px] flex flex-col',
                config.design.shadow && 'shadow-2xl',
                'border border-opacity-20 border-white',
            )}
            style={{
                backgroundColor: config.design.backgroundColor,
                color: config.design.textColor,
                borderRadius: `${config.design.cornerRadius}px`,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0))',
            }}
        >
            {config.content.logoUrl ? (
                <div className="flex w-full justify-center items-center gap-3 mb-6 h-20">
                    <img
                        src={config.content.logoUrl}
                        alt="Organization Logo"
                        className="h-6 object-contain"
                    />
                    <p className="text-lg font-medium opacity-90">
                        {config.content.organization || 'Organization Name'}
                    </p>
                </div>
            ) : (
                <div className="mb-6 h-20" />
            )}

            <div className="flex flex-col items-center mb-8">
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
                    <div
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.design.primaryColor }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                <h2
                    className="text-3xl font-bold my-3"
                    style={{ color: config.design.primaryColor }}
                >
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
                <div className="flex bg-black bg-opacity-10 rounded-xl p-2 w-fit mt-3">
                    <div ref={qrRef} className="flex-shrink-0" />
                </div>
            </div>
        </div>
    );
}
