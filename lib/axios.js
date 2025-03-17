import axios from 'axios';

// Create an Axios instance with base URL and default headers
const apiClient = axios.create({
    baseURL: 'https://api.yourservice.com',  // Base URL for your API
    headers: {
        'my-api-key': process.env.NEXT_PUBLIC_API_KEY,  // Default header for API key
        'Content-Type': 'application/json',  // Default content type
    },
    timeout: 5000,  // Global timeout for requests
});