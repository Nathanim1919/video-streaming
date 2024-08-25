import axios from "axios";

export const BASE_URL = "https://eventifyapi.nathanimt.me/api/v1";
// export const BASE_URL = "http://localhost:3000/api/v1";

// Create an axios instance for API requests
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 30000, // 30 seconds
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRrefreshed(token: string) {
    refreshSubscribers.map((callback) => callback(token));
}

function addRefreshSubscriber(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const { config, response: { status } } = error;
        const originalRequest = config;

        if (status === 401 && !originalRequest.__isRetryRequest) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token: string) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        resolve(apiClient(originalRequest));
                    });
                });
            }

            originalRequest.__isRetryRequest = true;
            isRefreshing = true;

            try {
                const { data } = await apiClient.post('/auth/refresh-token', {}, { withCredentials: true });
                const newToken = data.accessToken;
                apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                onRrefreshed(newToken);
                refreshSubscribers = [];
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh access token", refreshError);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
