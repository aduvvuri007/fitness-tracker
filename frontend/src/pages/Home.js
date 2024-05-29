import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="hero">
            <div className="home-content">
                <h1>Fitness Tracker</h1>
                <Link to="/login">Login</Link>
                {/* <br />
            <Link to="/register">Register</Link> */}
                <p>Click on the links above to login or register.</p>
            </div>
        </section>
    );
}
export default Home;