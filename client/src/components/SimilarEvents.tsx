import styled from "styled-components";
import Image from "/home/bg.jpg";
import { requestHandler } from "../utils";
import { getSimilartEvents } from "../api/event";
import { useEffect, useState } from "react";
import { Event } from "../interfaces/event";
import { useNavigate } from "react-router-dom";

interface SimplarEventsprops {
  eventId: string;
}

export const SimplarEvents: React.FC<SimplarEventsprops> = ({ eventId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const handleSimilarEvents = async () => {
    await requestHandler(
      async () => await getSimilartEvents(eventId),
      setIsLoading,
      (response) => {
        setEvents(response.data as Event[]);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };



  const displayEventDetail = (id: string) => {
    navigate(`/events/${id}`);
  };

  useEffect(() => {
    handleSimilarEvents();
  }, [eventId]);

  return (
    <Container className="container">
      <div className="header-info">
        <h1>Other Events you may like</h1>
        <button>browse all</button>
      </div>
      <EventsContainer>
        {events?.map((even, index) => (
          <div className="event" key={index}>
            <div className="date">
              <p>{even.date}</p>
              <h3>17</h3>
            </div>
            <div className="image">
              <img src="{even.image}" alt="" />
            </div>
            <div className="desc">
              <h2>{even.title}</h2>
              <p>{even.description}</p>
            </div>
            <div className="btns">
              <button onClick={()=> displayEventDetail(even._id)}>More info</button>
            </div>
          </div>
        ))}
      </EventsContainer>
    </Container>
  );
};

const Container = styled.div`
  background: radial-gradient(to bottom, #0f1f86, #000), url(${Image});

  .header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    color: #fff;
    width: 80%;
    margin: 0 auto;
    button {
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
      padding: 0.7rem 2rem;
      border-radius: 50px;
    }
  }
`;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  gap: 2rem;
  color: #fff;
  border-top: 1px solid #494a4a;
  padding: 1rem;
  padding-top: 2rem;
  position: sticky;
  top: 0%;
  height: 70vh;
  overflow-y: auto;

  .event {
    display: grid;
    grid-template-columns: 0.1fr 0.1fr 0.5fr 0.2fr;
    justify-content: space-around;
    align-items: center;
    position: relative;
    cursor: pointer;
    padding: 1rem 0;
    border: 1px solid transparent;

    &:hover {
      background-color: #0000007d;
      border-radius: 10px;
      border: 1px solid #a53636;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }

    .date {
      display: flex;
      flex-direction: column;
      align-items: center;

      @media screen and (max-width: 768px) {
        position: absolute;
        top: 2rem;
        left: 2rem;
        background-color: #fff;
        color: red;
        padding: 1rem;
        box-shadow: 0 10px 36px rgba(0, 0, 0, 0.312);
        border-radius: 10px;
      }
      p {
        margin: 0;
      }
      h3 {
        margin: 0;
        font-size: 2.3rem;
      }
    }

    .image {
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 10px;
        @media screen and (max-width: 768px) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }
    }

    .desc {
      h2 {
        /* font-size: 1rem; */
        margin: 0;
      }
      p {
        font-size: 0.8rem;
        color: #bdb9b9;
        margin: 0;
      }
    }

    .btns {
      button {
        background-color: transparent;
        color: #fff;
        padding: 0.7rem 2rem;
        border: 1px solid rgb(92, 92, 96);
        border-radius: 50px;
        font-family: inherit;
        cursor: pointer;

        &:hover {
          background-color: red;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;
