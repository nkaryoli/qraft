import { QRDisplay, type QRDisplayRef } from '@/components/qrCode/QRDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { QRConfig } from '@/types';
import { DownloadIcon, HeartPlus } from 'lucide-react';
import { useRef } from 'react';

interface QRPreviewProps {
    qrConfig: QRConfig;
    content: string;
}

const QRPreview: React.FC<QRPreviewProps> = ({ qrConfig, content }) => {
    const qrRef = useRef<QRDisplayRef>(null);

    const handleDownload = () => {
        qrRef.current?.download('my-qr-code');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <QRDisplay ref={qrRef} config={{ ...qrConfig, data: content }} />
                <div className="text-sm text-muted-foreground">
                    <p>Scan your QR Code to test it</p>
                </div>
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
                    <Button className="gap-2 w-40" size="lg">
                        <HeartPlus size={4} />
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default QRPreview;
