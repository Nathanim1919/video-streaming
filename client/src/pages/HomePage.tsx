import { Link } from "react-router-dom";
import styled from "styled-components";
import BgImage from "/home/bg.jpg";
import { TopStreamers } from "../components/authenticatedPageComponents/topTreamers";
import { TopStreams } from "../components/authenticatedPageComponents/TopStreames";
import Footer from "../components/authenticatedPageComponents/footer";
import { CreateStream } from "../components/authenticatedPageComponents/createStreamCall";
import Image1 from "/home/live.jpeg";
import Image3 from "/home/live2.jpeg";
import Image4 from "/home/live3.jpg";
import Image2 from "/home/people.jpg";
import Icon1 from "/icon/icon1.png";
import Icon2 from "/icon/icon2.png";
import Icon3 from "/icon/icon3.png";

const HomePage = () => {
  return (
    <Container>
      <Content>
        <div className="navbar">
          <div className="logo">
            <h1>Eventify.</h1>
          </div>
          <div className="menu">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="header">
          <div className="hero-text-content">
            <h1>Discover and Host Live Events</h1>
            {/* <h3>Experience the thrill of live events, both online and in person</h3> */}
            <p>
              Whether you're a fan of live events or a host, you can discover and attend exciting events or host your own through DevSphere.
            </p>
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
      <div className="features">
        <div className="inspiration">
          <h1>Give Your Attendees an Unforgettable Experience</h1>
          <p>With DevSphere, you can provide your attendees with a seamless and memorable experience.</p>

          <div className="btns">
            <Link to="/signup">Get Started</Link>
            <Link to="/login">Contact Us</Link>
          </div>
        </div>

        <div className="social-eng">
          <img src={Icon1} alt="Social Engagement" />
          <h2>Social Engagement</h2>
          <p>
            Engage and connect with your audience through our powerful social engagement features.
          </p>
        </div>

        <div className="eventManagement">
          <img src={Icon2} alt="Event Management" />
          <h2>Event Management</h2>
          <p>Effortlessly manage your events with our intuitive event management tools.</p>
        </div>

        <div className="ticketScanning">
          <img src={Icon3} alt="Ticket Scanning" />
          <h2>Ticket Scanning</h2>
          <p>Streamline the ticket scanning process with our user-friendly ticket scanning tools.</p>
        </div>

        <div className="securePayment">
          <img src={Icon1} alt="Secure Payment" />
          <h2>Secure Payment</h2>
          <p>Ensure secure and hassle-free payments with our robust payment system.</p>
        </div>
      </div>
      <div className="joinCommunity">
        <h2>Join Our Community in Three Easy Steps</h2>
        <div className="membership-steps">
          <div>
             <h1>01</h1>
            <h2>Sign Up</h2>
            <p>Create your account and become a part of our vibrant community.</p>
          </div>
          <div>
          <h1>02</h1>
            <h2>Schedule Your Event</h2>
            <p>
              Choose between hosting an online stream or an in-person event. Provide all the necessary details, including date, time, location, and event description.
            </p>
          </div>
          <div>
           <h1>03</h1>
            <h2>Start Earning</h2>
            <p>
              Once your event is live and tickets are sold, watch your revenue grow. We handle the transactions, so you can focus on delivering an unforgettable experience.
            </p>
          </div>
        </div>
      </div>

      {/* <UpcomingStreams/> */}
      <CreateStream />
      <TopStreamers />
      <TopStreams />
      <Footer />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background: linear-gradient(to bottom, #00000079, #1f1f1f);
  overflow: hidden;

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 70vw;
    margin: 5rem auto;
    
    @media screen and (max-width: 800px){
        grid-template-columns: 1fr;
        width: 90%;
    }

    > div {
      background: linear-gradient(45deg, #970505, #59033f);
      padding: 2rem;
      color: #fff;

      img {
        width: 100px;
        margin: 0 auto;
      }
    }

    > div:nth-child(1) {
      grid-column: span 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
      @media screen and (max-width: 800px){
            grid-column: span 1;
      }

      > * {
        margin: 0;
      }

      h1 {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 1rem;
        
        @media screen and (max-width: 800px){
            font-size: 1rem;
        }
      }

      .btns {
        display: flex;
        align-items: center;
        gap: 2rem;
        justify-self: end;
        margin-top: 1rem;

        a {
          background-color: #ffffff;
          padding: 10px 20px;
          text-decoration: none;
        }
      }
    }
  }

  .joinCommunity {
    color: #fff;
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    h1{
        position: absolute;
        top: 0rem;
        left: 0rem;
        font-size: 6rem;
        opacity: .09;
      
    }

    > h2 {
      font-size: 3rem;
      margin: 2rem 0;
      text-align: center;
      padding: 1rem;
      
        @media screen and (max-width: 800px) {
            font-size: 2rem;
        }
    }

    .membership-steps {
      display: grid;
      width: 70%;
      margin: auto;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      position: relative;
      
      @media screen and (max-width: 800px){
            grid-template-columns: 1fr;
            width: 90%;
        
      }

      > * {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #000000e4;
        padding: 3rem;
        color: #fff;
        position: relative;
        z-index: 12;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        gap: 1rem;
        border-top: 10px solid #970505;

        > * {
          margin: 0em;
        }

        p {
          text-align: center;
          font-size: 0.9rem;
          color: #a49d9d;
        }
      }
    }
  }
`;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #000000e4, #0000005e), url(${BgImage});
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    /* min-height: 100vh; */
    width: 80%;
    gap: 2rem;
    margin: 5rem auto;
    place-items: center;

    .hero-text-content {
      /* place-self: start; */
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      /* background-color: red; */

      h1 {
        font-size: 4rem;
        margin: 0;
        font-weight: 900;
        
        @media screen and (max-width: 800px){
            font-size: 2rem;
        }
      }

      h3 {
        font-size: 1.5rem;
        margin: 0;
        color: #a19e9e;
      }

      p {
        font-size: 1rem;
        margin: 10px 0;
        text-align: left;
        width: 90%;
      }

      button {
        padding: 10px 2rem;
        background: #7f2626;
        color: #fff;
        text-decoration: none;
        place-self: start;
        border-radius: 5px;
        margin-top: 2rem;
        transition: all 0.3s ease-in-out;
        border: none;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
          color: red;
          background-color: #fff;
        }
      }
    }

    img {
      width: 100%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
    }

    .images {
      position: relative;
      img:nth-child(1),
      img:nth-child(2),
      img:nth-child(3) {
        position: absolute;
        right: -10%;
        width: 60%;
        top: -15%;
        
        @media screen and (max-width: 800px){
            display: none;
        }
      }
      img:nth-child(2) {
        left: -30%;
        top: -20%;
        width: 40%;
        display: grid;
        
        @media screen and (max-width: 800px){
            display: none;
        }
      }
      img:nth-child(3) {
        left: -5%;
        top: 40%;
        width: 40%;
        display: grid;
        
        @media screen and (max-width: 800px){
          display: none;
        }
      }
    }
  }

  .navbar {
    display: flex;
    justify-content: space-around;
    color: #fff;
    align-items: center;
    padding: 10px 0;

    a {
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
    }
  }
`;
