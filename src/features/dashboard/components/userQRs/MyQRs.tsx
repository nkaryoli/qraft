import type { QRCode } from '@/supabase/types';
import QRTable from './QRTable';
import { PacmanLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MyQRsProps {
    qrs: QRCode[];
    isLoading?: boolean;
}

const MyQRs: React.FC<MyQRsProps> = ({ qrs, isLoading = false }) => {
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
                    <h2 className="text-2xl font-semibold">No QR Codes Yet</h2>
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
        <div className="w-full flex flex-col items-center justify-center gap-9">
            <>
                <h2 className="text-2xl font-semibold w-full max-w-5xl">My QR Codes</h2>
                <QRTable qrs={qrs} />
            </>
        </div>
    );
};

export default MyQRs;
