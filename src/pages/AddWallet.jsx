import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddWallet() {

    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState(false);
    const {authToken} = useAuth();

    const navigate = useNavigate();

    const getCurrencies = async () => {
        
        try {
            const response = await axios.get('/available-currencies', {
                headers: {
                    Authorization: 'Bearer ' + authToken
                }
            });

            if(response)
                setCurrencies(response.data.data)

        } catch (error) {
            console.log(error.response);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/wallets', {
                currency_id: selectedCurrency
            }, {
                headers: {
                    Authorization: 'Bearer '+ authToken
                }
            });

            if(response)
                console.log(response);

            navigate('/');

        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        if(authToken != null) {
            getCurrencies();
        }
    }, [authToken])

    return <>
        <NavBar />

        <div className="w-full flex justify-center mt-8">
            <div className="w-full xl:w-[1130px]">
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="w-full flex">
                        <div className="">
                            <label htmlFor="">Select Currency</label>
                            <select className="border w-full px-4 py-2 mt-2" onChange={(e) => setSelectedCurrency(e.target.value)}>
                                <option value="">Select Currency</option>
                                {currencies && currencies.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex mt-4">
                        <button className="border px-6 py-2 disabled:text-gray-400" disabled={selectedCurrency == false}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}