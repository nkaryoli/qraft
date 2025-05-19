import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QRDisplay from "@/components/qrCode/QRDisplay";
import type { QRConfig } from "@/types";
import type { Gradient } from "qr-code-styling";
import { useNavigate } from "react-router-dom";

interface TemplateCardProps {
	qrTemplate: QRConfig;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ qrTemplate }) => {
	const navigate = useNavigate();
	
	const dotType = qrTemplate.dotsOptions?.type || 'square';
	const cornerType = qrTemplate.cornersSquareOptions?.type || 'square';
	const hasImage = !!qrTemplate.image;
	const dataType = qrTemplate.data.startsWith('http') ? 'URL' : 'Text';

	const renderColorSwatch = (options: { color?: string; gradient?: Gradient }) => {
		if (options.gradient) {
			const rotation = options.gradient.rotation || 0;
			const gradientStyle = options.gradient.type === 'radial'
				? `radial-gradient(circle, ${options.gradient.colorStops[0].color}, ${options.gradient.colorStops[1].color})`
				: `linear-gradient(${rotation}deg, ${options.gradient.colorStops[0].color}, ${options.gradient.colorStops[1].color})`;
					
			return (
				<div 
				className="w-6 h-6 rounded-full border"
				style={{ 
					background: gradientStyle,
				}}
				/>
			);
		}
		return (
			<div 
				className="w-6 h-6 rounded-full border" 
				style={{ backgroundColor: options.color || '#000000' }}
			/>
		);
	};

	const handleCustomQR = () => {
        navigate('/customize', { state: { qrTemplate } });
    };
	return (
		<div className="hover:shadow-lg transition-shadow bg-gradient-to-br from-primary via-background to-muted rounded-xl p-0.5">
		
		<Card className="bg-gradient-to-br from-black via-background to-muted">
			<CardContent className="grid gap-4">
				<div className="flex items-center gap-6">
					<QRDisplay config={{ ...qrTemplate, width: 80, height: 80 }} />
					<div className="grid gap-1 text-sm">
						<div className="flex items-center gap-2">
							<span className="font-medium">Type:</span>
							<Badge variant="outline">{dataType}</Badge>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Dots:</span>
							<Badge variant="outline">{dotType}</Badge>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Corners:</span>
							<Badge variant="outline">{cornerType}</Badge>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Logo:</span>
							<Badge variant="outline">{hasImage ? 'Yes' : 'No'}</Badge>
						</div>
						
					</div>
				</div>

				<div className="grid grid-cols-2 gap-2 text-sm">
					<div className="flex items-center gap-2">
						<span className="font-medium">Dot color:</span>
						{renderColorSwatch({
							color: qrTemplate.dotsOptions?.color,
							gradient: qrTemplate.dotsOptions?.gradient
						})}
					</div>
					<div className="flex items-center gap-2">
						<span className="font-medium">BG color:</span>
						{renderColorSwatch({
							color: qrTemplate.backgroundOptions?.color,
							gradient: qrTemplate.backgroundOptions?.gradient
						})}
					</div>
				</div>

				{(qrTemplate.cornersSquareOptions?.color || qrTemplate.cornersSquareOptions?.gradient) && (
					<div className="flex items-center gap-3">
						<span className="text-sm font-medium">Corners color:</span>
						{renderColorSwatch({
							color: qrTemplate.cornersSquareOptions?.color,
							gradient: qrTemplate.cornersSquareOptions?.gradient
						})}
					</div>
				)}
			</CardContent>
			<CardFooter>
				<Button 
					variant='outline'
					className="w-full gap-2 border-primary hover:bg-primary text-primary "
					onClick={handleCustomQR}
				>
					Use Template
				</Button>
			</CardFooter>
		</Card>	
		</div>
	);
};

export default TemplateCard;