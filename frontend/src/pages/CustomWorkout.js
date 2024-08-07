import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from '../hooks/useAuthContext';
import ExercisePopup from '../components/ExercisePopup'; // Import the ExercisePopup component

function CustomWorkoutPlan() {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [exercises, setExercises] = useState([]);
    const [workoutPlan, setWorkoutPlan] = useState([{ day: 1, exercises: [] }]);
    const [error, setError] = useState(null);
    const maxDays = 7;
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing the popup
    const [selectedDay, setSelectedDay] = useState(null); // State to track selected day for popup

    useEffect(() => {
        fetch("/exercises.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setExercises(data.exercises);
            })
            .catch((error) => {
                console.error('Error fetching exercises:', error);
            });
    }, []);

    const handleAddDay = () => {
        if (workoutPlan.length < maxDays) {
            setWorkoutPlan([...workoutPlan, { day: workoutPlan.length + 1, exercises: [] }]);
        }
    };

    const handleRemoveDay = (dayIndex) => {
        const updatedPlan = workoutPlan.filter((_, index) => index !== dayIndex);
        setWorkoutPlan(updatedPlan.map((day, index) => ({ ...day, day: index + 1 })));
    };

    const handleAddExercise = (dayIndex, exercise) => {
        setWorkoutPlan(prevPlan => {
            const newPlan = [...prevPlan];
            if (newPlan[dayIndex].exercises.length < 10 && !newPlan[dayIndex].exercises.some(e => e.name === exercise.name)) {
                newPlan[dayIndex] = {
                    ...newPlan[dayIndex],
                    exercises: [...newPlan[dayIndex].exercises, { name: exercise.name }]
                };
            }
            return newPlan;
        });
    };

    const handleRemoveExercise = (dayIndex, exerciseIndex) => {
        const updatedPlan = workoutPlan.map((day, index) => {
            if (index === dayIndex) {
                return {
                    ...day,
                    exercises: day.exercises.filter((_, idx) => idx !== exerciseIndex)
                };
            }
            return day;
        });
        setWorkoutPlan(updatedPlan);
    };

    const handleSaveWorkout = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }

        const workout = {
            days: workoutPlan,
        };

        const response = await fetch('/api/workout/create-workout', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setWorkoutPlan([{ day: 1, exercises: [] }]);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    const openPopup = (dayIndex) => {
        setSelectedDay(dayIndex);
        setIsPopupOpen(true);
    };

    const handleExerciseSelect = (exercise) => {
        if (selectedDay !== null) {
            handleAddExercise(selectedDay, exercise);
        }
        setIsPopupOpen(false);
    };

    const handleAddExerciseButton = (dayIndex) => {
        openPopup(dayIndex);
    };

    return (
        <div>
            <h1>Custom Workout Plan</h1>
            <div>
                <button onClick={handleAddDay}>Add Day</button>
            </div>
            <div>
                <h2>Workout Plan</h2>
                {workoutPlan.map((day, dayIndex) => (
                    <div key={dayIndex}>
                        <h3>Day {dayIndex + 1} <button onClick={() => handleRemoveDay(dayIndex)}>Remove Day</button></h3>
                        <button onClick={() => handleAddExerciseButton(dayIndex)}>Add Exercise</button>
                        <ul>
                            {day.exercises.map((exercise, exerciseIndex) => (
                                <li key={exerciseIndex}>
                                    <Link
                                        to={{
                                            pathname: `/exercises/${encodeURIComponent(exercise.name)}`,
                                            state: { exercise }
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {exercise.name}
                                    </Link>
                                    <button onClick={() => handleRemoveExercise(dayIndex, exerciseIndex)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <ExercisePopup
                    onClose={() => setIsPopupOpen(false)}
                    onSelectExercise={handleExerciseSelect}
                />
            )}
            {workoutPlan.some(day => day.exercises.length > 0) && (
                <div>
                    <button onClick={handleSaveWorkout}>Save Workout</button>
                    {error && <div className="error">{error}</div>}
                </div>
            )}
        </div>
    );
}

export default CustomWorkoutPlan;