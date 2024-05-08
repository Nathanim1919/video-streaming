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
        eventInformations: [
            {
              title: '',
              description: '',
              saved: false,
              error: ''
            }
          ]
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

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    //     const { name, value } = e.target;
    //     const list = [...event.eventInformations];
    //     list[index][name] = value;
    //     setEvent(prevState => ({
    //       ...prevState,
    //       eventInformations: list
    //     }));
    // };


    const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
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

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
        const list = [...eventInformations];
        list.slice(index, 1);
        const listToSave = list.map(({ ...keepAttrs }) => keepAttrs);
        setEvent(prevState => ({
                ...prevState,
                eventInformations: listToSave
        }));
        console.log(event.eventInformations)
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
                    <input type="text" id="title" name="title" value={event.title} onChange={handleInputOnChange} />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={event.location} onChange={handleInputOnChange} />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={event.description} onChange={handleInputOnChange} />
                </div>
                <div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={event.price} onChange={handleInputOnChange} />
                    </div>
                    <div>
                        <label htmlFor="capacity">Capacity</label>
                        <input type="number" id="capacity" name="capacity" value={event.capacity} onChange={handleInputOnChange} />
                    </div>
                    <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" name="time" value={event.time} onChange={handleInputOnChange} />
                </div>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={event.date} onChange={handleInputOnChange} />
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
                    <input type="text" id="tags" name="tags" value={event.tags.join(',')} onChange={handleInputOnChange} />
                </div>
                <div>
                        <label htmlFor="rsvp">RSVP</label>
                        <input type="checkbox" id="rsvp" name="rsvp" checked={event.rsvp} onChange={handleInputOnChange} />
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
                        <div key={index} className="infoCard">
                           {!info.saved && <input type="text" name="title" value={info.title} placeholder="Title" onChange={e => handleInputChange(e, index)}/>}
                            {!info.saved && <textarea name="description" value={info.description} placeholder="Description" onChange={e => handleInputChange(e, index)}/>}
                            {info.saved && <h3 className="title" onClick={() => editInformation(index)}>{info.title}</h3>}
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
        border-top: 6px solid red;


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


            h3.title{
               

                &:hover{
                    color: #615b5b;
                }
            }

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