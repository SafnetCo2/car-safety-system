import React from "react";

function DriverCard({ driver }) {
    return (
        <div className="driver-card">
            <p><strong>{driver.name}</strong> ({driver.licenseNumber})</p>
            <p>Vehicle: {driver.vehicleType}</p>

            {driver.vin && <p>VIN: {driver.vin}</p>}
            {driver.model && <p>Model: {driver.model}</p>}
            {driver.year && <p>Year: {driver.year}</p>}
            {driver.fuelType && <p>Fuel Type: {driver.fuelType}</p>}
        </div>
    );
}

export default DriverCard;
