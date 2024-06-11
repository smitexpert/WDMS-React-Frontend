import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "axios";


export default function ManageDenomination ({wallet, updateUserWallet}) {

    const [denominations, setDenomination] = useState([])
    const {authToken} = useAuth();

    const getUserDenomination = async (url = false) => {

      const fullUrl = (url === false) ? `wallets/${wallet.id}/denominations` : url;

        try {
          const response = await axios.get(fullUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          })
    
          if(response)
            setDenomination(response.data.data)
        } catch (error) {
          console.log(error);
        }
    
      }

    const removeUserDenomination = async (denomination) => {
        try {
            const response = await axios.post(`denomination/remove`, {
                wallet_id: wallet.id,
                denomination_id: denomination.id
            }, {
              headers: {
                'Authorization': `Bearer ${authToken}`
              }
            })
      
      
            if(response){
                updateUserWallet(wallet)
                getUserDenomination()
            }
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        if(authToken != null && wallet?.id !== undefined)
            getUserDenomination()

    }, [authToken, wallet])

    return <>
                <div className="w-full">
                  <p className="text-sm font-bold">Manage Denominations</p>

                  <div className="w-full mt-4">
                    <table className="w-full overflow-x-auto">
                        <thead className="w-full">
                            <tr className="w-full">
                                <th>Name</th>
                                <th>Denomination</th>
                                <th className="text-center">Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {denominations && denominations?.data && denominations?.data.map(item => <tr className="w-full" key={item.id}>
                                <td scope="col" className="text-center">{item.name}</td>
                                <td scope="col" className="text-center">{item.denomination}</td>
                                <td scope="col" className="text-center">{item.quantity}</td>
                                <td className="text-center">
                                    <button onClick={() => removeUserDenomination(item)}>Remove</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>

                    <div className="w-full flex justify-center gap-10 mt-6">
                    <button className="border text-sm px-2 disabled:text-gray-400" onClick={() => getUserDenomination(denominations?.prev_page_url)} disabled={denominations?.prev_page_url == null ? true : false} >Prev</button>
                    <button className="border text-sm px-2 disabled:text-gray-400" onClick={() => getUserDenomination(denominations?.next_page_url)} disabled={denominations?.next_page_url == null ? true : false}>Next</button>
                </div>
                  </div>
                </div>
            </>
}