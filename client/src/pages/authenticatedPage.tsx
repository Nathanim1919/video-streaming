import { Header } from "../components/authenticatedPageComponents/header";
import { Hero } from "../components/authenticatedPageComponents/hero";
import styled from "styled-components";
import { UpcomingStreams } from "../components/authenticatedPageComponents/upcomingStreams";
import { TopStreamers } from "../components/authenticatedPageComponents/topTreamers";
const AuthenticatedPage = () => {
    return (
        <Conatiner>
            <Header/>
            <Hero/>
            <UpcomingStreams/>
            <TopStreamers/>
        </Conatiner>
    );
}

export default AuthenticatedPage;


const Conatiner = styled.div`
    background-color: #252424;
    min-height: 100vh;
    /* padding: 2rem; */
    display: flex;
    flex-direction: column;
`