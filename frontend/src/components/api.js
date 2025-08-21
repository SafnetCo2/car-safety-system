// src/api.js
const API_URL = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

export const fetchDrivers = async () => {
    const res = await fetch(`${API_URL}/drivers`);
    const data = await res.json();
    return data;
};
