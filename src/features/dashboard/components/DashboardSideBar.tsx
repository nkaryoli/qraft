import { Building, ScanQrCode, SwatchBook} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/clerk-react"
import CustomTrigger from "./CustomTrigger"
import { useIsMobile } from "@/hooks/useIsMobile"

type SectionKey = "saved-qr" | "my-templates" | "my-orgs"; 

interface DashboardSideBarProps {
	onSelect: (id: SectionKey) => void;
	active: string;
}

const items = [
	{ title: "Saved QR",	id: "saved-qr",	icon: ScanQrCode },
	{ title: "My Templates",	id: "my-templates",	icon: SwatchBook },
	{ title: "My Organizations",	id: "my-orgs",	icon: Building },
]

const DashboardSideBar: React.FC<DashboardSideBarProps> = ({ onSelect, active }) => {
	const isMobile = useIsMobile(845);
	const { toggleSidebar } = useSidebar();

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
										<button 
											onClick={() => {
												onSelect(item.id as SectionKey);
												toggleSidebar();
											}}
											className={`h-9 pl-3 lg:pl-6 text-left w-full text-foreground hoved:bg-muted
												${active === item.id ? "bg-muted/20 text-primary font-semibold" : ""}
											`}
										>
										<item.icon />
										<span>{item.title}</span>
										</button>
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