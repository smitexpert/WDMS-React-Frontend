import React, { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import axios from "axios";
import useAuth from "./hooks/useAuth";
import AddDenomination from "./components/AddDenomination";
import ManageDenomination from "./components/ManageDenomination";
import { Link } from "react-router-dom";

function App() {

  const {authToken} = useAuth();
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(false);

  const getUserWallets = async (updateWallet = false) => {

    setSelectedWallet(false)

    try {
      const response = await axios.get('/wallets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if(response)
          setWallets(response.data.data)

      if(updateWallet)
          setSelectedWallet(updateWallet)

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
              <p className="text-sm">Select Wallet to show Denomination</p>
            </div>
            <div className="w-full grid grid-cols-2 xl:grid-cols-6 gap-4 mt-4">

              {wallets.map(item => <div key={item.id} onClick={() => setSelectedWallet(item)} className={`w-full flex justify-center items-center border p-4 cursor-pointer ${selectedWallet?.id == item.id ? 'border-blue-800 border-[2px]' : ''}`}>
                  <p className="font-bold">{item.currency.name}: {item.balance}</p>
              </div>)}
              
              <Link to="/add-wallet" className={`w-full flex justify-center border p-4 cursor-pointe`}>
                  <p className="font-bold text-lime-600 flex items-center gap-2"><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13v3q0 .425.288.713T12 17t.713-.288T13 16v-3h3q.425 0 .713-.288T17 12t-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7t-.712.288T11 8v3H8q-.425 0-.712.288T7 12t.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg></span> Add Wallet</p>
              </Link>
              
            </div>

            {selectedWallet && <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12">
              <div className="w-full">

                <ManageDenomination wallet={selectedWallet} updateUserWallet={getUserWallets} />

              </div>

              <div className="w-full">

                <AddDenomination wallet={selectedWallet} updateUserWallet={getUserWallets} />

              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
