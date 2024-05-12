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
    return apiClient.post("/events/create", data);
}


const getEvents = () => {
    return apiClient.get("/events/all");
}



export default {
    createEvent,
    getEvents
}