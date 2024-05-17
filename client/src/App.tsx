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
          <PrivateRoute>
            <AuthenticatedPage/>
          </PrivateRoute>
        }
      />
       <Route 
        path="/subscription" 
        element={
          <PrivateRoute>
            <PricingPage/>
          </PrivateRoute>
        }
      />
        <Route 
        path="/account" 
        element={
          <PrivateRoute>
            <Account/>
          </PrivateRoute>
        }
      />
      <Route 
        path="/streamers"
        element={<StreamerPage/>}
      />

      <Route path='/streamers/:userId' element={<UserProfilePage/>}/>
      {/* <Route path="/viewer" element={<Viewer/>}/> */}
      <Route path="/streames" element={<StreamList/>}/>
      <Route path='/streames/:eventId' element={<EventDetailPage/>}/>
      <Route path="*" element={<p>404 Not found</p>} />
    </Routes>
  );
};

export default App;