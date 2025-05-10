import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import { NavLink } from 'react-router-dom'
import SignInBtn from './SignInButton';
import { desktopNavLinks, serviceLinks } from '@/constanst';
import { memo } from 'react';

const Navbar = ({ isMobile, onClick}:{ isMobile: boolean, onClick: () => void}) => {
	if (isMobile) return null;

	return (
		<NavigationMenu className='flex items-center'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Services</NavigationMenuTrigger>
					<NavigationMenuContent >
						<ul className="gap-3 w-72 text-sm">
							{serviceLinks.map(({to, label, icon}, index) => (
								<li key={index}>
									<NavLink to={to} className='hover:bg-accent/10 hover:text-primary-foreground flex flex-row items-center gap-8 border-b pl-8 py-4 '>
										{icon}
										{label}
									</NavLink>
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
					{desktopNavLinks.map(({to, label}) => (
						<NavigationMenuItem key={to}>
							<NavigationMenuLink asChild>
								<NavLink to={to} className='py-2'>
									{label}
								</NavLink>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
			</NavigationMenuList>
			<SignInBtn isMobile={isMobile} onClick={onClick}/>
		</NavigationMenu>
	)
}

export default memo(Navbar);