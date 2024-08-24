import { Link } from "react-router-dom";
import styled from "styled-components";

export const CreateStream = () => {
    return (
        <Container>
            <h1>Have an Event Idea?<br/> Schedule Your Own Stream</h1>
            <p>Click the button below to schedule your first stream and engage with your audience!</p>
            <Link to={'/create-stream'}>Schedule Your Stream</Link>
        </Container>

)
    ;
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    //background: linear-gradient(to right, #f32e1c, rgba(0, 0, 0, 1));
    width: 50%;
    margin: 2rem auto;
    padding: 5rem 2rem;
    position: relative;
    z-index: 10;
    //box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
    border-radius: 10px;


    @media (max-width: 768px) {
        width: 80%;
    }


    h1 {
        color: #fff;
        font-size: 3rem;
        margin: 0;

        @media (max-width: 768px) {
            font-size: 2rem;
        }
    }

    p {
        color: #fff;
        font-size: 1.4rem;
        text-align: center;
        margin: 0;
    }

    a {
        text-decoration: none;
        color: red;
        background-color: #fff;
        padding: .5rem 1rem;
        border-radius: 5px;
        margin: 0;
    }
`
