import { Streamer } from "../pages/StreamerPage";
import ProfilePic from '/image/join.jpg';
import styled from "styled-components";
import { MdEmojiEvents } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";





type StreamerListProps = {
    streamer: Streamer,
    key: string
}

const StreamerList: React.FC<StreamerListProps> = ({streamer}) => {
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
                <p><RiUserFollowLine/>100 followers</p>
                <p><MdEmojiEvents/>Rating: 4.5</p>
            </div>

            <div className="buttons">
                <button className="rsvp"><RiUserFollowLine/>Follow</button>
                <button className="details"><CgProfile/>View Profile</button>
            </div>
        </Card>
    );
}

export default StreamerList;


const Card = styled.div`
    background-color: #363535a6;
    display: flex;
    flex-direction: column;
    position: relative;
    padding:1rem;
    border-radius: 10px;
    margin-top: 2rem;


    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        position: relative;
        top: -3rem;

        .profilePic{
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            border: 10px solid #000;
            

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .streamerInfo{
            h4{
                font-size: 1.2rem;
                margin: 0;
            }

            p{
                font-size: .9rem;
                margin: 0;
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

        button{
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

        .rsvp{
            background: #007bff;
            color: #fff;
        }
    }
`