import axios from "axios";

export const api = axios.create({
    baseURL: "https://swim-tracker-api.onrender.com",
    timeout: 8 * 1000
})