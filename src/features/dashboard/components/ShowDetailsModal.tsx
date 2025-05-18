import { DownloadIcon } from "lucide-react";
import QRDisplay, { type QRDisplayRef } from "../../../components/qrCode/QRDisplay";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../../components/ui/dialog";
import type { QRConfig } from "@/types";

interface ShowDetailsModalProps {
	children: React.ReactNode;
	qrRef:  React.RefObject<QRDisplayRef | null>;
	onDownload: (qrRef:React.RefObject<QRDisplayRef | null>) => void;
	qrConfig: QRConfig;
}

const ShowDetailsModal: React.FC<ShowDetailsModalProps> = ({children,qrRef, onDownload, qrConfig}) => {
	return (
        <Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className='max-w-[95vw] sm:max-w-md p-6 rounded-xl border-border bg-card shadow-xl' aria-describedby="qr-code">
			
			<div className="flex flex-col items-center space-y-6">
				<div className="p-4 bg-white rounded-lg border border-border shadow-sm">
					<QRDisplay ref={qrRef} config={{...qrConfig,width: 220, height: 220}}  />
				</div>
				<div className='w-full flex flex-col sm:flex-row gap-3 mt-4'>
					<DialogClose asChild>
						<Button
							variant="outline"
							className="gap-2 w-1/2 hover:bg-muted/20"
							size="lg"
						>
							Close
						</Button>
					</DialogClose>
					<Button
						variant='outline'
						className="gap-2 w-1/2 sm:w-40 border-primary/70 hover:bg-primary/80 text-primary bg-primary-50"
						size="lg"
						onClick={ ()=>onDownload(qrRef)}
					>
						<DownloadIcon size={4}  />
						Download QR
					</Button>
				</div>
			</div>
			</DialogContent>
		</Dialog>
    );
}

export default ShowDetailsModal;