import apiClient from "./config";



// API functions for different actions
const loginUser = (data: {email: string; password: string}) => {
    return apiClient.post('/auth/login', data);
}


const registerUser = (data: {
    email: string;
    username: string;
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


const handleFollow = (streamerId: string) => {
    return apiClient.post(`/auth/streamers/${streamerId}/follow`);

}


const handleUnFollow = (streamerId: string) => {
    return apiClient.post(`/auth/streamers/${streamerId}/unfollow`);

}




// Export all the API functions
export {
    loginUser,
    logoutUser,
    registerUser,
    fetchStreamers,
    handleFollow,
    handleUnFollow
}