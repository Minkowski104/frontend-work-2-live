import { useEffect, useState } from "react";
import { getCompanies } from "../api/company";
import { addUser, signUp } from "../api/user";
import { Company } from "../interfaces/Company";
import { GoogleLogin } from "@react-oauth/google";
import toast from 'react-hot-toast';


export const NewUser = () => {
    const [comp, setComp] = useState<Company[]>([]);
    const [user, setUser] = useState({
        'name':"",
        'wage':0, 
        'hours':0,
        'company':'',
        'password':"",
    });
    const [repassword, setRepassword] = useState('');
    const [alreadyExists, setAlreadyExists] = useState(false);
    useEffect(() => {
        getCompanies((data) => {
            setComp(data as Company[])
        })
    }, [])
    const AddUser = () => {
        if(user.name&&user.password===repassword&&user.password)
        {
            // add user to db
            addUser(user).then(()=>{})
        }
        else
        {
        // show fail modal
        }

    }
    const responseMessage = (response:any) => {
        console.log(response);
        let data ={
            'google_id':response.clientId,
            'google_token':response.credential
        }
        signUp(data, (response:any)=>{
            if(response?.success === false&& response?.error === "user already exists")
            {
                toast.error("User already exists");
                setAlreadyExists(true);
            }else if(response?.success === true){
                toast.success("User created successfully. Redirecting to login");
            }
        })
    };
    const errorMessage = (error:any) => {
        console.log(error);
    };
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="bg-[#b2e05b] p-3 top-0 w-full rounded">
                <div className="bold text-3xl">New User</div>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name </div>
                    <input className="border-2 border-black rounded w-1/3 p-1 " onChange={(e) => setUser({...user, 'name':e.target.value})}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Working Hours/week </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setUser({...user, 'hours':Number(e.target.value)})}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Wage/Hour </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setUser({...user, 'wage':Number(e.target.value)})}/>
                </div>
                <div className="w-full h-full text-left p-2 flex flex-col mx-2" >
                    <div>Select Your Company </div>
                    <input list="companies" className="bg-white border-2 border-black rounded w-1/3 p-1 my-2" onChange={(e) => setUser({...user, 'company':e.target.value})}/>
                        <datalist id = "companies">
                        {
                            comp.map((element) => {
                                return (
                                    <option value={element.uuid}>{element.name}</option>
                                )
                            })
                        }
                        </datalist>
                </div>
                <div className="w-full h-full text-left p-2 flex flex-col mx-2" >
                    <div>Your Experience with Company </div>
                    <textarea className="border-2 border-black rounded w-1/2 h-full p-1 my-1"/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Password </div>
                    <input type="password" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setUser({...user, 'password':e.target.value})}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Retype Password </div>
                    <input type="password" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setRepassword(e.target.value)}/>
                </div>
                <div>
                    <button className="btn-primary" onClick={AddUser}>Submit</button>
                </div>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
                {alreadyExists && <div className="text-red-500">User Already Exists</div>}
                <div>
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
        </>
    )
}