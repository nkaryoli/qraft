import { PacmanLoader } from "react-spinners";

export default function QREmptyState() {

	return (
		<div className="flex flex-col items-center justify-center p-7.5 pb-9 text-center h-64 gap-9">
			<div className="bg-radial from-card-foreground/20 via-card to-transparent ml-14 pr-24 rounded-full overflow-hidden">
				<PacmanLoader size={25} color="#db073d" className="-ml-6" speedMultiplier={0.5} />
			</div>
			<p className="text-foreground max-w-xs">
				This QR is hungry for content! Feed it with your ideas.
			</p>
		</div>
	);
}