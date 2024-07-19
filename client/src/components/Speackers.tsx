import styled from "styled-components";
import Image from "/home/bg.jpg";
import { Event } from "../interfaces/event";
import { useState } from "react";
import { AddGuests } from "./addGuests";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

interface SpeakerProps {
  event: Event;
}

export const Speakers: React.FC<SpeakerProps> = ({ event }) => {
  const [intiateAddGuest, setIntiateAddGuest] = useState(false);
  const { user } = useAuth();
  return (
    <Container>
      {intiateAddGuest && (
        <AddGuests
          isOnline={event.isOnline}
          eventId={event._id}
          event={event}
          setIntiateAddGuest={setIntiateAddGuest}
          title="Guest"
          placeHolders={{ name: "Guest", profession: "Profession" }}
        />
      )}
      <div className="header-info">
        <h1>Speakers</h1>
        <p>
          Welcome to our event! Get ready to be inspired by our lineup of
          talented speakers who will share their expertise and insights.
        </p>
      </div>
      <div className="speakers">
        <div className="hostedBy">
          <h1>Hosted By</h1>
          <div className="host">
            <div className="image">
              <img src={event?.owner?.profilePicture?.url} alt="host" />
            </div>
            <div className="infos">
              <h2>Host By: {event?.owner?.fullName}</h2>
              <p>{event?.owner?.profession}</p>
            </div>
          </div>
        </div>

        <div className="co-hosts">
          <h1>Our Guests</h1>
          <div className="speackersList">
            {event.guests?.map((guest) => (
              <div className="speak">
                <div>
                  <div className="image">
                    <img src={Image} alt="host" />
                  </div>
                  <div className="infos">
                    <h2>{guest.name}</h2>
                    <p>{guest.profession}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {event?.owner?._id === user?._id && (
            <div className="addGuest" onClick={() => setIntiateAddGuest(true)}>
              <div className="icon">
                <FaPlus />
              </div>
              <p>Add Guest</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: #fff;
  display: grid;
  padding: 3rem 1rem;
  margin-top: 3rem;
  width: 80%;

  .addGuest {
    background-color: #4b1b1b;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    align-self: flex-end;
    flex: 1;
    padding: 1rem;
    position: relative;
    cursor: pointer;
    border-radius: 10px;

    .icon {
      font-size: 2rem;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      text-align: center;
      color: #000;
      background-color: #fff;
      display: grid;
      place-items: center;
    }
  }

  .header-info {
    padding: 1rem 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* max-width: 50%; */
    margin: auto;

    > * {
      margin-bottom: 0rem;
      text-align: left;
    }
  }

  .speakers {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    width: 80%;
    margin: auto;
    flex-wrap: wrap;
    gap: 1rem;

    @media screen and (max-width: 800px) {
      grid-template-columns: 100%;
    }

    .hostedBy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .host {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        position: relative;

        .image {
          width: 100%;
          height: 100%;

          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            filter: brightness(20%);
            object-fit: cover;
          }
        }

        .infos {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 1rem;
          right: 1rem;

          h2 {
            font-size: 1.5rem;
            margin: 0;
          }

          p {
            font-size: 1rem;
            margin: 0;
          }
        }
      }
    }

    .co-hosts {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      align-self: flex-end;
      flex: 1;

      .speackersList{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .speak {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;

        > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          background-color: #333;

          padding: 0.5rem;

          .image {
            width: 100px;
            height: 100px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .infos {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            > * {
              margin: 0;
            }

            h2 {
              font-size: 1rem;
            }

            p {
              color: #ddd;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
`;
