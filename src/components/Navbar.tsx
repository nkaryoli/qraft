import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TiThMenu } from 'react-icons/ti';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 724);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 976);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigationLinks = [
        { to: '/', label: 'Home' },
        { to: '/qrScanner', label: 'QR Scanner' },
        { to: '/about', label: 'About' },
        { to: '/faq', label: 'FAQ' },
        { to: '/qrGenerator', label: 'Create QR' },
    ];

    return (
        <header className="fixed flex justify-center h-auto w-full px-6 md:px-9 shadow-lg shabow-bg-100 bg-muted/20 text-text-200/80">
            <nav className="flex justify-between h-16 w-full max-w-[1400px]">
                <NavLink
                    to="/"
                    className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-extrabold text-transparent"
                >
                    Qraft
                </NavLink>
                {isMobile && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? (
                            <div className="absolute right-6 top-5 z-50 text-3xl">
                                <IoClose />
                            </div>
                        ) : (
                            <TiThMenu className="text-3xl" />
                        )}
                    </button>
                )}
                <ul className={`${isMobile ? 'hidden' : 'flex'} items-center font-headerText`}>
                    {navigationLinks.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className="flex items-center justify-center h-full py-3 pr-12 text-sm md:text-lg transition-all duration-200 hover:text-primary-100"
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {isMobile && isOpen && (
                    <>
                        <div
                            onClick={() => setIsOpen(false)}
                            className="absolute left-0 w-full h-[100dvh] bg-black/50"
                        ></div>
                        <div className="absolute top-0 right-0 w-fit h-[100vh] flex justify-end border-t text-center bg-black/50">
                            <ul className="text-center w-[250px] h-full text-xl py-14 bg-bg-200">
                                {navigationLinks.map(({ to, label }) => (
                                    <li className="">
                                        <NavLink
                                            to={to}
                                            onClick={() => setIsOpen(!isOpen)}
                                            className={({ isActive }) =>
                                                `flex items-center justify-center h-full py-4 transition-all duration-200 
												${isActive ? 'bg-muted border-l-4 border-secondary' : 'hover:text-ring hover:scale-105'}`
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
