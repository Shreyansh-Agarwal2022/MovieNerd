import axios from "axios"

const API = axios.create({
    baseURL: "https://localhost:9090/api"
})

export default API