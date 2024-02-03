import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { findUser, updateUser } from "../api/user";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/dialog";


export const ProfilePage = () => {
    const [user, setUser] = useState<User>();
    const [edit, setEdit] = useState<boolean>(false);
    const [logInModalOpen, setLogInModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token=localStorage.getItem('token');
        if (!token)
        {
            setLogInModalOpen(true);
            setTimeout(() => {
            navigate('/login')}, 1000);
            return
        }
        findUser(token,((data:any) => {
            setUser(data as User);
           })
        )
    }, [])
    const UpdateUser = () => {
        //update user in db
        const token=localStorage.getItem('token');
        if (!token) return;
        console.log(user)
        updateUser(token,user).then(() => {
            
        });
        setEdit(!edit);
    }
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="bg-[#b2e05b] p-3 top-0 w-full rounded flex flex-row justify-between">
                <div className="bold text-3xl">My Profile</div>
                <FaEdit className="text-3xl cursor-pointer" onClick={() => setEdit(!edit)}></FaEdit>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name </div>
                    <input value={user?.name} className="border-2 border-black rounded w-1/3 p-1" disabled={!edit} onChange={(e) => user?setUser({...user, name: e.target.value}):0}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Working Hours/week </div>
                    <input value={user?.hours} type="number" className="border-2 border-black rounded w-1/3 p-1" disabled={!edit} onChange={(e) => user?setUser({...user, hours: Number(e.target.value)}):0}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Wage/Hour </div>
                    <input value={user?.wage} type="number" className="border-2 border-black rounded w-1/3 p-1" disabled={!edit} onChange={(e) => user?setUser({...user, wage: Number(e.target.value)}):0}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Current Company </div>
                    <input value={user?.company} className="border-2 border-black rounded w-1/3 p-1" disabled={!edit} onChange={(e) => user?setUser({...user, company: e.target.value}):0}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Email </div>
                    <input value={user?.email} className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
                {
                edit &&
                <div>
                    <button className="btn-primary" onClick={UpdateUser}>Save Changes</button>
                </div>
                }

            </div>
        </div>
        <Modal open={logInModalOpen} setOpen={setLogInModalOpen}>
            <div className="text-center p-1/3">
            Please Login to view profile.<br/>
            redirecting to login
            </div>
        </Modal>
        </>
    )
}