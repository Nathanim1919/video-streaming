import React from "react";
import styled from "styled-components";
import { requestHandler } from "../utils";
import { IoMdClose } from "react-icons/io";
import { addGuest } from "../api/event";
import { addStreamGuest } from "../api/stream";
import { IEvent } from "../interfaces/event";


interface AddGuestsProps {
  placeHolders: {
    name: string;
    profession: string;
  };
  title: string;
  eventId: string;
  setIntiateAddGuest: (value: boolean) => void;
  isOnline: boolean
  event:IEvent
}

export const AddGuests: React.FC<AddGuestsProps> = ({
  placeHolders,
  title,
  setIntiateAddGuest,
  eventId,
  isOnline,
  event
}) => {
  const [name, setName] = React.useState("");
  const [profession, setProfession] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(false);

    const addGuestHandler = async () => {
      const endPoint = isOnline?addStreamGuest:addGuest;
      await requestHandler(
          async () => await endPoint(eventId, { name, profession }),
          null,
          (res) => {
              event.guests?.push({ name, profession });
              alert(res.message);
              setIntiateAddGuest(false)
              
          },
          (error) => {
              alert(error);
          }
      )
    };
  return (
    <Container>
      <div className="content">
        <div className="close" onClick={() => setIntiateAddGuest(false)}>
          <IoMdClose />
        </div>
        <h1>{`Add ${title}`}</h1>
        <form action="">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={`Enter ${placeHolders.name}`}
          />
          <input
            onChange={(e) => setProfession(e.target.value)}
            type="text"
            placeholder={`Enter ${placeHolders.profession}`}
          />
          <button type="button" onClick={() =>addGuestHandler()}>Add</button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0000003f;
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;
  z-index: 100;

  .content {
    background-color: #1a1a1a;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px #0000001c;
    position: relative;
    animation: animate 0.3s ease;

    @keyframes animate {
      from {
        transform: translateY(-10%);
      }
      to {
        transform: translateY(0%);
      }
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem;
      cursor: pointer;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        padding: 0.5rem;
        border-radius: 5px;
        border: none;
        background-color: #0000001c;
        color: #fff;
      }

      button {
        padding: 0.5rem;
        border-radius: 5px;
        border: none;
        background-color: #9b4141;
        color: #fff;
        cursor: pointer;
      }
    }
  }
`;
