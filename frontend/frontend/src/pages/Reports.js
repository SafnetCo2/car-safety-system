import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reports() {
    return (
        <div>
            <Navbar />
            <main className="reports">
                <h2>Reports</h2>
                <p>View and download driver reports here.</p>
            </main>
            <Footer />
        </div>
    );
}

export default Reports;
