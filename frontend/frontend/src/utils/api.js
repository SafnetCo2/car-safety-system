// utils/api.js
const API_URL =
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
        ? "http://localhost:5000/api"
        : "https://car-safety-system.onrender.com/api");

export default API_URL;
