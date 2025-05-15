/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { CornerSquareType, QRConfig } from '@/types';
import ColorPicker from '@/components/ColorPiker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CornersSquareOptionsProps {
    config: QRConfig;
    onChange: (options: QRConfig['cornersSquareOptions']) => void;
    onChangeHelper: (helper: QRConfig['cornersSquareOptionsHelper']) => void;
}

const cornerSquareTypes = ['square', 'dot', 'extra-rounded'];

export const CornersSquareOptions = ({  config,  onChange, onChangeHelper }: CornersSquareOptionsProps) => {
    
	const cornersSquareOptions = config.cornersSquareOptions || {
        type: 'extra-rounded',
        color: '#000000'
    };

	const cornersSquareHelper = config.cornersSquareOptionsHelper || {
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
        cornersSquareHelper.colorType.gradient || false
    );

    const handleColorTypeChange = (isGradient: boolean) => {
        setShowGradient(isGradient);
        onChangeHelper({
            ...cornersSquareHelper,
            colorType: {
                single: !isGradient,
                gradient: isGradient
            }
        });
    };

    const handleGradientChange = (key:  keyof typeof cornersSquareHelper.gradient, value: any) => {
        onChangeHelper({
            ...cornersSquareHelper,
            gradient: {
                ...cornersSquareHelper.gradient,
                [key]: key === 'rotation' ? Number(value) : value
            }
        });
    };

    return (
        <div className="p-6 space-y-4">
			<div className="space-y-2">
				<Label>Corner Style</Label>
				<Select
					value={cornersSquareOptions.type || 'extra-rounded'}
					onValueChange={(value: CornerSquareType) => 
						onChange({
							...cornersSquareOptions,
							type: value
						})
					}
				>
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
								color={cornersSquareHelper.gradient.color1 || '#000000'}
								onChange={(color) => handleGradientChange('color1', color)}
							/>
						</div>
						<div className="space-y-2">
							<Label>Color 2</Label>
							<ColorPicker
								color={cornersSquareHelper.gradient.color2 || '#000000'}
								onChange={(color) => handleGradientChange('color2', color)}
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label>Gradient Type</Label>
						<Select
							value={cornersSquareHelper.gradient.linear ? 'linear' : 'radial'}
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
						<Label>Rotation ({cornersSquareHelper.gradient.rotation || 0}°)</Label>
						<Input
							type="range"
							min="0"
							max="360"
							value={cornersSquareHelper.gradient.rotation || 0}
							onChange={(e) => 
								handleGradientChange('rotation', e.target.value)
							}
						/>
					</div>
				</div>
			) : (
				<div className="space-y-2">
					<Label>Corner Color</Label>
					<ColorPicker
						color={cornersSquareOptions.color || '#000000'}
						onChange={(color) =>
							onChange({
								...cornersSquareOptions,
								color
							})
						}
					/>
				</div>
			)}
        </div>
    );
};