import apiClient from "./config";

const createStream = (data: Event) => {
  return apiClient.post("/stream/create", data);
};

const getStreams = () => {
  return apiClient.get("/stream/");
};

const updateStream = (id: string, date: Event) => {
  return apiClient.put(`/stream/${id}/update`, date);
};

const getStream = (id: string) => {
    return apiClient.get(`/stream/${id}`);
};

const addStreamGuest = (id: string, data: { name: string; profession: string })=> {
  return apiClient.post(`/stream/${id}/add-guest`, data);
}

const addStreamSchedule = (id: string, data: { time: string; activity: string }) => {
  return apiClient.post(`/stream/${id}/add-schedule`, data);
};

// Export the API functions
export { createStream, getStreams, updateStream, getStream, addStreamGuest, addStreamSchedule };
