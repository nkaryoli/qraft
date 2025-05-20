/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, type ChangeEvent, memo } from 'react';
import type { QRConfig, ImageOptionsType } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface ImageOptionsProps {
    config: QRConfig;
    onChange: (options: QRConfig['imageOptions']) => void;
    onImageChange: (image: string) => void;
}

const ImageOptions = ({ config, onChange, onImageChange }: ImageOptionsProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState(config.image || '');

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target?.result as string;
            setPreviewImage(imageData);
            onImageChange(imageData);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewImage('');
        onImageChange('');
    };

    const handleImageOptionChange = (key: keyof ImageOptionsType, value: any) => {
        onChange({
            ...config.imageOptions,
            [key]: value,
        });
    };

    return (
        <div className="p-6 space-y-4">
            <div className="flex flex-col items-center gap-4">
                {previewImage ? (
                    <>
                        <div className="relative">
                            <img
                                src={previewImage}
                                alt="QR Center Preview"
                                className="w-32 h-32 object-contain border rounded-md"
                            />
                            <Button
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2"
                                onClick={handleRemoveImage}
                            >
                                ×
                            </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">Image loaded</span>
                    </>
                ) : (
                    <>
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            Upload Image
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <span className="text-sm text-muted-foreground">
                            Recommended: 300x300px transparent PNG
                        </span>
                    </>
                )}
            </div>

            {previewImage && (
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>
                            Image Size ({((config.imageOptions?.imageSize || 0.3) * 100).toFixed(0)}
                            %)
                        </Label>
                        <Input
                            type="range"
                            min="0.1"
                            max="0.5"
                            step="0.05"
                            value={config.imageOptions?.imageSize || 0.3}
                            onChange={(e) =>
                                handleImageOptionChange('imageSize', parseFloat(e.target.value))
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="hide-dots">Hide Dots Behind Image</Label>
                        <Switch
                            id="hide-dots"
                            checked={config.imageOptions?.hideBackgroundDots || false}
                            onCheckedChange={(checked) =>
                                handleImageOptionChange('hideBackgroundDots', checked)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Image Margin (px)</Label>
                        <Input
                            type="number"
                            min="0"
                            max="20"
                            value={config.imageOptions?.margin || 0}
                            onChange={(e) =>
                                handleImageOptionChange('margin', parseInt(e.target.value))
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(ImageOptions);
