import {AxiosResponse } from "axios";
import { APISuccessResponseInterface } from "../interfaces/api";



// A utility function for handling API requests with loading, success and error handling
export const requestHandler = async (
    api: () => Promise<AxiosResponse<APISuccessResponseInterface, any>>,
    setLoading: ((loading: boolean) => void) | null,
    onSuccess: (data: APISuccessResponseInterface) => void,
    onError: (error: string) => void
) => {
    // Show loading state if setLoading function is provided
    setLoading && setLoading(true);
    try {
        // Make the API request
        const response = await api();
        const {data} = response;
        if (data?.success){
            // Call the onSuccess callback with thresponsee response data
            onSuccess(data)
        }
    } catch (error: any) {
        // Handle error cases, including unauthorized and forbidded case
        if ([401, 403].includes(error?.response.data?.statusCode)) {
            LocalStorage.clear(); // Clear local storage on authentication issues
            if (isBrowser) window.location.href = '/login'; // Redirect to login page
        }

        onError(error?.response?.data?.message || "Something went wrong");
    } finally{
        // Hide loading state if setLoading function is provided
        setLoading && setLoading(false)
    }
}



// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";




// A class that provides utility functions for working with local storage
export class LocalStorage {
    // Get a value from local storage by key
    static get(key: string){
        if (!isBrowser) return;
        const value = localStorage.getItem(key);
        if (value) {
            try{
                return JSON.parse(value)
            } catch (err) {
                return null
            }
        }
        return null;
    }


    // Set a value in local Storage
    static set(key: string, value: unknown){
        if (!isBrowser) return
        localStorage.setItem(key, JSON.stringify(value));
    }


    // Remove a value from local Storage by key
    static remove(key: string){
        if (!isBrowser) return
        localStorage.removeItem(key)
    }


    // Clear all items from local storage
    static clear() {
        // if (!isBrowser) return;
        localStorage.clear();
    }
}


// A utility function to format date strings
export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-US', options);
  }
