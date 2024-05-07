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
    background: linear-gradient(to right, #f32e1c, rgba(0, 0, 0, 1));
    width: 50%;
    margin: auto;
    margin: 2rem auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
    box-shadow: 0 10px 30px rgba(0, 0, 0, .15);
    border-radius: 10px;



    h1{
        color: #fff;
        font-size: 2rem;
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