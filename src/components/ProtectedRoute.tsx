import { useAuth, useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import AdminRequired from './AdminRequired';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin }) => {
    const { isSignedIn, isLoaded } = useUser();
    const { orgRole } = useAuth();

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/signin" />;
    }

    if (requireAdmin && orgRole !== 'admin') {
        return <AdminRequired />;
    }

    return children;    
};

export default ProtectedRoute;
