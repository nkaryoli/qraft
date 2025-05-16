import { QRDisplay, type QRDisplayRef } from '@/components/qrCode/QRDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { QRConfig } from '@/types';
import { DownloadIcon, HeartPlus } from 'lucide-react';
import QRPreviewModal from './QRPreviewModal';
import { memo } from 'react';

interface QRPreviewProps {
    qrRef: React.RefObject<QRDisplayRef | null>;
    qrConfig: QRConfig;
    content: string;
    onDownload: () => void;
    onSave: () => void;
    isSaving: boolean;
}

const QRPreview: React.FC<QRPreviewProps> = ({ qrRef, qrConfig, content, onDownload, onSave, isSaving }) => {
    const isMobile = useIsMobile(1040);

    return (
        <>
            {!isMobile ? (
                <Card className="w-[90vw] sm:w-auto">
                    <CardHeader>
                        <CardTitle className='text-foreground text-xl'>Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <QRDisplay ref={qrRef} config={{ ...qrConfig, data: content }} />
                        <div className="text-sm text-foreground text-center">
                            <p>Scan your QR Code to test it</p>
                        </div>
                    </CardContent>
                    <CardFooter className='gap-3 w-full justify-center'>
                        <Button
                            variant="secondary"
                            className="gap-2 sm:w-40"
                            size="lg"
                            onClick={onDownload}
                        >
                            <DownloadIcon size={4}  />
                            Download
                        </Button>
                        <Button 
                            className="gap-2 sm:w-40" 
                            size="lg"
                            onClick={onSave}
                            disabled={isSaving}
                        >
                            <HeartPlus size={4} />
                            {!isMobile && ( isSaving ? 'Saving...' : 'Save' )}
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <QRPreviewModal 
                    qrRef={qrRef} 
                    onSave={onSave}
                    onDownload={onDownload} 
                    qrConfig={qrConfig} content={content}                    
                />   
            ) }
        </>
    );
};

export default memo(QRPreview);
