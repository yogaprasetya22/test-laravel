import axios from "axios";

const baseURL = "http://localhost:8000/api";

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
