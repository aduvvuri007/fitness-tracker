import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Workout = () => {
    const [workout, setWorkout] = useState(null);
    const [recommendations, setRecommendations] = useState({});

    const fetchPPLWorkout = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/generate_ppl_workout');
            setWorkout(response.data);
        } catch (error) {
            console.error('Error fetching PPL workout', error);
        }
    };

    const fetchArnoldWorkout = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/generate_arnold_workout');
            setWorkout(response.data);
        } catch (error) {
            console.error('Error fetching Arnold workout', error);
        }
    };

    const fetchRecommendations = async (exercise) => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/generate_other_exercises`, { exercise }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRecommendations((prev) => ({
                ...prev,
                [exercise]: response.data
            }));
        } catch (error) {
            console.error('Error fetching recommendations', error);
        }
    };

    const replaceExercise = (day, oldExercise, newExercise) => {
        const newWorkout = { ...workout };
        newWorkout[day] = newWorkout[day].map(exercise =>
            exercise === oldExercise ? newExercise : exercise
        );
        setWorkout(newWorkout);
        setRecommendations(prev => ({ ...prev, [oldExercise]: [] })); // Remove recommendations
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
                                    <li key={exercise}>
                                        <Link to={{
                                            openInNewTab: true,
                                            pathname: `/exercises/${encodeURIComponent(exercise)}`,
                                            state: { exercise }
                                        }}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {exercise}
                                        </Link>
                                        <button onClick={() => fetchRecommendations(exercise)}>Get Recommendations</button>
                                        {recommendations[exercise] && recommendations[exercise].length > 0 && (
                                            <div>
                                                <button onClick={() => setRecommendations(prev => ({ ...prev, [exercise]: [] }))}>
                                                    Hide Recommendations
                                                </button>
                                                <ul>
                                                    {recommendations[exercise].map(rec => (
                                                        <li key={rec}>
                                                            <Link to={{
                                                                pathname: `/exercises/${encodeURIComponent(rec)}`,
                                                                state: { rec }
                                                            }}
                                                                target="_blank"
                                                                rel="noopener noreferrer">
                                                                {rec}
                                                            </Link>
                                                            <button onClick={() => replaceExercise(day, exercise, rec)}>Replace</button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
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