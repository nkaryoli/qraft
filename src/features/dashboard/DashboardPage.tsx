import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSideBar from "./components/DashboardSideBar"
import { useIsMobile } from "@/hooks/useIsMobile";
import CustomTrigger from "./components/CustomTrigger";
import QRTable from "./components/QRTable";
import { useState } from "react";

const sections = {
	"saved-qr":     <QRTable/>,
	"my-templates": <h1>my templates</h1>,
	"my-orgs":      <h1>my orpanizations</h1>,
};

const DashboardPage = () => {
	const [active, setActive] = useState<keyof typeof sections>("saved-qr");
	const isMobile = useIsMobile(975);
	return (
		<SidebarProvider open>
			<DashboardSideBar onSelect={setActive} active={active}/>
			{isMobile && <CustomTrigger className="left-3" />}
			<section className="w-full pt-32 flex justify-center items-center px-20">{sections[active]}</section>
		</SidebarProvider>
	)
}

export default DashboardPage