import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate, requestHandler } from "../utils";
import { useEffect, useState } from "react";
import { getRsvpEvents } from "../api/event";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import { IoMdDownload } from "react-icons/io";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

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


    const downloadTicketAsImage = async () => {
        const ticketElement = document.getElementById('ticket');
        try {
          const dataUrl = await toPng(ticketElement);
          saveAs(dataUrl, 'ticket.png');
        } catch (error) {
          console.error('Error generating image:', error);
        }
      };

    const {isAuthenticated} = useAuth();

    if (rsvpEvents.length === 0) {
        return <div>No RSVPs found.</div>;
      }
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
                            <div className="ticket" id="ticket" key={event._id}>
                               <div className="header" onClick={downloadTicketAsImage}>
                                Download
                                <div className="download">
                                    <IoMdDownload/>
                                </div>
                               </div>
                               <div className="upperInfo">
                               <p><strong>Date:</strong> {formatDate(event.eventId.date)}</p>
                                <p><strong>Location:</strong> {event.eventId.location}</p>
                                <p><strong>Attendee:</strong> {event.userId.fullName}</p>
                                <p><strong>Ticket ID:</strong> {event._id}</p>
                                {/* <p><strong>Ticket Type:</strong> {event.eventId.ticketType}</p> */}
                               </div>
                                <div className="qrcode">
                                    <QRCode value={event?.qrCodeUrl} />
                                </div>
                                <div className="info">
                                    <h4>{event?.eventId?.title}</h4>
                                    <p>{event?.eventId?.description}</p>
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


    .ticket{
        background-color: #1d1b1b;
        display: grid;
        color: #fff;
        place-items: center;


        .header{
            display: flex;
            justify-content: space-around;
            font-size: 0.7rem;
            padding:.4rem 0;
            align-items: center;
            background-color: #e80c0c75;
            width: 100%;
            margin-bottom: 1rem;
            cursor: pointer;

            &:hover{
                background-color: #800000;
            }
            
        }

        .qrcode{
            background-color: #fff;
            display: grid;
            place-items: center;
            padding: 1rem;
        }

        .info{
            display: flex;
            flex-direction: column;
            align-items: center;


            >*{
                margin: 0;
            }
        }

        .upperInfo{
            display: flex;
            place-self: start;
            flex-direction: column;
            padding: 1rem;
            >p{
                margin: 0;
                font-size: 0.8rem;
            }
        }
    }
`;
