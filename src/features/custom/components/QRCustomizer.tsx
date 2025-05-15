import { useState } from 'react';
import type { QRConfig } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import QRConfigForm from './QRConfigForm/QRConfigForm';

interface QRCustomizerProps {
    qrConfig: QRConfig;
    onConfigChange: (config: QRConfig) => void;
    onContentChange: (content: string) => void;
}

const QRCustomizer: React.FC<QRCustomizerProps> = ({ qrConfig, onContentChange, onConfigChange }) => {
    const [title, setTitle] = useState('');

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newContent = e.target.value;
        onContentChange(newContent);
    };

    return (
        <Card className="w-md px-0">
            <CardHeader>
                <CardTitle>Customize Options</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Mi código QR personal"
                    />
                </div>

                <div className="space-y-2 mt-5">
                    <Label htmlFor="content">Content</Label>
                    <Input
                        id="content"
                        value={qrConfig.data}
                        onChange={handleContentChange}
                        placeholder="https://ejemplo.com"
                    />
                </div>

                <QRConfigForm config={qrConfig} onChange={onConfigChange} />
            </CardContent>
        </Card>
    );
};

export default QRCustomizer;
