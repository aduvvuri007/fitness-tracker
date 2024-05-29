import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="hero">
            <div className="home-content">
                <h1>Fitness Tracker</h1>
                <button><Link to="/login">Login</Link></button>
                <br />
                <button><Link to="/register">Register</Link></button>
            </div>
        </section>
    );
}
export default Home;