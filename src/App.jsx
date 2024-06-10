import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import axios from "axios";
import useAuth from "./hooks/useAuth";
import AddDenomination from "./components/AddDenomination";
import ManageDenomination from "./components/ManageDenomination";

function App() {

  const {authToken} = useAuth();
  const [wallets, setWallets] = useState([]);

  const getUserWallets = async () => {

    try {
      const response = await axios.get('/wallets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if(response)
          setWallets(response.data.data)
    } catch (error) {
      console.log(error.response.data);
    }

  }


  useEffect(() => {
    if(authToken != null)
      getUserWallets()

  }, [authToken])


  return (
    <>
      <NavBar />
      
      <div className="w-full flex justify-center mt-12">
        <div className="w-full xl:w-[1130px] px-4 flex justify-center">
          <div className="w-full">
            <div className="w-full">
              <p className="text-xl">Available Wallet and Balance</p>
            </div>
            <div className="w-full grid grid-cols-6 gap-4 mt-4">

              {wallets.map(item => <div key={item.id} className="w-full flex justify-center border p-4">
                  <p className="font-bold">{item.currency.name}: {item.balance}</p>
              </div>)}
              
              
            </div>

            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12">
              <div className="w-full">

                <ManageDenomination wallet={wallets[0]} updateUserWallet={getUserWallets} />

              </div>

              <div className="w-full">

                <AddDenomination wallet={wallets[0]} updateUserWallet={getUserWallets} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
