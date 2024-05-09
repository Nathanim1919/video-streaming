import axios from "axios";
import { LocalStorage } from "../utils";


// Create an axios instance for API requests
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
    timeout: 120000,
})


// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
    function (config) {
        // Retrieve user token from local storage
        const token = LocalStorage.get("token");
        // Set authorization header with bearer token
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

// API functions for different actions
const loginUser = (data: {email: string; password: string}) => {
    return apiClient.post('/auth/login', data);
}


const registerUser = (data: {
    email: string;
    password: string;
    profession: string;
    fullname: string;
}) => {
    return apiClient.post("/auth/register", data);
};

const logoutUser = () => {
    return apiClient.post("/auth/logout");
};

const fetchStreamers = () => {
    return apiClient.get("/auth/streamers");
}


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




// Export all the API functions
export {
    loginUser,
    logoutUser,
    registerUser,
    fetchStreamers,
    createEvent,
    getEvents
}