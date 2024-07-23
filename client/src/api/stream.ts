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

const addStreamGuest = (
  id: string,
  data: { name: string; profession: string }
) => {
  return apiClient.post(`/stream/${id}/add-guest`, data);
};

const addStreamSchedule = (
  id: string,
  data: { time: string; activity: string }
) => {
  return apiClient.post(`/stream/${id}/add-schedule`, data);
};

const editStreamSchedule = (
  id: string,
  data: { time: string; activity: string }[]
) => {
  return apiClient.put(`/stream/${id}/edit-schedule`, data);
};

const editStreamInstruction = (id: string, data: string) => {
  return apiClient.put(`/stream/${id}/edit-instruction`, { data });
};

const getSimilartStreams = (id: string) => {
  return apiClient.get(`/stream/${id}/similarStreams`);
};


const bookMarkStream = (id: string) => {
  return apiClient.post(`/stream/${id}/bookmark`);

}

// Export the API functions
export {
  createStream,
  editStreamSchedule,
  getStreams,
  updateStream,
  getStream,
  addStreamGuest,
  addStreamSchedule,
  editStreamInstruction,
  getSimilartStreams,
  bookMarkStream
};
