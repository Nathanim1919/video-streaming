import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiMenu4Line } from "react-icons/ri";
import { SearchPage } from "../../pages/searchPage";
import { IoMdNotifications } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";




// Header component
export const Header = () => {
  const { logout, user } = useAuth();
  const [showOptions, setShowOptions] = React.useState(false);
  const [showNavBar, setShowNavBar] = React.useState(false);
  const [intiateSearch, setIntiateSearch] = React.useState(false);

  // handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  // return the header component
  return (
    <Conatiner showNavBar={showNavBar} className="header">
      <Link to={"/me"}>Eventify.</Link>
      <div>
        <ul className="navLinks">
          <li className="closeIcon" onClick={() => setShowNavBar(false)}>
            <IoMdClose />
          </li>
          <li onClick={() => {setShowOptions(false); setShowNavBar(false)}}>
            <Link to="/me">Home</Link>
          </li>
          <li onClick={() => {setShowOptions(false); setShowNavBar(false)}}>
            <Link to="/events">Events</Link>
          </li>
          <li onClick={() => {setShowOptions(false); setShowNavBar(false)}}>
            <Link to="/streames">Streams</Link>
          </li>
          <li onClick={() => {setShowOptions(false); setShowNavBar(false)}}>
            <Link to="/streamers">Streamers</Link>
          </li>
          <li onClick={() => {setShowOptions(false); setShowNavBar(false)}}>
            <Link to="/orgs">Organizations</Link>
          </li>
        </ul>
        <li onClick={() => setIntiateSearch(true)}>
          <FaSearch />
        </li>
        <li className="menuIcon" onClick={() => setShowNavBar(true)}>
          <RiMenu4Line />
        </li>
        <div className="account">
          <li onClick={() => setShowOptions(!showOptions)}>
            <MdAccountCircle />
          </li>
          {showOptions && (
            <div className="options">
              <li>
                <Link
                  onClick={() => setShowOptions(false)}
                  to={`/streamers/${user?._id}`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowOptions(false)} to="/account">
                  Account
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowOptions(false)} to="/subscription">
                  Subscription
                </Link>
              </li>
              <li>
                <Link onClick={() => setShowOptions(false)} to="/my-rvsps">
                  My Rvsps
                </Link>
              </li>
              <li onClick={handleLogout}>Logout</li>
            </div>
          )}
        </div>
        <div className="notification">
          <IoMdNotifications/>
        </div>
        <Link to={'/bookmarks'} className="bookmarks">
          <FaBookmark/>
        </Link>
      </div>
      {intiateSearch && (
        <SearchPage setIntiateSearch={setIntiateSearch}/>
      )}
    </Conatiner>
  );
};

// Styled components for the header component
interface ContainerProps {
    showNavBar: boolean;
}
const Conatiner = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #212020;
  color: #958f8f;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* position: sticky; */
  top: 0rem;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 5px solid rgb(111, 31, 31);
  padding: 1rem 0;
  width: 100vw;

  > a {
    text-decoration: none;
    color: #9c9595;
    font-size: 2rem;
    font-weight: bold;
  }


  li {
    cursor: pointer;
  }


  li.closeIcon {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      top: 1rem;
      right: 1rem;
     
    }
  }

    li.menuIcon {
        display: none;
        @media screen and (max-width: 768px) {
            display: block;
            font-size: 2rem;
        }
    }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    .navLinks {
      @media screen and (max-width: 768px) {
        flex-direction: column;
        width: 100vw;
        overflow: hidden;
        height: 70vh;
        position: absolute;
        top: -10%;
        right: 0;
        left: 0;
        background-color: #000000d5;
        backdrop-filter: blur(35px);
        display: flex;
        align-items: center;
        text-align: left;
        justify-content: center;
        transform: ${({showNavBar}) => showNavBar ? 'translateY(0)' : 'translateY(-100%)'};
        transition: transform 0.5s ease-in-out;
         li {
          font-size: 1.5rem;
          margin: 1rem 0;
        }
      }
    }

    > li {
      text-decoration: none;
      color: #9c9595;
      list-style: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    > div {
      li {
        font-size: 2rem;
        list-style: none;
      }

      div.options {
        display: flex;
        width: 200px;
        flex-direction: column;
        position: absolute;
        background-color: #212020;
        color: #9c9595;
        border-bottom: 3px solid #7c1818;
        border-top: 3px solid #7c1818;
        /* border-radius: 5px; */
        top: 4rem;
        right: 3rem;
        z-index: 100;
        animation: flipUp 0.5s;
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);

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
        li {
          padding: 0.4rem 1rem;
          width: 10rem;
          text-align: center;
          font-size: 1rem;
          cursor: pointer;
          text-align: left;
          &:hover {
            background-color: #111010;
          }

          a {
            text-decoration: none;
            color: #9c9595;
          }
        }
      }
    }

    .notification, .bookmarks{
      font-size: 1.8rem;
      cursor: pointer;
      display: grid;
      place-items: center;


      &:hover{
        color: orange;
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
`;
