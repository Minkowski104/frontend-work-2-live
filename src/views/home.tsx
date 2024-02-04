import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom"; 
import { getCompanies } from "../api/company";
import { Modal } from "../components/dialog";
import { Company } from "../interfaces/Company";
import useDebounce from "../helper/debounce";


export const HomePage = () => {
    const [comp, setComp] = useState<Company[]>([]);
    const navigate = useNavigate();
    const [logInModalOpen, setLogInModalOpen] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const debouncedSearch = useDebounce(searchPhrase, 1000);

    useEffect(() => {
        getCompanies((data) => {
            setComp(data as Company[])
        })
        if(localStorage.getItem('token')?.length === 0 || localStorage.getItem('token') === null){
            setLogInModalOpen(true);
        }
    }, [debouncedSearch])

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
            <div className="bold text-3xl bg-w2l-green p-3 w-full flex flew-row justify-between">
                <div>Home Page</div>
                <Link to={"/addcompany"} className="float-right text-xl align-middle text-[#222222] decoration-none hover:text-w2l-green">Add Company +</Link>
            </div>
            <input type="text" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setSearchPhrase(e.target.value)}/>
            {comp.map((element) =>{ 
                if(element.name.toLowerCase().includes(searchPhrase.toLowerCase()))  {
                return (
                <div 
                    className="h-36 cursor-pointer border-4 border rounded w-2/3 text-left p-1 m-1 text-xl relative font-serif hover:bg-gray-200"
                    onClick={()=>{navigate(`/company/${element.uuid}`)}}
                >
                    <div className="text-xl font-sans">{element.name}</div>
                    <div className="absolute right-2 top-2 text-2xl">
                    {
                        Rating(element.rating)
                    }
                    </div>
                    <div>{element.description}</div>
                </div>
            )}})}
        </div>
        <Modal open={logInModalOpen} setOpen={setLogInModalOpen}>
            <div>
                Not Yet Logged In
            </div>
            <button className="btn-primary" onClick={() => navigate('/login')}>Log In</button>
        </Modal>
        </>
    )
}