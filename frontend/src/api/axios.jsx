import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Ye automatic har request mein JWT token add kar dega agar local storage mein hai
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;