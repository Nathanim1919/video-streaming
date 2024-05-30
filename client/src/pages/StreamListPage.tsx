import React, { useEffect, useState } from 'react';
import StreamListItem from '../components/StreamListItem';
import styled from 'styled-components';
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
  const [page, setPage] = useState(1);
  const loader = React.useRef(null);

  const handleObserver = (entities: any) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);



  const getAllStreams = async () => {
    // Call the API to fetch all streams
    await requestHandler(
      async () => await getEvents({ page:page, limit: 10 }),
      setIsLoading,
      (response) => {
        console.log(response);
        // setStreams(response.data);
        setStreams((prevEvents) => [...prevEvents, ...response.data]);
      },
      (error) => {
        console.log(error);
      }
    )

  }
  
  useEffect(() => {
    getAllStreams();
    console.log("page: ", page);
  }, [page]);

  return (
    isLoading ? <Loader /> : (
    <Container>
      {streams.map(stream => (
        <StreamListItem key={stream.id} stream={stream} />
      ))}
      <div ref={loader}>
        <h1>Loading events...</h1>
      </div>
    </Container>
    )
  );
};

export default StreamList;


const Container = styled.div`
     background-color: rgb(3, 3, 3);
     padding: 1rem 0;
     overflow: auto;
     height: 100vh;
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
