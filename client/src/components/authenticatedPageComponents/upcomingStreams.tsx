import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import coverImage from '/home/live.jpeg'
import profilePic from '/image/profile.jpg'
import { useAuth } from '../../contexts/AuthContext';
import { GrFormNextLink } from "react-icons/gr";
import { requestHandler } from '../../utils';
import { getUpcomingEvents } from '../../api/event';
import Loader from '../Loader';


export const UpcomingStreams: React.FC = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getUpcomingEvent() {
            await requestHandler(
                async () => getUpcomingEvents(),
                setIsLoading,
                (data) => setUpcomingEvents(data.data),
                (error) => console.log(error)
            )
        }
        getUpcomingEvent();
    }, [])

    const {isAuthenticated} = useAuth();
    console.log(upcomingEvents);

    return (
        <Container>
            <div className="header">
        <h1>Upcoming Events</h1>
        <Link to={isAuthenticated() ? '/streames' : "/login"}>Browse all</Link>
            </div>
            {isLoading? <Loader/>:<StreamList>
                {
                    upcomingEvents?.map((event) => {
                        return (
                            <div key={event._id}>
                                <div className='header'>
                                    <div className="profile">
                                        <div className='profilePic'>
                                        <img src={profilePic} alt="profile" />
                                        </div>
                                        <div className='profileInfo'>
                                            <h3>{event.owner?.fullName}</h3>
                                            <p>{event.owner?.profession}</p>
                                        </div>
                                    </div>
                                    <div className="streamCoverImage" style={{backgroundImage:`linear-gradient(to left, #00000098, #000001),URL(${coverImage})`}}>
                                        {/* <img src={coverImage} alt="stream" /> */}
                                    </div>
                                </div>
                                <div className="streamInfo">
                                    <div>
                                        <h2>{(event.title).slice(0,20)}..</h2>
                                        <p>Saturday {event.date} Local time</p>
                                    </div>
                                    
                                    <Link  className="seemore" to={`/streames/${event._id}`}>See More<GrFormNextLink/></Link>
                                </div>
                            </div>
                        )
                    })
                }
            </StreamList>}
        </Container>
    );
}


const Container = styled.div`
    width: 100vw;
    margin:auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    color: #fff;
    padding-bottom: 4rem;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, #141313, #1a1919);
    overflow: hidden;
    

    >div.header{
        display: flex;
        justify-content: space-around;
        align-items: center;
        >a{
            text-decoration: none;
            color: #000;
            padding: .5rem 1rem;
            background-color: #fff;
            width: fit-content;
            align-self: center;

            &:hover{
                background-color: #000;
                color: #fff;
                box-shadow: 0 12px 30px rgba(0,0,0,0.1);
            }
        }
    }

`

const StreamList = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    width: 90%;
    margin: auto;

    >*{
        color: #fff;
        flex: 1;
        display: grid;
        gap: 3rem;
        max-width: 450px;
        min-width: 300px;
        grid-template-rows: 1fr 1fr;
        background-color: #000000;


        &:hover{
            cursor: pointer;
            .header{

                .streamCoverImage{
                    overflow: hidden;
                    max-height: 300px;
                    background-image:linear-gradient(to bottom, #00000020, #00000023), url(${coverImage});
                }
            }
        }


        .header{
            position: relative;
            display: grid;
            width: 100%;

            .streamCoverImage{
                overflow: hidden;
                max-height: 300px;
                background-position: center;
                background-size: cover;

                img{
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    filter: brightness(50%);
                }
            }

            .profile{
               color: #fff;
               /* background-color: red; */
               position: absolute;
               z-index: 5;
               bottom: 0;
               display: flex;
               align-items: center;
               gap: 1rem;
               padding: 0 1rem;
               /* justify-content: center; */
               width: 100%;

                >*{
                    margin: 0;
                }

                .profileInfo{
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    p{
                        font-size: .8rem;
                        color: #eee;
                    }

                    >*{
                        margin: 0;
                    }
                }

                .profilePic{
                    /* background-color: blue; */
                }

                .profilePic img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    /* border: 5px solid #8b0909; */
                }
            }
        }

        .streamInfo{
            display: grid;
            place-items: center;
            div:nth-child(1){
                display: flex;
                flex-direction: column;
                padding: 1rem 0;

                >*{
                    margin: 0;
                }
                h2{
                    font-size: 1.5rem;
                }
                p{
                    font-size: .8rem;
                }
            }

            .timeCountDown{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
                padding: 1rem;


                p{
                    align-self: flex-end;
                }
                h1{
                    font-size: 2.4rem;
                }

                >*{
                    margin: 0;
                }
            }

            a.seemore{
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    gap: .5rem;
                    padding: 1rem 0;
                    background-color:transparent;
                    color: #fff;
                    width: 100%;
                    font-size: 1rem;
                    /* font-weight: bold; */
                    text-decoration: none;
                    transition: all .5s;
                    border-top: 1px solid #333;
                    &:hover{
                        background-color:#8d1b1b;
                    }
                }
            }
        }
    }
`