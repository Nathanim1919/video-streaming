import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { requestHandler } from "../../utils";
import { authApi } from "../../api";
import Loader from "../Loader";
import { UserInterface } from "../../interfaces/user";

export const TopStreamers = () => {
  const [streamers, setStreamers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all streamers
  useEffect(() => {
    (async () => {
      await requestHandler(
        async () => await authApi.fetchStreamers(),
        setIsLoading,
        (response) => {
          setStreamers(response.data as UserInterface[]);
        },
        (error) => {
          console.log(error);
        }
      );
    })();
  }, []);

  const { isAuthenticated } = useAuth();
  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <div className="header">
        <h1>Get to know The Top Streamers around the globe</h1>
      </div>
      <div className="streamerList">
        {streamers.map((streamer, index) => {
          return (
            <Link to={`/streamers/${streamer._id}`} key={index} className="streamer">
              <div className="profile">
                <div className="profilePic">
                  <img src={streamer.profilePicture.url} alt="profile" />
                </div>
                <div className="info">
                  <h3>{streamer.fullName}</h3>
                  <p>{streamer.profession}</p>
                </div>
              </div>
              <div className="bio">
                <p>
                  {streamer?.bio?.length > 100
                    ? streamer?.bio?.slice(0, 100) + "..."
                    : streamer?.bio}
                </p>
                <div className="social-link">
                  <Link to={"/facebook"}>
                    <FaFacebook size={20} color="#eee" />
                  </Link>
                  <Link to={"/twitter"}>
                    <FaTwitter size={20} color="#eee" />
                  </Link>
                  <Link to={"/instagram"}>
                    <FaInstagram size={20} color="#eee" />
                  </Link>
                  <Link to={"/linkedin"}>
                    <FaLinkedin size={20} color="#eee" />
                  </Link>
                </div>
              </div>
              <div className="btn">
                <button>
                  <RiUserFollowLine />
                  follow
                </button>
                <p>{streamer.followers.length} followers</p>
              </div>

            </Link>
          );
        })}
      </div>
      <Link to={isAuthenticated() ? "/streamers" : "/login"}>Browse All</Link>
    </Container>
  );
};

const Container = styled.div`
    background: linear-gradient(to right, #2e2e83 10%, rgba(0, 0, 0, 0.8));
    padding: 3rem 1rem;
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;


    > a {
        color: #333;
        text-decoration: none;
        align-self: center;
        background-color: #fff;
        padding: 0.5rem 1rem;

        &:hover {
            color: #524f4f;
        }
    }


    .header {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .streamerList {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;

        a.streamer {
            display: flex;
            flex-direction: column;
            max-width: 300px;
            width: 100%;
            background-color: rgba(25, 25, 26, 0.63);
            color: #fff;
            text-decoration: none;
            padding: 1rem;
            border-radius: 10px;
            cursor: pointer;
            backdrop-filter: blur(10px);
            border: 1px solid #032b45;

            &:hover {
                /* border: 1px solid #0670fa; */
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
            }

            .profile {
                display: flex;
                align-items: center;
                gap: 1rem;

                .profilePic {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 3px solid #ffffff;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .info {
                    display: flex;
                    flex-direction: column;

                    h3 {
                        font-size: 1rem;
                        margin: 0;
                    }

                    p {
                        font-size: 0.7rem;
                        margin: 0;
                        color: #ddd;
                    }
                }
            }

            .bio {
                p {
                    font-size: 0.9rem;
                    margin: 1rem 0;
                    color: #d8d2d2;
                    font-weight: 500;
                }

                .social-link {
                    display: flex;
                    gap: 1rem;

                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }

            .btn {
                display: flex;
                align-items: end;
                justify-content: space-between;

                button {
                    margin-top: 1rem;
                    background-color: #0670fa;
                    color: #ffffff;
                    padding: 0.4rem 1rem;
                    border: none;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;

                    &:hover {
                        background-color: #ddd;
                        color: #000;
                    }
                }

                p {
                    font-size: 0.8rem;
                    margin: 0;
                    color: #a09b9b;
                }
            }
        }
    }
`;
