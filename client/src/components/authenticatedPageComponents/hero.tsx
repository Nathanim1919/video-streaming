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
                {/*<Link to={'/streames/live'}>Who is Live Now? </Link>*/}
            </div>
            <Link to="/subscription">Upgrade Account</Link>
        </Conatiner>
    );
}

const Conatiner = styled.div`
    background: linear-gradient(to right, #1ca7f3, #0835b3);
    color: white;
    padding:5rem 2rem;
    display: flex;
    flex-direction: column;


    >div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        h1{
            font-size: 3rem;
            margin: 0rem;

            @media (max-width: 768px){
                font-size: 2rem;
            }
        }

        p {
            font-size: 1.5rem;
            margin: 0rem;
            text-align: center;
        }
    }






    @media (max-width: 768px){
        align-items: center;


        a{
            margin-top: 1rem;
        }
    }


    a{
        padding: .5rem 1rem;
        background-color: #0835b3;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1.2rem;
        align-self: center;
    }
`
