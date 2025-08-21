import axios from "axios";

const API_URL = "http://localhost:5000/api/incidents";

export const getIncidents = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createIncident = async (incidentData) => {
    const res = await axios.post(API_URL, incidentData);
    return res.data;
};

export const updateIncident = async (id, incidentData) => {
    const res = await axios.put(`${API_URL}/${id}`, incidentData);
    return res.data;
};

export const deleteIncident = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
