import type { QRCode } from '@/supabase/types';
import QRTable from './QRTable';

interface MyQRsProps {
    qrs: QRCode[];
}

const MyQRs: React.FC<MyQRsProps> = ({ qrs }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-9">
            <h2 className="text-2xl font-semibold w-full max-w-5xl">My QR Codes</h2>
            <QRTable qrs={qrs} />
        </div>
    );
};

export default MyQRs;
