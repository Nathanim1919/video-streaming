import { Event } from "../interfaces/event";
import styled from "styled-components";


interface ContainerProps {
    event: Event;
}


export const BookMarkedEventCard: React.FC<ContainerProps> = ({ event }: { event: Event }) => {
    return (
        <Container className="bookMarkedEventCard">
            <div className="eventImage">
                <img src="https://via.placeholder.com/150" alt="event" />
            </div>
            <div className="eventDetails">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <p>{event.time}</p>
            </div>
        </Container>
    );
};



const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    .eventImage {
        img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    .eventDetails {
        width: 70%;
        h2 {
            font-size: 1.5rem;
            font-weight: bold;
        }
        p {
            font-size: 1rem;
        }
    }
`;