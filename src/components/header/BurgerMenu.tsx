import { memo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavLink } from "react-router-dom";
import { navigationLinks } from "@/constanst";
import { TiThMenu } from "react-icons/ti";

const BurgerMenu = ({ isMobile }:{ isMobile: boolean }) => {
	if (!isMobile) return null;

	return (
		<Sheet>
			<SheetTrigger aria-label="Open menu">
				<TiThMenu className="text-3xl" />
			</SheetTrigger>
			<SheetContent>
				<ul className="text-center w-full h-full pt-9">
					{navigationLinks.map(({ to, label }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									`flex items-center justify-center h-full py-4 transition-colors duration-200
									${isActive ? 'text-primary font-bold bg-accent/15' : 'hover:text-primary-foreground hover:bg-accent/10 '}`
								}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</SheetContent>
		</Sheet>
	)
}

export default memo(BurgerMenu);