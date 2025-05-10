import { memo } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavLink } from "react-router-dom";
import { navigationLinks } from "@/constanst";
import { Menu } from "lucide-react";

const BurgerMenu = ({ isMobile }:{ isMobile: boolean }) => {
	if (!isMobile) return null;

	return (
		<Sheet>
			<SheetTrigger aria-label="Open menu">
				<Menu size={35} />
			</SheetTrigger>
			<SheetContent aria-describedby='navegation links'>
				<SheetTitle className='hidden'>Side Menu</SheetTitle>
				<SheetDescription className='hidden'></SheetDescription>
				<ul className="text-center w-full h-full pt-9">
					{navigationLinks.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`flex items-center justify-center h-full py-4 border-b transition-colors duration-200
									${isActive ? 'text-primary font-bold bg-accent/15' : 'hover:text-primary-foreground hover:bg-accent/10 '}`
								}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
				<SheetFooter className="relative border-t text-xs flex flex-col items-center justify-center">
					<div className='absolute w-full h-full burgerFooter'></div>
					<span>
						Qraft by 
						<a href="https://github.com/nkaryoli" className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-1">
							Karyoli
						</a>
					</span>
					<p className='text-primary'>Hackaton-Clerk-2025</p>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default memo(BurgerMenu);