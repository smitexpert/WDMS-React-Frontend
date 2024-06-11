import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRouteComponent({children}) {

    const {authToken, checkToken} = useAuth();
    const [isAuth, setIsAuth] = useState(null);

    if(authToken == null) {
        checkToken()
    }

    const navigate = useNavigate();

    const getUserProfile = async () => {

        try {
            const response = await axios.get('/profile', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if(response)
                    setIsAuth('authorized');

        } catch (error) {


            setIsAuth('unauthorized');
            
            if(error.response.status === 401) {
                window.localStorage.removeItem('access_token');
                navigate('/login');
            }
            
            if(error.response.data.data.response_code == '40441') {
                navigate('/verify-email')
            } else if(error.response.data.data.response_code == '40442') {
                navigate('/mfa')
            }


            
        }

    }

    useEffect(() =>{
        if(authToken === null) {
            navigate('/login', {replace: true});
        }

        getUserProfile();
    }, [authToken]);

    if(isAuth === null) {
        return null;
    }

    return children;
}