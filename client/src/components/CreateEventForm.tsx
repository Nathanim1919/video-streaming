import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { eventApi, streamApi } from "../api";
import { IEvent } from "../interfaces/event";
import { requestHandler } from "../utils";
import { ImSpinner9 } from "react-icons/im";
import {Notifier} from "./Notifier.tsx";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Container = styled.div`
  position: fixed;
  z-index: 1000;
  overflow: hidden;
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #1716165e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  color: #fff;
  animation: animate 0.5s ease;


  @keyframes animate {
    from {
      transform: translateY(20%);
    }
    to {
      transform: translateY(0%);
    }
    
  }

  .header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    position: sticky;
    top: -3rem;
    background-color: red;
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.092);
    z-index: 1000;

    @media screen and (max-width: 800px) {
      width: 90%;
    }

    h4 {
      margin: 0;
    }

    svg {
      cursor: pointer;
    }
  }

  form {
    width: 50%;
    padding: 1rem 3rem;
    background-color: #232222;
    border-radius: 8px;
    height: 100vh;
    overflow: auto;
    position: relative;
    bottom: 0;

    @media screen and (max-width: 800px) {
      width: 70%;
    }

    .spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        margin-bottom: 0.5rem;
      }

      input,
      textarea,
      select {
        padding: 0.5rem;
        background-color: #2b2929;
        border: 1px solid #444;
        color: #fff;
        border-radius: 4px;
        outline: none;
      }

      textarea {
        resize: none;
        height: 100px;
      }
    }

    .datetimepicker {
      .MuiFormControl-root {
        width: 100%;
      }

      .MuiInputBase-root {
        background-color: #2b2929;
        color: #fff;
      }
    }

    .event-informations,
    .schedule-section,
    .social-links-section,
    .guest-list {
      margin-top: 1rem;

      .info-header,
      .schedule-header,
      .social-header,
      .guest-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        h3 {
          margin: 0;
        }

        .add-info,
        .add-schedule,
        .add-social,
        .add-guest {
          cursor: pointer;
        }
      }

      .info-card,
      .schedule-card,
      .social-card,
      .guest-card {
        background-color: #2b2929;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;

        .btns {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;

          button {
            background: linear-gradient(45deg, #ef9206, #8c0c0c);
            border: none;
            color: #fff;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            outline: none;

            &.delete {
              background: linear-gradient(45deg, #d9534f, #c9302c);
            }
          }
        }
      }
    }

    button[type="submit"] {
      background: linear-gradient(45deg, #ef9206, #8c0c0c);
      border: none;
      color: #fff;
      cursor: pointer;
      padding: 0.75rem 1.5rem;
      margin-top: 1rem;
      border-radius: 4px;
      width: 100%;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1.2rem;
    }
  }
`;


interface CreateEventFormProps {
  setCreateEvent: (value: boolean) => void;
  setEventEditMode: (value: boolean) => void;
  eventEditMode: boolean;
  selectedEvent?: IEvent | null;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({
  setCreateEvent,
  eventEditMode,
  setEventEditMode,
  selectedEvent,
}) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [successNotify, setSuccessNotify] = useState(false)
  const [errroNotify, setErrorNotify] = useState(false)
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<IEvent>({
    title: "",
    description: "",
    date: "",
    location: "",
    attendees: [],
    price: 0,
    rsvp: "",
    capacity: 100,
    eventType: "meetup",
    isOnline: false,
    isOpenForRsvp: "off",
    tags: [],
    duration: 0,
    specialInstructions: "",
  });



  const handleInputOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let adjustedValue: string | boolean = value;
    if (name === "isOnline") {
      adjustedValue = value === "true";
    }
    setEvent((prevState) => ({
      ...prevState,
      [name]: adjustedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiFunction = event.isOnline
      ? streamApi.createStream
      : eventApi.createEvent;
    await requestHandler(
      async () => apiFunction(event),
      setLoading,
      () => {
        setSuccessNotify(true)
        setTimeout(()=>{
          setCreateEvent(false);
        }, 2000)
      },
      () => {
        setErrorNotify(true)
      }
    );
  };


  return (
    <Container>
      {successNotify && <Notifier type={"success"} message={"Event Scheduled Successfully"}/>}
      {errroNotify && <Notifier type={"error"} message={"Failed Scheduling The Event"}/>}
      <div className="header">
        <h4>Create Event</h4>
        <FaTimes
          size={20}
          onClick={() => {
            setCreateEvent(false);
            setEventEditMode(false);
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={selectedEvent?.title || event.title}
            onChange={handleInputOnChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={selectedEvent?.description || event.description}
            onChange={handleInputOnChange}
            disabled={loading}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="rsvp">IsOnline Event</label>
          <select
            id="rsvp"
            name="isOnline"
            // value={selectedEvent?.isOnline || event.isOnline}
            onChange={handleInputOnChange}
            disabled={loading}
          >
            <option value="true">Yes, It is</option>
            <option value="false">No, It is not</option>
          </select>
        </div>
        {((eventEditMode && !selectedEvent?.isOnline) ||
          (!eventEditMode && !event.isOnline)) && (
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={selectedEvent?.location || event.location}
              onChange={handleInputOnChange}
              disabled={loading}
              placeholder="Enter map link or Exact Location."
            />
          </div>
        )}
        <div className="form-group datetimepicker">
          <label htmlFor="date">Date & Time</label>
          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  setEvent((prevState) => ({
                    ...prevState,
                    date: newValue?.format("YYYY-MM-DD") || "",
                    time: newValue?.format("HH:mm") || "",
                  }));
                }}
                // renderInput={(params) => <input {...params} />}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={selectedEvent?.price || event.price}
            onChange={handleInputOnChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={selectedEvent?.capacity || event.capacity}
            onChange={handleInputOnChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={selectedEvent?.eventType || event.eventType}
            onChange={handleInputOnChange}
            disabled={loading}
          >
            <option value="meetup">Meetup</option>
            <option value="webinar">Webinar</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
            <option value="hackathon">Hackathon</option>
            <option value="party">Party</option>
            <option value="other">Other</option>
          </select>
          </div>
          <div className="form-group">
          <label htmlFor="rsvp">RSVP</label>
          <select
            id="rsvp"
            name="rsvp"
            value={selectedEvent?.rsvp || event.rsvp}
            onChange={handleInputOnChange}
            disabled={loading}
          >
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={event.tags.join(", ")}
            onChange={(e) =>
              setEvent((prevState) => ({
                ...prevState,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              }))
            }
            placeholder="Comma-separated tags"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={
              selectedEvent?.specialInstructions || event.specialInstructions
            }
            onChange={handleInputOnChange}
            disabled={loading}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading && <ImSpinner9 className="spinner" />}
          {eventEditMode ? "Update" : "Create"}
        </button>
      </form>
    </Container>
  );
};
