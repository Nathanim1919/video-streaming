import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RiUserFollowLine } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";
import { LuGhost } from "react-icons/lu";
import TechImage from '/image/bg.jpg';
import { IoMdClose } from "react-icons/io";
import profilePic from '/image/profile.jpg'
import { CreateEventForm } from './CreateEventForm';
import { requestHandler } from '../utils';
import {fetchStreamer} from '../api';
import { useParams } from 'react-router-dom';
import { ImSpinner9 } from "react-icons/im";
import { Streamer } from '../pages/StreamerPage';
import useFollow from '../customeHook/useFollow';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';


const UserProfile = () => {
  const {user} = useAuth();
  const [createEvent, setCreateEvent] = React.useState(false);
  const [streamer, setStreamer] = React.useState<Streamer>({} as Streamer);
  const [actions, setActions] = React.useState<any>({}); // [follow, unfollow]
  const [isOwner, setIsOwner] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFollow, setIsFollow] = React.useState(streamer.followers?.includes(user._id));
  const [userFollowers, setUserFollowers] = React.useState<number>(streamer.followers?.length);
  const {id} = useParams();
  const handleClick = useFollow(streamer?._id, isFollow,setIsFollow, setIsLoading, setUserFollowers);
  

  useEffect(() => {
    async function fetchData() {
      await requestHandler(
        async () => await fetchStreamer(id),
        setIsLoading,
        (response) => {
          console.log(response);
          const {data, actions, isOwner} = response.data;
          setStreamer(data);
          setActions(actions);
          setIsOwner(isOwner);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    fetchData();
  }, [id]);

  
  return (
    <Container>
     {createEvent && <CreateEventForm setCreateEvent={setCreateEvent}/>}
      <div className='profile'>
        <div className='header-info'>
          <div className='profileInfo'>
            <div className='profile-pic'>
              <img src={profilePic} alt="profile-pic" />
            </div>
            <div className='profile-info'>
              <h4>{streamer.fullName}</h4>
              <p>{streamer.profession}</p>
{ !isOwner &&<button onClick={handleClick}>{isLoading?<span className='spinner'><ImSpinner9/></span>:<RiUserFollowLine/>}{isFollow?"Following":"Follow"}</button>
}            </div>
          </div>
          <div className="social">
            <div className='social-links'>
              <Link to="/"><FaFacebook size={20} color='#eee' /></Link>
              <Link to="/"><FaLinkedin size={20} color='#eee' /></Link>
              <Link to="/"><FaGithub size={20} color='#eee' /></Link>
              <Link to="/"><FaTwitter size={20} color='#eee' /></Link>
              <Link to="/"><FaInstagram size={20} color='#eee' /></Link>
            </div>
            <div className="bio">
              <p>I am a passionate software engineer with experience in web development. I love creating innovative and user-friendly applications. In my free time, I enjoy exploring new technologies and contributing to open-source projects.</p>
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
                <p>{(streamer.events)?.length} events hosted </p>
              </div>
              <div>
                <MdOutlineWatchLater/>
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
          <div className='header'>
            <h3>Scheduled Events</h3>
            {isOwner && <button onClick={() => setCreateEvent(true)}>Schedule new Event</button>}
          </div>
          {streamer.events?<div className="events-list">
            {streamer.events?.length === 0 ? <p>No events available</p> :
              streamer.events?.map((event: any) => (
                <div key={event._id}>
                  <div className="event-info">
                    <img src={TechImage} alt="profile-pic" />
                  </div>
                  <div className='info'>
                    <p>{event.date} - {event.time}</p>
                    <h4>{event.title}</h4>
                  </div>
                  {isOwner?
                    <div className="event-buttons">
                      <Link to={'/'}>Delete</Link>
                      <Link to={`/events/${event._id}`}>Edit</Link>
                      <Link to={`/events/${event._id}`}>Details</Link>
                    </div>:
                    <div className="event-buttons">
                      <Link to={'/'}>RSVP</Link>
                      <Link to={`/events/${event._id}`}>Details</Link>
                    </div>
                  }
                </div>
              ))}
        </div>:<Loader/>}
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

    .profile{
        /* background-color: #363535a6; */
        display: flex;
        flex-direction: column;
        padding:1rem;
        /* border-radius: 10px; */
        margin-top: 2rem;
        border-bottom: 1px solid #5c5959;
        position: relative;

        .header-info{
          display: flex;
          justify-content: space-between;
          gap: 2rem;

          .profileInfo{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            .profile-pic{
              width: 150px;
              height: 200px;
              background-color: red;
              height: auto;

              img{
                width: 100%;
                height: 100%;
              }
            }

            p{
              font-size: 0.8rem;
              color: #ab9f9f;
            }

            button{
              margin-top: .5rem;
              padding: .4rem 1rem;
              border: none;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: .3rem;
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
              transition: all .3s ease-in-out;

              .spinner{
                >*:nth-child(1){
                  animation: spin 1s linear infinite;
                }

                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              }
            }

            >*{
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;

              >*{
                margin: 0;
              }
            }
          }

          .social{
            display: flex;
            flex-direction: column;
            align-items: center;

            >a{
              position: absolute;
              top: 0;
              right: 0;
              color: #fff;
              font-size: 2rem;
            }

            .social-links{
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 1rem;
              
              a{
                font-size: 1rem;
                color: #413f3f;
                
              }
            }
            .bio{
              width: 60%;
              font-size: .8rem;
              font-weight: 100;
              color: #ab9f9f;
            }

            .user-infos{
              display: flex;
              justify-content: space-between;
              gap: 1rem;

              div{
                border-radius: 10px;
                display: flex;
                flex: 1;
                flex-direction: column;
                align-items: center;
                gap: .5rem;
                color: #dacbcb;
                background-color: #000;
                padding:.5rem 1rem;


                >*:nth-child(1){
                  font-size: 2rem;
                
                }

                p{
                  font-size: .8rem;
                  text-align: center;
                }
              }
            }
          }
        }
    }

    .evets{

      .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
          width: 100%;
          z-index: 10;
      top: 0;
      background-color: #222020;


      button{
        padding: .5rem 1rem;
        background: linear-gradient(45deg, #2846ce, #0e478d);
        border: none;
        color: #fff;
        font-family: inherit;
      }
      }

      >div{
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        
      
  
        >*{
          margin: 0;
        }
      }



    }

    .events-list{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 2rem 0;
      >div{
        background-color: #000;
        max-width: 300px;
        cursor: pointer;
        border-radius: 10px;
       

        &:hover{
          .event-info{
         
           >img{

            filter: brightness(1);
          } 
        }
        }

        .info{
          padding: 1rem;
          p{
            font-size: .8rem;
            color: #ab9f9f;
            margin: 0;
            font-weight: 100;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
        }
        
        .event-info{
          background-color: red;
           >img{
            width: 100%;
            height: auto;
            filter: brightness(.8);
            transition: all .3s ease-in-out;
          } 
        }
        .event-buttons{
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          a:nth-child(1){
            background-color: #e68d21;
          }
          a{
            flex: 1;
            padding: .4rem 1rem;
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