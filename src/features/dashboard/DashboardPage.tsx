import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSideBar from "./components/DashboardSideBar"
import Dashboard from "./Dashboard"
import { useIsMobile } from "@/hooks/useIsMobile";
import CustomTrigger from "./components/CustomTrigger";

const DashboardPage = () => {
	const isMobile = useIsMobile(975);
	return (
		<SidebarProvider open>
			<DashboardSideBar />
			{isMobile && <CustomTrigger className="left-3" />}
			<Dashboard />
		</SidebarProvider>
	)
}

export default DashboardPage