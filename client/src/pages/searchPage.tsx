import React, { ChangeEvent } from "react";
import styled from "styled-components";
import PlaceHolderImage from "../assets/react.svg";
import { searchApi } from "../api";
import { requestHandler } from "../utils";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

// the searchResult type, it will be an array of arrqy of objects
interface searchResult {
  events?: Array<object>;
  streamers?: Array<object>;
  organisations?: Array<object>;
  streames?: Array<object>;
}

interface searchPageProps {
    setIntiateSearch: (value: boolean) => void;
}

export const SearchPage: React.FC = ({setIntiateSearch}) => {
  const [searchResults, setSearchResults] = React.useState<searchResult>({
    events: [],
    streamers: [],
    organisations: [],
    streames: [],
  });
  const [displayAll, setDisplayAll] = React.useState(true);
  const [displayEvents, setDisplayEvents] = React.useState(false);
  const [displayStreamers, setDisplayStreamers] = React.useState(false);
  const [displayOrganisations, setDisplayOrganisations] = React.useState(false);
  const [displayStreames, setDisplayStreames] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
    <SearchConaier>
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
              setDisplayAll(false);
              setDisplayEvents(true);
            }}
          >
            Events
          </button>
          <button
            onClick={() => {
              setDisplayAll(false);
              setDisplayStreamers(true);
            }}
          >
            Peoples
          </button>
          <button
            onClick={() => {
              setDisplayAll(false);
              setDisplayOrganisations(true);
            }}
          >
            Organisations
          </button>
          <button
            onClick={() => {
              setDisplayAll(false);
              setDisplayOrganisations(true);
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
              <h3>Events</h3>
              {searchResults.events?.length === 0 && <p>No events found</p>}
              {searchResults.events?.map((event: any) => (
                <div className="event">
                  <div className="coverImage">
                    <img src={PlaceHolderImage} alt="" />
                  </div>
                  <div className="info">
                    <h4>{event.title}</h4>
                    <p>{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="events">
              <h3>Streames</h3>
              {searchResults.streames?.length === 0 && <p>No streames found</p>}
              {searchResults.streames?.map((stream: any) => (
                <div className="event">
                  <div className="coverImage">
                    <img src={PlaceHolderImage} alt="" />
                  </div>
                  <div className="info">
                    <h4>{stream.title}</h4>
                    <p>{stream.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="user">
              <h3>Peoples</h3>
              {searchResults.streamers?.length === 0 && (
                <p>No streamers found</p>
              )}
              {searchResults.streamers?.map((streamer: any) => (
                <Link onClick={()=>setIntiateSearch(false)} to={`/streamers/${streamer._id}`} className="stream">
                  <div className="coverImage">
                    <img src={PlaceHolderImage} alt="" />
                  </div>
                  <div className="info">
                    <h4>{streamer.fullName}</h4>
                    <p>{streamer.username}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="orgs">
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
            </div>
          </div>
        )}
      </div>
    </SearchConaier>
  );
};

const SearchConaier = styled.div`
  width: 70vw;
  max-height: 90vh;
  overflow: hidden;
  overflow-y: auto;
  position: fixed;
  top: 4rem;
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

        .event,
        .stream,
        .organisation,
        .user {
          background-color: #2a1313;
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: 10px;
          cursor: pointer;

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
              font-size: 1.2rem;
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
