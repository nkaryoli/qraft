/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { QRConfig } from '@/types';
import ColorPicker from '@/components/ColorPiker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CornersDotOptionsProps {
    config: QRConfig;
    onChange: (options: NonNullable<QRConfig['cornersDotOptions']>) => void;
    onChangeHelper: (helper: NonNullable<QRConfig['cornersDotOptionsHelper']>) => void;
}

const cornerDotTypes = ['square', 'dot'];

export const CornersDotOptions = ({ 
    config, 
    onChange,
    onChangeHelper
}: CornersDotOptionsProps) => {
    // Valores por defecto para evitar undefined
    const cornersDotOptions = config.cornersDotOptions || {
        type: 'dot',
        color: '#000000'
    };
    
    const cornersDotHelper = config.cornersDotOptionsHelper || {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0
        }
    };

    const [showGradient, setShowGradient] = useState(
        cornersDotHelper.colorType.gradient
    );

    const handleColorTypeChange = (isGradient: boolean) => {
        setShowGradient(isGradient);
        onChangeHelper({
            ...cornersDotHelper,
            colorType: {
                single: !isGradient,
                gradient: isGradient
            }
        });
    };

    const handleGradientChange = (key: keyof typeof cornersDotHelper.gradient, value: any) => {
        onChangeHelper({
            ...cornersDotHelper,
            gradient: {
                ...cornersDotHelper.gradient,
                [key]: key === 'rotation' ? Number(value) : value
            }
        });
    };

    return (
        <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <Label>Corner Dot Style</Label>
                    <Select
                        value={cornersDotOptions.type}
                        onValueChange={(value: 'square' | 'dot') => 
                            onChange({
                                ...cornersDotOptions,
                                type: value
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select dot type" />
                        </SelectTrigger>
                        <SelectContent>
                            {cornerDotTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between">
                    <Label>Color Type</Label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Solid</span>
                        <Switch
                            checked={showGradient}
                            onCheckedChange={handleColorTypeChange}
                        />
                        <span className="text-sm">Gradient</span>
                    </div>
                </div>

                {showGradient ? (
                    <div className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Color 1</Label>
                                <ColorPicker
                                    color={cornersDotHelper.gradient.color1}
                                    onChange={(color) => handleGradientChange('color1', color)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Color 2</Label>
                                <ColorPicker
                                    color={cornersDotHelper.gradient.color2}
                                    onChange={(color) => handleGradientChange('color2', color)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Gradient Type</Label>
                            <Select
                                value={cornersDotHelper.gradient.linear ? 'linear' : 'radial'}
                                onValueChange={(value) => 
                                    handleGradientChange('linear', value === 'linear')
                                }
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
                            <Label>Rotation ({cornersDotHelper.gradient.rotation}°)</Label>
                            <Input
                                type="range"
                                min="0"
                                max="360"
                                value={cornersDotHelper.gradient.rotation}
                                onChange={(e) => 
                                    handleGradientChange('rotation', e.target.value)
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label>Corner Dot Color</Label>
                        <ColorPicker
                            color={cornersDotOptions.color || '#000000'}
                            onChange={(color) =>
                                onChange({
                                    ...cornersDotOptions,
                                    color
                                })
                            }
                        />
                    </div>
                )}
            </div>
    );
};