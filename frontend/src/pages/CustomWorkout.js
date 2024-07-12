import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomWorkout = () => {
    const [exercises, setExercises] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 10;
    const maxDays = 7;

    const [workoutPlan, setWorkoutPlan] = useState([[]]);

    useEffect(() => {
        fetch("/exercises.json")
            .then((res) => res.json())
            .then((data) => {
                setExercises(data.exercises);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);
    };

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAddExercise = (dayIndex, exercise) => {
        setWorkoutPlan(prevPlan => {
            const newPlan = [...prevPlan];
            if (newPlan[dayIndex].length < 10 && !newPlan[dayIndex].some(e => e.name === exercise.name)) {
                newPlan[dayIndex] = [...newPlan[dayIndex], exercise];
            }
            return newPlan;
        });
    };

    const handleRemoveExercise = (dayIndex, exerciseIndex) => {
        setWorkoutPlan(prevPlan => {
            const newPlan = [...prevPlan];
            newPlan[dayIndex] = newPlan[dayIndex].filter((_, idx) => idx !== exerciseIndex);
            return newPlan;
        });
    };

    const handleAddDay = () => {
        setWorkoutPlan(prevPlan => (prevPlan.length < maxDays ? [...prevPlan, []] : prevPlan));
    };

    const handleRemoveDay = (dayIndex) => {
        setWorkoutPlan(prevPlan => prevPlan.filter((_, idx) => idx !== dayIndex));
    };

    return (
        <div>
            <h1>Custom Workout Plan</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search exercises"
                    value={searchInput}
                    onChange={handleSearchChange}
                />
            </div>
            {searchInput && (
                <div>
                    {Array.from({ length: Math.ceil(filteredExercises.length / exercisesPerPage) }, (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
            {searchInput && (
                <div>
                    <ul>
                        {currentExercises.map(exercise => (
                            <li key={exercise.name}>
                                <Link to={{
                                    pathname: `/exercises/${encodeURIComponent(exercise.name)}`,
                                    state: { exercise }
                                }}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {exercise.name}
                                </Link>
                                {workoutPlan.map((_, dayIndex) => (
                                    <button key={dayIndex} onClick={() => handleAddExercise(dayIndex, exercise)}>
                                        Add to Day {dayIndex + 1}
                                    </button>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                {workoutPlan.length < maxDays && <button onClick={handleAddDay}>Add Day</button>}
            </div>
            <div>
                <h2>Workout Plan</h2>
                {workoutPlan.map((day, dayIndex) => (
                    <div key={dayIndex}>
                        <h3>Day {dayIndex + 1} <button onClick={() => handleRemoveDay(dayIndex)}>Remove Day</button></h3>
                        <ul>
                            {day.map((exercise, exerciseIndex) => (
                                <li key={exerciseIndex}>
                                    <Link to={{
                                        pathname: `/exercises/${encodeURIComponent(exercise.name)}`,
                                        state: { exercise }
                                    }}
                                        target="_blank"
                                        rel="noopener noreferrer">
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
        </div>
    );
}

export default CustomWorkout;