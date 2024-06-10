import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function Transactions() {
    const {authToken} = useAuth();
    const [transactions, setTransactions] = useState();


    const getUserTransactions = async () => {

        try {
            const response = await axios.get('/transactions', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if(response)
                setTransactions(response.data.data);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if(authToken != null)
            getUserTransactions();

    }, [authToken]);

    return <>
    <NavBar />
    <div className="w-full flex justify-center overflow-x-auto relative">
        <div className="w-full xl:w-[1130px] overflow-x-auto px-4 mt-10 relative">
            <p className="text-2xl font-bold">Transactions</p>

            <div className="w-full overflow-x-auto mt-12 relative">
                <table className="w-full">
                    <thead className="uppercase w-full">
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Create At</th>
                        </tr>
                    </thead>
                    <tbody className="uppercase w-full">
                        {transactions && transactions.map(item => <tr key={item.id}>
                            <td scope="col" className="text-center">{item.type}</td>
                            <td scope="col" className="text-center">{item.amount}</td>
                            <td scope="col" className="text-center">{item.created_at}</td>
                        </tr>)}
                        
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    </>
}