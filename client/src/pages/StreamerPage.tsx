import styled from "styled-components";
import StreamerList from "../components/StreamerList";
import { useEffect, useState } from "react";
import { authApi } from "../api";
import { requestHandler } from "../utils";
import Loader from "../components/Loader";
import { IEvent } from "../interfaces/event";

export interface Streamer {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    bio: string;
    profession: string;
    followers: string[];
    following: string[];
    events: IEvent[];
    streams: IEvent[];
    rating: number;
    profilePicture: {
        public_id: string;
        url: string;
    };
}



const StreamerPage = () => {
    const [streamers, setStreamers] = useState<Streamer[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    // fetch all streamers
    useEffect(() => {
        (async () => {await requestHandler(
            async () => await authApi.fetchStreamers(),
            setIsLoading,
            (response) => {
                console.log(response);
                const {data} = response;
                setStreamers(data as Streamer[]);
            },
            (error) => {
                console.log(error);
            }
        )})();
    }, []);
    console.log(streamers)


    return (
        isLoading ? <Loader /> : (
            <Container>
                <div className="streamer-list">
                    {streamers.length === 0 ? <p>No streamers available</p> :
                        streamers.map((streamer: Streamer) => (
                            <StreamerList key={streamer._id} streamer={streamer} />
                        ))
                    }
                </div>
            </Container>
        )
    );
};

export default StreamerPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;
    color: #fff;
    width: 100vw;
    margin: auto;


    @media screen and (max-width: 800px) {
        width: 95vw;
    }


    .streamer-list {
        display: flex;
        gap: 1rem;
        grid-row-gap: 2rem;
        flex-wrap: wrap;
        justify-content: center;
        height: 100%;
        overflow-y: auto;
        padding: 2rem;
    }
`;
