import axios from "axios";

// Use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/drivers";

export const getDrivers = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createDriver = async (driverData) => {
    const res = await axios.post(API_URL, driverData);
    return res.data;
};

export const updateDriver = async (id, driverData) => {
    const res = await axios.put(`${API_URL}/${id}`, driverData);
    return res.data;
};

export const deleteDriver = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
