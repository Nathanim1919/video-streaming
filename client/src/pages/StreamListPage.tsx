import React, { useEffect, useState } from "react";
import StreamListItem from "../components/StreamListItem";
import styled from "styled-components";
import { requestHandler } from "../utils";
import { streamApi } from "../api";
import Loader from "../components/Loader";
import {IStream} from '../interfaces/stream.interface';


const StreamList: React.FC = () => {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllStreams = async () => {
    // Call the API to fetch all streams
    await requestHandler(
      async () => await streamApi.getStreams(),
      setIsLoading,
      (response) => {
        setStreams(response.data as IStream[]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getAllStreams();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      {streams.map((stream) => (
        <StreamListItem key={stream._id} stream={stream} />
      ))}
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
