import { Link, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem('access_token');
        navigate('/login');
    }

    return <>
    
        <div className="w-full flex justify-center">
            <div className="w-full xl:w-[1130px] border px-10 py-4">
                <div className="w-full flex justify-between">
                    <div className="text-xl font-bold"><Link to="/">Wallet</Link></div>
                    <div className="flex">
                        <ul className="flex gap-10">
                            <li><Link to="/transactions">Transactions</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><button onClick={() => handleLogout()}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default NavBar;