import { Building, ChevronDown, CirclePlus, ScanQrCode, SwatchBook} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/clerk-react"
import CustomTrigger from "./CustomTrigger"
import { useIsMobile } from "@/hooks/useIsMobile"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type SectionKey = "saved-qr" | "my-templates" | "my-orgs" | "create-org"; 

interface DashboardSideBarProps {
	onSelect: (id: SectionKey) => void;
	active: string;
	onOpenOrgModal: () => void;
}

const items = [
	{ title: "Saved QR",	id: "saved-qr",	icon: ScanQrCode },
	{ title: "My Templates",	id: "my-templates",	icon: SwatchBook },
]

const orgsItems = [
	{ title: "Create Organizations",	id: "create-org",	icon: CirclePlus },
]

const DashboardSideBar: React.FC<DashboardSideBarProps> = ({ onSelect, active, onOpenOrgModal }) => {
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
						<Collapsible defaultOpen className="group/collapsible">
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger className="flex items-center w-full h-11 pl-2 lg:p-4">
										<span className="text-foreground text-[17px]">Organizations</span>
										<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											<SidebarMenuItem>
													<SidebarMenuButton asChild>
														<button 
															onClick={() => {
																onOpenOrgModal();
																toggleSidebar();
															}}
															className={`h-9 pl-3 lg:pl-6 text-left w-full text-foreground hoved:bg-muted
																${active === "my-orgs" ? "bg-muted/20 text-primary font-semibold" : ""}
															`}
														>
														<Building/>
														<span>My Organizations</span>
														</button>
													</SidebarMenuButton>
												</SidebarMenuItem>
											{orgsItems.map((item) => (
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
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
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