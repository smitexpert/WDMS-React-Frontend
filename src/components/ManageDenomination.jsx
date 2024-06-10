import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "axios";


export default function ManageDenomination ({wallet, updateUserWallet}) {

    const [denominations, setDenomination] = useState([])
    const {authToken} = useAuth();

    const getUserDenomination = async () => {

        try {
          const response = await axios.get(`wallets/${wallet.id}/denominations`, {
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
                updateUserWallet()
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
                            {denominations && denominations.map(item => <tr className="w-full" key={item.id}>
                                <td scope="col" className="text-center">{item.name}</td>
                                <td scope="col" className="text-center">{item.denomination}</td>
                                <td scope="col" className="text-center">{item.quantity}</td>
                                <td className="text-center">
                                    <button onClick={() => removeUserDenomination(item)}>Remove</button>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                  </div>
                </div>
            </>
}