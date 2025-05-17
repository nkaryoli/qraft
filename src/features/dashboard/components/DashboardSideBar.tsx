import { Building, ScanQrCode, SwatchBook} from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/clerk-react"
import CustomTrigger from "./CustomTrigger"
import { useIsMobile } from "@/hooks/useIsMobile"


// Menu items.
const items = [
	{
		title: "Saved QR",
		url: "#",
		icon: 	ScanQrCode,
	},
	{
		title: "My Templates",
		url: "#",
		icon: SwatchBook,
	},
	{
		title: "My Organizations",
		url: "#",
		icon: Building,
	}
]

const DashboardSideBar = () => {
	const isMobile = useIsMobile(845);

	return (
		<Sidebar collapsible="icon">
			{isMobile && 
				<div className="w-full flex justify-end pr-2 text-white">
					<CustomTrigger className=""/>
				</div>
			}
			<SidebarContent className="py-20 bg-gradient-to-b from-black/60 via-card to-background">
				<SidebarGroup>
					<SidebarGroupLabel className="pl-3 lg:pl-6 text-lg h-16 text-primary-foreground">
						My dashboard
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a href={item.url} className="text-foreground h-9 pl-3 lg:pl-6">
									<item.icon />
									<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t pl-4 lg:pr-6 py-3 bg-black/50">
				<div className="pointer-events-none">
					<UserButton showName
						appearance={{
							elements: {
								navbar:{ display: 'none'},
								userButtonBox:{
									display: 'flex',
									flexDirection: 'row-reverse',
									gap: '7px'
								}
							}
						}}
					/>
				</div>

			</SidebarFooter>
		</Sidebar>
	)
}

export default DashboardSideBar;