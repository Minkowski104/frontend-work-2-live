import { useEffect, useState } from "react";
import { getCompanies } from "../api/company";
import { addUser } from "../api/user";

export const ProfilePage = () => {
    // useEffect(() => {
    //     getCompanies((data) => {
    //         setComp(data as Company[])
    //     })
    // }, [])
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="bg-[#b2e05b] p-3 top-0 w-full rounded">
                <div className="bold text-3xl">My Profile</div>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name </div>
                    <input className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Working Hours/week </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1"/>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Wage/Hour </div>
                    <input type="number" className="border-2 border-black rounded w-1/3 p-1"/>
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