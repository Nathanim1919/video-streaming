import apiClient from "./config";

const createEvent = (data: {
    title: string;
    description: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    capacity: number;
    location: string;
    eventType: string;
    rsvp: string,
    eventInformations: [
        {
          title: string,
          description: string,
          saved: boolean,
          error: string,
        }
      ]
}) => {
    console.log(data);
    return apiClient.post("/events/create", data);
}


const getEvents = () => {
    return apiClient.get("/events/all");
}

const getEvent = (eventId: string) => {
    return apiClient.get(`/events/${eventId}`);
}


const handleRSVP =  (eventId: string) => {
    return apiClient.post(`/events/${eventId}/rsvp`);
}


const removeRsvp =  (eventId: string) => {
    return apiClient.delete(`/events/${eventId}/rsvp`);
}



export  {
    createEvent,
    getEvents,
    handleRSVP,
    removeRsvp,
    getEvent
}