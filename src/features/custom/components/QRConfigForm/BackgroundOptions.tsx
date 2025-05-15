/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { QRConfig } from '@/types';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import ColorPicker from '@/components/ColorPiker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface BackgroundOptionsProps {
    config: QRConfig;
    onChange: (options: QRConfig['backgroundOptions']) => void;
}

const BackgroundOptions = ({ config, onChange }: BackgroundOptionsProps) => {
    const [showGradient, setShowGradient] = useState(
        config.backgroundOptions?.gradient !== undefined,
    );

    const defaultColor = '#ffffff';
    const currentBackgroundColor = config.backgroundOptions?.color || defaultColor;

    const handleColorTypeChange = (isGradient: boolean) => {
        setShowGradient(isGradient);
        if (!isGradient) {
            onChange({
                ...config.backgroundOptions,
                color: currentBackgroundColor,
                gradient: undefined,
            });
        } else {
            onChange({
                ...config.backgroundOptions,
                color: currentBackgroundColor,
                gradient: {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: '#ffffff' },
                        { offset: 1, color: '#cccccc' },
                    ],
                },
            });
        }
    };

    const handleGradientChange = (key: string, value: any) => {
        if (!config.backgroundOptions?.gradient) return;

        onChange({
            ...config.backgroundOptions,
            color: currentBackgroundColor,
            gradient: {
                ...config.backgroundOptions.gradient,
                [key]: key === 'rotation' ? Number(value) : value,
            },
        });
    };

    const handleColorStopChange = (index: number, color: string) => {
        if (!config.backgroundOptions?.gradient) return;

        const newColorStops = [...config.backgroundOptions.gradient.colorStops];
        newColorStops[index] = {
            ...newColorStops[index],
            color,
        };

        onChange({
            ...config.backgroundOptions,
            color: currentBackgroundColor,
            gradient: {
                ...config.backgroundOptions.gradient,
                colorStops: newColorStops,
            },
        });
    };

    return (
        <AccordionItem
            value="background-options"
            className="border border-muted/70 bg-background/40 rounded-xl"
        >
            <AccordionTrigger className="bg-muted/70 p-2">Background Options</AccordionTrigger>
            <AccordionContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Color Type</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Solid</span>
                        <Switch checked={showGradient} onCheckedChange={handleColorTypeChange} />
                        <span className="text-sm">Gradient</span>
                    </div>
                </div>

                {showGradient ? (
                    <div className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            {config.backgroundOptions?.gradient?.colorStops.map((stop, index) => (
                                <div key={index} className="space-y-2">
                                    <Label>Color {index + 1}</Label>
                                    <ColorPicker
                                        color={stop.color}
                                        onChange={(color) => handleColorStopChange(index, color)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label>Gradient Type</Label>
                            <Select
                                value={config.backgroundOptions?.gradient?.type || 'linear'}
                                onValueChange={(value) => handleGradientChange('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gradient type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="linear">Linear</SelectItem>
                                    <SelectItem value="radial">Radial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Rotation ({config.backgroundOptions?.gradient?.rotation || 0}°)
                            </Label>
                            <Input
                                type="range"
                                min="0"
                                max="360"
                                value={config.backgroundOptions?.gradient?.rotation || 0}
                                onChange={(e) => handleGradientChange('rotation', e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label>Background Color</Label>
                        <ColorPicker
                            color={config.backgroundOptions?.color || '#ffffff'}
                            onChange={(color) =>
                                onChange({
                                    ...config.backgroundOptions,
                                    color,
                                })
                            }
                        />
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    );
};

export default BackgroundOptions;
