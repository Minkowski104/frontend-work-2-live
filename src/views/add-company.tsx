import { useState } from "react";
import { addCompany } from "../api/company";
import { useNavigate } from "react-router-dom";

export const AddCompany = () => {
    const [comp, setComp] = useState({
        name: '',
        wage: 0,
        hours: 0,
        rating: 0,
        description: ''
    })
    const navigate = useNavigate();
    const AddCompany = () => {
        if(comp.name)
        {
            addCompany(comp).then(()=>{

                navigate('/home')
            })
        }
        else
        {
        // show fail modal
        }

    }

    return (
        <>
        <div className="flex flex-col items-center">
            <div className="bg-w2l-green p-3 top-0 w-full rounded">
                <div className="bold text-3xl">Add Company</div>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name of Company </div>
                    <input className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setComp({...comp, 'name':e.target.value})}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Working Hours/week </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setComp({...comp, 'hours':Number(e.target.value)})}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Wage/Hour </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1" onChange={(e) => setComp({...comp, 'wage':Number(e.target.value)})}/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Type of Company </div>
                    <input className="border-2 border-black rounded w-1/3 p-1" />
                </div>
                <div className="w-full h-full text-left p-2 flex flex-col mx-2" >
                    <div>Company Description </div>
                    <textarea className="border-2 border-black rounded w-1/2 h-full p-1 my-1" onChange={(e) => setComp({...comp, 'description':e.target.value})}/>
                </div>
                <div className="w-full h-full text-left p-2 flex flex-col mx-2" >
                    <div>Review of Company </div>
                    <textarea className="border-2 border-black rounded w-1/2 h-full p-1 my-1" />
                </div>
                <div>
                    <button className="btn-primary" onClick={AddCompany}>Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}