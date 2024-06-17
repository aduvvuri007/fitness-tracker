import React, { useState } from 'react';
import axios from 'axios';

const Workout = () => {
    const [workout, setWorkout] = useState(null);

    const fetchPPLWorkout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/generate_ppl_workout');
            setWorkout(response.data);
        } catch (error) {
            console.error('Error fetching PPL workout', error);
        }
    };

    const fetchArnoldWorkout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/generate_arnold_workout');
            setWorkout(response.data);
        } catch (error) {
            console.error('Error fetching Arnold workout', error);
        }
    };

    return (
        <div>
            <h1>Workout Generator</h1>
            <button onClick={fetchPPLWorkout}>Generate PPL Workout</button>
            <button onClick={fetchArnoldWorkout}>Generate Arnold Workout</button>

            {workout && (
                <div>
                    <h2>Workout Plan</h2>
                    {Object.keys(workout).map(day => (
                        <div key={day}>
                            <h3>{day.charAt(0).toUpperCase() + day.slice(1)} Exercises</h3>
                            <ul>
                                {workout[day].map(exercise => (
                                    <li key={exercise}>{exercise}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Workout;