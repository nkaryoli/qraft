import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './header/Header';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const Layout = () => {
    useScrollToTop();
    return (
        <>
            <div className="grid-background"></div>
            <main className="min-h-screen flex flex-col items-center justify-between">
                <Header />
                <Outlet />
                <Footer />
            </main>
        </>
    );
};

export default Layout;
