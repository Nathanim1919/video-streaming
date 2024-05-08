import React, {useState} from "react";
import styled from "styled-components";
// import close icon from 'react-icons/fa';
import {FaTimes} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';


export const CreateEventForm = () => {
    const [event, setEvent] = useState({
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
        rsvp: false,
        status: 'scheduled',
        tags: [],
    });

    const [eventInformations, setEventInformations] = useState([
        {
            title: '',
            description: '',
            saved: false,
            error: ''
        }
    ]);


    const handleCreateEvent = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(event);
    };

    const createInfo = () => {
        // Check if the last set of inputs is populated
        const lastInfo = eventInformations[eventInformations.length - 1];
        if (lastInfo && (!lastInfo.title || !lastInfo.description)) {
          alert('Please fill out the previous title and description before adding a new one.');
          return;
        }
      
        // Add a new set of inputs
        setEventInformations([...eventInformations, { title: '', description: '', saved: false, error:'' }]);
      };

      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...eventInformations];
        list[index][name] = value;
        setEventInformations(list);
      };

      const handleSave = (index) => {
        const list = [...eventInformations];
        if (!list[index].title || !list[index].description) {
          list[index].error = 'Please fill out the title and description.';
        } else {
            list[index].error = '';
          list[index].saved = true;
        }
        console.log(list);
        setEventInformations(list);
      };


      const editInformation = (index) => {
        const list = [...eventInformations];
        list[index].saved = false;
        setEventInformations(list);
      }


      const handleDelete = (index) => {
        const list = [...eventInformations];
        list.splice(index, 1);
        setEventInformations(list);
      };

    return (
        <Container>
            <div className="header">
                <h4>Create Event</h4>
                 <FaTimes/>
            </div>
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" value={event.title} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={event.location} onChange={handleChange} />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={event.description} onChange={handleChange} />
                </div>
                <div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={event.price} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="capacity">Capacity</label>
                        <input type="number" id="capacity" name="capacity" value={event.capacity} onChange={handleChange} />
                    </div>
                    <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" name="time" value={event.time} onChange={handleChange} />
                </div>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={event.date} onChange={handleChange} />
                </div>
             
                <div>
                    <label htmlFor="eventType">Event Type</label>
                    <select id="eventType" name="eventType" value={event.eventType} onChange={handleChange}>
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
                    <input type="text" id="tags" name="tags" value={event.tags.join(',')} onChange={handleChange} />
                </div>
                <div>
                        <label htmlFor="rsvp">RSVP</label>
                        <input type="checkbox" id="rsvp" name="rsvp" checked={event.rsvp} onChange={handleChange} />
                    </div>
            </div>
            <div className="eventInformations">
                <div className="info">
                    <div className="header">
                        <h3>Event Information</h3>
                        <div>
                            <div className="add" onClick={createInfo}>
                              <FaPlus/>
                            </div>
                        </div>
                    </div>
                    {eventInformations.map((info, index) => (
                        <div key={index}>
                           {!info.saved && <input type="text" name="title" value={info.title} placeholder="Title" onChange={e => handleInputChange(e, index)}/>}
                            {!info.saved && <textarea name="description" value={info.description} placeholder="Description" onChange={e => handleInputChange(e, index)}/>}
                            {info.saved && <p onClick={() => editInformation(index)}>{info.title}</p>}
                            {info.error && <p>{info.error}</p>}
                            {!info.saved && <div className="btns">
                                <button onClick={()=> handleSave(index)} type="button">Save</button>
                                <button onClick={()=> handleDelete(index)} type="button">Delete</button>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60%;
        padding: 1rem;
        /* background-color: #232222; */
        color: #fff;
        border-radius: 5px;
        position: relative;
        z-index: 100;

        svg{
            cursor: pointer;
        }
    }


    form{
        background-color: #232222;
        width: 60%;
        padding: 3rem;
        max-height: 70vh;
        overflow-y: auto;


        input{
            width: 100%;
            padding: .5rem;
            margin: .5rem 0;
            margin-bottom: 1rem;
            background-color: transparent;
            border: 1px solid #666363;
            color: #fff;
        }

        textarea{
            width: 100%;
            padding: .5rem;
            margin-top: .5rem;
            height: 11rem;
            resize: none;
            background-color: transparent;
            border: 1px solid #666363;
            color: #fff;
        }

        select{
            width: 100%;
            padding: .5rem;
            margin-top: .5rem;
            background-color: transparent;
            border: 1px solid #666363;
            color: #fff;
        }

        button{
            width: 100%;
            padding: .5rem;
            margin-top: 1rem;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
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

            div.btns{
                display: flex;
                justify-content: center;
                gap: 1rem;

                button{
                    background-color: #1c201c;
                    font-family: inherit;
                }
            }
            
            .info{
                width: 100%;
                div.header{
                    display: grid;
                    grid-template-columns: .4fr .6fr;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    background-color: #333;
                  

                    div.add{
                        width: 30px;
                        height: 30px;
                        background-color: #1c201c;
                        display: grid;
                        place-items: center;
                        border-radius: 50%;
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