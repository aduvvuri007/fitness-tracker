import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const register = async (username, email, password) => {
        setLoading(true);

        const response = await fetch("api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });


        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
            console.log(error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // set the user in the context
            dispatch({ type: "LOGIN", payload: json });

            setLoading(false);
        }
    }

    return { register, loading, error };
}