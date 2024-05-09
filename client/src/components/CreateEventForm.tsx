import React, {useState} from "react";
import styled from "styled-components";
// import close icon from 'react-icons/fa';
import {FaTimes} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
import { createEvent } from "../api";
import { requestHandler } from "../utils";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

type EventInformation = {
    title: string;
    description: string;
    saved: boolean;
    error: string;
  };
  
  type Event = {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    price: number;
    capacity: number;
    eventType: string;
    isOnline: boolean;
    rsvp: string;
    status: string;
    tags: string[];
    duration: number;
    eventInformations: EventInformation[];
  };

type CreateEventFormProps = {
    setCreateEvent: (value: boolean) => void;

}
export const CreateEventForm = ({setCreateEvent}: CreateEventFormProps) => {
    const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());
    const [event, setEvent] = useState<Event>({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            image: '',
            price: 0,
            capacity: 100,
            eventType: 'meetup',
            isOnline: true,
            rsvp: "off",
            status: 'scheduled',
            tags: [],
            duration: 130,
            eventInformations: [
                    {
                        title: '',
                        description: '',
                        saved: false,
                        error: ''
                    }
            ]
    });

    const [eventInformations, setEventInformations] = useState<EventInformation[]>([
            {
                    title: '',
                    description: '',
                    saved: false,
                    error: ''
            }
    ]);


    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setEvent(prevState => ({
                    ...prevState,
                    [name]: value
            }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await requestHandler(
                    async () => await createEvent(event),
                    null,
                    () => setCreateEvent(false),
                    (error) => console.log(error)
            );
            console.log(event)
            
    };

    const createInfo = () => {
            // Check if the last set of inputs is populated
            const lastInfo = eventInformations[eventInformations.length - 1];
            if (lastInfo && (!lastInfo.title || !lastInfo.description)) {
                return;
            }
        
            // Add a new set of inputs
            setEventInformations([...eventInformations, { title: '', description: '', saved: false, error:'' }]);
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
            const { name, value } = e.target;
            const list = [...eventInformations];
            list[index][name] = value;
            setEventInformations(list);
        };

        const handleSave = (index: number) => {
            const list = [...eventInformations];
            if (!list[index].title || !list[index].description) {
                list[index].error = 'Please fill out the title and description.';
            } else {
                    list[index].error = '';
                list[index].saved = true;
            }
            const listToSave = list.map(({...keepAttrs }) => keepAttrs);
            // setEventInformations(listToSave);
            setEvent(prevState => ({
                    ...prevState,
                    eventInformations: listToSave
            }));
            console.log(event.eventInformations)
        };


        const editInformation = (index: number) => {
            const list = [...eventInformations];
            list[index].saved = false;
            setEventInformations(list);
        }


        const handleDelete = (index: number) => {
            // Update eventInformations state
            const list = [...eventInformations];
            list.splice(index, 1);
            setEventInformations(list);
        
            // Update event state
            setEvent(prevState => ({
                ...prevState,
                eventInformations: list
            }));
        };


    const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setEvent(prevState => ({
                    ...prevState,
                    tags: value.split(',')
            }));
    }

    return (
        <Container>

            <div className="header">
                <div>
                <h4>Create Event</h4>
                 <FaTimes onClick={()=>setCreateEvent(false)}/>

                </div>
            </div>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    {/* <label htmlFor="title">Title</label> */}
                    <input type="text" id="title" name="title" value={event.title} onChange={handleInputOnChange} placeholder="Just Short Title"/>
                </div>
                <div>
                    {/* <label htmlFor="location">Location</label> */}
                    <input type="text" id="location" name="location" value={event.location} onChange={handleInputOnChange} placeholder="Where?"/>
                </div>
            </div>
            <div>
                <div>
                    {/* <label htmlFor="description">Description</label> */}
                    <textarea id="description" name="description" value={event.description} onChange={handleInputOnChange} placeholder="What is this Event about?"/>
                </div>
                <div>
                    <div>
                        {/* <label htmlFor="price">Price</label> */}
                        <input type="number" id="price" name="price" value={event.price} onChange={handleInputOnChange} />
                    </div>
                    <div>
                        {/* <label htmlFor="capacity">Capacity</label> */}
                        <input type="number" id="capacity" name="capacity" value={event.capacity} onChange={handleInputOnChange} />
                    </div>
                </div>
            </div>
            <div>
                <div className="datetimepicker">
                <ThemeProvider theme={darkTheme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Event Date and Time"
                        minDate={dayjs()}
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                            setEvent(prevState => ({
                            ...prevState,
                            date: newDate?.toDate(),  // Convert the Dayjs object back to a Date object
                            }));
                        }}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
                </div>
             
                <div>
                    <label htmlFor="eventType">Event Type</label>
                    <select id="eventType" name="eventType" value={event.eventType} onChange={handleInputOnChange}>
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

               
                
            </div>
            <div>
                
                <div>
                    <label htmlFor="tags">Tags</label>
                    <input type="text" id="tags" name="tags" value={event.tags.join(',')} onChange={handleTags} placeholder="Technology, Business, Freelance"/>
                </div>
                <div className="rsvp">
                        <label htmlFor="rsvp">OPEN FOR RSVP</label>
                        <input type="checkbox" id="rsvp" name="rsvp" checked={event.rsvp} onChange={handleInputOnChange} />
                    </div>
            </div>
            <div className="eventInformations">
                <div className="info">
                    <div className="info-header">
                        <h3>Event Information</h3>
                        <div>
                            <div className="add" onClick={createInfo}>
                              <FaPlus/>
                            </div>
                        </div>
                    </div>
                    {eventInformations.map((info, index) => (
                        <div key={index} className="infoCard">
                           {!info.saved && <input type="text" name="title" value={info.title} placeholder="Title" onChange={e => handleInputChange(e, index)}/>}
                            {!info.saved && <textarea name="description" value={info.description} placeholder="Description" onChange={e => handleInputChange(e, index)}/>}
                            {info.saved && <h3 className="title" onClick={() => editInformation(index)}>{info.title}</h3>}
                            {info.error && <p>{info.error}</p>}
                            {!info.saved && <div className="btns">
                                <button className="save" onClick={()=> handleSave(index)} type="button">Save</button>
                                <button className="delete" onClick={()=> handleDelete(index)} type="button">Delete</button>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit">Create Event</button>
        </form>
    </Container>
    );
};


const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000096;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);

    .header{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: inherit;
        position: relative;

        div{
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: space-between;
            width: 60%;
        }

        svg{
            cursor: pointer;
        }


        >*{
            margin: 0;
        }
       
    }


    form{
        background-color: #232222;
        width: 60%;
        padding: 3rem;
        max-height: 70vh;
        overflow-y: auto;
        border-top: 6px solid red;
        overflow-x: hidden;
        position: relative;

        

        .rsvp{
            background-color: #232222;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: flex-start;
            /* border: 1px solid #2b2929; */

            >*{
                flex: 1;
            }
        }



        input{
            width: 100%;
            padding: .5rem;
            margin: .5rem 0;
            margin-bottom: 1rem;
            background-color: transparent;
            border: 1px solid #2b2929;
            color: #fff;
            outline: none;
        }

        textarea{
            width: 100%;
            padding: .5rem;
            margin-top: .5rem;
            height: 11rem;
            resize: none;
            background-color: transparent;
            border: 1px solid #2b2929;
            color: #fff;
            outline: none;
        }

        select{
            width: 100%;
            padding: .5rem;
            margin-top: .5rem;
            background-color: transparent;
            border: 1px solid #2b2929;
            color: #fff;
        }

        button{
            width: 100%;
            padding: .5rem 1rem;
            margin-top: 1rem;
            background: linear-gradient(45deg, #ef9206, #8c0c0c);
            color: #fff;
            border: none;
            cursor: pointer;
            font-family: inherit;
        }


        >div{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;


            >div{
                display: flex;
                flex-direction: column;

                >div{
                display: flex;
                flex-direction: column;

                .datetimepicker{
                    color: #fff;

                    >*{

                        background-color: #333;
                    }
                }
            }
            }
        }

        >div.eventInformations{
            width: 100%;
            /* background-color: #c02121; */
            padding: 0;
            margin-top: 1rem;
            display: grid;
            grid-template-columns: 1fr;

            .infoCard{
                background-color: #2b2929;
                padding: 1rem;
                margin: .5rem 0;
                border-radius: 5px;
                position: relative;
                width: 100%;
                cursor: pointer;
                font-family: inherit;

                input, textarea{
                    font-family: inherit;
                }

                p{
                    color: red;
                }

            }
            div.btns{
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                button.save, button.delete{
                    font-family: inherit;
                    background: linear-gradient(60deg, #282626, #191818);
                    color: #fff;
                    box-shadow: 0 5px 13px #0000004c;

                    &:hover{
                        background: linear-gradient(60deg, #191818, #282626);
                    }
                }
            }


            h3.title{
               

                &:hover{
                    color: #615b5b;
                }
            }
            
            .info{
                width: 100%;
                div.info-header{
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    place-items: center;
                    background-color: #292828;
                    width: 100%;
                    color: orange;
                    padding:0 1rem;
                  

                    div.add{
                        width: 30px;
                        height: 30px;
                        background-color: #1c201c;
                        display: grid;
                        place-items: center;
                        border-radius: 50%;
                        place-self: flex-end;
                        cursor: pointer;
                        color: orange;

                       

                        &:hover{
                            background-color: #1c1c1c;
                            color: #fff;
                        }
                    }

                    >*{
                       
                        display: flex;
                        justify-content: end;
                    }
                }
            }
        }
    }
`