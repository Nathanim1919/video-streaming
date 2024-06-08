import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes, FaPlus } from 'react-icons/fa';
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { eventApi } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Event, ScheduleItem, SocialLink } from "../interfaces/event";
import { requestHandler } from "../utils";
import { ImSpinner9 } from "react-icons/im";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Container = styled.div`
  position: relative;
  width: 100vw;
  /* height: 100vh; */
  top: 0;
  left: 0;
  background-color: #171616;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  color: #fff;

  .header {
    width: 90%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 60%; */
    position: sticky;
    top: 10%;

    h4 {
      margin: 0;
    }

    svg {
      cursor: pointer;
    }
  }

  form {
    width: 60%;
    padding: 1rem 3rem;
    background-color: #232222;
    border-radius: 8px;

    .spinner{
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

      input, textarea, select {
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

    .event-informations, .schedule-section, .social-links-section, .guest-list {
      margin-top: 1rem;

      .info-header, .schedule-header, .social-header, .guest-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        h3 {
          margin: 0;
        }

        .add-info, .add-schedule, .add-social, .add-guest {
          cursor: pointer;
        }
      }

      .info-card, .schedule-card, .social-card, .guest-card {
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



const initialScheduleItem: ScheduleItem = {
  time: '',
  activity: ''
};

const initialSocialLink: SocialLink = {
  platform: '',
  url: ''
};

export const CreateEventForm = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const navigate = useNavigate();
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<Event>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: 0,
    capacity: 100,
    eventType: 'meetup',
    isOnline: true,
    isOpenForRsvp: 'off',
    tags: [],
    duration: 0,
    guests: [],
    specialInstructions: '',
    schedule: [initialScheduleItem],
    socialLinks: [initialSocialLink]
  });

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestHandler(
      async () => eventApi.createEvent(event),
      setLoading,
      () => navigate(`/streamers/${user._id}`),
      () => {}
    )
  };
  

  const createScheduleItem = () => {
    const lastScheduleItem = event.schedule[event.schedule.length - 1];
    if (!lastScheduleItem.time || !lastScheduleItem.activity) return;

    setEvent(prevState => ({
      ...prevState,
      schedule: [...prevState.schedule, initialScheduleItem]
    }));
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedSchedule = [...event.schedule];
    updatedSchedule[index][name] = value;
    setEvent(prevState => ({
      ...prevState,
      schedule: updatedSchedule
    }));
  };

  const handleDeleteSchedule = (index: number) => {
    const updatedSchedule = event.schedule.filter((_, i) => i !== index);
    setEvent(prevState => ({
      ...prevState,
      schedule: updatedSchedule
    }));
  };

  const createSocialLink = () => {
    const lastSocialLink = event.socialLinks[event.socialLinks.length - 1];
    if (!lastSocialLink.platform || !lastSocialLink.url) return;

    setEvent(prevState => ({
      ...prevState,
      socialLinks: [...prevState.socialLinks, initialSocialLink]
    }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedSocialLinks = [...event.socialLinks];
    updatedSocialLinks[index][name] = value;
    setEvent(prevState => ({
      ...prevState,
      socialLinks: updatedSocialLinks
    }));
  };

  const handleDeleteSocialLink = (index: number) => {
    const updatedSocialLinks = event.socialLinks.filter((_, i) => i !== index);
    setEvent(prevState => ({
      ...prevState,
      socialLinks: updatedSocialLinks
    }));
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedGuests = [...event.guests];
    updatedGuests[index] = value;
    setEvent(prevState => ({
      ...prevState,
      guests: updatedGuests
    }));
  };

  const handleAddGuest = () => {
    setEvent(prevState => ({
      ...prevState,
      guests: [...prevState.guests, '']
    }));
  };

  const handleDeleteGuest = (index: number) => {
    const updatedGuests = event.guests.filter((_, i) => i !== index);
    setEvent(prevState => ({
      ...prevState,
      guests: updatedGuests
    }));
  };

  return (
    <Container>
      <div className="header">
        <h4>Create Event</h4>
        <FaTimes size={20} onClick={() => navigate(`/streamers/${user._id}`)}/>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input type="text" id="title" name="title" value={event.title} onChange={handleInputOnChange} disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea id="description" name="description" value={event.description} onChange={handleInputOnChange} disabled={loading}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={event.location} onChange={handleInputOnChange} disabled={loading} />
        </div>
        <div className="form-group datetimepicker">
          <label htmlFor="date">Date & Time</label>
          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  setEvent(prevState => ({
                    ...prevState,
                    date: newValue?.format('YYYY-MM-DD') || '',
                    time: newValue?.format('HH:mm') || '',
                    
                  }));
                }}
                // renderInput={(params) => <input {...params} />}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={event.price} onChange={handleInputOnChange} disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input type="number" id="capacity" name="capacity" value={event.capacity} onChange={handleInputOnChange} disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="rsvp">RSVP</label>
          <select id="rsvp" name="rsvp" value={event.rsvp} onChange={handleInputOnChange} disabled={loading}>
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input type="text" id="tags" name="tags" value={event.tags.join(', ')} onChange={(e) => setEvent(prevState => ({ ...prevState, tags: e.target.value.split(',').map(tag => tag.trim()) }))} placeholder="Comma-separated tags" disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea id="specialInstructions" name="specialInstructions" value={event.specialInstructions} onChange={handleInputOnChange} disabled={loading}></textarea>
        </div>
        <div className="schedule-section">
          <div className="schedule-header">
            <h3>Schedule</h3>
            <FaPlus className="add-schedule" onClick={createScheduleItem} />
          </div>
          {event.schedule.map((item, index) => (
            <div key={index} className="schedule-card">
              <div className="form-group">
                <label htmlFor={`schedule-time-${index}`}>Time</label>
                <input type="text" id={`schedule-time-${index}`} name="time" value={item.time} onChange={(e) => handleScheduleChange(e, index)} placeholder="09:00 AM" disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor={`schedule-activity-${index}`}>Activity</label>
                <input type="text" id={`schedule-activity-${index}`} name="activity" value={item.activity} onChange={(e) => handleScheduleChange(e, index)} placeholder="Activity" disabled={loading} />
              </div>
              <div className="btns">
                <button type="button" className="delete" onClick={() => handleDeleteSchedule(index)} disabled={loading}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="social-links-section">
          <div className="social-header">
            <h3>Social Links</h3>
            <FaPlus className="add-social" onClick={createSocialLink} />
          </div>
          {event.socialLinks.map((link, index) => (
            <div key={index} className="social-card">
              <div className="form-group">
                <label htmlFor={`social-platform-${index}`}>Platform</label>
                <input type="text" id={`social-platform-${index}`} name="platform" value={link.platform} onChange={(e) => handleSocialLinkChange(e, index)} placeholder="Platform" disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor={`social-url-${index}`}>URL</label>
                <input type="text" id={`social-url-${index}`} name="url" value={link.url} onChange={(e) => handleSocialLinkChange(e, index)} placeholder="https://example.com" disabled={loading} />
              </div>
              <div className="btns">
                <button type="button" className="delete" onClick={() => handleDeleteSocialLink(index)} disabled={loading}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="guest-list">
          <div className="guest-header">
            <h3>Guest List</h3>
            <FaPlus className="add-guest" onClick={handleAddGuest} />
          </div>
          {event.guests.map((guest, index) => (
            <div key={index} className="guest-card">
              <div className="form-group">
                <label htmlFor={`guest-${index}`}>Guest</label>
                <input type="text" id={`guest-${index}`} name="guest" value={guest} onChange={(e) => handleGuestChange(e, index)} placeholder="Guest Name" disabled={loading} />
              </div>
              <div className="btns">
                <button type="button" className="delete" onClick={() => handleDeleteGuest(index)} disabled={loading}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading}>{loading&&<ImSpinner9 className="spinner"/>}Create Event</button>
      </form>
    </Container>
  );
};
