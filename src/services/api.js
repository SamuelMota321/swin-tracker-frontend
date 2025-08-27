import axios from "axios";
// https://swim-tracker-api.onrender.com
export const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 8 * 1000
})