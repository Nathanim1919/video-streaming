import { RegisterInterface } from "../interfaces/authContext";
import apiClient from "./config";



const getUserData = () => {
    return apiClient.get('/auth/me');
}


// API functions for different actions
const loginUser = (data: {email: string; password: string}) => {
    return apiClient.post('/auth/login', data);
}


const registerUser = (data: RegisterInterface) => {
    return apiClient.post("/auth/register", data);
};

const logoutUser = () => {
    return apiClient.post("/auth/logout");
};

const fetchStreamers = () => {
    return apiClient.get("/users/");
}


const fetchStreamer = (id: string) => {
    console.log(id);
    return apiClient.get(`/users/${id}`);
}


const handleFollow = (id: string) => {
    return apiClient.post(`/users/${id}/follow`);

}


const handleUnFollow = (id: string) => {
    return apiClient.post(`/users/${id}/unfollow`);

}


// Export all the API functions
export {
    loginUser,
    logoutUser,
    registerUser,
    fetchStreamers,
    handleFollow,
    handleUnFollow,
    fetchStreamer,
    getUserData
}