// Import required modules and types from react and react-router-dom libraries
import React, { ReactNode } from 'react';
import {useNavigate } from 'react-router-dom';


// Import authentication context for retrieving user and token information
import { useAuth } from '../contexts/AuthContext';


// Define a PrivateRoute component that wraps child component to ensure user authentication
const PrivateRoute: React.FC<{children: ReactNode}> = ({
    children,
}) => {
    // Access user and token information from the authentication context
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect to login page if user is not authenticated
    if (!user?._id){
        navigate('/');
    }

    // Render the child component if user is authenticated
    return children;
}


export default PrivateRoute;