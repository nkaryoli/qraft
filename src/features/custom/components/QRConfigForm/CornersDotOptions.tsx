import { memo, useEffect, useState } from 'react';
import type { QRConfig } from '@/types';
import ColorPicker from '@/components/ColorPiker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CornerDotType } from 'qr-code-styling';

interface CornersDotOptionsProps {
    config: QRConfig;
    onChange: (options: NonNullable<QRConfig['cornersDotOptions']>) => void;
    onChangeHelper: (helper: NonNullable<QRConfig['cornersDotOptionsHelper']>) => void;
}

const cornerDotTypes = ['square', 'dot'];

const CornersDotOptions = ({ 
    config, 
    onChange,
    onChangeHelper
}: CornersDotOptionsProps) => {
    // Definimos tipos explícitos para el estado
    type OptionsState = NonNullable<QRConfig['cornersDotOptions']>;
    type HelperState = NonNullable<QRConfig['cornersDotOptionsHelper']>;

    // Valores por defecto con tipos explícitos
    const defaultOptions: OptionsState = {
        type: 'dot',
        color: '#000000'
    };

    const defaultHelper: HelperState = {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0
        }
    };

    // Estado local con tipos explícitos
    const [localOptions, setLocalOptions] = useState<OptionsState>(defaultOptions);
    const [localHelper, setLocalHelper] = useState<HelperState>(defaultHelper);

    // Sincronización con las props
    useEffect(() => {
        if (config.cornersDotOptions) {
            setLocalOptions({
                ...defaultOptions,
                ...config.cornersDotOptions
            });
        }
        if (config.cornersDotOptionsHelper) {
            setLocalHelper({
                ...defaultHelper,
                ...config.cornersDotOptionsHelper
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    // Handler para cambiar el tipo de color (sólido/gradiente)
    const handleColorTypeChange = (isGradient: boolean) => {
        const updatedHelper: HelperState = {
            ...localHelper,
            colorType: {
                single: !isGradient,
                gradient: isGradient
            }
        };
        
        setLocalHelper(updatedHelper);
        onChangeHelper(updatedHelper);

        // Si cambiamos a sólido, limpiamos el gradiente
        if (!isGradient) {
            const updatedOptions: OptionsState = {
                ...localOptions,
                gradient: undefined
            };
            setLocalOptions(updatedOptions);
            onChange(updatedOptions);
        }
    };

    // Handler para cambios en el gradiente
    const handleGradientChange = <K extends keyof HelperState['gradient']>(
        key: K,
        value: HelperState['gradient'][K]
    ) => {
        const updatedHelper: HelperState = {
            ...localHelper,
            gradient: {
                ...localHelper.gradient,
                [key]: key === 'rotation' ? Number(value) : value
            }
        };
        
        setLocalHelper(updatedHelper);
        onChangeHelper(updatedHelper);

        // Actualizar las opciones principales con el formato correcto
        const updatedOptions: OptionsState = {
            ...localOptions,
            gradient: {
                type: updatedHelper.gradient.linear ? 'linear' : 'radial',
                rotation: updatedHelper.gradient.rotation,
                colorStops: [
                    { offset: 0, color: updatedHelper.gradient.color1 },
                    { offset: 1, color: updatedHelper.gradient.color2 }
                ]
            }
        };
        setLocalOptions(updatedOptions);
        onChange(updatedOptions);
    };

    // Handler para cambios en color sólido
    const handleSolidColorChange = (color: string) => {
        const updatedOptions: OptionsState = {
            ...localOptions,
            color,
            gradient: undefined
        };
        setLocalOptions(updatedOptions);
        onChange(updatedOptions);
    };

    // Handler para cambios en el tipo de esquina
    const handleTypeChange = (value: CornerDotType) => {
        const updatedOptions: OptionsState = {
            ...localOptions,
            type: value
        };
        setLocalOptions(updatedOptions);
        onChange(updatedOptions);
    };

    return (
        <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <Label>Corner Dot Style</Label>
                    <Select
                        value={localOptions.type}
                        onValueChange={handleTypeChange}
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
                            checked={localHelper.colorType.gradient}
                            onCheckedChange={handleColorTypeChange}
                        />
                        <span className="text-sm">Gradient</span>
                    </div>
                </div>

                {localHelper.colorType.gradient ? (
                    <div className="space-y-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Color 1</Label>
                                <ColorPicker
                                    color={localHelper.gradient.color1}
                                    onChange={(color) => handleGradientChange('color1', color)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Color 2</Label>
                                <ColorPicker
                                    color={localHelper.gradient.color2}
                                    onChange={(color) => handleGradientChange('color2', color)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Gradient Type</Label>
                            <Select
                                value={localHelper.gradient.linear ? 'linear' : 'radial'}
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
                            <Label>Rotation ({localHelper.gradient.rotation}°)</Label>
                            <Input
                                type="range"
                                min="0"
                                max="360"
                                value={localHelper.gradient.rotation}
                                onChange={(e) => 
                                    handleGradientChange('rotation', Number(e.target.value))
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label>Corner Dot Color</Label>
                        <ColorPicker
                            color={localOptions.color || '#000000'}
                            onChange={handleSolidColorChange}
                        />
                    </div>
                )}
            </div>
    );
};

export default memo(CornersDotOptions);