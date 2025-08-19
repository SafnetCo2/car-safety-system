import React from "react";


function DriverCard({ name, licenseNumber, vehicleType, vin, model,year,fuelType }) {
    return (
        <div className="driver-card">
            <h3>{name}</h3>
            <p><strong>License:</strong> {licenseNumber}</p>
            <p><strong>Vehicle:</strong> {vehicleType}</p>
            <p><strong>VIN:</strong>{vin}</p>
            <p><strong>Model</strong>{model}</p>
            <p><strong>Year</strong>{year}</p>
            <p><strong>Fuel Type</strong>{fuelType}</p>
        </div>
    );
}

export default DriverCard;
