// src/services/driverService.js
const API_URL = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL;

export const getDrivers = async () => {
    const res = await fetch(`${API_URL}/drivers`);
    if (!res.ok) throw new Error("Failed to fetch drivers");
    return res.json();
};

export const createDriver = async (driverData) => {
    const res = await fetch(`${API_URL}/drivers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driverData),
    });
    if (!res.ok) throw new Error("Failed to create driver");
    return res.json();
};
