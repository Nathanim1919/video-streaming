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


export default apiClient