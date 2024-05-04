import axios from "axios";


// Create an axios instance for API requests
const apiClient = axios.create({
    baseURL: import.meta.env.BASE_URI,
    withCredentials: true,
    timeout: 120000,
})


// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
    function (config) {
        // Retrieve user token from local storage
        const token = 
    }
)