import { type QRDisplayRef } from "@/components/qrCode/QRDisplay";
import ShowDetailsModal from "@/features/dashboard/components/ShowDetailsModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQRManager } from "@/hooks/useQRManager"
import type { QRCode } from "@/supabase/types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";


const QRTable = () => {
	const { loadQRs } = useQRManager();
	const [ qrs , setQrs ] = useState<QRCode[]>([]);
	const qrRef = useRef<QRDisplayRef>(null);
	const { handleDownload } = useQRManager();

	useEffect(() => {
		const fetchQRs = async () => {
			const qrs = await loadQRs();
			setQrs(qrs);
			console.log("Loaded QRs:", qrs);
		};
		fetchQRs();
	}, [loadQRs]);

	return (
		<div className="w-full max-w-4xl bg-background rounded-lg">
			<Table className="bg-gradient-to-bl form-background to-muted max-w-4xl rounded-lg px-6">
				<TableHeader className="bg-muted rounded-t-lg">
					<TableRow>
						<TableHead className="w-[100px] rounded-tl-lg ">Title</TableHead>
						<TableHead>Content</TableHead>
						<TableHead>Creation Date</TableHead>
						<TableHead className="rounded-tr-lg">QR Code</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{qrs.map((qr) => (
						<TableRow key={qr.id}>
							<TableCell className="font-medium">{qr.title}</TableCell>
							<TableCell>{qr.qr_data}</TableCell>
							<TableCell>TODO</TableCell>
							<TableCell>
								<ShowDetailsModal qrRef={qrRef} onDownload={handleDownload} qrConfig={qr.qr_template} >
									<Button variant='outline' size='sm'>view QR</Button>
								</ShowDetailsModal> 
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default QRTable;