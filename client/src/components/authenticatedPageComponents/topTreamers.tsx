import styled from "styled-components"
import coverImage from '/image/profile.jpg'
import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { requestHandler } from "../../utils";
import { fetchStreamers } from "../../api";
import Loader from "../Loader";

export const TopStreamers = () => {
    const [streamers, setStreamers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    // fetch all streamers
    useEffect(() => {
        (async () => {await requestHandler(
            async () => await fetchStreamers(),
            setIsLoading,
            (response) => {
                setStreamers(response.data);
            },
            (error) => {
                console.log(error);
            }
        )})();
    }, []);

    const {isAuthenticated} = useAuth();
    return (
        isLoading ? <Loader /> :
        <Container>
            <div className="header">
            <h1>Get to know The Top Streamers around the globe</h1>
            <Link to={isAuthenticated()?'/streamers':"/login"}>Browse All</Link>
            </div>
            <div className="streamerList">
                {
                    streamers.map((streamer, index) => {
                        return (
                            <div key={index} className="streamer">
                                <div className="profile">
                                    <div className='profilePic'>
                                        <img src={coverImage} alt="profile" />
                                    </div>
                                    <div className="info">
                                       <h3>{(streamer.fullName)}</h3>
                                        <p>{(streamer.profession)}</p>
                                    </div>
                                </div>
                                <div className="bio">
                                    <p>As a software engineer, I enjoy building high-quality software that solves real-world problems. When I'm not coding, you can find me sharing my development journey on Twitch, where I stream my code, answer questions, and collaborate with other developers. I'm passionate about helping others learn and grow in their careers, and I'm always looking for opportunities to do so.</p>
                                    <div className="social-link">
                                        <Link to={'/facebook'}><FaFacebook size={20} color='#eee' /></Link>
                                        <Link to={'/twitter'}><FaTwitter size={20} color='#eee' /></Link>
                                        <Link to={'/instagram'}><FaInstagram size={20} color='#eee' /></Link>
                                        <Link to={'/linkedin'}><FaLinkedin size={20} color='#eee' /></Link>
                                    </div>
                                </div>
                                <div className="btn">
                                    <button><RiUserFollowLine/>follow</button>
                                    <p>{streamer.followers.length} followers</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Container>
    )
}


const Container = styled.div`
    background: linear-gradient(to right, #2e2e83 10%, rgba(0, 0, 0, 0.8));
    padding: 10rem 1rem;
    color: #fff;
    position: relative;
    top: -8rem;

    .header{
        display: flex;
        justify-content: space-around;
        align-items: center;


        a{
            color: #fff;
            text-decoration: none;

            &:hover{
                color: #ddd;
            }
        }
    }

    .streamerList {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;


        .streamer{
            display: flex;
            flex-direction: column;
            max-width: 300px;
            /* background-color: #164481a1; */
            padding: 1rem;
            
            /* border-radius: 10px; */
            cursor: pointer;
            backdrop-filter: blur(10px);
            border: 1px solid #032b45;

            &:hover{
                /* border: 1px solid #0670fa; */
                box-shadow: 0 5px 10px rgba(0, 0, 0, .15);
            }

            .profile{
                display: flex;
                align-items: center;
                gap: 1rem;
                .profilePic{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid #ffffff;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                .info{
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    h3{
                        font-size: 1.5rem;
                        margin: 0;
                    }
                    p{
                        font-size: .8rem;
                        margin: 0;
                        color: #ddd;
                    }


                }
            }

            .bio{
                p{
                    font-size: .9rem;
                    margin: 1rem 0;
                    color: #d8d2d2;
                    font-weight: 500;

                }
                .social-link{
                    display: flex;
                    gap: 1rem;
                    a{
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }

            .btn{
                display: flex;
                align-items: end;
                justify-content: space-between;

                button{
                    margin-top: 1rem;
                    background-color: #0670fa;
                    color: #ffffff;
                    padding: .4rem 1rem;
                    border: none;
                    border-radius: 5px;
                    font-size: .8rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all .3s;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: .5rem;
                    &:hover{
                        background-color: #ddd;
                        color: #000;
                    }
                }

                p{
                    font-size: .8rem;
                    margin: 0;
                    color: #a09b9b;
                }
            }

        }
        
        }
`