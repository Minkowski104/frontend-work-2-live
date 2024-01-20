import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom"; 
import { getCompanies } from "../api/company";
import { Modal } from "../components/dialog";

type Company = {
    name: string;
    rating: number;
    description: string;
  };
export const HomePage = () => {
    const [comp, setComp] = useState<Company[]>([]);
    const navigate = useNavigate();
    const [logInModalOpen, setLogInModalOpen] = useState(true);
    useEffect(() => {
        getCompanies((data) => {
            setComp(data as Company[])
        })
    }, [])
    const Rating = (value:number) => (
        <div className="flex flex-row">
          {[...Array(10)].map((_, index) => (
            <FaStar
              key={index}
              className={index < value ? 'text-yellow-500' : 'text-gray-400'}
            />
          ))}
        </div>
    )
    return (
        <>
        <div className="h-full w-full flex flex-col items-center">
            <div className="bold text-3xl bg-[#b2e05b] p-3 w-full flex flew-row justify-between">
                <div>Home Page</div>
                <Link to={"/addcompany"} className="float-right text-xl align-middle text-[#222222] decoration-none hover:text-[#328336]">Add Company +</Link>
            </div>
            
            {comp.map((element) =>{ return (
                <div className="h-36 border-4 border rounded w-2/3 text-left p-1 m-1 text-xl relative font-serif">
                    <div className="text-xl font-sans">{element.name}</div>
                    <div className="absolute right-2 top-2 text-2xl">
                    {
                        Rating(element.rating)
                    }
                    </div>
                    <div>{element.description}</div>
                </div>
            )})}
        </div>
        <Modal open={logInModalOpen} setOpen={setLogInModalOpen}>
            <div>
                Not Yet Logged In
            </div>
            <button className="btn-primary" onClick={() => navigate('/newuser')}>Log In</button>
        </Modal>
        </>
    )
}