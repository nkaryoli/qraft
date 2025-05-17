import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import { QRProvider } from '@/hooks/QRContext';

const CustomizePage = () => {

    return (
        <QRProvider>
        <div className="flex flex-col lg:flex-row items-start justify-center pt-32 pb-20 gap-8">
            <QRCustomizer />
            <div className="lg:sticky top-32 h-full w-full lg:w-auto">
                <QRPreview   />
            </div>
        </div>
        </QRProvider>
    );
};

export default CustomizePage;
