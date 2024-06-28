import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ExerciseDetails = () => {
    const { name } = useParams();
    const decodedName = decodeURIComponent(name);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("/exercises.json")
            .then((res) => res.json())
            .then((data) => {
                setExercises(data.exercises);
            });
    }, []);

    const exercise = exercises.find(exercise => exercise.name === decodedName);

    if (!exercise) {
        return <div>Exercise not found</div>;
    }

    return (
        console.log(exercise),
        <div>
            <h1>{exercise.name}</h1>
            <p><strong>Force:</strong> {exercise.force}</p>
            <p><strong>Level:</strong> {exercise.level}</p>
            <p><strong>Mechanic:</strong> {exercise.mechanic}</p>
            <p><strong>Equipment:</strong> {exercise.equipment}</p>
            <p><strong>Primary Muscles:</strong> {exercise.primaryMuscles.join(', ')}</p>
            <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles.join(', ')}</p>
            <p><strong>Category:</strong> {exercise.category}</p>
            <h2>Instructions:</h2>
            <ol>
                {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </div>
    );
};

export default ExerciseDetails;
