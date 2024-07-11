import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ExerciseList() {
    const [exercises, setExercises] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 30;

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

    return (
        <div>
            <h1>Exercise List</h1>
            <div>
                {Array.from({ length: Math.ceil(filteredExercises.length / exercisesPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
            <input
                type="text"
                placeholder="Search exercises"
                value={searchInput}
                onChange={handleSearchChange}
            />
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ExerciseList;
