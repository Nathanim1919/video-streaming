import Streamer from './streamer';
import Viewer from './viewer';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StreamList from './pages/StreamListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import StreamerPage from './pages/StreamerPage';
import UserProfilePage from './pages/UserProfilePage';
import EventDetailPage from './pages/EventDetailPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AuthenticatedPage from './pages/authenticatedPage';
import { Account } from './pages/AccountPage';
import PricingPage from './pages/pricingPage';
import PrivateRouteWithHeader from './components/PrivateRouteWithHeader';


const App = () => {
  // You would set isStreamer based on your app's logic
  // For example, you could check the URL or a user's role

  return (
    <Routes>
      <Route 
        path='/'
        element={
        <PublicRoute>
          <HomePage/>
        </PublicRoute>
        }
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <RegisterPage/>
          </PublicRoute>
        }
      />
        <Route 
        path="/me" 
        element={
          <PrivateRouteWithHeader >
            <AuthenticatedPage/>
          </PrivateRouteWithHeader>
        }
      />
       <Route 
        path="/subscription" 
        element={
          <PrivateRouteWithHeader>
            <PricingPage/>
          </PrivateRouteWithHeader>
        }
      />
        <Route 
        path="/account" 
        element={
          <PrivateRouteWithHeader>
            <Account/>
          </PrivateRouteWithHeader>
        }
      />
      <Route 
        path="/streamers"
        element={
          <PrivateRouteWithHeader>
            <StreamerPage/>
        </PrivateRouteWithHeader>
        }/>

      <Route 
        path='/streamers/:id' 
        element={
          <PrivateRouteWithHeader>
           <UserProfilePage/>
          </PrivateRouteWithHeader>
      }/>

      <Route 
        path="/streames" 
        element={
        <PrivateRouteWithHeader>
          <StreamList/>
        </PrivateRouteWithHeader>
      }/>
      <Route 
        path='/streames/:eventId' 
        element={
        <PrivateRouteWithHeader>
          <EventDetailPage/>
        </PrivateRouteWithHeader>
      }/>
      <Route path="*" element={<p>404 Not found</p>} />
    </Routes>
  );
};

export default App;