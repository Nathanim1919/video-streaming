import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';


export const Header = () => {
    const {logout} = useAuth()
    const handleLogout = async () => {
        try {
            await logout();
            // window.location.href = "/login";
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Conatiner className="header">
            <h1>DevSphere</h1>
            <ul>
                <li><Link to="/streames">Streames</Link></li>
                <li><Link to="/streamers">Streamers</Link></li>
                <li><Link to="/Account">Account</Link></li>
                <li><Link to={'/login'} onClick={handleLogout}>Logout</Link></li>
            </ul>
        </Conatiner>
    );
}

const Conatiner = styled.div`
    background-color: #000000d1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0rem 2rem;
    position: sticky;
    top: 0;
    z-index: 1000;

    h1{
        color: #fff;
    }

    ul{
        display: flex;
        gap: 1rem;
    }

    li{
        list-style: none;
        
        a{
            text-decoration: none;
            color: #fff;
        }

    }
    li:nth-child(3) a, li:nth-child(4) a{
        background-color: #ff0000;
        padding: .5rem 1rem;
        border-radius: 5px;
    }
`