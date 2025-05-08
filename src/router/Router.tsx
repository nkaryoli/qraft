import AboutPage from '@/features/about/AboutPage';
import FAQPage from '@/features/faq/FAQPage';
import HomePage from '@/features/home/HomePage';
import QrGeneratorPage from '@/features/qrGenerator/QrGeneratorPage';
import ScannerPage from '@/features/scanner/ScannerPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/qrGenerator" element={<QrGeneratorPage />} />
                <Route path="/qrScanner" element={<ScannerPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
