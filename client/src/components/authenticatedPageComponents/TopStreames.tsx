import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Image from '/image/bg.jpg';
import Image4 from '/image/profile.jpg';
import { useState, useEffect } from 'react';
import { requestHandler } from '../../utils';
import Loader from '../Loader';
import { getTopEvents } from '../../api/event';

export const TopStreams = () => {
    const [streams, setStreams] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
    return (
        isLoading ? <Loader /> :
        <Container>
            <div className="header">
            <h1>Top <span>3</span> Streams of the Week</h1>
            </div>
            <StreamContainer>
                <div className='streams'>
            { streams.map((stream, index) => {
                return (
                        <Stream>
                            <div className="container">
                                <div className='streamer-info'>
                                    <img src={Image} alt='streamer' />
                                    <div className="proInfo">
                                        <div>
                                            <img src={Image4}/>
                                        </div>
                                        <div>
                                            <h3>PikachuPro</h3>
                                            <p>500 Followers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='more-info'>
                                    <p>Playing Overwatch - Season 8 - Competitive Play</p>
                                    <p>Currently streaming live for 1 hour and 40 minutes</p>
                                    <p>Audience: {(stream.attendees).length} Viewers</p>
                                    <p>Stream started at 10:00 PM</p>
                                </div>
                            </div>
                        </Stream>
                );
            })}
            </div>
            </StreamContainer>
            <div className='call-to-action'>
                <h1>Join the ranks of the elite streamers </h1>
                {/* <p>
                Are you a tech expert who wants to share your expertise with the world? Do you have a great idea for a workshop, seminar, conference, hackathon, or any other event? Then this app is for you!
                Streamers is a platform that allows you to host your own live stream events, and connect with other enthusiasts who are also passionate about technology and sharing their knowledge.
                Whether you are a professional, or just a hobbyist, Streamers is the perfect place to host your events, connect with other like-minded individuals, and grow your audience.
                With Streamers, you can create a schedule for your event, invite other streamers to join you, and even sell tickets or merchandise.
                Our platform is designed to be user-friendly, and we make it easy for you to get started.
                So why wait? Sign up for Streamers today and start building your community!
                </p> */}
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
       


        >div:nth-child(1){
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

        >div:nth-child(2){
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
    margin-top: 5rem;
    


`
const Stream = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #2e2d2d;
    padding: 1rem;
    border-radius: 10px;
    position: relative;


    .container{
        /* background-color: #2e2d2d; */
    }


    .streamer-info{
        position: relative;
        top: -20%;
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
        /* background-color: #fff; */
        p{
            font-size: .8rem;
            color: #ab9f9f;
            margin: 0;
        }
    }
`
