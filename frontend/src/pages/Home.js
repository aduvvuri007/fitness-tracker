import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="hero">
            <div className="home-content">
                <h1>Fitness Tracker</h1>
                <div className="button-container">
                    <button><Link to="/login">Login</Link></button>
                    <button><Link to="/register">Register</Link></button>
                </div>
            </div>
        </section>
    );
}
export default Home;