import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


// Define the PublicRoute component that wraps child components to ensure user authentication
const PublicRoute: React.FC<{children: ReactNode}> = ({
    children,
}) => {
    // Access user and token information from the authentication context
    const { user, token } = useAuth();

    // Redirect to home page if user is authenticated
    if (user?._id && token) return <Navigate to="/me" />

    // Render the child component if user is not authenticated
    return children;
}


export default PublicRoute