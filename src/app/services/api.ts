import axios from "axios"

export const api = axios.create({
    baseURL: process.env.baseURL_API,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})