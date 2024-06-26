import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";


export const Hero = () => {

    const {user} = useAuth()
    return (
        <Conatiner className="hero">
            <div>
                <h1>Welcome, {user?.fullName}</h1>
                <p>Get access to all the features by upgrading your account</p>
                <Link to={'/streames/live'}>Who is Live Now? </Link>
            </div>
            <Link to="/subscription">Upgrade Account</Link>
        </Conatiner>
    );
}

const Conatiner = styled.div`
    background: linear-gradient(to right, #1ca7f3, #0835b3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:5rem 0;
    width: 100%;
    margin: 2rem auto;
    /* border-radius: 10px; */


    >*{
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        button:nth-child(3){
            margin-top: 2rem;
        }

        >*{
            margin: 0;
        }
    }

    h1{
        color: #fff;
    }

    p{
        color: #fff;
    }

    a, button{
        background-color: #ffffff;
        padding: .6rem 1rem;
        border-radius: 5px;
        color: #333;
        border: none;
        cursor: pointer;
        font-family: inherit;
        border: none;
        text-decoration: none;
    }
`