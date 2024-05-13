import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import coverImage from '/image/stream.jpg'
import profilePic from '/image/profile.jpg'
import { useAuth } from '../../contexts/AuthContext';

export const UpcomingStreams = () => {
    const navigate = useNavigate()
    const streams = [
        {
            title: "Web Development Fundamentals",
            date: "2022-01-15",
            time: "14:00",
            streamer: "John Doe",
            profession: "Full Stack Developer",
            pic:'/image/bg.jpg'
        },
        {
            title: "Data Science and Machine Learning",
            date: "2022-01-20",
            time: "16:30",
            streamer: "Jane Smith",
            profession: "Data Scientist",
            pic:'/image/join.jpg'
        },
        {
            title: "Mobile App Development with React Native",
            date: "2022-01-25",
            time: "18:00",
            streamer: "Alex Johnson",
            profession: "Mobile App Developer",
            pic:'/image/stream.jpg'
        },
        {
            title: "Cloud Computing and AWS",
            date: "2022-01-30",
            time: "20:30",
            streamer: "Sarah Thompson",
            profession: "Cloud Architect",
            pic:'/image/schedule.jpg'
        },
    ]

    const {isAuthenticated} = useAuth();

    return (
        <Container>
            <div className="header">
        <h1>Upcoming Streams</h1>
        <Link to={isAuthenticated() ? '/streames' : "/login"}>Browse all</Link>
            </div>
            <StreamList>
                {
                    streams.map((stream, index) => {
                        return (
                            <div key={index}>
                                <div className='header'>
                                    <div className="profile">
                                        <div className='profilePic'>
                                        <img src={profilePic} alt="profile" />
                                        </div>
                                        <div className='profileInfo'>
                                            <h3>{stream.streamer}</h3>
                                            <p>{stream.profession}</p>
                                        </div>
                                    </div>
                                    <div className="streamCoverImage" style={{backgroundImage:`linear-gradient(to bottom, #00000098, #000001),URL(${stream.pic})`}}>
                                        {/* <img src={coverImage} alt="stream" /> */}
                                    </div>
                                </div>
                                <div className="streamInfo">
                                    <div>
                                        <h2>{(stream.title).slice(0,20)}..</h2>
                                        <p>{stream.date} {stream.time}</p>
                                    </div>
                                    <div className="timeCountDown">
                                        <h1>{stream.time}</h1>
                                        <p>Time Left</p>
                                    </div>
                                    <div className='btns'>
                                        <Link to="/stream">Join Stream</Link>
                                        <Link to="/stream">Remind Me</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </StreamList>
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
    background: linear-gradient(45deg, #2a2929, #1a1919);
    overflow: hidden;
    

    >div.header{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    a{
        text-decoration: none;
        color: #fff;
        padding: .5rem 1rem;
        border-radius: 5px;
        background: linear-gradient(45deg, red, orange);
        width: fit-content;
        align-self: center;
    }
`

const StreamList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    width: 90%;
    margin: auto;

    >*{
        color: #fff;
        flex: 1;
        display: grid;
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
                background-image:linear-gradient(to bottom, #00000098, #000000ca), url(${coverImage});

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
                display: flex;
                gap: 1rem;
                position: absolute;
                top: -10%;
                display: flex;
                flex-direction: column;
                width: 100%;
                align-items: center;
                z-index: 1;

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
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
    
                    border: 5px solid #1a1919;
                    
                }
            }
          \
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

            .btns{
                display: flex;
                gap: 1rem;
                padding: 1rem;

                a{
                    text-decoration: none;
                    color: #fff;
                    padding: .5rem 1rem;
                    border-radius: 5px;
                    background-color: #ff0000;
                }
            }
        }
    }
`