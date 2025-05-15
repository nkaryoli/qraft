import { QRDisplay } from "@/components/qrCode/QRDisplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { QRConfig } from "@/types"

interface QRPreviewProps {
	qrConfig: QRConfig,
	content: string,
}

const QRPreview: React.FC<QRPreviewProps> = ({ qrConfig, content }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Preview</CardTitle>
			</CardHeader>
			<CardContent>
				<QRDisplay config={{ ...qrConfig, data: content }} />
				<div className="mt-4 text-sm text-muted-foreground">
					<p>Scan your QR Code to test it</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default QRPreview