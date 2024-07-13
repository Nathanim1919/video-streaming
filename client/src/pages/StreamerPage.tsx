import styled from "styled-components";
import { Link } from "react-router-dom";
import StreamerList from "../components/StreamerList";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { authApi } from "../api";
import { requestHandler } from "../utils";
import Loader from "../components/Loader";

export interface Streamer {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    bio: string;
    profession: string;
    followers: string[];
    following: string[];
    events: string[];
    rating: number;
    profilePicture: {
        public_id: string;
        url: string;
    };
}



const StreamerPage = () => {
    const [streamers, setStreamers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // fetch all streamers
    useEffect(() => {
        (async () => {await requestHandler(
            async () => await authApi.fetchStreamers(),
            setIsLoading,
            (response) => {
                console.log(response);
                const {data} = response;
                setStreamers(data);
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
                            <StreamerList key={streamer.id} streamer={streamer} />
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


    @media screen and (max-width:800px){
        width: 95vw;
    }


    .streamer-list{
        display: flex;
        gap: 1rem;
        grid-row-gap: 2rem;
        flex-wrap: wrap;
        justify-content: center;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 2rem;
        padding: 2rem;
    }
`;