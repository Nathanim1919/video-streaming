import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProImage from '/image/bg.jpg';
import styled from 'styled-components';
import { requestHandler } from '../utils';
import { getEvent } from '../api/event';
import Loader from './Loader';
import { useAuth } from '../contexts/AuthContext';
import useRsvp from '../customeHook/useRsvp';
import { ImSpinner9 } from "react-icons/im";


interface EventDetailData {
    data: {
        attendees: string[];
        title: string;
        description: string;
        date: string;
        time: string;
        location: string;
        eventType: string;
        rsvp: string;
        eventInformations: [
            {
                title: string,
                description: string,
                saved: boolean,
                error: string,
            }
        ]
    }
}


interface EventDetailProps {
    eventId: string;
    event: EventDetailData;
}

const EventDetail = ({event}) => {
    const {user} = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const {eventId} = useParams();
    const [eventDetail, setEventDetail] = useState<any>({});
    const [isRsvp, setIsRsvp] = useState(eventDetail.data?.attendees?.includes(user?._id));

    // const getEventDetail = async (props: EventDetailProps) => {
    //     if (!props.eventId) return;
    //     await requestHandler(
    //         async () => await getEvent(props.eventId),
    //         setIsLoading,
    //         setEventDetail,
    //         setError
    //     );
    // };

    const handleRsvpClick = useRsvp(eventDetail.data?._id, isRsvp, setIsRsvp, setIsLoading);

    // useEffect(() => {
    //     getEventDetail(eventId);
    // }, [eventId]);

    console.log(event);

    return (
        isLoading ? <Loader /> :
        <Container>
            <div className="header">
                <div className="image">
                    <img src={ProImage} alt="event" />
                </div>
                <div className="info">
                    <p>May 22 to 23, 2024 - 9:30am to 5:30pm Central Daylight Time </p>
                    <h3>{event?.title}</h3>
                    <div className="streamer">
                        <div className="profilePic">
                            <img src={ProImage} alt="Streamer" />
                        </div>
                        <div className="streamerInfo">
                            <h4>{event?.owner?.fullName}</h4>
                            <p>{event?.owner?.profession}</p>
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
                            <p>{event?.title}</p>
                        </div>
                        <div>
                            <h4>When?</h4>
                            <p>{event?.date}</p>
                        </div>
                        <div>
                            <h4>Where?</h4>
                            <p>{event?.location}</p>
                        </div>
                    </div>
                    <Link to={'/'} className={isRsvp? 'cancel' : 'rsvp'} 
                onClick={handleRsvpClick}>{isLoading && <ImSpinner9/>}{isRsvp? 'Cancel My Online RSVP' : 'RSVP to Attend Online'}
              </Link>
                </div>
                <div className="description">
                    <h2>What you need to know?</h2>
                    <div>
                        {
                            event?.eventInformations?.map((info, index) => (
                                <div key={index}>
                                    <h4>{info.title}</h4>
                                    <p>{info.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>   
            </div>
            <div className="callToAction">
                <h2>Ready to Attend?</h2>
                <p>RSVP now to attend the workshop online.</p>
                <Link to={'/'} className={isRsvp? 'cancel' : 'rsvp'} 
                onClick={handleRsvpClick}>{isLoading && <ImSpinner9/>}{isRsvp? 'Cancel My Online RSVP' : 'RSVP to Attend Online'}
              </Link>
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
        /* position: sticky; */
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

a.cancel{
                color: #fff;
                background: #dc3545;
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