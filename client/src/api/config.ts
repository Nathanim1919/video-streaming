import axios from "axios";


export const BASE_URL = "https://eventifyapi.nathanimt.me/api/v1";


// Create an axios instance for API requests
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 30000, // 30 seconds
});

apiClient.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401 && !error.config.__isRetryRequest) {
            error.config.__isRetryRequest = true;
            try {
                await apiClient.post('/auth/refresh-token', {}, { withCredentials: true });
                return apiClient(error.config);
            } catch (refreshError) {
                console.error("Failed to refresh access token", refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
