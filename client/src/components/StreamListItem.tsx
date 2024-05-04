import React from 'react';
import styled from 'styled-components';
import StreamImage from '/image/bg.jpg'
import { Link } from 'react-router-dom';

interface Stream {
  id: string;
  title: string;
  streamer: string;
  scheduledDate: string;
}

interface StreamListItemProps {
  stream: Stream;
}

const StreamListItem: React.FC<StreamListItemProps> = ({ stream }) => {
  const handleRSVP = () => {
    // Here you would typically handle the RSVP action, such as sending a request to your server
    console.log(`RSVP for stream ${stream.id}`);
  };

  return (
    <Container>
      <div className='image'>
        <img src={StreamImage} alt='Stream' />
      </div>
      <div className='info'>
        <p>May 22 to 23, 2024 - 9:30am to 5:30pm Central Daylight Time </p>
        <h3>Complete Intro to Containers</h3>
        <div className='streamer'>
            <div className='profilePic'>
                <img src={StreamImage} alt='Streamer' />
            </div>
            <div className='streamerInfo'>
                <h4>Nathanim Tadele</h4>
                <p>Full-Stack Engineer</p>
            </div>
        </div>
        <p className='introduction'>
            In this workshop, you'll learn the basics of Docker and Kubernetes through a series of lectures and hands-on labs.
        </p>

        <div className='buttons'>
            <Link to={'/'} className='rsvp' onClick={handleRSVP}>RSVP to Attend Online</Link>
            <Link to={'/streames/23'} className='details'>Details and Schedule</Link>
        </div>
      </div>
    </Container>
  );
};

export default StreamListItem;



const Container = styled.div`
    display: grid;
    grid-template-columns: .35fr .6fr;
    width: 75vw;
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
            }

            .details{
                background: #6c757d;
            }
        }
    }


    img{
        width: 100%;
        height: 100%;
        filter: brightness(.5);
        transition: all .3s;
    }


    &:hover{
        img{
            filter: brightness(1);
        }
    }
`