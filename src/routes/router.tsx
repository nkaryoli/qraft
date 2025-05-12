import AboutPage from '@/features/about/AboutPage';
import OrgDashboard from '@/features/dashboard/OrgDashboard';
import FAQPage from '@/features/faq/FAQPage';
import HomePage from '@/features/home/HomePage';
import CustomPage from '@/features/custom/CustomPage';
import CustomBadgePage from '@/features/onboarding/CustomBadgePage';
import QrGeneratorPage from '@/features/qrGenerator/QrGeneratorPage';
import ScannerPage from '@/features/scanner/ScannerPage';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

export const router =  createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/", 
                element: <HomePage />,
            },
            {
                path: "/customization", 
                element: <ProtectedRoute><CustomPage /></ProtectedRoute>,
            },
            {
                path: "/qrGenerator", 
                element: <QrGeneratorPage />,
            },
            {
                path: "/qrScanner", 
                element: <ScannerPage />,
            },
            {
                path: "/about", 
                element: <AboutPage />,
            },
            {
                path: "/faq", 
                element: <FAQPage />,
            },
            {
                path: "/dashboard", 
                element: <ProtectedRoute><OrgDashboard /></ProtectedRoute>,
            },
            {
                path: "/customBadge", 
                element: <ProtectedRoute><CustomBadgePage /></ProtectedRoute>,
            },
        ]
    }
]);
