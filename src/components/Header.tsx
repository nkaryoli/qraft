import { NavLink } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/useIsMobile';

const Header = () => {
    const  isMobile = useIsMobile(768);

    const navigationLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/faq', label: 'FAQ' },
    ];

    return (
        <header className="fixed flex justify-center h-auto w-full px-6 md:px-9 shadow-lg shabow-bg-100 bg-gradient-to-b from-black to-transparent ">
            <nav className="flex justify-between h-16 w-full">
                <NavLink
                    to="/"
                    className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-extrabold text-transparent"
                >
                    Qraft
                </NavLink>
                {isMobile && (
                    <Sheet>
                        <SheetTrigger><TiThMenu className="text-3xl" /></SheetTrigger>
                        <SheetContent>
                            <ul className="text-center w-full h-full pt-9">
                                {navigationLinks.map(({ to, label }) => (
                                    <li key={to}>
                                        <NavLink
                                            to={to}
                                            className={({ isActive }) =>
                                                `flex items-center justify-center h-full py-4 transition-transform duration-200 
												${isActive ? 'bg-accent border-l-4 border-secondary' : 'hover:text-ring hover:scale-105'}`
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </SheetContent>
                    </Sheet>
                )}
                <NavigationMenu className={`${isMobile ? 'hidden' : 'flex'} items-center font-headerText`}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="gap-3 p-3 w-44">
                                    <li className="">
                                        <NavigationMenuLink asChild>
                                            <NavLink to={'/qrGenerator'} >Create QR</NavLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <NavLink to={'/qrScanner'} >QR Reader</NavLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <NavLink to={'/qrGenerator'} >QR Reader</NavLink>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to={'/about'} className=' h-full'>About us</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to={'/faq'} >Faqs</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to={'/qrGenerator'} className='bg-primary ml-1' >Sign up</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
        </header>
    );
};

export default Header;
