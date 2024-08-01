import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { eventApi } from "../api";
import { formatDate, requestHandler } from "../utils";
import { IEvent } from "../interfaces/event";
import Loader from "./Loader";

export const Events = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      await requestHandler(
        async () => eventApi.getEvents(),
        setIsLoading,
        (res) => {
          setEvents(res.data as IEvent[]);
        },
        alert
      );
    };

    fetchEvents();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Conatainer className="container">
      <div className="events">
        {events.map((event: IEvent) => (
          <div className="event">
            <div className="image">
              <img src={event.image} alt="" />
              <div className="price">
                <p>ETH {event.price}</p>
              </div>
            </div>
            <div className="infos">
              <div className="date">
                <p>May</p>
                <h2>17</h2>
              </div>
              <div className="info">
                <div className="e-info">
                  <h2>{event.title}</h2>
                  <p>{formatDate(event.date)}</p>
                  <p>{event.location}</p>
                </div>
                <div className="host">
                  <div className="image">
                    <img src={event.owner?.profilePicture?.url} alt="" />
                  </div>
                  <div className="pro">
                    <h2>{event.owner?.fullName}</h2>
                    <p>{event.owner?.profession}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="actionBtns">
              <Link to={`/events/${event._id}`} className="learnMore">
                Learn More
              </Link>
              <Link to={"/"} className="getTicket">
                Get Ticket
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Conatainer>
  );
};

const Conatainer = styled.div`
  width: 100%;
  padding: 2rem 0;

  > h1 {
    color: #fff;
    margin-left: 2rem;
    width: 80%;
    margin: auto;
    padding: 3rem 0;
  }

  .events {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    place-items: center;
    gap: 1rem;

    .event {
      background-color: #242323;
      color: #fff;
      border-radius: 10px;
      overflow: hidden;
      max-width: 300px;

      .image {
        max-height: 200px;
        overflow: hidden;
        position: relative;

        .price {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #c50e0e;
          padding: 0.5rem;
          border-bottom-left-radius: 10px;
          color: #fff;
          z-index: 10;
        }
      }

      .infos {
        display: grid;
        grid-template-columns: 0.15fr 0.85fr;
        padding: 1rem;
        gap: 1rem;

        .info {
          .e-info {
            display: flex;
            flex-direction: column;

            h2 {
              font-size: 1rem;
              margin: 0;
            }

            p {
              margin: 0;
              font-size: 0.7rem;
              color: #bdb9b9;
            }
          }

          .host {
            display: flex;
            gap: 1rem;
            align-items: center;
            padding: 0.5rem;

            .pro {
              display: flex;
              flex-direction: column;
              justify-content: center;

              h2 {
                font-size: 0.8rem;
                margin: 0;
              }

              p {
                margin: 0;
                font-size: 0.6rem;
                color: #bdb9b9;
              }
            }
            .image {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }

        .date {
          background-color: red;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 0.4rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border-radius: 6px;

          h2 {
            font-size: 1.7rem;
          }

          > * {
            margin: 0;
          }
        }
      }
      img {
        width: 100%;
      }
    }

    .actionBtns {
      display: flex;
      gap: 1rem;
      justify-content: center;
      padding: 1rem;

      .getTicket {
        background-color: #c50e0e;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
      }

      .learnMore {
        background-color: #242323;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
`;
