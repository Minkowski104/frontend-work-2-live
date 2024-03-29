import { useEffect, useRef, useState } from "react"
import { BsPerson } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import Tooltip from "../tooltip";
import { FaRegBuilding } from "react-icons/fa6";

export const NavBar = () => {

    const [userDropDown, setUserDropDown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [showProfileButton, setShowProfileButton] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/newuser") {
            setShowProfileButton(false);
        } else {
            setShowProfileButton(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setUserDropDown(false);
            }
        });
    }, []);

    return (
        <div className="bg-w2l-green p-3 top-0 w-full rounded flex flex-row justify-between">
            <Link to={"/home"} className="text-[#222222] decoration-none hover:text-w2l-green">Work 2 Live </Link>
            <Tooltip text="Companies">
                <Link to={"/home"} className="text-[#222222] decoration-none hover:text-w2l-green"><FaRegBuilding className="" size={25}/></Link>
            </Tooltip>
            {showProfileButton && 
            <div className="relative" ref={dropdownRef}>
                <button className="text-white bg-w2l-green p-2 rounded-full" onClick={() => setUserDropDown(!userDropDown)}><BsPerson/></button>
                {userDropDown ? <UserDropDown /> : null}
            </div>}
        </div>
    )
}

const UserDropDown = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login')
        toast.success("Logout Success")
    }
    
    return(
    <div className="absolute flex flex-col gap-2 right-0 rounded-md bg-white p-3 ">
    <div className="text-nowrap cursor-pointer" onClick={() => {navigate('/profile')}}>My Profile</div>
    {
        localStorage.getItem('token') !== null
        ?<div className="text-nowrap cursor-pointer" onClick={logout}>Logout</div>
        :<div className="text-nowrap cursor-pointer" onClick={() => navigate('/login')}>Login</div>
    }
    </div>)

}