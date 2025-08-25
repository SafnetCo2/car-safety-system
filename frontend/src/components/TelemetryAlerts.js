import React, { useEffect, useState } from "react";
import AlertModal from "./AlertModal";

function TelemetryAlerts({ vehicleId }) {
    const [alerts, setAlerts] = useState([]);
    const [currentAlert, setCurrentAlert] = useState(null);

    // Fetch alerts for the vehicle
    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch(`/api/alerts/vehicle/${vehicleId}`);
                const data = await res.json();

                if (data.length > 0) {
                    setAlerts(data);
                    setCurrentAlert(data[0]); // show the latest alert
                }
            } catch (err) {
                console.error("Error fetching alerts:", err);
            }
        };

        fetchAlerts();

        // Poll every 10 seconds for new alerts
        const interval = setInterval(fetchAlerts, 10000);
        return () => clearInterval(interval);
    }, [vehicleId]);

    const handleClose = () => setCurrentAlert(null);

    return (
        <>
            {currentAlert && (
                <AlertModal
                    message={currentAlert.message}
                    severity={currentAlert.severity}
                    onClose={handleClose}
                />
            )}
        </>
    );
}

export default TelemetryAlerts;
