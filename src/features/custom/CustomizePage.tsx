import { QrCode, Sparkles } from 'lucide-react';
import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import { QRProvider } from '@/hooks/QRContext';

const CustomizePage = () => {
    return (
        <QRProvider>
            <div className="flex flex-col items-start pt-32 pb-20 gap-14">
                <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 text-primary mb-2">
                        <QrCode size={32} className="animate-pulse" />
                        <Sparkles size={24} />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Create Your Custom QR Code
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Design a unique QR code that matches your brand. Customize colors, 
                        add your logo, and make it stand out.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-center w-full gap-8">
                    <QRCustomizer />
                    <div className="lg:sticky top-32 h-full w-full lg:w-auto">
                        <QRPreview />
                    </div>
                </div>
            </div>
        </QRProvider>
    );
};

export default CustomizePage;
