import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCompany } from "../api/company";
import { Company } from "../interfaces";

export const CompanyProfile = () => {
    const {id} = useParams();
    const [company, setCompany] = useState<Company>({
        name: "",
        rating: 0,
        description: "",
        uuid: "",
    });
    useEffect(() => {
        if(id)
        findCompany(id, (data)=>{
            setCompany(data)
        })
    },[id])
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="bg-[#b2e05b] p-3 top-0 w-full rounded">
                <div className="bold text-3xl">{}</div>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name </div>
                    <input value={company.name} className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Description </div>
                    <input value={company.description} type="number" className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Wage/Hour </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Your Current Company </div>
                    <input className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
            </div>
        </div>
        </>
    )
}