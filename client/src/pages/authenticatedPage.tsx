import { Hero } from "../components/authenticatedPageComponents/hero";
import styled from "styled-components";
import { UpcomingStreams } from "../components/authenticatedPageComponents/upcomingStreams";
import { TopStreamers } from "../components/authenticatedPageComponents/topTreamers";
import { CreateStream } from "../components/authenticatedPageComponents/createStreamCall";
import { TopStreams } from "../components/authenticatedPageComponents/TopStreames";
import Footer from "../components/authenticatedPageComponents/footer";

const AuthenticatedPage = () => {
    return (
        <Conatiner>
            <Hero/>
            <UpcomingStreams/>
            <CreateStream/>
            <TopStreamers/>
            <TopStreams/>
            <Footer/>
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