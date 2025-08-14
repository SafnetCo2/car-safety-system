import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
    return (
        <div>
            <Navbar />
            <main className="home">
                <h2>Welcome to Smart Car Safety System</h2>
                <p>Real-time car safety and diagnostics at your fingertips.</p>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
