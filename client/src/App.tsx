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



const App = () => {
  // You would set isStreamer based on your app's logic
  // For example, you could check the URL or a user's role

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
      <Route path="/streamers" element={<StreamerPage/>}/>
      <Route path='/streamers/:id' element={<UserProfilePage/>}/>
      <Route path="/viewer" element={<Viewer/>}/>
      <Route path="/streames" element={<StreamList/>}/>
      <Route path='/streames/:id' element={<EventDetailPage/>}/>
      
    </Routes>
  );
};

export default App;