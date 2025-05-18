import { type QRDisplayRef } from "@/components/qrCode/QRDisplay";
import ShowDetailsModal from "@/features/dashboard/components/ShowDetailsModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQRManager } from "@/hooks/useQRManager";
import type { QRCode } from "@/supabase/types";
import { useRef } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QRTableProps {
	qrs: QRCode[];
}

const QRTable: React.FC<QRTableProps> = ({ qrs }) => {
	const qrRef = useRef<QRDisplayRef>(null);
	const navigate = useNavigate();
	const { handleDownload } = useQRManager();

	return (
		<div className="w-full max-w-5xl bg-card rounded-lg border border-border shadow-lg overflow-hidden">
			<Table className="w-full">
				<TableHeader className="bg-gradient-to-r from-primary/60 via-background to-muted">
				<TableRow className="hover:bg-transparent">
					<TableHead className="w-[120px] py-4 text-lg text-primary-foreground font-semibold rounded-tl-xl text-start px-6">Title</TableHead>
					<TableHead className="py-4 text-lg text-primary-foreground font-semibold">Content</TableHead>
					<TableHead className="py-4 text-lg text-primary-foreground font-semibold">Created</TableHead>
					<TableHead className="w-[120px] py-4 text-lg text-primary-foreground font-semibold rounded-tr-xl text-end px-6">Actions</TableHead>
				</TableRow>
				</TableHeader>
				<TableBody className="divide-y divide-border/50">
					{qrs.map((qr, index) => (
						<TableRow 
							key={qr.id} 
							className={cn(
								index % 2 === 0 ? 'bg-card' : 'bg-muted/10',
								'group hover:bg-muted/20 transition-colors duration-150'
							)}
						>
							<TableCell className="font-medium py-3.5 text-muted-foreground text-start px-6 group-hover:text-white">
								<span className="line-clamp-1" title={qr.title}>{qr.title}</span>
							</TableCell>
						<TableCell className="py-3.5">
							<span className="line-clamp-1 text-muted-foreground group-hover:text-white" title={qr.qr_data}>{qr.qr_data}</span>
						</TableCell>
						<TableCell className="py-3.5 text-muted-foreground group-hover:text-white">
							TODO
						</TableCell>
						<TableCell className="py-3.5 text-right">
							<ShowDetailsModal qrRef={qrRef} onDownload={handleDownload} qrConfig={qr.qr_template}>
								<a className="
									inline-flex items-center gap-1.5
									px-3 py-1 rounded-md text-sm font-medium
									bg-primary/10 text-primary hover:bg-primary/80 hover:text-primary-foreground
									transition-all duration-200
									border border-primary/10 group-hover:border-primary/50
									group-hover:bg-primary/20
								">
									<span>View</span>
									<Eye className="size-4"/>
								</a>
							</ShowDetailsModal>
						</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			
			{qrs.length === 0 && (
				<div className="p-8 text-center text-muted-foreground">
					<p>No QR codes found yet. Create your first one!</p>
					<Button onClick={() => navigate('/customize')}>
						Create QR
					</Button>
				</div>
			)}
		</div>
	);
};

export default QRTable;