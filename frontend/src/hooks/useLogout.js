import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";


export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchWorkouts } = useWorkoutsContext();

    const logout = () => {
        // Remove the token from the local storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        dispatchWorkouts({ type: "SET_WORKOUTS", payload: [] });
    };

    return { logout };
}