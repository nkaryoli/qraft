import AboutPage from '@/features/about/AboutPage';
import DashboardPage from '@/features/dashboard/DashboardPage';
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
import { QRProvider } from '@/hooks/QRContext';

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
                        <QRProvider>
                            <CustomizePage />
                        </QRProvider>
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
                element: <QRProvider><AboutPage /></QRProvider>,
            },
            {
                path: '/faq',
                element: <FAQPage />,
            },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <QRProvider>
                            <DashboardPage />
                        </QRProvider>
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
