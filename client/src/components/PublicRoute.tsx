import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
    // Redirect to home page if user is authenticated
    if (user?._id) {
      navigate('/me');
    }


  // Render the child component if user is not authenticated
  return <>{children}</>;
};

export default PublicRoute;


