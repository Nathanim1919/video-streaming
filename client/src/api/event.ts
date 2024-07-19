import apiClient from "./config";

// interface PageinationParams {
//   page: number;
//   limit: number;
// }

const createEvent = (data: {
  title: string;
  description: string;
  date: string;
  duration: number;
  price: number;
  capacity: number;
  location: string;
  eventType: string;
  isOpenForRsvp: string;
  tags: string[];
  guests: string[];
  specialInstructions: string;
  schedule: { time: string; activity: string }[];
  socialLinks: { platform: string; url: string }[];
}) => {
  console.log(data);
  return apiClient.post("/events/create", data);
};

const getEvents = () => {
  return apiClient.get("/events/all");
};

const getUpcomingEvents = () => {
  return apiClient.get("/events/upcoming");
};

const getEvent = (eventId: string) => {
  return apiClient.get(`/events/${eventId}`);
};

const handleRSVP = (id: string) => {
  return apiClient.post(`/events/${id}/rsvp`);
};

const removeRsvp = (id: string) => {
  return apiClient.delete(`/events/${id}/remove-rsvp`);
};

const checkRsvp = (id: string) => {
  return apiClient.post(`/events/${id}/check-rsvp`);
};

const getRsvpEvents = () => {
  return apiClient.get("/events/my-events");
};

const getTopEvents = () => {
  return apiClient.get("/events/top-events");
};

const getLiveEvents = () => {
  return apiClient.get("/events/live-events");
};

const addGuest = (id: string, data: { name: string; profession: string })=> {
  return apiClient.post(`/events/${id}/add-guest`, data);
}

const addSchedule = (id: string, data: { time: string; activity: string }) => {
  return apiClient.post(`/events/${id}/add-schedule`, data);
};

const editSchedule = (id: string, data: { time: string; activity: string }[]) => {
  return apiClient.put(`/events/${id}/edit-schedule`, data);
};

const editEventInstruction = (id: string, data: string) => {
  return apiClient.put(`/events/${id}/edit-instruction`, {data});
}

export {
  createEvent,
  getEvents,
  getUpcomingEvents,
  handleRSVP,
  removeRsvp,
  getEvent,
  checkRsvp,
  getRsvpEvents,
  getTopEvents,
  getLiveEvents,
  addGuest,
  addSchedule,
  editSchedule,
  editEventInstruction
};
