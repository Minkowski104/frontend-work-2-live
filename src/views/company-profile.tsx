import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findCompany } from "../api/company";
import { Company } from "../interfaces/Company";
import { getPositions } from "../api/positions";
import { Position } from "../interfaces/Position";
import { WorkRecord } from "../interfaces/WorkRecord";
import { v4 as uuidv4 } from "uuid";
import { addWorkRecord } from "../api/work-record";
export const CompanyProfile = () => {
    const {id} = useParams();
    const [company, setCompany] = useState<Company>({
        name: "",
        rating: 0,
        description: "",
        uuid: "",
        wage: 0,
    });
    const [positions, setPositions] = useState<[Position]>();
    const [showAddWorkRecord, setShowAddWorkRecord] = useState(false);
    const [newWorkRecordBuffer, setNewWorkRecordBuffer] = useState<WorkRecord>({
        uuid:"",
        wage: 0,
        hours: 0,
        user: "",
        company: "",
        start_date: "",
        end_date: "",
        position: "",
    })
    useEffect(() => {
        if(id)
        findCompany(id, (data)=>{
            setCompany(data)
        })
        getPositions((data)=>{
            setPositions(data)
        })
    },[id])

    const createWorkRecord =()=> {
        let buff = {...newWorkRecordBuffer}
        buff.company = id??"";
        buff.user = localStorage.getItem('userId')??"";
        buff.uuid = uuidv4();
        addWorkRecord(buff, ()=>{
            setNewWorkRecordBuffer({
                uuid:"",
                wage: 0,
                hours: 0,
                user: "",
                company: "",
                start_date: "",
                end_date: "",
                position: "",
            })
            setShowAddWorkRecord(false)
        })
    }   
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
                    <input value={company.description} className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
            </div>
            {!showAddWorkRecord?<button className="text-white bg-[#328336] p-2 rounded" onClick={() => setShowAddWorkRecord(!showAddWorkRecord)}>Add Work record</button>
                :
                <>
                <div className="flex flex-row gap-2">
                    <select onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, position:e.target.value})}}>
                        {positions?.map((element)=>{
                            return <option value={element?.uuid}>{element.name}</option>
                        })}
                    </select>

                    <input placeholder="wage" type="number" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, wage:parseFloat(e.target.value)})}}></input>
                    <input placeholder="hours" type="number" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, hours:parseFloat(e.target.value)})}}></input>
                    
                </div>
                <div className="flex flex-row gap-2">
                    <input type="date" placeholder="start date" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, start_date:new Date(e.target.value).toISOString()})}}></input>
                    <input type="date" placeholder="end date" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, end_date:new Date(e.target.value).toISOString()})}}></input>    
                </div>
                <button onClick={createWorkRecord}>Add</button>

                </>    
        }
        </div>
        </>
    )
}