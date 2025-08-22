// src/services/IncidentService.js
const API_URL = "https://car-safety-system.onrender.com/api/incidents";




// Fetch all incidents
export const getIncidents = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch incidents");
    return res.json();
};

// Add a new incident (manual or automated)
export const addIncident = async (incident) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident),
    });
    if (!res.ok) throw new Error("Failed to add incident");
    return res.json();
};
