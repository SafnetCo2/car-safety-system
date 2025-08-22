import { addIncident } from"../services/incidentService";

// Simulate automatic incidents
export const simulateIncident = (driverId, location) => {
    const incidentTypes = ["Collision Warning", "Low Tire Pressure", "Battery Alert", "Overtake Warning"];
    const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];

    // Send incident to backend
    addIncident({ driver: driverId, type, location })
        .then((data) => console.log("Incident logged:", data))
        .catch((err) => console.error(err.message));
};
