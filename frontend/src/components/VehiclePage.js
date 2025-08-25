import React, { useState } from "react";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";

function VehiclePage() {
    const [refreshVehicles, setRefreshVehicles] = useState(0);

    return (
        <div>
            <VehicleForm onSubmit={() => setRefreshVehicles(prev => prev + 1)} />
            <VehicleList refresh={refreshVehicles} />
        </div>
    );
}

export default VehiclePage;
