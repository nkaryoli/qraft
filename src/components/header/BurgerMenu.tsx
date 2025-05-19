import { memo } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet';
import { navigationLinks } from '@/constanst';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BurgerMenu = ({ isMobile }: { isMobile: boolean }) => {
    const location = useLocation();

    const menuLinks = navigationLinks.map(({ to, label, icon }) => {
        const isActive = location.pathname === to;
        const className = `w-full flex items-center gap-3 text-center py-4 px-9 border-b transition-colors duration-200
		${isActive ? 'text-primary font-bold bg-accent/15' : 'hover:text-primary-foreground hover:bg-accent/10'}`;
        return (
            <li key={to}>
                <SheetClose asChild>
                    <a href={to} className={className}>
                        {icon}
                        {label}
                    </a>
                </SheetClose>
            </li>
        );
    });

    if (!isMobile) return null;
    return (
        <Sheet>
            <SheetTrigger aria-label="Open menu">
                <Menu size={35} />
            </SheetTrigger>
            <SheetContent aria-describedby="navegation links" className="w-[280px] z-[99999] bg-background">
                <div className='bg-gradient-to-b from-black/60 via-card to-background h-full'>
                    <SheetTitle className="hidden">Side Menu</SheetTitle>
                    <SheetDescription className="hidden"></SheetDescription>
                <ul className="text-center w-full h-full pt-9">{menuLinks}</ul>
                </div>
                <SheetFooter className="relative border-t text-xs flex flex-col items-center justify-center">
                    <div className="absolute w-full h-full burgerFooter"></div>
                    <span>
                        Qraft by
                        <a
                            href="https://github.com/nkaryoli"
                            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-1"
                        >
                            Karyoli
                        </a>
                    </span>
                    <p className="text-primary">Hackaton-Clerk-2025</p>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default memo(BurgerMenu);
