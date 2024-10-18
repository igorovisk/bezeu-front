import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:3005", // Altere para a URL correta do backend
   timeout: 1000,
   withCredentials: true, // Habilita o envio de cookies
});

export default api;
