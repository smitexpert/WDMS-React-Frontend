import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";



function Register() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const {authToken, saveToken} = useAuth();
    const navigate = useNavigate();

    if(authToken!= null) {
        navigate('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(false);
        
        try {
            const response = await axios.post('/register', {
                email: email,
                password:  password,
                password_confirmation: password,
                name: name
            });

            saveToken(response.data.data.access_token);

            if(response.data.data.is_email_verified == false) {
                navigate('/verify-email');
            } else if(response.data.data.mfa_provider.length > 0) {
                navigate('/mfa');
            } else {
                navigate('/', {replace: true});
            }
            
        } catch (error) {
            setError(error.response.data);
        }

    }

    return <>
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="w-full md:w-1/3 border">
                <form action="" onSubmit={(e) => {handleSubmit(e)}}>
                <div className="w-full flex flex-wrap p-4">
                    <div className="w-full mb-4">
                        <p className="text-xl">Register</p>
                    </div>
                    {error ? <>
                        <div className="w-full mb-4">
                            <p className="text-red-400">{error.message}</p>
                        </div>
                    </> : <></>}
                    <div className="w-full mb-4">
                        <label className="block w-full text-left" htmlFor="">Name</label>
                        <input type="text" className="border w-full px-4 py-2 mt-2" value={name} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block w-full text-left" htmlFor="">Email</label>
                        <input type="text" className="border w-full px-4 py-2 mt-2" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block w-full text-left" htmlFor="">Password</label>
                        <input type="password" className="border w-full px-4 py-2 mt-2" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>

                    <div className="w-full mb-4">
                        <button className="border px-6 py-2" onClick={(e) => {handleSubmit(e)}}>Register</button>
                    </div>
                    <div className="w-full mb-4 mt-4">
                        <Link className="text-left w-full block" to="/login">Login your account.</Link>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </>
}

export default Register;