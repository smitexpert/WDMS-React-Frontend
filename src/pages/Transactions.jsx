import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import moment from "moment";

export default function Transactions() {
    const {authToken} = useAuth();
    const [transactions, setTransactions] = useState();


    const getUserTransactions = async (url = false) => {

        const fullUrl = (url === false) ? '/transactions' : url;

        try {
            const response = await axios.get(fullUrl, {
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
                <table className="w-full border">
                    <thead className="uppercase w-full">
                        <tr className="border">
                            <th scope="col" className="border text-left pl-4">Type</th>
                            <th scope="col" className="border text-left pl-4">Wallet (CUR)</th>
                            <th scope="col" className="border text-left pl-4">Amount</th>
                            <th scope="col" className="border text-right pr-4">Create At</th>
                        </tr>
                    </thead>
                    <tbody className="uppercase w-full border">
                        {transactions && transactions.data.map(item => <tr className="border" key={item.id}>
                            <td scope="col" className="border text-left pl-4">{item.type}</td>
                            <td scope="col" className="border text-left pl-4">{item.wallet.currency.name}</td>
                            <td scope="col" className="border text-left pl-4">
                                {item.type && item.type == "add" ? <p className="flex text-green-600 font-semibold">+ {item.amount}</p> : <p className="flex text-red-600 font-semibold">- {item.amount}</p>}
                            </td>
                            <td scope="col" className="text-right border pr-4">{ moment(item.created_at).format("ddd, MM D, YYYY h:mm A") }</td>
                        </tr>)}
                        
                    </tbody>
                </table>

                <div className="w-full flex justify-center gap-10 mt-6">
                    <button className="border text-sm px-2 disabled:text-gray-400" onClick={() => getUserTransactions(transactions?.prev_page_url)} disabled={transactions?.prev_page_url == null ? true : false} >Prev</button>
                    <button className="border text-sm px-2 disabled:text-gray-400" onClick={() => getUserTransactions(transactions?.next_page_url)} disabled={transactions?.next_page_url == null ? true : false}>Next</button>
                </div>
            </div>

        </div>
    </div>

    </>
}