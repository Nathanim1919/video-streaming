import React, {useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProImage from '/home/bg.jpg';
import styled from 'styled-components';
import Loader from './Loader';
import { useAuth } from '../contexts/AuthContext';
import useRsvp from '../customeHook/useRsvp';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { SimilarEvents } from './SimilarEvents';



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
    const [isRsvp, setIsRsvp] = useState(event?.attendees?.includes(user?._id))
    const handleRsvpClick = useRsvp(event?._id, isRsvp, setIsRsvp, setIsLoading);


    return (
        isLoading ? <Loader /> :
        <Container>
            <div className="header">
                <div className="heroText">
                    <h1>Empowering Women in Tech: A Networking Luncheo</h1>
                    <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                    <p>ABC Tech Center, Grand Auditorium (123 Main St., Anytown, CA 12345)</p>
                </div>
                <div className="calander">
                    <div className="time">
                        <h3>Data and time</h3>
                        <p>Saturday 12:40 PM 12-09-2016 Local time</p>
                    </div>
                    <p>+ add to calender</p>
                    <div className="btns">
                        <button className="book">Book Now(free)</button>
                        <button className="promote">Promoter Program</button>
                    </div>
                    <p>No refunds</p>
                </div>
            </div>
            <div className="eventInfos">
                <div className="descriptions">
                    <div className="desc">
                        <h2>Description</h2>
                        <p>Join us for an inspiring luncheon designed to connect and empower women in the tech industry. This event features a keynote address from a prominent female tech leader, followed by a panel discussion with diverse industry professionals. Enjoy a delicious catered lunch while networking with fellow attendees.pen_spark</p>
                    </div>
                    <div className="hours">
                        <h2>Hours</h2>
                        <p>12:00 PM - 2:00 PM</p>
                    </div>
                    <div className="contactOrganizer">
                        <h2>Contact Organizer</h2>
                        <p>For questions about this event, please contact the organizer at <a href="mailto:org@gmail.com">Org Email</a></p>
                    </div>
                </div>
                <div className="locationsTags">
                    <div className="location">
                        <h2>Event Location</h2>
                        <div className="map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.643169423305!2d-122.08431488468163!3d37.42240897982454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580a2f9d7d7b5%3A0x7a3b0d9e1a3d8f1b!2sGoogleplex!5e0!3m2!1sen!2sng!4v1634097641901!5m2!1sen!2sng" width="300" height="250" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                            <div className="titles">
                                <h3>ABC Tech Center</h3>
                                <p>Grand Auditorium (123 Main St., Anytown, CA 12345)</p>
                            </div>
                        </div>
                        <div className="tags">
                            <h2>Tags</h2>
                            <div className="tag">
                                <p>Networking</p>
                                <p>Information</p>
                                <p>Growth</p>
                                <p>power</p>
                                <p>Networking</p>
                                <p>Tech</p>
                            </div>
                        </div>
                        <div className="share">
                            <h2>Share with your friend</h2>
                            <div className="social-icons">
                                <Link to="facebook.com"><FaFacebook/></Link>
                                <Link to="facebook.com"><FaInstagram/></Link>
                                <Link to="facebook.com"><FaTwitter/></Link>
                                <Link to="facebook.com"><FaLinkedin/></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SimilarEvents/>
        </Container>
    );
}

export default EventDetail;




const Container = styled.div`
    width: 100%;
    .header{
        width: 100vw;
        background:linear-gradient(45deg, #0000005d, #00000065), url(${ProImage});
        background-size: cover;
        background-position: center;
        padding: 2rem 0;
        color: aliceblue;
        height: 50vh;
        display: flex;
        /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
        place-items: center;
        justify-content: space-around;
        gap: 2rem;

        @media screen and (max-width: 768px){
            flex-direction: column;
            height: auto;
        }

        .heroText{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 30%;

            @media screen and (max-width: 768px){
                max-width: 100%;
                text-align: center;
            }
            h1{
                font-size: 2rem;
                margin: 0;
            }
            p{
                margin: 0;
            }
        }


        .calander{
            background-color: #fff;
            color: #333;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding:3rem 2rem;
            border-radius: 10px;
            box-shadow: 0 12px 20px rgba(0,0,0,0.1);
            gap: 1.4rem;
            

            >p{
                color: #9b46f0;
                font-size: .9rem;
                cursor: pointer;
                transition: all .3s;
                margin: 0;
                &:hover{
                    color: #bdb4b4;
                }
            }

            .time{
                display: flex;
                flex-direction: column;
                margin: 0;
                gap: .5rem;


                > *{
                    margin: 0;
                }
            }

            p:last-of-type{
                font-size: .8rem;
                color: #333;
                align-self: center;
                margin: 0;
            }


            >*{
                margin: 0;
                /* flex: 1; */
            }


            .btns{
                display: flex;
                flex-direction: column;
                gap: .3rem;
                button{
                    padding: .6rem 4rem;
                    border: none;
                    border-radius: 5px;
                    background-color: #0655c4;
                    color: #fff;
                    cursor: pointer;
                    transition: all .3s;
                    &:hover{
                        background-color: #bdb4b4;
                    }
                }

                .promote{
                    background-color: #ebe9e7;
                    color: #333;
                    &:hover{
                        background-color: #f5a623;
                    }
            }
        }
    }

}
.eventInfos{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 2rem;
    color: #fff;
    margin-top: 3rem;
    padding-bottom: 2rem;


    @media screen and (max-width: 800px){
        flex-direction: column;
    }


    .desc{
       
        max-width: 60%;

        @media screen and (max-width: 800px){
            max-width: 100%;
        }
        h2{
            font-size: 1.5rem;
           
        }
        p{
            font-size: .8rem;
            color: #dcd5d5;

        }
    }

    .locationsTags{
        .tag{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: .4rem;

            >*{
                padding: 0.3rem 1rem;
                background-color: #333;
                border-radius: 10px;
                margin: 0;
            }
        }

        .share{
            >div{
                display: flex;
                align-items: center;
                gap:1rem;

                > *{
                    font-size: 1.5rem;
                    color: #fff;
                }
            }
        }
    }
}
`