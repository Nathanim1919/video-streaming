import { Link } from "react-router-dom";
import styled from "styled-components";

export const CreateStream = () => {
    return (
        <Container>
            <h1>Schedule Your Own Stream</h1>
            <p>Click the button below to schedule your own Very first stream and get to know your fans!</p>
            <Link to={'/create-stream'}>Schedule Stream</Link>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
    background: linear-gradient(to right, #f32e1c, rgba(0, 0, 0, 0.8));
    width: 80%;
    margin: auto;
    margin-bottom: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;



    h1{
        color: #fff;
        font-size: 4rem;
        margin: 0;
    }
    p{
        color: #fff;
        font-size: 1.4rem;
        text-align: center;
        margin: 0;
    }
    a{
        text-decoration: none;
        color: red;
        background-color: #fff;
        padding: .5rem 1rem;
        border-radius: 5px;
        margin: 0;
    }
`