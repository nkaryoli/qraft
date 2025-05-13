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
	}
    return (
        <header className="fixed top-0 flex justify-center h-auto w-full px-6 md:px-9 shadow-lg shabow-bg-100 bg-gradient-to-b from-black to-transparent z-50 backdrop-blur-sm">
            <nav className="flex justify-between items-center w-full h-16">
                <NavLink
                    to="/"
                    className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-extrabold text-transparent"
                >
                    Qraft
                </NavLink>
                <div className='flex items-center gap-4'>
                    {isMobile && <SignInBtn isMobile={isMobile} onClick={handleSignin}/>}
                    <BurgerMenu isMobile={isMobile} />
                </div>
                <Navbar isMobile={isMobile} onClick={handleSignin} />
            </nav>
        </header>
    );
};

export default Header;
