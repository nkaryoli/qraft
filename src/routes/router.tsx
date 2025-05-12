// import ProtectedRoute from '@/components/ProtectedRoute';
import AboutPage from '@/features/about/AboutPage';
import OrgDashboard from '@/features/dashboard/OrgDashboard';
import FAQPage from '@/features/faq/FAQPage';
import HomePage from '@/features/home/HomePage';
import CustomPage from '@/features/custom/CustomPage';
import OnboardingPage from '@/features/onboarding/OnboardingPage';
import QrGeneratorPage from '@/features/qrGenerator/QrGeneratorPage';
import ScannerPage from '@/features/scanner/ScannerPage';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';

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
                element: <CustomPage />,
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
                element: <OrgDashboard />,
            },
            {
                path: "/onboarding", 
                element: <OnboardingPage />,
            },
        ]
    }
]);
