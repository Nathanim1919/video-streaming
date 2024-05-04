import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BgImage from '/image/bg.jpg';
import StreamImage from '/image/stream.jpg';
import JoinImage from '/image/join.jpg';
import CommunityImage from '/image/community.jpg';
import ScheduleImage from '/image/schedule.jpg';


const HomePage = () => {
  return (
    <Container>
    <Content>
        <div className='navbar'>
            <div className='logo'>
                <h1>DevSphere</h1>
            </div>
            <div className='menu'>
                <Link to="/">Home</Link>
                <Link to="/streams">Streams</Link>
                <Link to={'/streamers'}>Streamers</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
        <div className='header'>
            <h1>DevSphere Virtual Streaming App</h1>
            <p>Join the community and share your moments live with the world, or tune in to watch others.</p>
            <div>
                <input type="text" placeholder="Search streams" />
                <button>Search</button>
            </div>
        </div>
    </Content>
      <div className='features'>
        <div className='startStream'>
            <h2>Start Your Own Stream</h2>
            <p>Got something you want to share? Start your own stream and broadcast live to viewers all over the world.</p>
            <Link to="/start-stream">Start Streaming</Link>
        </div>  
        <div className='joinStream'>
            <h2>Join a Stream</h2>
            <p>Want to see what others are up to? Join a stream and interact with the streamer and other viewers in real time.</p>
            <Link to="/streams">View Streams</Link>
        </div>
        <div className='streames'>
            <h2>Create and Schedule Stream</h2>
            <p>Streamers can create and schedule streams for their viewers to RSVP and join in at the scheduled time.</p>
            <Link to="/create-stream">wanna see?</Link>
        </div>
      </div>
    <div className='joinCommunity'> 
        <h2>Join Our Community</h2>
        <p>Join our community of streamers and viewers. Follow your favorite streamers, interact with other viewers, and more.</p>
        <Link to="/signup">Sign Up</Link>
    </div>
    <div className='footer'>
        <p>DevSphere &copy; 2024</p>
        <p>Made with ❤️ by Nathanim.T</p>
    </div>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
    overflow: hidden;

    .features{
        display: flex;
        justify-content: space-around;
        padding: 4rem;
        gap: 20px;

        .startStream, .joinStream, .streams{
            width: 30%;
            padding:2rem;
            border-radius: 5px;
            color: #fff;
            text-align: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;


            >*{
                margin: 0;
            }

            h2{
                font-size: 2rem;
            }

            p{
                font-size: 1rem;
                margin: 10px 0;
            }

            a{
                padding: 10px 20px;
                background: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 2rem;
                transition: all 0.3s ease-in-out;
            }
        }

        .startStream{
            background:linear-gradient(to bottom, #0000008d, #00000079), url(${StreamImage});
            background-size: cover;
            background-position: center;
        }

        .joinStream{
            background:linear-gradient(to bottom, #0000008d, #00000079), url(${JoinImage});
            background-size: cover;
            background-position: center;
        }

        .streams{
            background:linear-gradient(to bottom, #0000008d, #00000079), url(${ScheduleImage});
            background-size: cover;
            background-position: center;
        }
        
    
    }


    .joinCommunity{
        text-align: center;
        padding:3rem 20px;
        color: #fff;
        background:linear-gradient(to bottom, #000000ea, #00000079), url(${CommunityImage});
        /* background-size: cover;
        background-position: center; */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin: 2rem 0;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        >*{
            margin: 0;
        }

        h2{
            font-size: 3rem;
        }

        p{
            font-size: 1rem;
            margin: 10px 0;
        }

        a{
            padding: 10px 20px;
            background: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 2rem;
            transition: all 0.3s ease-in-out;
        }
    
    }

    .footer{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        padding: 2rem;

        >*{
            margin: 0;
        }
    }
`

const Content = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background:linear-gradient(to bottom, #000000e4, #0000005e), url(${BgImage});
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .header{
        transform: translateY(50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 10px;

       

        h1{
            font-size: 4rem;
            margin-bottom: 0;
            /* font-family: "Poetsen One", sans-serif; */
        }
    }


    .navbar{
        display: flex;
        justify-content: space-around;
        color: #fff;
        align-items: center;
        padding: 10px 0;


        a{
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: all 0.3s ease-in-out;
        }
    }
`