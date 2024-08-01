import React, { ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import PlaceHolderImage from "../assets/react.svg";
import { searchApi } from "../api";
import { requestHandler } from "../utils";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { CiStreamOn } from "react-icons/ci";
import { MdEvent } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IEvent } from "../interfaces/event";
import { Streamer } from "./StreamerPage";

// the searchResult type, it will be an array of arrqy of objects
interface searchResult {
  events?: IEvent[];
  streamers?: Streamer[];
  organisations?: Array<object>;
  streames?: IEvent[];
}

interface searchPageProps {
  setIntiateSearch: (value: boolean) => void;
}

export const SearchPage: React.FC<searchPageProps> = ({ setIntiateSearch }) => {
  const [searchResults, setSearchResults] = React.useState<searchResult>({
    events: [],
    streamers: [],
    organisations: [],
    streames: [],
  });
  // const [displayAll, setDisplayAll] = React.useState(true);
  // const [displayEvents, setDisplayEvents] = React.useState(false);
  // const [displayStreamers, setDisplayStreamers] = React.useState(false);
  // const [displayOrganisations, setDisplayOrganisations] = React.useState(false);
  // const [displayStreames, setDisplayStreames] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIntiateSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIntiateSearch]);


  const handleSearch = async (query: string) => {
    await requestHandler(
      async () => await searchApi.search(query),
      setIsLoading,
      (response) => {
        setSearchResults(response.data as searchResult);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <SearchConaier ref={searchContainerRef}>
      <div className="searchInput">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          type="text"
          placeholder="Search for events, streamers, organisations"
        />
      </div>
      <div className="results">
        <div className="navigations">
          <button
            onClick={() => {
              // setDisplayAll(false);
              // setDisplayEvents(true);
            }}
          >
            Events
          </button>
          <button
            onClick={() => {
              // setDisplayAll(false);
              // setDisplayStreamers(true);
            }}
          >
            Peoples
          </button>
          <button
            onClick={() => {
              // setDisplayAll(false);
              // setDisplayOrganisations(true);
            }}
          >
            Organisations
          </button>
          <button
            onClick={() => {
              // setDisplayAll(false);
              // setDisplayOrganisations(true);
            }}
          >
            Streames
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="result">
            <div className="events">
              <h3>
                <MdEvent />
                Events
              </h3>
              {searchResults.events?.length === 0 && <p>No events found</p>}
              {searchResults.events?.map((event: IEvent) => (
                <Link
                  onClick={() => setIntiateSearch(false)}
                  to={`/events/${event._id}`}
                >
                  <div className="coverImage">
                    <img src={PlaceHolderImage} alt="" />
                  </div>
                  <div className="info">
                    <h4>{event.title}</h4>
                    <p>{event.date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="events">
              <h3>
                <CiStreamOn />
                Streames
              </h3>
              {searchResults.streames?.length === 0 && <p>No streames found</p>}
              {searchResults.streames?.map((stream: IEvent) => (
                <Link
                  onClick={() => setIntiateSearch(false)}
                  to={`/streames/${stream._id}`}
                  className="event"
                >
                  <div className="coverImage">
                    <img
                      src="https://www.istockphoto.com/photo/group-of-people-applauding-gm1496377580-519066036?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fevents%2F&utm_term=events"
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4>{stream.title}</h4>
                    <p>{stream.date}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="user">
              <h3>
                <FaRegUser />
                Peoples
              </h3>
              {searchResults.streamers?.length === 0 && (
                <p>No streamers found</p>
              )}
              {searchResults.streamers?.map((streamer: Streamer) => (
                <Link
                  onClick={() => setIntiateSearch(false)}
                  to={`/streamers/${streamer._id}`}
                  className="stream"
                >
                  <div className="coverImage">
                    <img src={streamer.profilePicture?.url} alt="" />
                  </div>
                  <div className="info">
                    <h4>{streamer.fullName}</h4>
                    <p>{streamer.username}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* <div className="orgs">
              <h3>Organisations</h3>
              {searchResults.organisations?.length === 0 && (
                <p>No organisations found</p>
              )}
              {searchResults.organisations?.map((organisation: any) => (
                <div className="organisation">
                  <div className="coverImage">
                    <img src={PlaceHolderImage} alt="" />
                  </div>
                  <div className="info">
                    <h4>{organisation.name}</h4>
                    <p>{organisation.email}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        )}
      </div>
    </SearchConaier>
  );
};

const SearchConaier = styled.div`
  width: 70vw;
  height: 99vh;
  overflow: hidden;
  overflow-y: auto;
  position: fixed;
  top: 1rem;
  background-color: #000;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 23px rgba(0, 0, 0, 0.3);
  animation: animate 0.5s ease;

  @keyframes animate {
    from {
      transform: translateY(-40px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .searchInput {
    width: 100%;
    position: sticky;
    top: 0;
    background-color: #000;
    border-bottom: 1px solid #353434;
    input {
      width: 100%;
      padding: 1rem;
      background-color: transparent;
      color: #fff;
      font-family: inherit;
      border: none;
      outline: none;
      font-size: 1rem;
    }
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;

    .navigations {
      border-bottom: 1px solid #501919;
      display: flex;
      width: 100%;
      gap: 1rem;
      padding: 1rem;
      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        background-color: transparent;
        color: #fff;
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.3s ease;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .result {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      > div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-bottom: 1px solid #501919;
        padding: 1rem;

       a {
          background-color: #2a1313;
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;

          &:hover {
            background-color: #501919;
          }
          /* background-color: #2a1313; */
          .coverImage {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .info {
            display: flex;
            flex-direction: column;
            h4 {
              color: #fff;
              font-size: 1rem;
              margin: 0;
            }
            p {
              color: #8d8a8a;
              font-size: 1rem;
              margin: 0;
            }
          }
        }
      }
    }
  }
`;
