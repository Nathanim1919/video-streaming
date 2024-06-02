// evnts which are live now

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


// Components for the list of live events which are currently live
export const LiveNow: React.FC = () => {
  return (
    <Container>
      <h1>Live Now</h1>
      <div className="live-now">
        <div className="live-event">
          <img src="https://via.placeholder.com/150" alt="event" />
          <h3>Event Name</h3>
          <p>Event Description</p>
          <Link to="/event">View Event</Link>
        </div>
        <div className="live-event">
          <img src="https://via.placeholder.com/150" alt="event" />
          <h3>Event Name</h3>
          <p>Event Description</p>
          <Link to="/event">View Event</Link>
        </div>
        <div className="live-event">
          <img src="https://via.placeholder.com/150" alt="event" />
          <h3>Event Name</h3>
          <p>Event Description</p>
          <Link to="/event">View Event</Link>
        </div>
      </div>
    </Container>
  );
}


// Styled components for the live now component
const Container = styled.div`
  padding: 2rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .live-now {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    .live-event {
      background-color: #f9f9f9;
      padding: 1rem;
      border-radius: 5px;
      img {
        width: 100%;
        border-radius: 5px;
        margin-bottom: 1rem;
      }
      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 1rem;
        margin-bottom: 1rem;
      }
      a {
        display: block;
        text-align: center;
        background-color: #f9a826;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
        text-decoration: none;
      }
    }
  }
`;
