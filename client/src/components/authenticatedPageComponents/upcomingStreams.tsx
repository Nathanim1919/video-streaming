import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import coverImage from '/image/join.jpg'

export const UpcomingStreams = () => {
    const streams = [
        {
            title: "Stream 1",
            date: "2021-09-01",
            time: "10:00",
            streamer: "Streamer 1"
        },
        {
            title: "Stream 2",
            date: "2021-09-02",
            time: "11:00",
            streamer: "Streamer 2"
        },
        {
            title: "Stream 3",
            date: "2021-09-03",
            time: "12:00",
            streamer: "Streamer 3"
        },
        
    ]
    return (
        <Container>
        <h1>Upcoming Streams</h1>
            <StreamList>
                {
                    streams.map((stream, index) => {
                        return (
                            <div key={index}>
                                <div className='header'>
                                    <div className="profile">
                                        <div className='profilePic'>
                                        <img src={coverImage} alt="profile" />
                                        </div>
                                        <div className='profileInfo'>
                                            <h3>Nathanim Tadele</h3>
                                            <p>Software Engineer</p>
                                        </div>
                                    </div>
                                    <div className="streamCoverImage">
                                        <img src={coverImage} alt="stream" />
                                    </div>
                                </div>
                                <div className="streamInfo">
                                    <div>
                                        <h2>Containers</h2>
                                        <p>{stream.date} {stream.time}</p>
                                    </div>
                                    <div className="timeCountDown">
                                        <h1>10:00:00</h1>
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
            <Link to="/streams">View All Streams</Link>
        </Container>
    );
}


const Container = styled.div`
    width: 80%;
    margin:auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    color: #fff;
    padding: 2rem;
    margin-bottom: 2rem;

    a{
        text-decoration: none;
        color: #fff;
        padding: .5rem 1rem;
        border-radius: 5px;
        background-color: #ff0000;
        width: fit-content;
        align-self: center;
    }
`

const StreamList = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;

    >*{
        color: #fff;
        flex: 1;
        display: grid;
        grid-template-rows: .3fr .7fr;
        background-color: #000000d1;


        .header{
            position: relative;

            .streamCoverImage{
                background-color: red;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(50%);
                }
            }

            .profile{
                display: flex;
                gap: 1rem;
                position: absolute;
                top: -20%;
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
                    border: 10px solid #191919;
                    
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