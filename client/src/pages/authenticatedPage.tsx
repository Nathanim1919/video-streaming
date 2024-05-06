import { Header } from "../components/authenticatedPageComponents/header";
import { Hero } from "../components/authenticatedPageComponents/hero";
import styled from "styled-components";
import { UpcomingStreams } from "../components/authenticatedPageComponents/upcomingStreams";
import { TopStreamers } from "../components/authenticatedPageComponents/topTreamers";
import { CreateStream } from "../components/authenticatedPageComponents/createStreamCall";
const AuthenticatedPage = () => {
    return (
        <Conatiner>
            <Header/>
            <Hero/>
            <UpcomingStreams/>
            <CreateStream/>
            <TopStreamers/>
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