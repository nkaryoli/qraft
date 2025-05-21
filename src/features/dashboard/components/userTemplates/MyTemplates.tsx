import { useNavigate } from 'react-router-dom';
import TemplateCard from './TemplateCard';
import type { QRCode } from '@/supabase/types';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PacmanLoader } from 'react-spinners';

interface MyTemplatesProps {
    qrs: QRCode[];
    isLoading?: boolean;
}

const MyTemplates: React.FC<MyTemplatesProps> = ({ qrs, isLoading = false  }) => {
    const navigate = useNavigate();
    
    if (isLoading) {
        return (
            <div className="w-full h-[50vh] flex items-center justify-center">
                <PacmanLoader
                    size={50}
                    color="#db073d"
                    speedMultiplier={0.5}
                />
            </div>
        );
    }

        if (qrs?.length === 0) {
        return (
            <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-6">
                <div className="text-center space-y-3">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <QrCode className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">No QR Templates Yet</h2>
                    <p className="text-muted-foreground">
                        Create your first custom QR code and start sharing!
                    </p>
                </div>
                <Button 
                    size="lg"
                    onClick={() => navigate('/customize')}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    Create Your First QR
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-9">
            <h2 className="text-2xl font-semibold">My Templates</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {qrs.map((qr) => (
                    <TemplateCard key={qr.id} qrTemplate={qr.qr_template} />
                ))}
            </div>
        </div>
    );
};

export default MyTemplates;
