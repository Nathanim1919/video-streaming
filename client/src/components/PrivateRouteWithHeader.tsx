import { Outlet } from 'react-router-dom';
import  { ReactNode } from 'react';
import { Header } from './authenticatedPageComponents/header';
import PrivateRoute from './PrivateRoute';

const PrivateRouteWithHeader = ({ children, ...rest }: { children: ReactNode }) => {
    return (
        <PrivateRoute {...rest}>
            <Header /> {/* Your common header */}
            {children}
            <Outlet />
        </PrivateRoute>
    );
};

export default PrivateRouteWithHeader;