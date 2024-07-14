import apiClient from "./config";

const search = (query: string) => {
  return apiClient.get(`/search?q=${query}`);
};

const personalSearch = (query: string) => {
  return apiClient.get(`/search/personal?q=${query}`);
};

export { search, personalSearch };