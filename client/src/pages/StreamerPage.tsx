import styled from "styled-components";
import { Link } from "react-router-dom";
import StreamerList from "../components/StreamerList";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { fetchStreamers } from "../api";
import { requestHandler } from "../utils";
import Loader from "../components/Loader";

export interface Streamer {
    id: string;
    name: string;
    email: string;
    profession: string;
    followers: string[];
}



const StreamerPage = () => {
    const [streamers, setStreamers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // fetch all streamers
    useEffect(() => {
        (async () => {await requestHandler(
            async () => await fetchStreamers(),
            setIsLoading,
            (response) => {
                console.log(response.data);
                setStreamers(response.data);
            },
            (error) => {
                console.log(error);
            }
        )})();
    }, []);


    return (
        isLoading ? <Loader /> : (
            <Container>
                <div className='topheader'>
                    <div className='back'>
                        <Link to="/"><IoArrowBackOutline size={30} color='#fff' /></Link>
                    </div>
                    <p>Connect with your favorite streamers</p>
                </div>
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
    background-color: #181818;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    color: #fff;
    width: 100vw;
    margin: auto;


    @media screen and (max-width:800px){
        width: 95vw;
    }

    
    .topheader{
        position: sticky;
        display: flex;
        justify-content: center;
        top: 0;
        /* background-color: #000000; */
        width: 100%;
        .back{
            position: absolute;
            top: 20px;
            left: 20px;
        }
      
        p{
            font-size: 1.5rem;
            justify-self: end;
        }
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