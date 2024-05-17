import { Streamer } from "../pages/StreamerPage";
import ProfilePic from '/image/join.jpg';
import styled from "styled-components";
import { MdEmojiEvents } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ImSpinner9 } from "react-icons/im";
import useFollow from "../customeHook/useFollow";





type StreamerListProps = {
    streamer: Streamer,
    key: string
}

const StreamerList: React.FC<StreamerListProps> = ({streamer}) => {
    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(() => streamer.followers.includes(user?._id));

    const handleFollowClick = useFollow(streamer._id, isFollow, setIsFollow, setIsLoading);


    return (
        <Card>
            <div className="header">
                <div className="profilePic">
                    <img src={ProfilePic} alt="profile-pic"/>
                </div>
                <div className="streamerInfo">
                    <h4>{streamer.email}</h4>
                    <p>{streamer.profession}</p>
                </div>
            </div>
            <div className="info">
                <p><RiUserFollowLine/>{streamer.followers.length} followers</p>
                <p><MdEmojiEvents/>Rating: 4.5</p>
            </div>
            <div className="buttons">
                <Link 
                    onClick={handleFollowClick}
                    to={'/follow'} className="rsvp">{isLoading? <span className="spinner"><ImSpinner9/></span>:<RiUserFollowLine/>}{!isFollow?"Follow":"following"}</Link>
                <Link to={'/streamers/23'}className="details"><CgProfile/>View Profile</Link>
            </div>
        </Card>
    );
}

export default StreamerList;


const Card = styled.div`
    background: linear-gradient(45deg, #060c28, #000000d1);
    display: flex;
    flex-direction: column;
    position: relative;
    padding:1rem;
    border-radius: 10px;
    margin-top: .3rem;
    max-height: 50%;


    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        position: relative;
        top: -3rem;

        .profilePic{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #ffffff;
            

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .streamerInfo{
            display: flex;
            flex-direction: column;
            align-items: center;    
            h4{
                font-size: 1.2rem;
                margin: 0;
            }

            p{
                font-size: .9rem;
                margin: 0;
                color: #7c7676;
            }
        }
    }   

    .info{
        display: flex;
        gap: 1rem;
        padding: 1rem;

        p{
            font-size: 1rem;
            color: rgb(124, 120, 120);
            margin: 0;
            font-weight: 100;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    }

    .buttons{
        display: flex;
        gap: 1rem;
        padding: 1rem;
        position: relative;

        a{
            font-family: inherit;
            padding: 10px 20px;
            background: #ffffff;
            color: #333;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: .5rem;

            transition: all 0.3s ease-in-out;

            &:hover{
                opacity:.8;
            }
            
        }

        a > .spinner{
                >*:nth-child(1){
                  animation: spin 1s linear infinite;
                }

                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              }

        .rsvp{
            background: #007bff;
            color: #fff;
        }
    }
`