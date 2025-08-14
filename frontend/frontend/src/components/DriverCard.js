import React from "react";


function DriverCard({ name, licenseNumber, vehicleType }) {
    return (
        <div className="driver-card">
            <h3>{name}</h3>
            <p><strong>License:</strong> {licenseNumber}</p>
            <p><strong>Vehicle:</strong> {vehicleType}</p>
        </div>
    );
}

export default DriverCard;
