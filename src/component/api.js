import axios from "axios";

const api = axios.create({
    baseURL: "https://comp-3123-assignment02.vercel.app" || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;