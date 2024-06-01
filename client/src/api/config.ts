import axios from "axios";


// Create an axios instance for API requests
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
    timeout: 120000,
});

apiClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401 && !error.config.__isRetryRequest) {
            error.config.__isRetryRequest = true;
            try {
                await axios.post('http://localhost:3000/api/v1/auth/refresh-token', {}, { withCredentials: true });
                return apiClient(error.config);
            } catch (refreshError) {
                console.error("Failed to refresh access token", refreshError);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
