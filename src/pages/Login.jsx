import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {saveToken} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', {
                email: email,
                password:  password
            });

            console.log(response.data.data);
            saveToken(response.data.data.access_token);

            if(response.data.data.is_email_verified == false) {
                navigate('/verify-email');
            } else if(response.data.data.mfa_provider.length > 0) {
                navigate('/mfa');
            } else {
                navigate('/', {replace: true});
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <div className="w-full h-[90vh] flex justify-center items-center">
            <div className="w-full md:w-1/3 border">
                <form action="" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="w-full flex flex-wrap p-4">
                        <div className="w-full mb-4">
                            <p className="text-xl">Login</p>
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
                            <button className="border px-6 py-2">Login</button>
                        </div>
                        <div className="w-full mb-4 mt-4">
                            <Link className="text-left w-full block" to="/register">Register new account</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Login;