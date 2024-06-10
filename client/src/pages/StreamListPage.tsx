import React, { useEffect, useState, useRef } from "react";
import StreamListItem from "../components/StreamListItem";
import styled from "styled-components";
import { requestHandler } from "../utils";
import { eventApi } from "../api";
import Loader from "../components/Loader";

interface Stream {
  id: string;
  title: string;
  streamer: string;
  scheduledDate: string;
}

const StreamList: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const observerRef = useRef<IntersectionObserver>();

  const lastStreamRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
          console.log("page: ", page);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    if (lastStreamRef.current) {
      observerRef.current.observe(lastStreamRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [page]);



  const getAllStreams = async () => {
    // Call the API to fetch all streams
    await requestHandler(
      async () => await eventApi.getEvents({ page: page, limit: 3 }),
      setIsLoading,
      (response) => {
        console.log(response);
        // setStreams(response.data);
        setStreams((prevEvents) => [...prevEvents, ...response.data]);
      },
      (error) => {
        console.log(error);
      }
    );
  };


  useEffect(() => {
    getAllStreams();
    console.log("page: ", page);
  }, [page]);


  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      {streams.map((stream) => (
        <StreamListItem key={stream.id} stream={stream} />
      ))}
      <div className="loader" ref={lastStreamRef}>
        <h1>Loading events...</h1>
      </div>
    </Container>
  );
};

export default StreamList;


const Container = styled.div`
  background-color: rgb(3, 3, 3);
  padding: 1rem 0;
  overflow: auto;
  height: 100vh;

  .loader {
    color: #fff;
  }
  .header {
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

    .searchesAndFilters {
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }

    a {
      font-size: 1.5rem;
      color: #fff;
    }

    @media screen and (max-width: 600px) {
      width: 100vw;
    }

    > * {
      padding: 0 1rem;
    }
  }
`;
