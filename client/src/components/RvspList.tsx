import { Link } from "react-router-dom";
import styled from "styled-components";
import { requestHandler } from "../utils";
import { useEffect, useState } from "react";
import { getRsvpEvents } from "../api/event";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import profilePic from '/image/profile.jpg'
import coverImage from '/home/live.jpeg'
import { GrFormNextLink } from "react-icons/gr";
import QRCode from "qrcode.react";

export const RvspList: React.FC = () => {
    const [rsvpEvents, setRsvpEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getRsvpEvent() {
            await requestHandler(
                async () => getRsvpEvents(),
                setIsLoading,
                (data) => setRsvpEvents(data.data),
                (error) => console.log(error)
            )
        }
        getRsvpEvent();
    }, [])

    const {isAuthenticated} = useAuth();
    console.log(rsvpEvents);

    return (
        <Container>
            <div className="header">
        <h1>RSVP Events</h1>
        <Link to={isAuthenticated() ? '/streames' : "/login"}>Browse all</Link>
            </div>
            {isLoading? <Loader/>:<StreamList>
                {
                    rsvpEvents?.map((event) => {
                        return (
                            <div key={event._id}>
                               <div className="header">
                                <h2>your ticket</h2>
                                <button className="download">download</button>
                               </div>
                                <div className="qrcode">
                                    <QRCode value={event?.qrCodeUrl} />
                                </div>
                                <div className="info">
                                    <h2>{event?.eventId?.title}</h2>
                                    <h2>{event?.eventId?.description}</h2>
                                </div>
                            </div>
                        )
                    })
                }
            </StreamList>}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    width: 80%;
    margin: auto;
    >.header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        position: sticky;
        top: 0;
       
        h1{
            font-size: 1.5rem;
            color: #fff;
        }
        a{
            font-size: 1rem;
            color: #fff;
            text-decoration: none;
        }
    }
`;

const StreamList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;

    >div{
        background: #141414;
        box-shadow: 0 10px 20px rgba(0,0,0,.2);
    }

    div{
        border-radius: 10px;
        padding: 1rem;
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .profile{
                display: flex;
                align-items: center;
                .profilePic{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .profileInfo{
                    margin-left: 1rem;
                    h3{
                        font-size: 1rem;
                        color: #f5f1f1;
                    }
                    p{
                        font-size: 0.8rem;
                        color: #9d9696;
                    }
                }
            }
            .streamCoverImage{
                width: 100px;
                height: 100px;
                border-radius: 10px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        .streamInfo{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            h2{
                font-size: 1rem;
                color: #e7e1e1;
            }
            p{
                font-size: 0.8rem;
                color: #c2baba;
            }
            .seemore{
                display: flex;
                align-items: center;
                font-size: 0.8rem;
                color: #e7e0e0;
                text-decoration: none;
                svg{
                    margin-left: 0.2rem;
                }
            }
        }
    }
`;