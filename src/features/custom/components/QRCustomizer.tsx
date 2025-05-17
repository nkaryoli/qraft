import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import QRConfigForm from './QRConfigForm/QRConfigForm';
import { useQR } from '@/hooks/QRContext';

const QRCustomizer= () => {
    const { title, setTitle, qrConfig, handleContentChange } = useQR();

    return (
        <Card className="w-[90vw] sm:w-md">

            <CardHeader>
                <CardTitle className='text-xl text-foreground'>Customize Options</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="title" className='text-foreground'>Title</Label>
                    <Input
                        id="title"
                        type='text'
                        value={title ?? ''}
                        placeholder="Mi código QR personal"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="space-y-2 mt-5">
                    <Label htmlFor="content" className='text-foreground'>Content</Label>
                    <Input
                        id="content"
                        value={qrConfig.data}
                        onChange={(e) => handleContentChange(e.target.value)}
                        placeholder="https://ejemplo.com"
                    />
                </div>

                <QRConfigForm />
            </CardContent>
        </Card>
    );
};

export default QRCustomizer;
