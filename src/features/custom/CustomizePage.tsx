import { toast } from 'sonner';
import QRCustomizer from './components/QRCustomizer';
import QRPreview from './components/QRPreview';
import { useQRManager } from '@/hooks/useQRManager';

const CustomizePage = () => {
    const {
        isSaving,
        title,
        setTitle,
        qrConfig,
        setQrConfig,
        qrRef,
        handleDownload,
        handleContentChange,
        handleSaveQRCode
    } = useQRManager();

    const handleSave = async () => {

        if (!title.trim()) {
            alert('Por favor ingresa un título para tu QR');
            return;
        }
        
        const success = await handleSaveQRCode(title);
        if (success) {
            toast("Nice! QR saved 🎉", {
                description: "Check it out in your list of saved codes.",
                duration: 4000,
                style: {backgroundColor: '#eaeaea', color:'#07485b'}
            })
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-start justify-center pt-32 pb-20 gap-8">
            <QRCustomizer
                title={title}
                setTitle={setTitle}
                qrConfig={qrConfig}
                onConfigChange={setQrConfig}
                onContentChange={handleContentChange}
                />
            <div className="lg:sticky top-32 h-full w-full lg:w-auto">
                <QRPreview 
                    qrRef={qrRef}
                    qrConfig={qrConfig} 
                    content={qrConfig.data}
                    onDownload={handleDownload}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            </div>
        </div>
    );
};

export default CustomizePage;
