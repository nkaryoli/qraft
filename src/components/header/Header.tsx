import { NavLink, useSearchParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useCallback, useEffect, useState } from 'react';
import SigninModal from './SigninModal';
import Navbar from './Navbar';
import BurgerMenu from './BurgerMenu';
import SignInBtn from './SignInButton';

const Header = () => {
    const isMobile = useIsMobile(768);
    const [ showSignin, setShowSignin ] = useState<boolean>(false);
    const [ search, setSearch ] = useSearchParams();

    useEffect(() => {
        if (search.get('sign-in')) {
            setShowSignin(true);
        }
    }, [search])

    const handleCloseSignin = useCallback(() => {
        setShowSignin(false);
        setSearch({});
    }, [setSearch]);

    const handleOpenSignin = useCallback(() => {
        setShowSignin(true);
    }, []);

    return (
        <header className="fixed flex justify-center h-auto w-full px-6 md:px-9 shadow-lg shabow-bg-100 bg-gradient-to-b from-black to-transparent ">
            <nav className="flex justify-between items-center w-full h-16">
                <NavLink
                    to="/"
                    className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-extrabold text-transparent"
                >
                    Qraft
                </NavLink>
                <div className='flex items-center gap-4'>
                    {isMobile && <SignInBtn isMobile={isMobile} onClick={handleOpenSignin}/>}
                    <BurgerMenu isMobile={isMobile} />
                </div>
                <Navbar isMobile={isMobile} onClick={handleOpenSignin} />
            </nav>
            <SigninModal isOpen={showSignin} onClose={handleCloseSignin} />
        </header>
    );
};

export default Header;
