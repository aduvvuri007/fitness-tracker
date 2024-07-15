import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useNavigate } from "react-router-dom";

const WorkoutList = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch(`/api/workout/get-workouts`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        if (user) {
            fetchWorkout()
        }
    }, [dispatch, user]);

    const handleCardClick = (workout) => {
        navigate(`/workout/${workout._id}`);
    }

    const handleDelete = async (workoutId) => {
        console.log(workoutId)
        const response = await fetch(`/api/workout/${workoutId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: { _id: workoutId } });
        }
    }

    return (
        <div>
            <h1>List of Workouts</h1>
            {workouts && workouts.length > 0 ? (
                workouts.map((workout) => (
                    <div
                        key={workout._id}
                        className="workout-card"
                        onClick={() => handleCardClick(workout)}
                    >
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
                        <button
                            className="remove-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(workout._id);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p>Create some workouts to see them here.</p>
            )}
        </div>
    );
}

export default WorkoutList;