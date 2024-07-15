import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Create a Weightlifting Workout</h1>
            </header>
            <div className="dashboard-content">
                <div className="card" onClick={() => navigate("/custom-workout")}>
                    <h2>Create Custom Workout (No AI)</h2>
                    <p>You can customize a workout the way you want it!</p>
                </div>
                <div className="card" onClick={() => navigate("/workout")}>
                    <h2>Create Push/Pull/Legs Or Arnold Split (with AI)</h2>
                    <p>Let the AI create a workout for you and you can modify it as you see fit!</p>
                </div>
                <div className="card" onClick={() => navigate("/exercises")}>
                    <h2>Exercise Glossary</h2>
                    <p>Full List of all our exercises</p>
                </div>
                <div className="card" onClick={() => navigate("/workouts")}>
                    <h2>Your Workouts</h2>
                    <p>Full List of all your workouts</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;