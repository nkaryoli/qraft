import { memo, useEffect, useState } from 'react';
import type { QRConfig } from '@/types';
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
import type { CornerSquareType } from 'qr-code-styling';
interface CornersSquareOptionsProps {
    config: QRConfig;
    onChange: (options: NonNullable<QRConfig['cornersSquareOptions']>) => void;
    onChangeHelper: (helper: NonNullable<QRConfig['cornersSquareOptionsHelper']>) => void;
}

const cornerSquareTypes: CornerSquareType[] = ['square', 'dot', 'extra-rounded'];

const CornersSquareOptions = ({ config, onChange, onChangeHelper }: CornersSquareOptionsProps) => {
    // Definimos tipos explícitos para el estado local
    type LocalOptions = NonNullable<QRConfig['cornersSquareOptions']>;
    type LocalHelper = NonNullable<QRConfig['cornersSquareOptionsHelper']>;

    // Valores por defecto con tipos explícitos
    const defaultOptions: LocalOptions = {
        type: 'extra-rounded',
        color: '#000000',
    };

    const defaultHelper: LocalHelper = {
        colorType: { single: true, gradient: false },
        gradient: {
            linear: true,
            radial: false,
            color1: '#000000',
            color2: '#000000',
            rotation: 0,
        },
    };

    // Estado local con tipos explícitos
    const [localOptions, setLocalOptions] = useState<LocalOptions>(defaultOptions);
    const [localHelper, setLocalHelper] = useState<LocalHelper>(defaultHelper);

    // Sincronización con props
    useEffect(() => {
        if (config.cornersSquareOptions) {
            setLocalOptions({
                ...defaultOptions,
                ...config.cornersSquareOptions,
            });
        }

        if (config.cornersSquareOptionsHelper) {
            setLocalHelper({
                ...defaultHelper,
                ...config.cornersSquareOptionsHelper,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    // Handler con tipos seguros
    const handleColorTypeChange = (isGradient: boolean) => {
        const updatedHelper: LocalHelper = {
            ...localHelper,
            colorType: {
                single: !isGradient,
                gradient: isGradient,
            },
        };

        setLocalHelper(updatedHelper);
        onChangeHelper(updatedHelper);

        if (!isGradient) {
            const updatedOptions: LocalOptions = {
                ...localOptions,
                gradient: undefined,
            };
            setLocalOptions(updatedOptions);
            onChange(updatedOptions);
        }
    };

    // Handler con tipos seguros para gradiente
    const handleGradientChange = <K extends keyof LocalHelper['gradient']>(
        key: K,
        value: LocalHelper['gradient'][K],
    ) => {
        const updatedHelper: LocalHelper = {
            ...localHelper,
            gradient: {
                ...localHelper.gradient,
                [key]: key === 'rotation' ? Number(value) : value,
            },
        };

        setLocalHelper(updatedHelper);
        onChangeHelper(updatedHelper);

        if (localHelper.colorType.gradient) {
            const updatedOptions: LocalOptions = {
                ...localOptions,
                gradient: {
                    type: updatedHelper.gradient.linear ? 'linear' : 'radial',
                    rotation: updatedHelper.gradient.rotation,
                    colorStops: [
                        { offset: 0, color: updatedHelper.gradient.color1 },
                        { offset: 1, color: updatedHelper.gradient.color2 },
                    ],
                },
            };
            setLocalOptions(updatedOptions);
            onChange(updatedOptions);
        }
    };

    // Handler con tipos seguros para color sólido
    const handleSolidColorChange = (color: string) => {
        const updatedOptions: LocalOptions = {
            ...localOptions,
            color,
            gradient: undefined,
        };
        setLocalOptions(updatedOptions);
        onChange(updatedOptions);
    };

    // Handler con tipos seguros para cambio de tipo
    const handleTypeChange = (value: CornerSquareType) => {
        const updatedOptions: LocalOptions = {
            ...localOptions,
            type: value,
        };
        setLocalOptions(updatedOptions);
        onChange(updatedOptions);
    };

    return (
        <div className="p-6 space-y-4">
            <div className="space-y-2">
                <Label>Corner Style</Label>
                <Select value={localOptions.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select corner type" />
                    </SelectTrigger>
                    <SelectContent>
                        {cornerSquareTypes.map((type) => (
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
                        <Label>Rotation ({localHelper.gradient.rotation || 0}°)</Label>
                        <Input
                            type="range"
                            min="0"
                            max="360"
                            value={localHelper.gradient.rotation || 0}
                            onChange={(e) =>
                                handleGradientChange('rotation', Number(e.target.value))
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <Label>Corner Color</Label>
                    <ColorPicker
                        color={localOptions.color || '#000000'}
                        onChange={handleSolidColorChange}
                    />
                </div>
            )}
        </div>
    );
};

export default memo(CornersSquareOptions);
