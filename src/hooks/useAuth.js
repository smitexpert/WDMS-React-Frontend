import { useEffect, useState } from "react";

function useAuth() {
    const [authToken, setAuthToken] = useState(null);

    function saveToken(access_token) {
        window.localStorage.setItem('access_token', access_token);
        setAuthToken(access_token);
    }

    const checkToken = () => {
        const access_token = window.localStorage.getItem('access_token') ?? null;
        if(access_token == null) {
            return;
        }

        setAuthToken(access_token);
    }

    const logout = () => {
        window.localStorage.removeItem('access_token');
    }

    useEffect(() => {
        checkToken();
    }, [authToken])

    return {authToken, checkToken, saveToken, logout};
}

export default useAuth;