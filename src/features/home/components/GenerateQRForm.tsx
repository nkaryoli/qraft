import { QRDisplay, type QRDisplayRef } from '@/components/qrCode/QRDisplay';
import { Button } from '../../../components/ui/button';
import { ArrowRight, DownloadIcon, PaintbrushIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { QRConfig } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { RequireAuthAlert } from '@/components/RequireAuthAlert';

const GenerateQRForm = () => {
    const qrRef = useRef<QRDisplayRef>(null);
    const [content, setContent] = useState<string>('');
    const [qrConfig, setQrConfig] = useState<QRConfig>({
        width: 300,
        height: 300,
        data: '',
        dotsOptions: {
            color: '#000000',
            type: 'rounded',
        },
        backgroundOptions: {
            color: '#ffffff',
        },
    });
    const [showQR, setShowQR] = useState<boolean>(false);
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [showAuthAlert, setShowAuthAlert] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            setQrConfig((prev) => ({
                ...prev,
                data: content,
            }));
            setShowQR(true);
        }
    };

    useEffect(() => {
        if (!content.trim()) {
            setShowQR(false);
        }
    }, [content]);

    const handleCustomQR = () => {
        if (!isSignedIn) {
            sessionStorage.setItem(
                'pendingQRConfig',
                JSON.stringify({
                    config: qrConfig,
                    content: content,
                }),
            );
            setShowAuthAlert(true);
            return;
        }
        navigate('/customize', { state: { qrConfig } });
    };

    const handleDownload = () => {
        qrRef.current?.download('my-qr-code');
    };
    return (
        <div className="w-full max-w-lg">
            <form
                onSubmit={handleSubmit}
                className="flex w-full h-fit gap-2  p-3 bg-background rounded-xl"
            >
                <input
                    type="text"
                    required
                    placeholder="Enter URL or text"
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border p-2 text-md text-text-200 font-bodyText rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="lg" type="submit" className="shrink-0">
                    <ArrowRight />
                </Button>
            </form>
            {showQR && (
                <div className="flex flex-col items-center space-y-4 mt-3 py-9 bg-background rounded-xl">
                    <QRDisplay
                        ref={qrRef}
                        config={qrConfig}
                        className="border rounded-lg p-4 bg-white"
                    />
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            className="gap-2 w-40"
                            size="lg"
                            onClick={handleDownload}
                        >
                            <DownloadIcon size={4} />
                            Download QR
                        </Button>
                        <Button className="gap-2 w-40" size="lg" onClick={handleCustomQR}>
                            <PaintbrushIcon size={4} />
                            Customize
                        </Button>
                    </div>
                </div>
            )}
            <RequireAuthAlert
                open={showAuthAlert}
                onOpenChange={setShowAuthAlert}
                actionName="personalize your QR Code"
                onClick={() => navigate('/signin', { state: 'customize' })}
            />
        </div>
    );
};

export default GenerateQRForm;
