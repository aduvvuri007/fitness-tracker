import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import ExercisePopup from '../components/ExercisePopup';

const WorkoutDetails = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [workout, setWorkout] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

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

    const handleAddExerciseClick = (day) => {
        setSelectedDay(day);
        setIsPopupOpen(true);
    };

    const handleExerciseSelect = async (exercise) => {
        if (!workout) return;

        const updatedWorkout = { ...workout };
        const day = updatedWorkout.days.find(d => d.day === selectedDay);
        if (day) {
            day.exercises.push({ name: exercise.name, sets: 0, reps: 0 });

            // Update the workout in the backend
            const response = await fetch(`/api/workout/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(updatedWorkout),
            });

            const json = await response.json();

            if (response.ok) {
                setWorkout(json);
            }
        }

        setIsPopupOpen(false);
    };

    const handleInputChange = async (day, index, field, value) => {
        const updatedWorkout = { ...workout };
        const dayData = updatedWorkout.days.find(d => d.day === day);

        if (dayData) {
            dayData.exercises[index][field] = value;

            // Update the workout in the backend
            const response = await fetch(`/api/workout/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(updatedWorkout),
            });

            const json = await response.json();

            if (response.ok) {
                setWorkout(json);
            }
        }
    };

    const handleDeleteExerciseClick = async (day, index) => {
        if (!workout) return;

        const updatedWorkout = { ...workout };
        const dayData = updatedWorkout.days.find(d => d.day === day);

        if (dayData) {
            dayData.exercises.splice(index, 1);

            // Update the workout in the backend
            const response = await fetch(`/api/workout/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(updatedWorkout),
            });

            const json = await response.json();

            if (response.ok) {
                setWorkout(json);
            }
        }
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <div>
            <h1>Workout Details</h1>
            <h2>Workout created on {new Date(workout.createdAt).toLocaleDateString()}</h2>
            {workout.days.map((day, dayIndex) => (
                <div key={day.day}>
                    <h3>Day {day.day}</h3>
                    <ul>
                        {day.exercises.map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex}>
                                <strong>{exercise.name}</strong>:
                                <input
                                    type="number"
                                    value={exercise.sets}
                                    onChange={(e) => handleInputChange(day.day, exerciseIndex, 'sets', e.target.value)}
                                    min="0"
                                /> sets of
                                <input
                                    type="number"
                                    value={exercise.reps}
                                    onChange={(e) => handleInputChange(day.day, exerciseIndex, 'reps', e.target.value)}
                                    min="0"
                                /> reps
                                <button onClick={() => handleDeleteExerciseClick(day.day, exerciseIndex)}> Delete Exercise </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleAddExerciseClick(day.day)}>Add Exercise</button>
                </div>
            ))}

            {isPopupOpen && (
                <ExercisePopup
                    onClose={() => setIsPopupOpen(false)}
                    onSelectExercise={handleExerciseSelect}
                />
            )}
        </div>
    );
};

export default WorkoutDetails;
