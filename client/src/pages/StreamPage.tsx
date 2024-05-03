import VideoPlayer from '../components/VideoPlayer';
import AudioPlayer from '../components/AudioPlayer';
import ChatSection from '../components/ChatSection';

const StreamPage = () => {
  return (
    <div>
      <h1>Stream Title</h1>
      <p>Streaming by: Streamer Name</p>

      <VideoPlayer />
      
      <div>
        <h2>Join in Audio</h2>
        <p>If the streamer allows, you can join the stream in audio. Click the button below to join.</p>
        <AudioPlayer />
      </div>

      <ChatSection />

      <div>
        <h2>About the Stream</h2>
        <p>This is where the streamer can share more about what they're streaming, why they're streaming it, and so on.</p>
      </div>
    </div>
  );
};

export default StreamPage;