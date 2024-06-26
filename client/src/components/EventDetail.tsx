import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProImage from "/home/bg.jpg";
import styled from "styled-components";
import Loader from "./Loader";
import { useAuth } from "../contexts/AuthContext";
import useRsvp from "../customeHook/useRsvp";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import { SimplarEvents } from "../components/SimilarEvents";
import { formatDate, requestHandler } from "../utils";
import { streamApi } from "../api";
import { CountDown } from "./CountDown";
import { Speakers } from "./Speackers";

interface EventDetailData {
  _id: string;
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
      title: string;
      description: string;
      saved: boolean;
      error: string;
    }
  ];
}

// interface EventDetailProps {
//     eventId: string;
//     event: EventDetailData;
// }

const EventDetail = () => {
  const { user } = useAuth();
  const { eventId } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [event, setEvent] = useState({} as EventDetailData);
  const [isRsvp, setIsRsvp] = useState(
    user ? event?.attendees?.includes(user._id) : false
  );
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { handleRsvp, handleRemoveRsvp, checkRsvpStatus } = useRsvp(
    eventId!,
    setIsRsvp,
    setIsLoading,
    setQrCodeUrl
  );

  useEffect(() => {
    const fetchEventDetail = async () => {
      await requestHandler(
        async () => streamApi.getStream(eventId!),
        setIsLoading,
        (res) => {
          console.log(res.data.data);
          setEvent(res.data as EventDetailData);
        },
        (error) => {
          alert(error);
        }
      );
    };

    fetchEventDetail();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <div className="header">
        <div className="heroText">
          <h1>{event.title}</h1>
          <p className="date">{formatDate(event.date)}</p>
          <p>{event.description}</p>
        </div>
        <div className="btns">
          <button className="button">Get Ticket</button>
        </div>
      </div>
      <div className="counter">
        <div className="text">
          <h1>
            Counting <span>every second</span> until the {event.eventType}{" "}
            begins.
          </h1>
        </div>
        <CountDown event={event} />
      </div>
      <Speakers />
      <div className="eventInfos">
        <div className="descriptions">
          <div className="desc">
            <h2>Description</h2>
            <p>{event.description}</p>
          </div>
          <div className="hours">
            <h2>Hours</h2>
            <p>12:00 PM - 2:00 PM</p>
          </div>
          <div className="contactOrganizer">
            <h2>Contact Organizer</h2>
            <p>
              For questions about this event, please contact the organizer at{" "}
              <a href="mailto:org@gmail.com">Org Email</a>
            </p>
          </div>
        </div>
        <div className="locationsTags">
          <div className="location">
            <h2>Event Location</h2>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.643169423305!2d-122.08431488468163!3d37.42240897982454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580a2f9d7d7b5%3A0x7a3b0d9e1a3d8f1b!2sGoogleplex!5e0!3m2!1sen!2sng!4v1634097641901!5m2!1sen!2sng"
                width="300"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
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
                <Link to="facebook.com">
                  <FaFacebook />
                </Link>
                <Link to="facebook.com">
                  <FaInstagram />
                </Link>
                <Link to="facebook.com">
                  <FaTwitter />
                </Link>
                <Link to="facebook.com">
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimplarEvents />
    </Container>
  );
};

export default EventDetail;

const Container = styled.div`
  width: 100%;
  display: grid;
  place-items: center;

  .counter {
    width: 80%;
    margin: 1rem auto;
    display: grid;
    align-items: center;
    grid-template-columns: 0.4fr 0.7fr;

    > * {
      padding: 1rem;
    }

    > div:nth-child(1) {
      /* background-color: #333; */
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      h1 {
        font-size: 3rem;
        text-align: left;

        span {
          color: red;
        }
      }
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }
  .header {
    width: 100vw;
    background: linear-gradient(to bottom, #000000bc, #000000), url(${ProImage});
    background-size: cover;
    background-position: center;
    padding: 2rem 0;
    color: aliceblue;
    height: 90vh;
    display: flex;
    flex-direction: column;
    place-items: center;
    justify-content: center;
    gap: 2rem;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      height: auto;
    }

    button {
      padding: 0.6rem 4rem;
      border: none;
      border-radius: 35px;
      background-color: transparent;
      color: #fff;
      cursor: pointer;
      border: 1px solid #5f5c5c;
      transition: all 0.3s;
      &:hover {
        background-color: #bdb4b4;
      }
    }

    .heroText {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 50%;
      text-align: center;

      @media screen and (max-width: 768px) {
        max-width: 100%;
        text-align: center;
      }
      h1 {
        font-size: 4rem;
        margin: 0;
      }
      p {
        margin: 0;
        text-align: left;
      }

      p.date {
        color: #5f5c5c;
      }
    }
  }
  .eventInfos {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 2rem;
    color: #fff;
    margin-top: 3rem;
    padding-bottom: 2rem;

    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    .desc {
      max-width: 60%;

      @media screen and (max-width: 800px) {
        max-width: 100%;
      }
      h2 {
        font-size: 1.5rem;
      }
      p {
        font-size: 0.8rem;
        color: #dcd5d5;
      }
    }

    .locationsTags {
      .tag {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;

        > * {
          padding: 0.3rem 1rem;
          background-color: #333;
          border-radius: 10px;
          margin: 0;
        }
      }

      .share {
        > div {
          display: flex;
          align-items: center;
          gap: 1rem;

          > * {
            font-size: 1.5rem;
            color: #fff;
          }
        }
      }
    }
  }
`;
