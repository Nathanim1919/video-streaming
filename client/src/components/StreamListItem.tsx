import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import StreamImage from '/image/join.jpg'
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import { useAuth } from '../contexts/AuthContext';
import { ImSpinner9 } from "react-icons/im";
import useRsvp from '../customeHook/useRsvp';



interface Stream {
  id: string | undefined | null;
  title: string;
  streamer: string;
  scheduledDate: string;
  attendees: string[];
}

interface StreamListItemProps {
  stream: Stream;
}

const StreamListItem: React.FC<StreamListItemProps> = ({ stream }) => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0}); 
  const [isRsvp, setIsRsvp] = useState(stream.attendees.includes(user?._id));
  const [isLoading, setIsLoading] = useState(false);
  const eventDate = useMemo(() => new Date(stream?.date), [stream?.date]);


  const handleRsvpClick = useRsvp(stream._id, isRsvp, setIsRsvp, setIsLoading);


  // Countdown timer 
  useEffect(() => {
      // Update the countdown every second
      const intervalId = setInterval(() => {
        const now = new Date();
        const distance = eventDate.getTime() - now.getTime();
    
        if (distance < 0) {
          // Event has already occurred
          setCountdown({days: 0, hours: 0, minutes: 0, seconds: 0});
          clearInterval(intervalId);
        } else {
          // Calculate and set the countdown time
          const seconds = Math.floor((distance / 1000) % 60);
          const minutes = Math.floor((distance / 1000 / 60) % 60);
          const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          setCountdown({days, hours, minutes, seconds});
        }
      }, 1000);
    
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, [eventDate]);




  // Render the component
    return (
      <Container>
        <div className='image'>
          <img src={StreamImage} alt='Stream' />
        </div>
        <div className='info'>
          <p>{formatDate(stream?.date)} Eastern centeral time </p>
          <h3>Time remaining: {countdown.days} days {countdown.hours} hr {countdown.minutes} min {countdown.seconds} s</h3>
          <h3>{stream.title}</h3>
          <div className='streamer'>
              <div className='profilePic'>
                  <img src={StreamImage} alt='Streamer' />
              </div>
              <div className='streamerInfo'>
                  <h4>{stream.owner?.fullName}</h4>
                  <p>Full-Stack Engineer</p>
              </div>
          </div>
          <p className='introduction'>
              In this workshop, you'll learn the basics of Docker and Kubernetes through a series of lectures and hands-on labs.
          </p>

          <div className='buttons'>
              <Link to={'/'} className={isRsvp? 'cancel' : 'rsvp'} 
                onClick={handleRsvpClick}>{isLoading && <ImSpinner9/>}{isRsvp? 'Cancel My Online RSVP' : 'RSVP to Attend Online'}
              </Link>
              <Link to={`/streames/${stream._id}`} className='details'>Details and Schedule</Link>
          </div>
        </div>
      </Container>
    );
  };

  export default StreamListItem;




  // Styled components
  const Container = styled.div`
      display: grid;
      grid-template-columns: .35fr .6fr;
      width: 85vw;
      gap: 2rem;
      margin: 0 auto;
      color: #fff;
      background: #000;
      margin: 1rem auto;
      cursor: pointer;

      @media screen and (max-width:1000px){
          grid-template-columns: 1fr;
      }

      @media screen and (max-width:600px){
          grid-template-columns: 1fr;
          width: 90vw;
      }


      .info{
          display: flex;
          flex-direction: column;
          padding: 2rem;

          p{
              font-size: 1rem;
              color: rgb(124, 120, 120);
              margin: 0;
              font-weight: 100;
          }

          .streamer{
              display: flex;
              align-items: center;
              margin-bottom: 1rem;

              .profilePic{
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  overflow: hidden;
                  margin-right: 1rem;
                  background: #fff;
              }

              .streamerInfo{
                  p{
                      font-size: 1rem;
                      color: rgb(124, 120, 120);
                      margin: 0;
                      font-weight: 100;
                  }

                  h4{
                      margin: 0;
                  }
              }
          }

          .introduction{
              font-size: 1rem;
              margin: 1rem 0;
              font-weight: 100;
          }

          .buttons{
              display: flex;
              gap: 1rem;
              
              a{
                  font-family: inherit;
                  padding: 10px 20px;
                  background: #007bff;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  /* margin-top: 2rem; */
                  transition: all 0.3s ease-in-out;
                  border: none;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: .3rem;
                  transition: all 0.3s ease-in-out;
              }

              a:nth-child(1){
                >*:nth-child(1){
                  animation: spin 1s linear infinite;
                }

                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              }

              a.cancel{
                color: #fff;
                background: #dc3545;
              }

              .details{
                  background: #6c757d;
              }
          }
      }


      img{
          width: 100%;
          height: 100%;
          filter: brightness(.8);
          transition: all .3s;
      }


      &:hover{
          img{
              filter: brightness(1);
          }
      }
  `