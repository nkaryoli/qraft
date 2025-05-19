import { Ghost } from "lucide-react";

export default function QREmptyState() {

	return (
		<div className="flex flex-col items-center justify-center p-7.5 pb-9 text-center h-64">
			<div className="bg-radial from-card-foreground/20 via-card to-transparent p-14 rounded-full">
				<Ghost color="#db073d" size={50} />
			</div>
			<p className="text-card-foreground max-w-xs">
				This QR is hungry for content! Feed it with your ideas.
			</p>
		</div>
	);
}