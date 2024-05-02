// App.tsx
import React from 'react';
import Streamer from './streamer';
import Viewer from './viewer';
import { Route, Routes } from 'react-router-dom';



const App = () => {
  const [isStreamer, setIsStreamer] = React.useState(true);

  // You would set isStreamer based on your app's logic
  // For example, you could check the URL or a user's role

  return (
    <Routes>
      <Route path="/streamer" element={<Streamer/>}/>
      <Route path="/viewer" element={<Viewer/>}/>
    </Routes>
  );
};

export default App;