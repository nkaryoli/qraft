import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSideBar from "./components/DashboardSideBar"
import { useIsMobile } from "@/hooks/useIsMobile";
import CustomTrigger from "./components/CustomTrigger";
import QRTable from "./components/QRTable";

const DashboardPage = () => {
	const isMobile = useIsMobile(975);
	return (
		<SidebarProvider open>
			<DashboardSideBar />
			{isMobile && <CustomTrigger className="left-3" />}
			{/* <Dashboard /> */}
			<section className="w-full pt-32 flex justify-center items-center px-20">
				<QRTable/>
			</section>
		</SidebarProvider>
	)
}

export default DashboardPage