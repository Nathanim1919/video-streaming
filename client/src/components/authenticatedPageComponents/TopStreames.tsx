import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from '/home/live.jpeg';
import Image4 from '/image/profile.jpg';
import { useState, useEffect } from 'react';
import { formatDate, requestHandler } from '../../utils';
import Loader from '../Loader';
import { getTopEvents } from '../../api/event';
import { useAuth } from '../../contexts/AuthContext';
import useRsvp from '../../customeHook/useRsvp';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRadioButtonChecked } from "react-icons/md";



interface Stream {
    _id: string;
    title: string;
    description: string;
    date: string;
    attendees: string[];
    owner: {
        fullName: string;
        followers: string[];
    }

}


export const TopStreams = () => {
    const navigate = useNavigate();
    const [streams, setStreams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        (async () => {await requestHandler(
            async () => await getTopEvents(),
            setIsLoading,
            (response) => {
                setStreams(response.data);
            },
            (error) => {
                console.log(error);
            }
        )})();
    }, []);

    // handle rsvp and remove rsvp, if user is authenticated
    const handleRsvpClick = async (eventId: string) => {
        if(isAuthenticated()){
            // await handleRsvp(eventId);
            navigate(`/streames/${eventId}`)
        }else{
            navigate('/login')
        }
    }

    return (
        isLoading ? <Loader /> :
        <Container>
            <div className="header">
            <h1>Top <span>3</span> Streams of the Week</h1>
            </div>
            <StreamContainer>
                <div className='streams'>
            { streams.map((stream: Stream, index) => {
                return (
                        <Stream key={index}>
                            <div className="container">
                                <div className='streamer-info'>
                                    <img src={Image} alt='streamer' />
                                    <div className="proInfo">
                                        <div>
                                            <img src={Image4}/>
                                        </div>
                                        <div>
                                            <h3>{(stream.owner.fullName)}</h3>
                                            <p>{(stream.owner.followers).length} followers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='more-info'>
                                    <div className="desc">
                                        <h3>{stream.title}</h3>
                                        <p>{(stream.description).slice(0, 20)}..</p>
                                    </div>
                                    <p><MdOutlineRadioButtonChecked/>{formatDate(stream.date)}</p>
                                    <p><MdOutlineRadioButtonChecked/>Audience: {(stream.attendees).length} Viewers</p>
                                    <p><MdOutlineRadioButtonChecked/>Stream started at 10:00 PM</p>
                                    <div className="rsvp">
                                        <button onClick={()=>handleRsvpClick(stream._id)}>Rsvp now</button>
                                        <button onClick={()=>handleRsvpClick(stream._id)}>read more</button>
                                    </div>
                                </div>
                            </div>
                        </Stream>
                );
            })}
            </div>
            </StreamContainer>
            <div className='call-to-action'>
                <h1>Join the ranks of the elite streamers </h1>
                <p>Sign up for Streamers today and start building your community!</p>
                <Link to='/start-stream'>Start Streaming Now</Link>
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    

    .header{
        h1{
            font-size: 3rem;
            color: #fff;
            span{
                color: #f32e1c;
                font-size: 5rem;
                background-color: #fff;
                padding: 0 1.4rem;
            }
        }
    }

    h1{
        color: #000;
    }

    .streams{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
        width: 70%;
        position: relative;
        top:-50%;
        margin-top: -2rem;

      


        @media screen and (max-width: 800px){
            grid-template-columns: 1fr;
            width: 95%;
            
        }
       


        >div:nth-child(2){
            position: relative;
            top: 20%;

            @media screen and (max-width: 800px){
            top: 0;
        }
        }

        >div:nth-child(3){
            position: relative;
            top: 40%;
            @media screen and (max-width: 800px){
            top: 40%;
        }
        }

        >div:nth-child(1){
            position: relative;
           
            @media screen and (max-width: 800px){
            top: 20%;
        }}
        
    }



    .call-to-action{
        background-color: #0d2550;
        padding: 5rem 0;
        position: relative;
        margin-top: 5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        >*{
            margin: 0;
            color: #fff;
        }
        a{
            color: #333;
            text-decoration: none;
            background-color: #fff;
            margin-top: 1rem;
            padding: .5rem 1rem;
        }

        h1{
            font-size: 3rem;
            color: #fff;
        }
    }

    
`
const StreamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(30deg,transparent, transparent,#052e74);
    padding: 1rem;
    padding-bottom: 5rem;
    position: relative;
    margin: 2rem 0 ;
    


`
const Stream = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    background: linear-gradient(195deg, #0f1f67, #021b46);
    padding: 1rem;
    border-radius: 10px;
    position: relative;
    max-height: 100%;

    >*{
        margin: 0;
    }

    .rsvp{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .5rem;
            button{
                background-color: #f32e1c;
                color: #fff;
                padding: .5rem 1rem;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-family: inherit;

                &:hover{
                    opacity: .6;
                }
            }

            button:nth-child(2){
                background-color: transparent;
                color: #ddd;
                margin-left: 1rem;
            }
        }


    .container{
        /* background-color: #2e2d2d; */
    }


    .streamer-info{
        position: relative;
        /* top: -20%; */
        color: #fff;
        img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, .15);

        }

        .proInfo{
            display: flex;
            align-items: center;

            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: .5rem;
            }

            div{
                display: flex;
                flex-direction: column;
                padding: 1rem 0;

                p{
                    margin: 0;
                    font-size: .8rem;
                    color: #ab9f9f;
                }

                h3{
                    margin: 0;
                    font-size: 1.2rem;
                    color: #e8e0e0;
                }
            }
        }
    }

    div.more-info{
        display: flex;
        flex-direction: column;
        gap: .5rem;

        .desc{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: .4rem;


            h3{
                font-size: 1.5rem;
                margin: 0;
                color: #fff;
            }
        }

        /* background-color: #fff; */
        p{
            font-size: .8rem;
            color: #ab9f9f;
            margin: 0;
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }
`
