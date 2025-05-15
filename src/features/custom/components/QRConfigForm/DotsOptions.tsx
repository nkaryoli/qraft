import type { GradientType } from '@/types';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import ColorPicker from '@/components/ColorPiker';
import type { DotsOptions, DotsOptionsHelper, DotType } from '@/types';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface DotsOptionsProps {
    dotsOptions: DotsOptions;
    dotsOptionsHelper: DotsOptionsHelper;
    onChange: (options: DotsOptions) => void;
    onChangeHelper: (helper: DotsOptionsHelper) => void;
}

const dotTypes: DotType[] = [
    'square',
    'dots',
    'rounded',
    'classy',
    'classy-rounded',
    'extra-rounded',
];

export const DotsOptionsForm = ({
    dotsOptions,
    dotsOptionsHelper,
    onChange,
    onChangeHelper,
}: DotsOptionsProps) => {
    const [showGradient, setShowGradient] = useState(dotsOptionsHelper.colorType.gradient);

    const handleColorTypeChange = (isGradient: boolean) => {
        setShowGradient(isGradient);
        onChangeHelper({
            ...dotsOptionsHelper,
            colorType: {
                single: !isGradient,
                gradient: isGradient,
            },
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleGradientChange = (key: keyof GradientType, value: any) => {
        console.log(key, value);
        onChangeHelper({
            ...dotsOptionsHelper,
            gradient: {
                ...dotsOptionsHelper.gradient,
                [key]: value,
            },
        });
    };

    return (
        <div className="p-6 space-y-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Dot Style</Label>
                    <Select
                        value={dotsOptions.type}
                        onValueChange={(value: DotType) =>
                            onChange({ ...dotsOptions, type: value })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select dot type" />
                        </SelectTrigger>
                        <SelectContent>
                            {dotTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
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
                                        color={dotsOptionsHelper.gradient.color1}
                                        onChange={(color) =>
                                            handleGradientChange('color1', color)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Color 2</Label>
                                    <ColorPicker
                                        color={dotsOptionsHelper.gradient.color2}
                                        onChange={(color) =>
                                            handleGradientChange('color2', color)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Gradient Type</Label>
                                <Select
                                    value={
                                        dotsOptionsHelper.gradient.linear ? 'linear' : 'radial'
                                    }
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

                            {dotsOptionsHelper.gradient.linear && (
                                <div className="space-y-2">
                                    <Label>
                                        Rotation ({dotsOptionsHelper.gradient.rotation}°)
                                    </Label>
                                    <Input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={dotsOptionsHelper.gradient.rotation}
                                        onChange={(e) =>
                                            handleGradientChange(
                                                'rotation',
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <ColorPicker
                            color={dotsOptions.color}
                            onChange={(color) => onChange({ ...dotsOptions, color })}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
