import { NavLink } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from './ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { useState } from 'react';

const Header = () => {
    const isMobile = useIsMobile(568);
    const [ showSignin, setShowSignin ] = useState<boolean>(false);

    const handleOverlayClick = (e: { target: unknown; currentTarget: unknown; }) => {
        if (e.target === e.currentTarget) {
            setShowSignin(false);
        }
    }

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
                        <SheetTrigger>
                            <TiThMenu className="text-3xl" />
                        </SheetTrigger>
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
                <NavigationMenu
                    className={`${isMobile ? 'hidden' : 'flex'} items-center font-headerText`}
                >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="gap-3  w-44">
                                    <li className="">
                                        <NavigationMenuLink asChild>
                                            <NavLink to={'/qrGenerator'} className='rounded-none'>Create QR</NavLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <NavLink to={'/qrScanner'} className='rounded-none'>QR Reader</NavLink>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <NavLink to={'/qrGenerator'} className='rounded-none mb-6'>QR Reader</NavLink>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to={'/about'} className=" h-full">
                                    About us
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <NavLink to={'/faq'}>Faqs</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <div className='flex ml-1.5'>
                        <SignedOut>
                            <Button size='lg' onClick={()=> setShowSignin(true)}>Sign in</Button>
                        </SignedOut>
                        <SignedIn>
                            <div className='mt-2 ml-2 hover:drop-shadow-[0px_0px_10px_rgba(219,7,61,0.7)]'>
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                </NavigationMenu>
            </nav>
            {showSignin &&
            <div className='fixed inset-0 flex items-center justify-center bg-black/50'
                onClick={handleOverlayClick}
            >
                <SignIn 
                    signUpFallbackRedirectUrl='/'
                    fallback='/'
                />
            </div>
            }
        </header>
    );
};

export default Header;
