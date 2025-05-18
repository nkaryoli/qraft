import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSideBar from "./components/DashboardSideBar"
import { useIsMobile } from "@/hooks/useIsMobile";
import CustomTrigger from "./components/CustomTrigger";
import { useEffect, useState } from "react";
import MyTemplates from "./components/userTemplates/MyTemplates";
import MyQRs from "./components/userQRs/MyQRs";
import type { QRCode } from "@/supabase/types";
import { useQRManager } from "@/hooks/useQRManager";
import { BarLoader, PacmanLoader } from "react-spinners";

const sections = {
	"saved-qr": MyQRs,
	"my-templates": MyTemplates,
	"my-orgs": () => <h1>my organizations</h1>,
};

const DashboardPage = () => {
	const [active, setActive] = useState<keyof typeof sections>("saved-qr");
	const isMobile = useIsMobile(975);
	const [qrs, setQrs] = useState<QRCode[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { loadQRs } = useQRManager();

	useEffect(() => {
		const fetchQRs = async () => {
			setIsLoading(true);
			try {
				const data = await loadQRs();
				setQrs(data);
			} catch (error) {
				console.error("Error loading QRs:", error);
				setQrs([]); 
			} finally {
				setIsLoading(false);
			}
		};

		fetchQRs();
	}, [loadQRs]);

	const ActiveComponent = sections[active];

	return (
		<SidebarProvider open>
			<DashboardSideBar onSelect={setActive} active={active}/>
			{isMobile && <CustomTrigger className="left-3" />}
			<section className="w-full flex justify-center py-32 px-6">
				{isLoading && (
					<div className="fixed top-16 left-0 w-full z-50 pointer-events-none">
						<BarLoader width="100%" color="#db073d" speedMultiplier={0.5} />
					</div>
				)}
				{qrs?.length === 0 ? (
					<div className="w-full h-full flex flex-col justify-center max-w-5xl space-y-4">
						<PacmanLoader  size={50} color="#db073d" className="absolute left-[40%]" speedMultiplier={0.5}  />
					</div>
				) : (
					<ActiveComponent qrs={qrs} />
				)}
			</section>
		</SidebarProvider>
	)
}

export default DashboardPage