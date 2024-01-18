import { CgLogOff } from "react-icons/cg"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="bg-[#64cc4f] p-3 top-0 w-full rounded flex flex-row justify-between">
            <Link to={"/home"}>Work 2 Live </Link>
            <div><CgLogOff  size={30}/></div>
        </div>
    )
}