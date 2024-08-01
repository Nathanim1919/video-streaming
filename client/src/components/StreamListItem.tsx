import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { requestHandler } from '../utils';
import { useAuth } from '../contexts/AuthContext';
import { ImSpinner9 } from "react-icons/im";
import useRsvp from '../customeHook/useRsvp';
import { FaBookmark } from "react-icons/fa6";
import { EventTicket } from './EventTicket';
import { IStream } from '../interfaces/stream.interface';
import { bookMarkStream } from '../api/stream';


interface StreamListItemProps {
  stream: IStream;
}

const StreamListItem: React.FC<StreamListItemProps> = ({ stream }) => {
  const { user } = useAuth();
  // const [countdown, setCountdown] = useState<{days?: number, hours?: number, minutes?: number, seconds?: number}>({days: 0, hours: 0, minutes: 0, seconds: 0}); 
  const [isRsvp, setIsRsvp] = useState((user!.rvps).includes(user!._id));
  const [isLoading, setIsLoading] = useState(false);
  // const eventDate = useMemo(() => new Date(stream?.date), [stream?.date]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const {handleRemoveRsvp, handleRsvp, checkRsvpStatus} = useRsvp(stream._id, setIsRsvp, setIsLoading, setQrCodeUrl);
  // console.log(isRsvp)

  useEffect(() => {
    // Call checkRsvpStatus when the component mounts
    checkRsvpStatus();
  }, [checkRsvpStatus]);


  const handleBookmark = async () => {
    await requestHandler(
      async () => await bookMarkStream(stream._id),
      setIsLoading,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Countdown timer 
  // useEffect(() => {
  //     // Update the countdown every second
  //     const intervalId = setInterval(() => {
  //       const now = new Date();
  //       const distance = eventDate.getTime() - now.getTime();
    
  //       if (distance < 0) {

  //         // Event has already occurred
  //         setCountdown({days: 0});
  //         clearInterval(intervalId);
  //       } else {
  //         // Calculate and set the countdown time
  //         const seconds = Math.floor((distance / 1000) % 60);
  //         const minutes = Math.floor((distance / 1000 / 60) % 60);
  //         const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  //         const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  //         if (days !== 0) {
  //           // Event is more than 24 hours away
  //           setCountdown({days});
  //         } 
  //         else if (hours !== 0) {
  //           // Event is less than 24 hours away
  //           setCountdown({hours});
  //         }
  //         else if (minutes !== 0) {
  //           // Event is less than 1 hour away
  //           setCountdown({minutes});
  //         } 
  //         else {
  //           // Event is less than 1 minute away
  //           setCountdown({seconds});
  //         }
  //       }
  //     }, 1000);
    
  //     // Clear the interval when the component is unmounted
  //     return () => clearInterval(intervalId);
  //   }, [eventDate]);


  // Render the component
    return (
      <Container>
        {qrCodeUrl && <EventTicket qrCodeUrl={qrCodeUrl}/>}
        <div className='image'>
          <img src={stream.image} alt='Stream' />
        </div>
        <div className='info'> 
          <Link to={'/'}  className='bookmark' onClick={(e)=>{e.preventDefault();handleBookmark()}}><FaBookmark/></Link>
          <div className="titles">
            <h3>{stream.title}</h3>
            <h4>{stream.isOnline?`Online ${stream.eventType}`:stream.location}<span>{stream.status}</span></h4>
          </div>
          <p className='introduction'>
            {stream.description}
          </p>
          <div className="tags">
          {stream.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
          </div>
          <div className='streamer'>
              <div className='profilePic'>
                  <img src={stream.owner.profilePicture.url} alt='Streamer' />
              </div>
              <div className='streamerInfo'>
                  <h4>{stream.owner?.username}</h4>
                  <p>{stream.owner?.profession}</p>
              </div>
          </div>
         

          <div className='buttons'>
              <div className="btns">
                <Link to={'/'} className={isRsvp? 'cancel' : 'rsvp'} 
                  onClick={isRsvp?handleRemoveRsvp:handleRsvp}>{isLoading && <ImSpinner9/>}{isRsvp? 'Cancel My Online RSVP' : 'RSVP to Attend Online'}
                </Link>
                <Link to={`/streames/${stream._id}`} className='details'>Details and Schedule</Link>
              </div>
              <span>Free</span>
          </div>

        </div>
      </Container>
    );
  };

  export default StreamListItem;


  // Styled components
  const Container = styled.div`
      display: grid;
      grid-template-columns: .3fr .70fr;
      width: 85vw;
      gap: 2rem;
      margin: 0 auto;
      color: #fff;
      background: #000;
      margin: 1rem auto;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all .3s;

      &:hover{
        border: 1px solid #5c4f10;
      }

      @media screen and (max-width:1000px){
          grid-template-columns: 1fr;
      }

      @media screen and (max-width:600px){
          grid-template-columns: 1fr;
          width: 90vw;
      }


      .image{
        position: relative;
        .editImage{
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #00000075;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          color: #eee;

          a{
            font-size: 1.5rem;
            color: gold;
          }
        }
      }


      .info{
          display: flex;
          flex-direction: column;
          padding: 1rem;
          position: relative;
          gap: 1rem;

          >a.bookmark{
            padding: .4rem;
            background: #2d2c2c75;
          }

          .schedule{
           h3{
            font-size: 1.3rem;
            color: #fff;
            margin: 0;
            /* font-weight: 100; */
            display: flex;
            align-items: center;
            gap: .5rem;
           }
          }
          .tags{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: .3rem;

            span{
              background: #333;
              padding: .3rem .5rem;
              font-size: .7rem;
              border-radius: 50px;
            }
          }

          .titles{
            h4{
              font-size: 1rem;
              color: #fff;
              margin: 0;
              font-weight: 100;
              display: flex;
              align-items: center;
              gap: .5rem;
              span{
                background: #333;
                padding: .3rem .5rem;
                font-size: .8rem;
                border-radius: 50px;
              }
            }
          }


          >a.bookmark{
            color: #fff;
            font-size: 1.5rem;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            gap: .5rem;
            position: absolute;
            top: 1rem;
            right: 1rem;
          }

          >*{
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;


            >*{
              margin: 0;
            }
          }

          .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          p{
              font-size: 1rem;
              color: rgb(168, 163, 163);
              margin: 0;
              font-weight: 300;
              max-width: 600px;
          }

          .streamer{
              display: flex;
              align-items: center;
              margin-bottom: 1rem;
              flex-direction: row;

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
            justify-content: space-between;
            flex-direction: row;
            align-items: center;

            span{
                background: #333;
                padding: .3rem 1rem;
                font-size: .8rem;
                border-radius: 50px;
            }
            
            .btns{
              display: flex;
              gap: 1rem;
              flex-direction: row;
              

              >a{
                padding: .5rem 1rem;
                background: #007bff;
                color: #fff;
                /* border-radius: 50px; */
                font-size: .8rem;
                display: flex;
                align-items: center;
                gap: .5rem;
                transition: all .3s;
                text-decoration: none;
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
                  background: #c0ca76;
              }
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