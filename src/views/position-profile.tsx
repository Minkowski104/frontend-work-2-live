import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanies } from "../api/company";
import { Company } from "../interfaces/Company";
import { findPosition, getPositionSummary } from "../api/positions";
import { Position } from "../interfaces/Position";
import { WorkRecord } from "../interfaces/WorkRecord";
import { listWorkRecordsByPosition } from "../api/work-record";


export const PositionProfile = () => {
    const {id} = useParams();
    const [position, setPosition] = useState<Position>({
        name: "",
        uuid: ""
    });
    const [companies, setCompanies] = useState<[Company]>();
    const navigate = useNavigate();
//     const [showAddWorkRecord, setShowAddWorkRecord] = useState(false);
//     const [newWorkRecordBuffer, setNewWorkRecordBuffer] = useState<WorkRecord>({
//         uuid:"",
//         wage: 0,
//         hours: 0,
//         user: "",
//         company: "",
//         start_date: "",
//         end_date: "",
//         position: "",
//     })
    const [positionSummary, setPositionSummary] = useState<PositionWorkSummary>()
    const [positionWorkRecords, setPositionWorkRecords] = useState<[WorkRecord]>();
    useEffect(() => {
        if(id){
            findPosition(id, (data)=>{
                setPosition(data)
            })
            getCompanies((data)=>{
                setCompanies(data)
            })
            listWorkRecordsByPosition(id, (data)=>{
                setPositionWorkRecords(data)
            })
            getPositionSummary(id, (data)=>{
                setPositionSummary(data)
            })
        }
    },[id])

//     const createWorkRecord =()=> {
//         let buff = {...newWorkRecordBuffer}
//         buff.company = id??"";
//         buff.user = localStorage.getItem('userId')??"";
//         buff.uuid = uuidv4();
//         addWorkRecord(buff, ()=>{
//             setNewWorkRecordBuffer({
//                 uuid:"",
//                 wage: 0,
//                 hours: 0,
//                 user: "",
//                 company: "",
//                 start_date: "",
//                 end_date: "",
//                 position: "",
//             })
//             setShowAddWorkRecord(false)
//         })
//     }   
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="bg-w2l-green p-3 top-0 w-full rounded">
                <div className="bold text-3xl">{}</div>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name </div>
                    <input value={position.name} className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
            </div>
            <div className="my-4 text-2xl font-bold">Position Summary</div>
            <div className="flex flex-row gap-4 mb-4 border-2 border-gray p-2 rounded-md">
                <div className="flex flex-col">
                    <div className="font-bold">Average Wage</div>
                    <div>{positionSummary?.average_wage}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Average Hours</div>
                    <div>{positionSummary?.average_hours}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Number of Work Records</div>
                    <div>{positionSummary?.total_work_records}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Offered At</div>
                    {positionSummary?.offered_at?.map((element)=>{
                        return <div>{element}</div>
                    })}

                </div>
            </div>
            <div className="my-4 text-2xl font-bold">Company Records</div>
                <div className="font-bold flex flex-row gap-4 mb-4 border-2 border-gray p-2 rounded-md justify-between w-1/2">
                    <div className="w-1/2 text-left">Company</div>
                    <div className="w-1/4">Wage</div>
                    <div className="w-1/4">Hours</div>
                </div>
                {positionWorkRecords?.map((element)=>{
                    return(
                    <div className="flex flex-row gap-4 mb-4 border-2 border-gray p-2 rounded-md justify-between w-1/2">
                        <div className="w-1/2 text-left cursor-pointer" onClick={()=>{navigate(`/company/${element.company}`)}}>{companies?.find((comp)=>{return comp.uuid === element.company})?.name}</div>
                        <div className="w-1/4">{element.wage}</div>
                        <div className="w-1/4">{element.hours}</div>
                    </div>)
                })}
            {/* {!showAddWorkRecord?<button className="text-white bg-w2l-green p-2 rounded" onClick={() => setShowAddWorkRecord(!showAddWorkRecord)}>Add Work record</button>
                :
                <>
                <div className="flex flex-row gap-2">
                    <SearchList items={positions?positions:[]} classes="border-2 border-black rounded w-1/3 p-1" onChange={(item)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, position:item.uuid})}}/>

                    <input placeholder="wage" type="number" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, wage:parseFloat(e.target.value)})}}></input>
                    <input placeholder="hours" type="number" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, hours:parseFloat(e.target.value)})}}></input>
                    
                </div>
                <div className="flex flex-row gap-2">
                    <input type="date" placeholder="start date" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, start_date:new Date(e.target.value).toISOString()})}}></input>
                    <input type="date" placeholder="end date" onChange={(e)=>{setNewWorkRecordBuffer({...newWorkRecordBuffer, end_date:new Date(e.target.value).toISOString()})}}></input>    
                </div>
                <button onClick={createWorkRecord}>Add</button>

                </>    
        } */}
        </div>
        </>
    )
}