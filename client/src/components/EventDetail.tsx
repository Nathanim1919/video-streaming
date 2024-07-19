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
import { CountDown } from "./CountDown";
import { Speakers } from "./Speackers";
import { getStream, editStreamInstruction } from "../api/stream";
import { getEvent, editEventInstruction } from "../api/event";
import { FaStar } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { GrSchedules } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { UserInterface } from "../interfaces/user";
import { ScheduleManagment } from "./scheduleManagment";
import { FaLocationDot } from "react-icons/fa6";
import { MdOnlinePrediction } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";



interface EventDetailData {
  _id: string;
  attendees: string[];
  title: string;
  description: string;
  date: string;
  owner: UserInterface;
  time: string;
  location: string;
  eventType: string;
  rsvp: string;
  tags: string[];
  price: number;
  capacity: number;
  isOnline: boolean;
  specialInstructions: string;
  eventInformations: [
    {
      title: string;
      description: string;
      saved: boolean;
      error: string;
    }
  ];
  schedule: { time: string; activity: string }[];
}

interface EventDetailProps {
  type: "stream" | "event";
}

const EventDetail: React.FC<EventDetailProps> = ({ type }) => {
  const { user } = useAuth();
  const { eventId } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [manageSchedule, setManageSchedule] = React.useState(false);
  const [event, setEvent] = useState({} as EventDetailData);
  const [isRsvp, setIsRsvp] = useState(
    user ? event?.attendees?.includes(user._id) : false
  );
  const [isOwner, setIsOwner] = useState(event?.owner?._id === user?._id);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [editSpecialInstrution, setEditSpecialInstruction] = useState(false);
  const [specialInsrution, setSpecialInstrution] = useState(
    event.specialInstructions
  );
  const { handleRsvp, handleRemoveRsvp, checkRsvpStatus } = useRsvp(
    eventId!,
    setIsRsvp,
    setIsLoading,
    setQrCodeUrl
  );

  const handleInstructionEdit = async () => {
    const endPoint = event.isOnline
      ? editStreamInstruction
      : editEventInstruction;
    await requestHandler(
      async () => await endPoint(event._id, specialInsrution),
      setIsLoading,
      (res) => {
        event.specialInstructions = specialInsrution;
        alert(res.message);
        setEditSpecialInstruction(false);
      },
      (error) => {
        alert(error);
      }
    );
  };

  useEffect(() => {
    const fetchEventDetail = async () => {
      const endPoint = type === "stream" ? getStream : getEvent;
      await requestHandler(
        async () => await endPoint(eventId!),
        setIsLoading,
        (res) => {
          setEvent(res.data as EventDetailData);
        },
        (error) => {
          alert(error);
        }
      );
    };

    fetchEventDetail();
  }, []);

  useEffect(() => {
    setIsOwner(event?.owner?._id === user?._id);
  }, [event, user]);

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
      <Speakers event={event} />
      {manageSchedule && (
        <ScheduleManagment
          event={event}
          manageSchedule={manageSchedule}
          setManageSchedule={setManageSchedule}
        />
      )}
      <div className="eventInfos">
        <div className="schedules">
          <h2>
            <h4>
              <GrSchedules />
              Event Schedule
            </h4>
            {isOwner && (
              <span
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
                onClick={() => setManageSchedule(true)}
              >
                <CiEdit />
              </span>
            )}
          </h2>
          <div className="scheduleList">
            {event.schedule?.map((item) => (
              <div className="schedule">
                <h3>
                  <IoMdTimer />
                  {item.time}
                </h3>
                <p>{item.activity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="locationsTags">
          <div className="location">
            <h2><span><FaLocationDot/>Event Location</span><CiEdit/></h2>
            {event.isOnline?<h1 style={{
              color: "red",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}><MdOnlinePrediction/>Live</h1>:<div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.643169423305!2d-122.08431488468163!3d37.42240897982454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580a2f9d7d7b5%3A0x7a3b0d9e1a3d8f1b!2sGoogleplex!5e0!3m2!1sen!2sng!4v1634097641901!5m2!1sen!2sng"
                width="300"
                height="250"
                style={{ border: 0 }}
                // allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="titles">
                <h3>ABC Tech Center</h3>
                <p>Grand Auditorium (123 Main St., Anytown, CA 12345)</p>
              </div>
            </div>}
            <div className="tags">
              <h2><span><FaHashtag/>Tags</span>{isOwner&&<CiEdit/>}</h2>
              <div className="tag">
               {event.tags?.map((tag) => (
                  <p>{tag}</p>
               ))}
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
      <div className="specialInstructionBox">
        <h2>
          <h3>
            <FaStar />
            Special Instruction
          </h3>
          {isOwner && (
            <button onClick={() => setEditSpecialInstruction(true)}>
              <CiEdit />
            </button>
          )}
        </h2>
        <p>{event?.specialInstructions}</p>
        {editSpecialInstrution && (
          <form action="">
            <textarea
              name=""
              value={specialInsrution}
              rows={10}
              onChange={(e) => setSpecialInstrution(e.target.value)}
              placeholder="Enter The Special Instruction Here"
              id=""
            ></textarea>
            <div className="btns">
              <button type="button" onClick={handleInstructionEdit}>save</button>
              <button
                type="button"
                onClick={() => setEditSpecialInstruction(false)}
              >
                cancle
              </button>
            </div>
          </form>
        )}
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

  .specialInstructionBox {
    padding-bottom: 2rem;
    background-color: #171717;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      animation: 0.4s animate ease-in-out;

      textarea {
        width: 90%;
        padding: 1rem;
        border: none;
        outline: none;
        background-color: #000000;
        resize: none;
        color: #fff;
      }
      @keyframes animate {
        from {
          transform: translateY(20px);
        }
        to {
          transform: translateY(0);
        }
      }

      .btns {
        display: flex;
        align-items: center;
        gap: 2rem;
        button {
          padding: 0.6rem 4rem;
          border: none;
          border-radius: 35px;
          background-color: red;
          color: #fff;
          cursor: pointer;
          border: 1px solid #5f5c5c;
          transition: all 0.3s;
          &:hover {
            background-color: #db5151;
          }
        }

        button:nth-child(2) {
          background-color: transparent;
        }
      }
    }

    h2 {
      background-color: #2c2b2b;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      align-self: center;
      margin-bottom: 1rem;

      h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.3rem 1rem;
      }

      button {
        justify-self: flex-end;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        margin-right: 1rem;
        outline: none;
        border: none;
        font-size: 2rem;
      }
    }

    p {
      padding: 1rem;
      color: #fff;
    }

    > * {
      margin: 0;
      color: #fff;
    }
  }

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
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    gap: 2rem;
    color: #fff;
    margin-top: 3rem;
    padding-bottom: 2rem;

    @media screen and (max-width: 800px) {
      flex-direction: column;
    }

    .schedules {
      background-color: #171717;
      max-height: 700px;
      overflow-y: auto;

      > * {
        margin: 0;
        color: #fff;
        padding: 0 1rem;
      }

      h2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: #2c2b2b;
        h4 {
          display: flex;
          gap: 0.4rem;
        }
      }

      .schedule {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-bottom: 1px solid #3b3939;

        h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        p {
          margin: 0;
          color: #5f5c5c;
          font-size: 0.8rem;
        }
      }
    }

    .locationsTags {

      .location{
        background-color: #000;

        h2{
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.4rem;
          background-color: #811b1b;
          padding: 0.5rem;

          span{
            display: flex;
            align-items: center;
            gap: 0.4rem;

          }
        }
        

        
      }

      .tags{
        background-color: #000;
        h2{
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem;

          span{
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
        }
      }
      .tag {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        /* justify-content: center; */
        gap: 0.4rem;
        padding: 1rem;
        

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
          padding: 1rem;

          > * {
            font-size: 1.5rem;
            color: #fff;
          }
        }
      }
    }
  }
`;
