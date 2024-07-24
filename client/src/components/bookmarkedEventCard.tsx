import { Link } from "react-router-dom";
import { IEventForBookMark } from "../interfaces/event";
import styled from "styled-components";

type ContainerProps = {
    event: IEventForBookMark;
    handleRemoveBookMark: (id: string) => void;
  };
  
export const BookMarkedEventCard: React.FC<ContainerProps> = ({
    event,
    handleRemoveBookMark,
  }) => {
    const onClickRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      e.preventDefault(); // Prevent default button action
      e.stopPropagation(); // Stop event from propagating to the Link
      handleRemoveBookMark(id);
    };
    return (
      <Container className="bookMarkedEventCard">
        <Link
          to={
            !event.item?.isOnline
              ? `/event/${event.item?._id}`
              : `/streames/${event.item?._id}`
          }
        >
          <div className="eventImage">
            <img src={event.item.image} alt="event" />
          </div>
          <div className="eventDetails">
            <h2>
              {event.item?.title}
              <span>{event?.type}</span>
            </h2>
            <p>{event.item?.description}</p>
            <p>{event.item?.date}</p>
            <p>{event.item?.time}</p>
          </div>
          <button
            onClick={(e) => onClickRemove(e, event.item._id!)}
          >
            remove
          </button>
        </Link>
      </Container>
    );
};

const Container = styled.div`
  a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #2b2828;
    color: #fff;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background 0.3s;
    border-left: 4px solid transparent;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem;
    }

    &:hover {
      background: #1c1c1c;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border-left: 4px solid #a72d2d;
    }

    .eventImage {
      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .eventDetails {
      width: 70%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
        display: flex;
        align-items: end;
        gap: 1rem;
        span {
          font-size: 1rem;
          font-weight: normal;
          color: #eee;
          background-color: #212020;
          padding: 0.2rem 0.5rem;
          border-radius: 5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          border: 1px solid #413f3f;
        }
      }
      p {
        font-size: 1rem;
        margin: 0;
        color: #706c6c;
      }
    }

    button {
      background: #a72d2d;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid transparent;
      font-family: inherit;

      &:hover {
        background: transparent;
        border: 1px solid #fff;
      }
    }
  }
`;
