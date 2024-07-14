import apiClient from "./config";

const search = (query: string) => {
  return apiClient.get(`/search?q=${query}`);
};

export { search };