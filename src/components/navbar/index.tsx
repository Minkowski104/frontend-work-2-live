import { CgLogOff } from "react-icons/cg"
import { Link } from "react-router-dom"

export const NavBar = () => {
    return (
        <div className="bg-[#b2e05b] p-3 top-0 w-full rounded flex flex-row justify-between">
            <Link to={"/home"} className="text-[#222222] decoration-none hover:text-[#328336]">Work 2 Live </Link>
            <div><CgLogOff  size={30}/></div>
        </div>
    )
}