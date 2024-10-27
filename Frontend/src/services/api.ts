import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:5000/api/v1`
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log("Token in interceptor:", token); // Check if token is retrieved here
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;