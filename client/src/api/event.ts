import apiClient from "./config";


interface PageinationParams {
    page: number;
    limit: number;
}

const createEvent = (data: {
    title: string;
    description: string;
    date: string;
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


const getEvents = ({page, limit}: PageinationParams) => {
    return apiClient.get("/events/all", {
        params: {
            page,
            limit
        }
    });
}

const getUpcomingEvents = () => {
    return apiClient.get("/events/upcoming");
}

const getEvent = (eventId: string) => {
    return apiClient.get(`/events/${eventId}`);
}


const handleRSVP =  (id: string) => {
    return apiClient.post(`/events/${id}/rsvp`);
}


const removeRsvp =  (id: string) => {
    return apiClient.delete(`/events/${id}/remove-rsvp`);
}


const checkRsvp = (id: string) => {
    return apiClient.post(`/events/${id}/check-rsvp`)
}



const getRsvpEvents = () => {
    return apiClient.get("/events/my-events");
}


const getTopEvents = () => {
    return apiClient.get("/events/top-events");
}



export  {
    createEvent,
    getEvents,
    getUpcomingEvents,
    handleRSVP,
    removeRsvp,
    getEvent,
    checkRsvp,
    getRsvpEvents,
    getTopEvents
}
