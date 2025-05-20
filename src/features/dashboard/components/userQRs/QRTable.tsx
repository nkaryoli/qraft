import { type QRDisplayRef } from '@/components/qrCode/QRDisplay';
import ShowDetailsModal from '@/features/dashboard/components/ShowDetailsModal';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useQRManager } from '@/hooks/useQRManager';
import type { QRCode } from '@/supabase/types';
import { useRef } from 'react';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface QRTableProps {
    qrs: QRCode[];
}

const QRTable: React.FC<QRTableProps> = ({ qrs }) => {
    const qrRef = useRef<QRDisplayRef>(null);
    const navigate = useNavigate();
    const { handleDownload } = useQRManager();

    return (
        <div className="w-full max-w-5xl bg-background rounded-xl border border-border shadow-lg overflow-hidden p-3">
            <div className="hidden sm:block">
                <Table className="w-full">
                    <TableHeader className="bg-gradient-to-r from-primary/60 via-background to-muted ">
                        <TableRow className="hover:bg-transparent border-accent/40">
                            <TableHead className="w-[120px] py-4 text-lg text-primary-foreground font-semibold rounded-tl-xl text-start px-6">
                                Title
                            </TableHead>
                            <TableHead className="text-lg text-primary-foreground font-semibold">
                                Content
                            </TableHead>
                            <TableHead className="text-lg text-primary-foreground font-semibold">
                                Created
                            </TableHead>
                            <TableHead className="w-[120px] text-lg text-primary-foreground font-semibold rounded-tr-xl text-end px-6">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border/50">
                        {qrs.map((qr, index) => (
                            <TableRow
                                key={qr.id}
                                className={cn(
                                    index % 2 === 0 ? 'bg-card' : 'bg-muted/10',
                                    'group hover:bg-muted/20 transition-colors duration-150 border-accent/40',
                                )}
                            >
                                <TableCell className="font-medium py-3.5 text-muted-foreground text-start px-6 group-hover:text-white ">
                                    <span className="line-clamp-1" title={qr.title}>
                                        {qr.title}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3.5">
                                    <span
                                        className="line-clamp-1 text-muted-foreground group-hover:text-white"
                                        title={qr.qr_data}
                                    >
                                        {qr.qr_data}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3.5 text-muted-foreground group-hover:text-white">
                                    TODO
                                    {/* {new Date(qr.created_at).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric'
							})} */}
                                </TableCell>
                                <TableCell className="py-3.5 text-right">
                                    <ShowDetailsModal
                                        qrRef={qrRef}
                                        onDownload={handleDownload}
                                        qrConfig={qr.qr_template}
                                    >
                                        <a
                                            className="
									inline-flex items-center gap-1.5
									px-3 py-1 rounded-md text-sm font-medium
									bg-primary/10 text-primary hover:bg-primary/80 hover:text-primary-foreground
									transition-all duration-200
									border border-primary/10 group-hover:border-primary/50
									group-hover:bg-primary/20
								"
                                        >
                                            <span>View</span>
                                            <Eye className="size-4" />
                                        </a>
                                    </ShowDetailsModal>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="sm:hidden space-y-2 rounded-xl">
                <div className="w-full">
                    <div className="flex justify-between rounded-t-xl bg-gradient-to-r from-primary/60 via-background to-muted py-4 text-lg text-primary-foreground font-semibold px-6">
                        <span className=" rounded-tl-xl">Title</span>
                        <span className="text-end">Actions</span>
                    </div>

                    {qrs.map((qr, index) => (
                        <div
                            key={qr.id}
                            className={cn(
                                index % 2 === 0 ? 'bg-card' : 'bg-muted/10',
                                'flex items-center justify-between border-y group text-muted-foreground hover:bg-muted/20 transition-colors duration-150 border-accent/40 py-4 px-6',
                            )}
                        >
                            <div className="font-medium group-hover:text-white text-start">
                                <h4 className="font-medium line-clamp-1">{qr.title}</h4>
                                <p className="text-sm line-clamp-2 mt-1 max-w-40">{qr.qr_data}</p>
                            </div>
                            <div className="text-right">
                                <ShowDetailsModal
                                    qrRef={qrRef}
                                    onDownload={handleDownload}
                                    qrConfig={qr.qr_template}
                                >
                                    <a
                                        className="
											inline-flex items-center gap-1.5
											px-3 py-1 rounded-md text-sm font-medium
											bg-primary/10 text-primary hover:bg-primary/80 hover:text-primary-foreground
											transition-all duration-200
											border border-primary/10 group-hover:border-primary/50
											group-hover:bg-primary/20
										"
                                    >
                                        <Eye className="size-4" />
                                    </a>
                                </ShowDetailsModal>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {qrs.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                    <p>No QR codes found yet. Create your first one!</p>
                    <Button onClick={() => navigate('/customize')}>Create QR</Button>
                </div>
            )}
        </div>
    );
};

export default QRTable;
