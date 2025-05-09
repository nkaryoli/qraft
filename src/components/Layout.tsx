import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="grid-background"></div>
            <Navbar />
            <main className="flex-1 flex items-center justify-center">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
