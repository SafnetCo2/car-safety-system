// src/pages/IncidentsPage.js
import React, { useState } from "react";
import IncidentForm from "../components/IncidentForm";
import IncidentList from "../components/IncidentList";

function IncidentsPage() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Driver Incidents</h1>
            <IncidentForm onIncidentAdded={() => setRefresh(!refresh)} />
            <IncidentList key={refresh} />
        </div>
    );
}

export default IncidentsPage;
