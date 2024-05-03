import Streamer from './streamer';
import Viewer from './viewer';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StreamList from './pages/StreamListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';



const App = () => {
  // You would set isStreamer based on your app's logic
  // For example, you could check the URL or a user's role

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<RegisterPage/>}/>
      <Route path="/streamer" element={<Streamer/>}/>
      <Route path="/viewer" element={<Viewer/>}/>
      <Route path="/streams" element={<StreamList/>}/>
      
    </Routes>
  );
};

export default App;