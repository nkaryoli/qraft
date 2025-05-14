import AboutPage from '@/features/about/AboutPage';
import Dashboard from '@/features/dashboard/Dashboard';
import FAQPage from '@/features/faq/FAQPage';
import HomePage from '@/features/home/HomePage';
import CustomizePage from '@/features/custom/CustomizePage';
import CustomBadgePage from '@/features/onboarding/CustomBadgePage';
import QrGeneratorPage from '@/features/qrGenerator/QrGeneratorPage';
import ScannerPage from '@/features/scanner/ScannerPage';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import SignInPage from '@/features/signin/SignInPage';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/signin',
                element: <SignInPage />,
            },
            {
                path: '/customize',
                element: (
                    <ProtectedRoute>
                        <CustomizePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/qrGenerator',
                element: <QrGeneratorPage />,
            },
            {
                path: '/qrScanner',
                element: <ScannerPage />,
            },
            {
                path: '/about',
                element: <AboutPage />,
            },
            {
                path: '/faq',
                element: <FAQPage />,
            },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/customBadge',
                element: (
                    <ProtectedRoute>
                        <CustomBadgePage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
