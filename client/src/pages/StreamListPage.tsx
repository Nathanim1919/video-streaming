import React, { useEffect } from 'react';
import StreamListItem from '../components/StreamListItem';
import styled from 'styled-components';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { requestHandler } from '../utils';
import { getEvents } from '../api';


interface Stream {
  id: string;
  title: string;
  streamer: string;
  scheduledDate: string;
}

const StreamList: React.FC = () => {
  const [streams, setStreams] = React.useState<Stream[]>([]);
  // const streams: Stream[] = [
  //   { id: '1', title: 'Stream 1', streamer: 'Streamer 1', scheduledDate: '2022-01-01' },
  //   { id: '2', title: 'Stream 2', streamer: 'Streamer 2', scheduledDate: '2022-01-02' },
  //   { id: '3', title: 'Stream 3', streamer: 'Streamer 3', scheduledDate: '2022-01-03' },
  //   { id: '4', title: 'Stream 4', streamer: 'Streamer 4', scheduledDate: '2022-01-04' },
  //   { id: '5', title: 'Stream 5', streamer: 'Streamer 5', scheduledDate: '2022-01-05' },
  //   { id: '1', title: 'Stream 1', streamer: 'Streamer 1', scheduledDate: '2022-01-01' },
  //   { id: '2', title: 'Stream 2', streamer: 'Streamer 2', scheduledDate: '2022-01-02' },
  //   { id: '3', title: 'Stream 3', streamer: 'Streamer 3', scheduledDate: '2022-01-03' },
  //   { id: '4', title: 'Stream 4', streamer: 'Streamer 4', scheduledDate: '2022-01-04' },
  //   { id: '5', title: 'Stream 5', streamer: 'Streamer 5', scheduledDate: '2022-01-05' },
  //   { id: '1', title: 'Stream 1', streamer: 'Streamer 1', scheduledDate: '2022-01-01' },
  //   { id: '2', title: 'Stream 2', streamer: 'Streamer 2', scheduledDate: '2022-01-02' },
  //   { id: '3', title: 'Stream 3', streamer: 'Streamer 3', scheduledDate: '2022-01-03' },
  //   { id: '4', title: 'Stream 4', streamer: 'Streamer 4', scheduledDate: '2022-01-04' },
  //   { id: '5', title: 'Stream 5', streamer: 'Streamer 5', scheduledDate: '2022-01-05' },
  //   { id: '1', title: 'Stream 1', streamer: 'Streamer 1', scheduledDate: '2022-01-01' },
  //   { id: '2', title: 'Stream 2', streamer: 'Streamer 2', scheduledDate: '2022-01-02' },
  //   { id: '3', title: 'Stream 3', streamer: 'Streamer 3', scheduledDate: '2022-01-03' },
  //   { id: '4', title: 'Stream 4', streamer: 'Streamer 4', scheduledDate: '2022-01-04' },
  //   { id: '5', title: 'Stream 5', streamer: 'Streamer 5', scheduledDate: '2022-01-05' },
  // ];

  const handleStreamClick = (streamId: string) => {
    console.log(`Stream clicked: ${streamId}`);
  };


  const getAllStreams = async () => {
    // Call the API to fetch all streams
    await requestHandler(
      async () => await getEvents(),
      null,
      (response) => {
        console.log(response.data);
        setStreams(response.data);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  useEffect(() => {
    getAllStreams();
  }, []);

  return (
    <Container>
      <div className='header'>
        <Link to={'/'}><IoArrowBackOutline/></Link>
      <h1>Streams</h1>
      <div>
        filter and search
      </div>
      </div>
      {streams.map(stream => (
        <StreamListItem key={stream.id} stream={stream} />
      ))}
    </Container>
  );
};

export default StreamList;


const Container = styled.div`
    .header{
      width: 100vw;
      margin: auto;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: black;

      a{
        font-size: 1.5rem;
        color: #fff;
      }

      @media screen and (max-width:600px){
       
        width: 100vw;
    }


      >*{
        padding:0 1rem;
      }
    }
`