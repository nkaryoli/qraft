import { NavLink, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useIsMobile';
import Navbar from './Navbar';
import BurgerMenu from './BurgerMenu';
import SignInBtn from './SignInButton';

const Header = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile(768);

    const handleSignin = () => {
        navigate('/signin');
    };
    return (
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center h-16 w-screen px-6 md:px-9 shadow-lg  bg-gradient-to-b from-black to-transparent z-[99999999] backdrop-blur-sm">
            <NavLink
                to="/"
                className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-extrabold text-transparent"
            >
                Qraft
            </NavLink>
            <div className="flex items-center gap-4">
                {isMobile ? (
                    <>
                        <SignInBtn isMobile={isMobile} onClick={handleSignin} />
                        <BurgerMenu isMobile={isMobile} />
                    </>
                ) : (
                    <Navbar isMobile={isMobile} onClick={handleSignin} />
                )}
            </div>
        </header>
    );
};

export default Header;
