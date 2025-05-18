import TemplateCard from "./TemplateCard"
import type { QRCode } from "@/supabase/types";

interface MyTemplatesProps {
	qrs: QRCode[];
}

const MyTemplates:React.FC<MyTemplatesProps> = ({ qrs }) => {

	return (
		<div className="space-y-9">
			<h2 className="text-2xl font-semibold">My Templates</h2>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{qrs.map((qr) => (
					<TemplateCard 
						key={qr.id} 
						qrTemplate={qr.qr_template}
					/>
				))}
			</div>
		</div>
	)
}

export default MyTemplates