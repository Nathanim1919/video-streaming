import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";



export const Header = () => {
    const {logout, user} = useAuth()
    const [showOptions, setShowOptions] = React.useState(false);
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
            <Link to={'/me'}>Eventify.</Link>
            <div>
              <ul>
                <li><Link to="/me">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/streames">Streams</Link></li>
                <li><Link to="/streamers">Streamers</Link></li>
                <li><Link to="/orgs">Organizations</Link></li>
            </ul>
                <li><FaSearch/></li>
                <div className="account">
                    <li onClick={()=>setShowOptions(!showOptions)}><MdAccountCircle/></li>
                   {showOptions && <div className="options">
                        <li><Link onClick={() => setShowOptions(false)} to={`/streamers/${user?._id}`}>Profile</Link></li>
                        <li><Link onClick={() => setShowOptions(false)} to="/account">Account</Link></li>
                        <li><Link onClick={() => setShowOptions(false)} to="/subscription">Subscription</Link></li>
                        <li><Link onClick={() => setShowOptions(false)} to="/my-rvsps">My Rvsps</Link></li>
                        <li onClick={handleLogout}>Logout</li>
                    </div>}
                </div>
        </div>
        </Conatiner>
    );
}

const Conatiner = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 1rem 2rem; */
    background-color: #212020;
    color: #958f8f;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 5px solid rgb(111, 31, 31);
    padding: .5rem 0;


    >a{
        text-decoration: none;
        color: #9c9595;
        font-size: 2rem;
        font-weight: bold;
    }

    li{
        cursor: pointer;
    }

    >div{
        display: flex;
        align-items: center;
        gap: 1rem;
        

        >li{
            text-decoration: none;
            color: #9c9595;
            list-style: none;
            font-size: 1.5rem;
            cursor: pointer;
        }

        >div{
            li{
                font-size: 2rem;
                list-style: none;
            }


            .options{
                /* display: none; */
                position: absolute;
                background-color: #212020;
                color: #9c9595;
                border-bottom: 3px solid #7c1818;
                border-top: 3px solid #7c1818;
                /* border-radius: 5px; */
                top: 4rem;
                right: 3rem;
                z-index: 100;
                animation: flipUp .5s;
                box-shadow: 0 20px 30px rgba(0,0,0,0.4);

                @keyframes flipUp {
                    from {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    } 
                }
                li{
                    padding:.4rem 1rem;
                    width: 10rem;
                    text-align: center;
                    font-size: 1rem;
                    cursor: pointer;
                    text-align: left;
                    &:hover{
                        background-color: #111010;
                    }

                    a{
                        text-decoration: none;
                        color: #9c9595;
                    }
                }
            }
        }
    
    }
    ul {
        display: flex;
        list-style: none;
        li {
            margin-right: 1rem;
            list-style: none;
            a {
                text-decoration: none;
                color: #9c9595;
            }
        }
    }
`