import React from 'react';
import StreamListItem from '../components/StreamListItem';

interface Stream {
  id: string;
  title: string;
  streamer: string;
  scheduledDate: string;
}

const StreamList: React.FC = () => {
  const streams: Stream[] = [
    { id: '1', title: 'Stream 1', streamer: 'Streamer 1', scheduledDate: '2022-01-01' },
    { id: '2', title: 'Stream 2', streamer: 'Streamer 2', scheduledDate: '2022-01-02' },
    { id: '3', title: 'Stream 3', streamer: 'Streamer 3', scheduledDate: '2022-01-03' },
    { id: '4', title: 'Stream 4', streamer: 'Streamer 4', scheduledDate: '2022-01-04' },
    { id: '5', title: 'Stream 5', streamer: 'Streamer 5', scheduledDate: '2022-01-05' },
  ];

  return (
    <div>
      <h1>Streams</h1>
      {streams.map(stream => (
        <StreamListItem key={stream.id} stream={stream} />
      ))}
    </div>
  );
};

export default StreamList;