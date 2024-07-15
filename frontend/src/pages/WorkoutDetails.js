import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [workout, setWorkout] = useState(null);

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(`/api/workout/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                setWorkout(json);
            }
        };

        if (user) {
            fetchWorkout();
        }
    }, [id, user]);

    if (!workout) return <div>Loading...</div>;

    return (
        <div>
            <h1>Workout Details</h1>
            <h2>Workout created on {new Date(workout.createdAt).toLocaleDateString()}</h2>
            {workout.days.map((day) => (
                <div key={day.day}>
                    <h3>Day {day.day}</h3>
                    <ul>
                        {day.exercises.map((exercise, index) => (
                            <li key={index}>
                                <strong>{exercise.name}</strong>: {exercise.sets} sets of {exercise.reps} reps
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default WorkoutDetails;