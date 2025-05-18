import QRDisplay from '@/components/qrCode/QRDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DownloadIcon, HeartPlus } from 'lucide-react';
import { memo } from 'react';
import { useQR } from '@/hooks/QRContext';
import { useQRManager } from '@/hooks/useQRManager';
import QRPreviewModal from './QRPreviewModal';

const QRPreview = () => {
    const { isSaving, handleDownload, handleSaveQRCode } = useQRManager();
    const { title, qrRef, qrConfig } = useQR();
    const isMobile = useIsMobile(1040);

    return (
        <>
            {!isMobile ? (
                <Card className="w-[90vw] sm:w-auto">
                    <CardHeader>
                        <CardTitle className='text-foreground text-xl'>Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <QRDisplay ref={qrRef} config={qrConfig} />
                        <div className="text-sm text-foreground text-center">
                            <p>Scan your QR Code to test it</p>
                        </div>
                    </CardContent>
                    <CardFooter className='gap-3 w-full justify-center'>
                        <Button
                            variant="secondary"
                            className="gap-2 sm:w-40"
                            size="lg"
                            onClick={() => handleDownload(qrRef)}
                        >
                            <DownloadIcon size={4}  />
                            Download
                        </Button>
                        <Button 
                            className="gap-2 sm:w-40" 
                            size="lg"
                            onClick={() => handleSaveQRCode(title, qrConfig.data, qrConfig)}
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
                    onSave={handleSaveQRCode}
                    onDownload={handleDownload} 
                    qrConfig={qrConfig} title={title}                    
                />   
            ) }
        </>
    );
};

export default memo(QRPreview);
