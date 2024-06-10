import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Settings() {

    const {authToken} = useAuth();
    const [mfaProviders, setMfaProvider] = useState([]);
    const [userMfaProviders, setUserMfaProviders] = useState([])
    const [selectedProvider, setSelectedProvider] = useState(null);

    async function getMfaProviders() {
        try {
            const response = await axios.get('/available-mfa-providers', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if(response)
                setMfaProvider(response.data.data)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getUserMfaProviders() {
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
        if(authToken != null) {
            getMfaProviders()
            getUserMfaProviders()
        }
    }, [authToken])

    const handleMfaSave = async () => {

        try {
            const response = await axios.post('/mfa-enable', {
                provider: selectedProvider
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if(response)
                getUserMfaProviders()

        } catch (error) {
            console.log(error.response.data);
        }
    }

    const removeProviderHanlder = async (provider) => {

        try {
            const response = await axios.post('/mfa-enable', {
                _method: 'delete',
                provider: provider
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if(response)
                getUserMfaProviders()
        } catch (error) {
            console.log(error.response.data);
        }

    }

    return <>
    
        <NavBar />

        <div className="w-full flex justify-center mt-8">
            <div className="w-full xl:w-[1130px]">
                <div className="w-full">
                    <p className="text-3xl font-bold">Settings</p>
                </div>
                <div className="w-full mt-4">
                    <p className="text-xl font-bold">Add MFA</p>
                </div>
                <div className="w-full mt-4">
                    <p className="">Select MFA</p>
                    <select name="" id="" className="p-2 px-4" onChange={(e) => setSelectedProvider(e.target.value)}>
                        <option value="mail">Select Provider</option>
                        {mfaProviders.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
                {selectedProvider ? <>
                    <button className="mt-4 border px-6 py-1" onClick={() => handleMfaSave()}>Save</button>
                </> : <></>}


                <div className="w-full mt-6">
                    <p className="text-xl font-bold">Available MFA</p>
                    <div className="w-full mt-4">
                        {userMfaProviders && userMfaProviders.map((item, index) => <div key={index} className="w-[420px] flex justify-start items-center">
                                <div className="w-full mt-4 uppercase" key={item.provider}>{item.provider}</div>
                                <button onClick={() => removeProviderHanlder(item.provider)}>Remove</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Settings;