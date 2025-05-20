import BadgePage from '@/features/badge/BadgePage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import FAQPage from '@/features/faq/FAQPage';
import HomePage from '@/features/home/HomePage';
import CustomizePage from '@/features/custom/CustomizePage';
import ScannerPage from '@/features/scanner/ScannerPage';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import SignInPage from '@/features/signin/SignInPage';
import { QRProvider } from '@/hooks/QRContext';
import BadgeViewer from '@/features/viewer/BadgeViewer';


export const router = createBrowserRouter([
    {
        path: '/viewer/:id',
        element: (
            <BadgeViewer />
        ),
    },
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
                path: '/qrScanner',
                element: <ScannerPage />,
            },
            {
                path: '/custom-badge',
                element: <QRProvider><BadgePage /></QRProvider>,
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
            }
        ],
    },
]);
