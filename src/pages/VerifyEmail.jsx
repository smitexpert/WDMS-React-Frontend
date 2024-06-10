import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


function VerifyEmail() {

    const [code, setCode] = useState("");
    const [error, setError] = useState(false);
    const {authToken} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        try {
            
            const response = await axios.post('/verify-email', {
                code: code
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            
            if(response) {
                navigate('/', {replace: true})
            }
        } catch (error) {
            setError(error.response.data);
        }
    }


    const handleResendEmail = async (e) => {
        e.preventDefault();
        setError(false);

        try {
            
            const response = await axios.post('/resend-verify-email', {}, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            
            if(response.data.data.success) {
                return response
            }
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <>
          <div className="w-full flex justify-center items-center min-h-[90vh]">
            <div className="w-full border sm:w-[360px] p-4">
                
                <div className="w-full">
                    <p className="text-xl font-bold text-center">Verify Email</p>
                </div>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    
                    {error ? <>
                        <div className="w-full mt-6">
                        <p className="text-red-600 text-center">{error.message}</p>
                    </div>
                    </> : <></>}

                    <div className="w-full mt-6">
                        <label htmlFor="" className="block text-left">Enter Verification Code</label>
                        <input type="text" className="w-full border text-center text-xl p-2" value={code} onChange={(e) => {setCode(e.target.value)}} />
                    </div>
                    <div className="w-full mt-2 flex justify-end">
                        <button type="button" className="text-sm" onClick={(e) => handleResendEmail(e)}>Resend Email</button>
                    </div>
                    <div className="w-full mt-6">
                        <button className="w-full border px-6 py-2">Verify</button>
                    </div>
                </form>
            </div>
          </div>
        </>
      )
}

export default VerifyEmail;