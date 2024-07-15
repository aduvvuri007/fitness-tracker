import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutList = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

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

    return (
        <div>
            <h1>List of Workouts</h1>
            {workouts.map((workout) => (
                <div key={workout._id}>
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
            ))}
        </div>
    );
}

export default WorkoutDetails;