import React, { useEffect } from "react";
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
import TechImage from "/home/live3.jpg";
import profilePic from "/image/profile.jpg";
import { requestHandler } from "../utils";
import { authApi } from "../api";
import { useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { Streamer } from "../pages/StreamerPage";
import useFollow from "../customeHook/useFollow";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import { IoIosOptions } from "react-icons/io";
import { UserInterface } from "../interfaces/user";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { EditUserBio } from "./profile/editBio";

const UserProfile = () => {
  const { user } = useAuth();
  const { id } = useParams();

  // options for info editin
  const [editBio, setEditBio] = React.useState(false);
  const [editUserInfos, setEditUserInfos] = React.useState(false);

  const [streamer, setStreamer] = React.useState<Streamer>({} as Streamer);
  const [actions, setActions] = React.useState<string[]>([]);
  const [isOwner, setIsOwner] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openOptions, setOpenOptions] = React.useState(false);
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

  useEffect(() => {
    async function fetchData() {
      await requestHandler(
        async () => await authApi.fetchStreamer(id as string),
        setIsLoading,
        (response) => {
          const { data, actions, isOwner } = response.data as {
            data: UserInterface;
            actions: string[];
            isOwner: boolean;
          };
          setStreamer(data);
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
      <div className="profile">
        <div className="header-info">
          <div className="profileInfo">
            <div className="profile-pic">
              <img src={profilePic} alt="profile-pic" />
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
               {user?.bio || 'Tell us about yourself'}
              </p>
             {actions.includes('edit') && <div className="edit" onClick={() => setEditBio(true)}>
                <CiEdit />
              </div>}
              {actions.includes('edit') && editBio && <EditUserBio userBio={user?.bio} setEditBio={setEditBio}/>}
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
            {/* <div>
            {actions?.includes('create') && <button>Create</button>}
            {actions?.includes('edit') && <button>Edit</button>}
            {actions?.includes('delete') && <button>Delete</button>}
            {actions?.includes('follow') && <button>Follow</button>}
            {actions?.includes('unfollow') && <button>Unfollow</button>}
            {actions?.includes('RSVP') && <button>RSVP</button>}
            {actions?.includes('unRSVP') && <button>UnRSVP</button>}
          </div> */}
          </div>
        </div>
      </div>
      <div className="evets">
        <div>
          <div className="header">
            <h3>Scheduled Events</h3>
            <div className="search">
              <input type="text" placeholder="Search Events, Streams..." />
            </div>
            <div className="div">
              <div className="options">
                <IoIosOptions onClick={() => setOpenOptions(!openOptions)} />
                {openOptions && (
                  <div>
                    <Link
                      onClick={() => setOpenOptions(false)}
                      to={"/eventsAndStreams/all"}
                    >
                      All
                    </Link>
                    <Link onClick={() => setOpenOptions(false)} to={"/streams"}>
                      Streams
                    </Link>
                    <Link onClick={() => setOpenOptions(false)} to={"/events"}>
                      Events
                    </Link>
                    <Link
                      onClick={() => setOpenOptions(false)}
                      to={"/events/past"}
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>
              {isOwner && (
                <Link to={"/events/schedule"}>
                  <MdCreate />
                </Link>
              )}
            </div>
          </div>
          {isLoading && <Loader />}
          <div className="events-list">
            {streamer.events?.length === 0 ? (
              <p>No events available</p>
            ) : (
              streamer.events?.map((event: any) => (
                <div key={event._id}>
                  <div className="event-info">
                    <img src={TechImage} alt="profile-pic" />
                  </div>
                  <div className="info">
                    <p>
                      {event.date} - {event.time}
                    </p>
                    <h4>
                      {event.title.length > 30
                        ? event.title.slice(0, 30) + "..."
                        : event.title}
                    </h4>
                    <p>
                      {event.description.length > 100
                        ? event.description.slice(0, 100) + "..."
                        : event.description}
                    </p>
                  </div>
                  {isOwner ? (
                    <div className="event-buttons">
                      <Link to={"/"}>Delete</Link>
                      <Link to={`/events/${event._id}`}>Edit</Link>
                      <Link to={`/streames/${event._id}`}>Details</Link>
                    </div>
                  ) : (
                    <div className="event-buttons">
                      <Link to={"/"}>RSVP</Link>
                      <Link to={`/events/${event._id}`}>Details</Link>
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
        /* background-color: orange; */
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
          /* height: auto; */

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

          .edit {
            font-size: 1.5rem;
            cursor: pointer;
          }
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
