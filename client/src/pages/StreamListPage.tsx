import React, { useEffect } from 'react';
import StreamListItem from '../components/StreamListItem';
import styled from 'styled-components';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { requestHandler } from '../utils';
import { getEvents } from '../api/event';
import Loader from '../components/Loader';


interface Stream {
  id: string;
  title: string;
  streamer: string;
  scheduledDate: string;
}

const StreamList: React.FC = () => {
  const [streams, setStreams] = React.useState<Stream[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);



  const getAllStreams = async () => {
    // Call the API to fetch all streams
    await requestHandler(
      async () => await getEvents(),
      setIsLoading,
      (response) => {
        setStreams(response.data);
      },
      (error) => {
        console.log(error);
      }
    )

  }

  console.log(streams);

  useEffect(() => {
    getAllStreams();
  }, []);

  return (
    isLoading ? <Loader /> : (
    <Container>
      {streams.map(stream => (
        <StreamListItem key={stream.id} stream={stream} />
      ))}
    </Container>
    )
  );
};

export default StreamList;


const Container = styled.div`
     background-color: #030303;
     padding: 1rem 0;
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

      .searchesAndFilters{
        display: flex;
        gap: 1rem;
        padding: 1rem;

      }

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
