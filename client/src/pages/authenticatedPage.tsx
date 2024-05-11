import { Header } from "../components/authenticatedPageComponents/header";
import { Hero } from "../components/authenticatedPageComponents/hero";
import styled from "styled-components";
import { UpcomingStreams } from "../components/authenticatedPageComponents/upcomingStreams";
import { TopStreamers } from "../components/authenticatedPageComponents/topTreamers";
import { CreateStream } from "../components/authenticatedPageComponents/createStreamCall";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TopStreams } from "../components/authenticatedPageComponents/TopStreames";
const AuthenticatedPage = () => {
    const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('accessToken');
    const refreshToken = query.get('refreshToken');

    console.log(accessToken, refreshToken);

    if (accessToken && refreshToken) {
      // Store the tokens in cookies or local storage
      document.cookie = `accessToken=${accessToken}; path=/`;
      document.cookie = `refreshToken=${refreshToken}; path=/`;
    }
  }, [location]);
    return (
        <Conatiner>
            <Header/>
            <Hero/>
            <UpcomingStreams/>
            <CreateStream/>
            <TopStreamers/>
            <TopStreams/>
        </Conatiner>
    );
}

export default AuthenticatedPage;


const Conatiner = styled.div`
    background-color: #191919;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    
`