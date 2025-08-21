import React from "react";

export default function KPISection({ kpis }) {
    return (
        <div className="stats-grid">
            {kpis.map((kpi, index) => (
                <div key={index} className="stat-card">
                    <h3>{kpi.title}</h3>
                    <p>{kpi.value}</p>
                </div>
            ))}
        </div>
    );
}
