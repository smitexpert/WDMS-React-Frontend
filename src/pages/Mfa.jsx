import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mfa() {

    const [error, setError] = useState();
    const [code, setCode] = useState("");
    const {authToken} = useAuth();
    const [userMfaProviders, setUserMfaProviders] = useState([])
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [selectedProvider, setSelectedProvider] = useState(null)
    const navigate = useNavigate();

    const getUserMfaProviders = async () => {
        try {
            const response = await axios.get('/user-mfa-providers', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            setUserMfaProviders(response.data.data)
        } catch (error) {
            console.log(error.response.data);
        }
    }


    useEffect(() => {
        getUserMfaProviders()
    }, [authToken])


    const handleSendSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/mfa-send', {
                provider: selectedProvider
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            if(response)
                setIsCodeSent(true)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/mfa-code-verify', {
                code: code
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            if(response)
                navigate('/');
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    if(isCodeSent) {
        return <>
        <div className="w-full flex justify-center items-center min-h-[90vh] px-4">
          <div className="w-full border sm:w-[360px] p-4">
              
              <div className="w-full">
                  <p className="text-xl font-bold text-center">Verify Login</p>
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
                      <button type="button" className="text-sm" onClick={(e) => handleSendSubmit(e)}>Resend Code</button>
                  </div>
                  <div className="w-full mt-6">
                      <button className="w-full border px-6 py-2">Verify</button>
                  </div>
              </form>
          </div>
        </div>
      </>
    } else {
        return <>
          <div className="w-full flex justify-center items-center min-h-[90vh] px-4">
            <div className="w-full border sm:w-[360px] p-4">
                
                <div className="w-full">
                    <p className="text-xl font-bold text-center">Verify Login</p>
                </div>
                <form action="" onSubmit={(e) => handleSendSubmit(e)}>
                    
                    {error ? <>
                        <div className="w-full mt-6">
                        <p className="text-red-600 text-center">{error.message}</p>
                    </div>
                    </> : <></>}

                    <div className="w-full mt-6">
                        <p className="font-bold">Select Provider</p>
                        {userMfaProviders.map((provider, index) => <div className="w-full flex mt-2" key={index}>
                                <label htmlFor="" className="block text-left uppercase">{provider.provider}</label>
                                <input className="ml-2" type="radio" name="provider" value={provider.provider} onChange={(e) => setSelectedProvider(e.target.value)} />
                            </div> )}
                        
                    </div>
                    <div className="w-full mt-6">
                        {selectedProvider && <button className="w-full border px-6 py-2">Send</button>}
                    </div>
                </form>
            </div>
          </div>
        </>
    }

    
}

export default Mfa;