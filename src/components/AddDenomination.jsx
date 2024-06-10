import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function AddDenomination({wallet, updateUserWallet}) {

    const {authToken} = useAuth();
    const [name, setName] = useState("");
    const [denomination, setDenomination] = useState("");
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/denomination/add', {
                wallet_id: wallet?.id,
                name: name,
                denomination: denomination,
                quantity: quantity
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })

            if(response)
                updateUserWallet()

            setName("")
            setDenomination("")
            setQuantity(0)
        } catch (error) {
            console.log(error.response.data.data);
        }
    }

    return <>
                <div className="w-full">
                  <p className="text-sm font-bold">Add Denomination</p>
        
                  <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="w-full flex gap-10 mt-10">
                        <div className="">
                            <label className="w-full block" htmlFor="">Name</label>
                            <input type="text" className="w-full border px-4 py-2" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="w-full block" htmlFor="">Denomination</label>
                            <input type="number" min={0} step={0.01} className="w-full border px-4 py-2" value={denomination} onChange={(e) => setDenomination(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="w-full block" htmlFor="">Quantity</label>
                            <input type="number" min={0} className="w-full border px-4 py-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <button className="border px-8 py-3">Save</button>
                    </div>
                  </form>

                </div>
    </>
}

export default AddDenomination;