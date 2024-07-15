import React, { useState, useEffect } from "react";

const ExercisePopup = ({ onClose, onSelectExercise }) => {
    const [exercises, setExercises] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 10;

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
        <div className="popup">
            <div className="popup-inner">
                <button onClick={onClose}>Close</button>
                <input
                    type="text"
                    placeholder="Search exercises"
                    value={searchInput}
                    onChange={handleSearchChange}
                />
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
                    <div className="exercise-list">
                        <ul>
                            {currentExercises.map(exercise => (
                                <li key={exercise.name} onClick={() => onSelectExercise(exercise)}>
                                    <span>{exercise.name}</span>
                                    <button>Add</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExercisePopup;
