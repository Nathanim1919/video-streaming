import React from 'react';
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





const UserProfile = () => {
  return (
    <Container>
      <div className='profile'>
        <div className='header-info'>
          <div className='profileInfo'>
            <div className='profile-pic'>
              <img src="https://via.placeholder.com/150" alt="profile-pic" />
            </div>
            <div className='profile-info'>
              <h4>John Doe</h4>
              <p>software engineer</p>
              <button><RiUserFollowLine/>Follow</button>
            </div>
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
                <p>100 followers</p>
              </div>
              <div>
                <MdOutlineStarRate />
                <p>Rating: 4.5</p>
              </div>
              <div>
                <LuGhost />
                <p>100 events hosted </p>
              </div>
              <div>
                <MdOutlineWatchLater/>
                <p>100 Upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="evets">
        <div>
          <h3>Upcoming Events</h3>
          <div className="events-list">
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>Cancle RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>RSVP</button>
                <button>Details</button>
              </div>
            </div>
            <div className="event">
              <div className="event-info">
                <img src={TechImage} alt="profile-pic" />
              </div>
              <div className='info'>
                <p>May 22 to 23, 2024 - 9:30am to 5:30pm ELT</p>
                <h4>Complete Intro to Containers</h4>
              </div>
              <div className="event-buttons">
                <button>Cancle RSVP</button>
                <button>Details</button>
              </div>
            </div>
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

    .profile{
        /* background-color: #363535a6; */
        display: flex;
        flex-direction: column;
        padding:1rem;
        /* border-radius: 10px; */
        margin-top: 2rem;
        border-bottom: 1px solid #5c5959;

        .header-info{
          display: flex;
          justify-content: space-between;
          gap: 2rem;

          .profileInfo{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            p{
              font-size: 0.8rem;
              color: #ab9f9f;
            }

            button{
              margin-top: .5rem;
              padding: .3rem 1rem;
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

      >div{
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        
        >h3{
          position: sticky;
          width: 100%;
          z-index: 10;
      top: 0;
        }
  
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
          button:nth-child(1){
            background-color: #e68d21;
          }
          button{
            flex: 1;
            padding: .4rem 1rem;
            background-color: #7d5729;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: inherit;
          }
        }
      }
    }

`;