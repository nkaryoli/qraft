import { QRDisplay, type QRDisplayRef } from '@/components/qrCode/QRDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { QRConfig } from '@/types';
import { DownloadIcon, HeartPlus } from 'lucide-react';
import { useRef } from 'react';

interface QRPreviewProps {
    qrConfig: QRConfig;
    content: string;
}

const QRPreview: React.FC<QRPreviewProps> = ({ qrConfig, content }) => {
    const qrRef = useRef<QRDisplayRef>(null);
    const isMobile = useIsMobile(640);

    const handleDownload = () => {
        qrRef.current?.download('my-qr-code');
    };

    return (
        <Card className="w-[90vw] sm:w-auto">
            <CardHeader>
                <CardTitle className='text-foreground text-xl'>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <QRDisplay ref={qrRef} config={{ ...qrConfig, data: content }} />
                <div className="text-sm text-foreground text-center">
                    <p>Scan your QR Code to test it</p>
                </div>
                <div className="flex gap-3 w-full justify-center">
                    <Button
                        variant="secondary"
                        className="gap-2 sm:w-40"
                        size="lg"
                        onClick={handleDownload}
                    >
                        <DownloadIcon size={4}  />
                        Download QR
                    </Button>
                    <Button className="gap-2 sm:w-40" size="lg">
                        <HeartPlus size={4} />
                        {!isMobile && 'Save'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default QRPreview;
