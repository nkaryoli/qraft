import { DownloadIcon } from "lucide-react";
import QRDisplay, { type QRDisplayRef } from "../../../components/qrCode/QRDisplay";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
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
			<DialogTrigger >
				{children}
			</DialogTrigger>
			<DialogContent className='w-fit p-10 lg:p-20' aria-describedby="qr-code">
				<DialogTitle className="hidden"/>
				<DialogDescription className="hidden"/>
				<QRDisplay ref={qrRef} config={qrConfig} />
				<div className='w-full flex justify-center mt-4'>
					<Button
						variant="secondary"
						className="gap-2 w-full sm:w-40 my-2"
						size="lg"
						onClick={ ()=>onDownload(qrRef)}
					>
						<DownloadIcon size={4}  />
						Download QR
					</Button>
				</div>
			</DialogContent>
		</Dialog>
    );
}

export default ShowDetailsModal;