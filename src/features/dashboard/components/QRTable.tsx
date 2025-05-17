import QRDisplay from "@/components/qrCode/QRDisplay";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQR } from "@/hooks/QRContext";
import { useQRManager } from "@/hooks/useQRManager"
import type { QRCode } from "@/supabase/types";
import { useEffect, useState } from "react";


const QRTable = () => {
	const { loadQRs } = useQRManager();
	const [ qrs , setQrs ] = useState<QRCode[]>([]);
	const { qrRef } = useQR();
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
			<TableCaption>A list of your recent invoices.</TableCaption>
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
							<Button variant='outline' size='sm'>view QR</Button>
							<QRDisplay ref={qrRef} config={qr.qr_template} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		<div>
			
		</div>
		</div>
	)
}

export default QRTable;