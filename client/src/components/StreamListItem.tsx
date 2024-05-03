import React from 'react';

interface Stream {
  id: string;
  title: string;
  streamer: string;
  scheduledDate: string;
}

interface StreamListItemProps {
  stream: Stream;
}

const StreamListItem: React.FC<StreamListItemProps> = ({ stream }) => {
  const handleRSVP = () => {
    // Here you would typically handle the RSVP action, such as sending a request to your server
    console.log(`RSVP for stream ${stream.id}`);
  };

  return (
    <div>
      <h2>{stream.title}</h2>
      <p>Streaming by: {stream.streamer}</p>
      <p>Scheduled for: {stream.scheduledDate}</p>
      <button onClick={handleRSVP}>RSVP</button>
    </div>
  );
};

export default StreamListItem;