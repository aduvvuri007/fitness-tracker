import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Create a Weightlifting Workout for UMD Students</h1>
            </header>
            <div className="dashboard-content">
                <div className="card">
                    <h2>Create Custom Workout (No AI)</h2>
                    <p>You can customize a workout the way you want it</p>
                </div>
                <div className="card">
                    <h2>Create Push/Pull/Legs Split (with AI)</h2>
                    <p>Day 1: Chest + Shoulders + Triceps</p>
                    <p>Day 2: Back + Biceps</p>
                    <p>Day 3: Legs</p>
                </div>
                <div className="card">
                    <h2>Create Arnold Split (with AI)</h2>
                    <p>Day 1: Chest + Back</p>
                    <p>Day 2: Shoulder + Arms</p>
                    <p>Day 3: Legs</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;