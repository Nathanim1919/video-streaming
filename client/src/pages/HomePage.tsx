import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BgImage from '/home/bg.jpg';
import StreamImage from '/image/stream.jpg';
import JoinImage from '/image/join.jpg';
import CommunityImage from '/image/community.jpg';
import ScheduleImage from '/image/schedule.jpg';
import { UpcomingStreams } from '../components/authenticatedPageComponents/upcomingStreams';
import { TopStreamers } from '../components/authenticatedPageComponents/topTreamers';
import { TopStreams } from '../components/authenticatedPageComponents/TopStreames';
import Footer from '../components/authenticatedPageComponents/footer';
import { CreateStream } from '../components/authenticatedPageComponents/createStreamCall';
import Image1 from '/home/live.jpeg';
import Image3 from '/home/live2.jpeg';
import Image4 from '/home/live3.jpg';
import Image2 from '/home/people.jpg';
import Icon1 from '/icon/icon1.png';
import Icon2 from '/icon/icon2.png';
import Icon3 from '/icon/icon3.png';


const HomePage = () => {
  return (
    <Container>
    <Content>
        <div className='navbar'>
            <div className='logo'>
                <h1>DevSphere</h1>
            </div>
            <div className='menu'>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
        <div className='header'>
            <div className="hero-text-content">
                <h1>Buy Tix or Host</h1>
                <h3>Experience live events, both online and in person</h3>
                <p>Whether you're a fan of a live event or a host, you can buy tickets or host your own, through DevSphere.</p>
                <button>Get Started</button>
            </div>
            <div className="images">
                <img src={Image1} alt="Live Stream" />
                <img src={Image3} alt="Live Stream" />
                <img src={Image4} alt="Live Stream" />
                <img src={Image2} alt="People" />
            </div>

        </div>
    </Content>
      <div className='features'>
        <div className="inspiration">
            <h1>Give your attendee a great experiance</h1>
            <p>With DevSphere, you can give your attendees a great experience.</p>

            <div className="btns">
                <Link to="/signup">Get Started</Link>
                <Link to="/login">Contact Us</Link>
            </div>
        </div>

        <div className="social-eng">
            <img src={Icon1} alt="Social Engagement" />
            <h2>Social Engagement</h2>
            <p>Engage with your audience through our social engagement features.</p>
        </div>

        <div className="eventManagement">
        <img src={Icon2} alt="Social Engagement" />
            <h2>Event Management</h2>
            <p>Manage your events with our easy to use event management tools.</p>
        </div>

        <div className="ticketScanning">
        <img src={Icon3} alt="Social Engagement" />
            <h2>Ticket Scanning</h2>
            <p>Scan tickets with our easy to use ticket scanning tools.</p>
        </div>

        <div className="securePayment">
        <img src={Icon1} alt="Social Engagement" />
            <h2>Secure Payment</h2>
            <p>Pay securely with our secure payment system.</p>
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
    <UpcomingStreams/>
    <CreateStream/>
    <TopStreamers/>
    <TopStreams/>
    <Footer/>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
    overflow: hidden;

    .features{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 70%;
        margin: 5rem auto;

        >div{
            background: linear-gradient(45deg, #970505, #59033f);
            padding: 2rem;
            color: #fff;


            img{
                width: 100px;
                margin: 0 auto;
            }
        }

        >div:nth-child(1){
            grid-column: span 2;
            /* grid-row: span 2; */
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
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
       /* min-height: 100vh; */
       width: 80%;
       gap: 2rem;
       margin:5rem auto;
       place-items: center;


       .hero-text-content{
        /* place-self: start; */
        display: flex;
        flex-direction: column;
        /* background-color: red; */
        
        h1{
            font-size: 4rem;
            margin: 0;
        }

        h3{
            font-size: 1.5rem;
            margin: 0;
        }

        p{
            font-size: 1rem;
            margin: 30px 0;
        }

        button{
            padding: 10px 20px;
            background: #7f2626;
            color: #fff;
            text-decoration: none;
            place-self: center;
            border-radius: 5px;
            margin-top: 2rem;
            transition: all 0.3s ease-in-out;
            border: none;
        }
       }

       img{
        width: 100%;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
       }


       .images{
        position: relative;
        img:nth-child(1), img:nth-child(2), img:nth-child(3){
            position: absolute;
            right: -10%;
            width: 60%;
            top: -15%;
        }
        img:nth-child(2){
            left: -30%;
            top: -20%;
            width: 40%;
        }
        img:nth-child(3){
            left: -5%;
            top: 40%;
            width: 40%;
        }
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