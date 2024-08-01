import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiUserFollowLine } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";
import { LuGhost } from "react-icons/lu";
// import TechImage from "/home/live3.jpg";
import { formatDate, requestHandler } from "../utils";
import { authApi } from "../api";
import { useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { Streamer } from "../pages/StreamerPage";
import useFollow from "../customeHook/useFollow";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import { IoIosOptions } from "react-icons/io";
// import { UserInterface } from "../interfaces/user";
import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { MdCreate } from "react-icons/md";
import { EditUserBio } from "./profile/editBio";
import { CreateEventForm } from "./CreateEventForm";
import { UploadProfileImage } from "./profile/uploadProfileImage";
import { IEvent } from "../interfaces/event";
import { personalSearch } from "../api/search";

enum FilterType {
  All = "All",
  Stream = "Stream",
  Event = "Event",
}

const UserProfile = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [editBio, setEditBio] = React.useState(false);
  const [createEvent, setCreateEvent] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<IEvent | null>({} as IEvent);
  const [eventEditMode, setEventEditMode] = React.useState(false);
  const [streamer, setStreamer] = React.useState<Streamer>({} as Streamer);
  const [actions, setActions] = React.useState<string[]>([]);
  const [isOwner, setIsOwner] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openOptions, setOpenOptions] = React.useState(false);
  const [userSreamsAndEvents, setUserStreamsAndEvents] = React.useState<IEvent[]>(
    []
  );
  const [uploadProfile, setUploadProfile] = React.useState(false);
  const [isFollow, setIsFollow] = React.useState(
    streamer?.followers?.includes(user!._id)
  );
  const [userFollowers, setUserFollowers] = React.useState<number>(0);
  const handleClick = useFollow(
    streamer?._id,
    isFollow,
    setIsFollow,
    setIsLoading,
    setUserFollowers
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  const handleSearch = async (query: string) => {
    console.log("Search query Parameter: ", query);
    await requestHandler(
      async () => await personalSearch(query),
      setIsLoading,
      (response) => {
        setUserStreamsAndEvents(response.data as IEvent[]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const filterEventsAndStreams = (data: IEvent[], filter: FilterType) => {
    const filteredData = data.filter((item: IEvent) => {
      switch (filter) {
        case FilterType.All:
          return true;
        case FilterType.Stream:
          return item.isOnline;
        case FilterType.Event:
          return !item.isOnline;
        default:
          return true;
      }
    });
    setUserStreamsAndEvents(filteredData);
  };

  useEffect(() => {
    async function fetchData() {
      await requestHandler(
        async () => await authApi.fetchStreamer(id as string),
        setIsLoading,
        (response) => {
          const { data, actions, isOwner } = response.data as {
            data: Streamer;
            actions: string[];
            isOwner: boolean;
          };
          setStreamer(data as Streamer);
          // setUserStreamsAndEvents([...data.events, ...data.streams]);
          filterEventsAndStreams(
            [...data.events, ...data.streams],
            FilterType.All
          );
          setIsFollow(data?.followers?.includes(user!._id));
          setUserFollowers(data?.followers?.length);
          setActions(actions);
          setIsOwner(isOwner);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    fetchData();
  }, [id, user]);

  return (
    <Container>
      {(createEvent || eventEditMode) && (
        <CreateEventForm
          eventEditMode={eventEditMode}
          setEventEditMode={setEventEditMode}
          selectedEvent={selectedEvent}
          setCreateEvent={setCreateEvent}
        />
      )}
      {uploadProfile && (
        <UploadProfileImage
          setUploadProfile={setUploadProfile}
          profilePic={streamer?.profilePicture?.url}
        />
      )}
      <div className="profile">
        <div className="header-info">
          <div className="profileInfo">
            <div className="profile-pic">
              <img src={streamer.profilePicture?.url} alt="profile-pic" />
              {isOwner && (
                <div className="camera" onClick={() => setUploadProfile(true)}>
                  <IoCameraOutline />
                </div>
              )}
            </div>
            <div className="profile-info">
              <h4>{streamer.fullName}</h4>
              <p>{streamer.profession}</p>
              {!isOwner && (
                <button onClick={handleClick}>
                  {isLoading ? (
                    <span className="spinner">
                      <ImSpinner9 />
                    </span>
                  ) : (
                    <RiUserFollowLine />
                  )}
                  {isFollow ? "Following" : "Follow"}
                </button>
              )}{" "}
            </div>
          </div>
          <div className="social">
            {actions.includes("edit") && (
              <div className="edit" onClick={() => setEditBio(true)}>
                <CiEdit />
              </div>
            )}
            <div className="social-links">
              <Link to="/">
                <FaFacebook size={20} color="#eee" />
              </Link>
              <Link to="/">
                <FaLinkedin size={20} color="#eee" />
              </Link>
              <Link to="/">
                <FaGithub size={20} color="#eee" />
              </Link>
              <Link to="/">
                <FaTwitter size={20} color="#eee" />
              </Link>
              <Link to="/">
                <FaInstagram size={20} color="#eee" />
              </Link>
            </div>
            <div className="bio">
              <p>
                {streamer?.bio
                  ? streamer.bio
                  : isOwner
                  ? "Tell us about yourself"
                  : ""}
              </p>
              {actions.includes("edit") && editBio && (
                <EditUserBio
                  streamer={streamer}
                  setStreamer={setStreamer}
                  setEditBio={setEditBio}
                />
              )}
            </div>
            <div className="user-infos">
              <div>
                <RiUserFollowLine />
                <p>{userFollowers} followers</p>
              </div>
              <div>
                <MdOutlineStarRate />
                <p>Rating: {streamer.rating}</p>
              </div>
              <div>
                <LuGhost />
                <p>{streamer.events?.length} events hosted </p>
              </div>
              <div>
                <MdOutlineWatchLater />
                <p>100 Upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="evets">
        <div>
          <div className="header">
            <h3>Scheduled Events</h3>
            <div className="search">
              <input
                type="text"
                placeholder="Search Events, Streams..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
              />
            </div>
            <div className="div">
              <div className="options">
                <IoIosOptions onClick={() => setOpenOptions(!openOptions)} />
                {openOptions && (
                  <div>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenOptions(false);
                        filterEventsAndStreams(
                          userSreamsAndEvents,
                          FilterType.All
                        );
                      }}
                      to={"/eventsAndStreams/all"}
                    >
                      All
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenOptions(false);
                        filterEventsAndStreams(
                          userSreamsAndEvents,
                          FilterType.Stream
                        );
                      }}
                      to={"/streams"}
                    >
                      Streams
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenOptions(false);
                        filterEventsAndStreams(
                          userSreamsAndEvents,
                          FilterType.Event
                        );
                      }}
                      to={"/events"}
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>
              {isOwner && (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    setCreateEvent(true);
                    setEventEditMode(false);
                    setSelectedEvent(null);
                  }}
                  to={"/events/schedule"}
                >
                  <MdCreate />
                </Link>
              )}
            </div>
          </div>
          {isLoading && <Loader />}
          <div className="events-list">
            {userSreamsAndEvents?.length === 0 ? (
              <p>No events available</p>
            ) : (
              userSreamsAndEvents?.map((event) => (
                <div key={event._id}>
                  <div className="event-info">
                    {isOwner && (
                      <form>
                        <input
                          ref={fileInputRef}
                          name="file"
                          type="file"
                          hidden
                        />
                        <label
                          htmlFor="file"
                          className="editIcon"
                          onClick={handleLabelClick}
                        >
                          <CiEdit />
                        </label>
                      </form>
                    )}
                    <img src={event.image} alt="profile-pic" />
                  </div>
                  <div className="info">
                    <p>
                      {formatDate(event.date)}{" "}
                      <span>{event.isOnline ? "Stream" : "Event"}</span>
                    </p>
                    <h4>
                      {event?.title?.length > 30
                        ? event.title.slice(0, 30) + "..."
                        : event.title}
                    </h4>
                    <p>
                      {event?.description?.length > 100
                        ? event.description.slice(0, 100) + "..."
                        : event.description}
                    </p>
                  </div>
                  {isOwner ? (
                    <div className="event-buttons">
                      <Link to={"/"}>Delete</Link>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          setEventEditMode(true);
                          setSelectedEvent(event);
                        }}
                        to={`/events/${event._id}`}
                      >
                        Edit
                      </Link>
                      {!event.isOnline?<Link to={`/events/${event._id}`}>Details</Link>: <Link to={`/streames/${event._id}`}>Details</Link>}
                    </div>
                  ) : (
                    <div className="event-buttons">
                      <Link to={"/"}>RSVP</Link>
                      {!event.isOnline?<Link to={`/events/${event._id}`}>Details</Link>: <Link to={`/streames/${event._id}`}>Details</Link>}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  width: 85vw;
  margin: auto;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .profile {
    /* background-color: #b33030a6; */
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-top: 2rem;
    border-bottom: 1px solid #5c5959;
    position: relative;
    overflow: hidden;
    width: 100%;

    .header-info {
      display: grid;
      grid-template-columns: 0.3fr 0.8fr;
      justify-content: space-between;
      gap: 2rem;
      width: 100%;

      @media screen and (max-width: 800px) {
        grid-template-columns: 1fr;
      }

      .profileInfo {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        > .profile-pic {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          cursor: pointer;

          .camera {
            background-color: #00000091;
            backdrop-filter: blur(10px);
            padding: 0.5rem 0;
            color: #fff;
            position: absolute;
            left: 0;
            width: 100%;
            display: grid;
            place-items: center;
            font-size: 2rem;
            bottom: 0;
            transform: translateY(100%);
          }

          &:hover {
            .camera {
              transform: translateY(0);
            }
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      p {
        font-size: 0.8rem;
        color: #ab9f9f;
      }

      button {
        margin-top: 0.5rem;
        padding: 0.4rem 1rem;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-family: inherit;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;

        .spinner {
          > *:nth-child(1) {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }

      .profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;

        > * {
          margin: 0;
        }
      }

      > * {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        > * {
          margin: 0;
        }
      }
    }

    .social {
      display: flex;
      flex-direction: column;
      align-items: center;

      .edit {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
      }

      > a {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 2rem;
      }

      .social-links {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        a {
          font-size: 1rem;
          color: #413f3f;
        }
      }
      .bio {
        width: 60%;
        font-size: 0.8rem;
        font-weight: 100;
        color: #ab9f9f;
        position: relative;
        padding: 0 1rem;
        display: flex;
      }

      .user-infos {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;

        div {
          border-radius: 10px;
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #dacbcb;
          background-color: #000;
          padding: 0.2rem 1rem;

          > *:nth-child(1) {
            font-size: 2rem;
          }

          p {
            font-size: 0.8rem;
            text-align: center;
          }
        }
      }
    }
  }

  .evets {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      width: 100%;
      z-index: 10;
      top: 10%;
      gap: 1rem;
      background-color: #0b0b0b92;
      backdrop-filter: blur(10px);
      padding: 0.3rem 1rem;

      > div.search {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.5rem;

        input {
          padding: 0.6rem 2rem;
          background-color: #191818;
          border: 1px solid #5e3131;
          width: 100%;
          color: #fff;
          outline: none;
          font-family: inherit;
        }
      }

      a {
        padding: 0.3rem 0.6rem;
        background: linear-gradient(45deg, #2846ce, #0e478d);
        border: none;
        color: #fff;
        font-family: inherit;
        text-decoration: none;
      }

      .div {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;

        > *:nth-child(1) {
          font-size: 2rem;
        }
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;

      > * {
        margin: 0;
      }
    }
  }

  div.options {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: roe;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    > div {
      display: none;
      position: absolute;
      top: 2rem;
      right: 0;
      background-color: #000;
      border-radius: 5px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 10;
      a {
        color: #fff;
        text-decoration: none;
        font-size: 0.8rem;
      }
    }

    &:hover {
      > div {
        display: flex;
      }
    }
  }
  .events-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 2rem 0;
    > div {
      background-color: #000;
      max-width: 300px;
      cursor: pointer;
      border-radius: 10px;
      position: relative;

      .editIcon {
        position: absolute;
        display: flex;
        justify-content: flex-end;
        padding: 0.5rem;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        top: 0;
        right: 0;
        font-size: 1.4rem;
        z-index: 20;
      }

      &:hover {
        .event-info {
          > img {
            filter: brightness(1);
          }
        }
      }

      .info {
        padding: 1rem;
        p {
          font-size: 0.8rem;
          color: #dfd8d8;
          margin: 0;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 0.5rem;

          span {
            background-color: #625e5946;
            padding: 0.2rem 0.5rem;
            border-radius: 5px;
            color: #ffffff92;
          }
        }
      }

      .event-info {
        background-color: red;
        > img {
          width: 100%;
          height: auto;
          filter: brightness(0.8);
          transition: all 0.3s ease-in-out;
        }
      }
      .event-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 1rem;
        a:nth-child(1) {
          background-color: #e68d21;
        }
        a {
          flex: 1;
          padding: 0.4rem 1rem;
          background-color: #7d5729;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-family: inherit;
          text-decoration: none;
        }
      }
    }
  }
`;
