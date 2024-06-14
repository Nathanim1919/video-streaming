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

// Export the API functions
export { createStream, getStreams, updateStream, getStream };
