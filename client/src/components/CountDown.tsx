// imports
import React, {useState, useEffect, useMemo} from 'react'
import styled from 'styled-components'
import { IEvent } from '../interfaces/event';

interface CountdownProps {
    event: IEvent
}


export const CountDown: React.FC<CountdownProps> = ({event}) => {
    const [countdown, setCountdown] = useState<{days: number, hours: number, minutes: number, seconds: number, passed?:string}>({days: 0, hours: 0, minutes: 0, seconds: 0, passed:''}); 
    const eventDate = useMemo(() => new Date(event?.date), [event?.date]);
   console.log(event)   
    // count down logic
  // Countdown timer 
  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const distance = eventDate.getTime() - now.getTime();
  
      if (distance < 0) {

        // Event has already occurred
        setCountdown({days: 0, hours: 0, minutes: 0, seconds: 0, passed: "Event has already occurred or is happening now"});
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



    return (
        <Container className="countdown">
            <div className="countdown__timer">
               {!countdown.passed &&  <div className="countdown__timer__item">
                    <div className="countdown__timer__item__value">{countdown.days}</div>
                    <div className="countdown__timer__item__label">Days</div>
                </div>}
               {!countdown.passed &&  <div className="countdown__timer__item">
                    <div className="countdown__timer__item__value">{countdown.hours}</div>
                    <div className="countdown__timer__item__label">Hours</div>
                </div>}
              {!countdown.passed &&   <div className="countdown__timer__item">
                    <div className="countdown__timer__item__value">{countdown.minutes}</div>
                    <div className="countdown__timer__item__label">Minutes</div>
                </div>}
               {!countdown.passed && <div className="countdown__timer__item">
                    <div className="countdown__timer__item__value">{countdown.seconds}</div>
                    <div className="countdown__timer__item__label">Seconds</div>
                </div>}

                {countdown.passed && <div className="passedMsg countdown__timer__item">
                    <div className="countdown__timer__item__value">{countdown.passed}</div>
                </div>}
            
            </div>
        </Container>
    )
}




// styled components

const Container = styled.div`
    /* background-color: red; */
    color: #fff;
    font-family: "Black Ops One", system-ui;


    .countdown__timer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;

        .countdown__timer__item{
            background-color: #333;
            padding: 1rem;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .5rem;
            flex: 1;
            box-shadow: 0 20px 40px rgba(0,0,0,.2);

            .countdown__timer__item__value{
                font-size: 5rem;

                @media screen and (max-width: 768px){
                    font-size: .5rem;
                }
            }

            .countdown__timer__item__label{
                font-size: .8rem;
            }
        }

        .passedMsg{

            .countdown__timer__item__value{
                font-size: 3.5rem;

                @media screen and (max-width: 768px){
                    font-size: 2.5rem;
                }
            }
        }
    }
`