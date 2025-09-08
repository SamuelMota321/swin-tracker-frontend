import axios from "axios";
export const api = axios.create({
    baseURL: "https://swim-tracker.fly.dev",
    timeout: 8 * 1000
})