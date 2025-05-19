import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '../ui/navigation-menu';
import { NavLink } from 'react-router-dom';
import SignInBtn from './SignInButton';
import { desktopNavLinks } from '@/constanst';
import { memo } from 'react';

const Navbar = ({ isMobile, onClick }: { isMobile: boolean; onClick: () => void }) => {
    if (isMobile) return null;

    return (
        <NavigationMenu className="flex items-center">
            <NavigationMenuList>
                {desktopNavLinks.map(({ to, label }) => (
                    <NavigationMenuItem key={to}>
                        <NavigationMenuLink asChild>
                            <NavLink to={to} className="py-2">
                                {label}
                            </NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
            <SignInBtn isMobile={isMobile} onClick={() => onClick()} />
        </NavigationMenu>
    );
};

export default memo(Navbar);
