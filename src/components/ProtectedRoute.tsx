import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;
