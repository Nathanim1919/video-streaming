import { Link } from 'react-router-dom';
import ProImage from '/image/bg.jpg';
import styled from 'styled-components';



const EventDetail = () => {
    return (
        <Container>
            <div className="header">
                <div className="image">
                    <img src={ProImage} alt="event" />
                </div>
                <div className="info">
                    <p>May 22 to 23, 2024 - 9:30am to 5:30pm Central Daylight Time </p>
                    <h3>Complete Intro to Containers</h3>
                    <div className="streamer">
                        <div className="profilePic">
                            <img src={ProImage} alt="Streamer" />
                        </div>
                        <div className="streamerInfo">
                            <h4>Nathanim Tadele</h4>
                            <p>Full-Stack Engineer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="eventInfo">
                <div className="details">
                    <h2>Event Details</h2>
                    <div>
                        <div>
                            <h4>What?</h4>
                            <p>Complete Intro to Containers</p>
                        </div>
                        <div>
                            <h4>When?</h4>
                            <p>May 22 to 23, 2024 - 9:30am to 5:30pm Central Daylight Time</p>
                        </div>
                        <div>
                            <h4>Where?</h4>
                            <p>Online</p>
                        </div>
                    </div>
                    <Link to={'/'} className='rsvp'>RSVP to Attend Online</Link>
                </div>
                <div className="description">
                    <h2>What you need to know?</h2>
                    <div>
                        <div>
                            <h4>Description</h4>
                            <p>In this workshop, you'll learn the basics of Docker and Kubernetes through a series of lectures and hands-on labs.</p>
                        </div>
                        <div>
                            <h4>What to bring</h4>
                            <p>Bring your laptop and an open mind. No prior knowledge of containers or Kubernetes is required.</p>
                        </div>
                        <div>
                            <h4>How to prepare</h4>
                            <p>Install Docker Desktop and kubectl on your laptop before attending the workshop. Instructions will be sent via email before the event.</p>
                        </div>
                    </div>
                </div>   
            </div>
            <div className="callToAction">
                <h2>Ready to Attend?</h2>
                <p>RSVP now to attend the workshop online.</p>
                <Link to={'/'} className='rsvp'>RSVP to Attend Online</Link>
            </div>
            <div className="upcoming">
                <h2>Upcoming Events</h2>
                <p>Check out other upcoming events in the DevSphere community.</p>
                <Link to={'/streames'} className='rsvp'>Browse Upcoming Events</Link>
            </div>
        </Container>
    );
}

export default EventDetail;




const Container = styled.div`
    width: 80vw;
    margin: auto;

    @media screen and (max-width: 800px){
        width: 95vw;       
     }


    .header{
        display: grid;
        grid-template-columns: .3fr .7fr;
        background-color: #000;
        position: sticky;
        top: 0;


        @media screen and (max-width: 800px){
            grid-template-columns: 1fr;
            position: static;
        }


        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        color: #fff;
        background-color: #000;
        border-radius: 10px;


        p{
            color:#7a7575
        }


        >*{
            margin: 0;
        }

        .streamer{
            display: flex;
            gap: 1rem;
            align-items: center;
            .profilePic{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                border: 2px solid #000;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .streamerInfo{
                h4{
                    font-size: 1rem;
                    margin: 0;
                }

                p{
                    font-size: .9rem;
                    margin: 0;
                }
            }
        }

        .buttons{
            display: flex;
            gap: 1rem;
            a{
                padding: .5rem 1rem;
                border-radius: 5px;
                text-decoration: none;
                color: #fff;
                background-color: #000;
                border: 1px solid #fff;
                transition: all .3s ease;

                &:hover{
                    background-color: #fff;
                    color: #000;
                }
            }
        }
    }

    .eventInfo{
        display: grid;
        grid-template-columns: .5fr .5fr;
        gap: 2rem;
        margin-top: 2rem;


        @media screen and (max-width: 800px){
            grid-template-columns: 1fr;
        }

        .details{
            border-radius: 10px;

            div{
                >div{
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2rem;

                    >*{
                        margin: 0;
                    }
                }
            }

            h2{
                color: #fff;
                background-color: #000;
                font-size: 1%.5rem;
                padding: 1rem;
            }

            h4{
                color: #e2dddd;
                font-size: 1.2rem;
            }

            p{
                color: #7a7575;
                font-size: 1rem;
            }

            .rsvp{
                padding: .5rem 1rem;
                border-radius: 5px;
                text-decoration: none;
                color: #fff;
                background-color: #000;
                border: 1px solid #fff;
                transition: all .3s ease;

                &:hover{
                    background-color: #fff;
                    color: #000;
                }
            }
        }

        .description{
            border-radius: 10px;

div{
    >div{
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;

        >*{
            margin: 0;
        }
    }
}

h2{
    color: #fff;
    background-color: #000;
    font-size: 1%.5rem;
    padding: 1rem;
}

h4{
    color: #e2dddd;
    font-size: 1.2rem;
}

p{
    color: #7a7575;
    font-size: 1rem;
}

.rsvp{
    padding: .5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    color: #fff;
    background-color: #000;
    border: 1px solid #fff;
    transition: all .3s ease;

    &:hover{
        background-color: #fff;
        color: #000;
    }
}
        }
    }

    .callToAction{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
        background:linear-gradient(to right, #0b6afa, #03209e);
        padding: 3rem 0;

        >*{
            margin: 0;
        }

        h2{
            font-size: 2rem;
            color: #fff;
        }

        p{
            font-size: 1rem;
            color: #fff;
        }

        .rsvp{
            padding: .5rem 1rem;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
            background-color: #ff8725;
            border: none;
            transition: all .3s ease;

            &:hover{
                background-color: #fff;
                color: #000;
            }
        }
    }

    .upcoming{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
        padding: 3rem 0;

        >*{
            margin: 0;
        }

        h2{
            font-size: 2rem;
            color: #fff;
        }

        p{
            font-size: 1rem;
            color: #fff;
        }

        .rsvp{
            padding: .5rem 1rem;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
            background-color: #ff8725;
            border: none;
            transition: all .3s ease;

            &:hover{
                background-color: #fff;
                color: #000;
            }
        }
    }
`