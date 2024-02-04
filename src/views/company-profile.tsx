import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findCompany, getCompanySummary } from "../api/company";
import { Company } from "../interfaces/Company";
import { getPositions } from "../api/positions";
import { Position } from "../interfaces/Position";
import { WorkRecord } from "../interfaces/WorkRecord";
import { v4 as uuidv4 } from "uuid";
import { addWorkRecord, listWorkRecordsByCompany } from "../api/work-record";
import { SearchList } from "../components/searchlist";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export const CompanyProfile = () => {
    const {id} = useParams();
    const [company, setCompany] = useState<Company>({
        name: "",
        rating: 0,
        description: "",
        uuid: "",
        wage: 0,
    });
    const [loadingCompany, setLoadingCompany] = useState(true);
    const navigate = useNavigate();
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
    const [companySummary, setCompanySummary] = useState<CompanyWorkSummary>()
    const [loadingCompanySummary, setLoadingCompanySummary] = useState(true)
    const [companyWorkRecords, setCompanyWorkRecords] = useState<[WorkRecord]>();
    useEffect(() => {
        if(id){
            findCompany(id, (data)=>{
                setCompany(data)
                setLoadingCompany(false)
            })
            getPositions((data)=>{
                setPositions(data)
            })
            listWorkRecordsByCompany(id, (data)=>{
                setCompanyWorkRecords(data)
            })
            getCompanySummary(id, (data)=>{
                setCompanySummary(data)
                setLoadingCompanySummary(false)
            })
        }
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
            <div className="bg-w2l-green p-3 top-0 w-full rounded">
                <div className="bold text-3xl">{}</div>
            </div>
            <div className="flex flex-col w-2/4">
                <div className="w-full h-full items-left p-2 m-2 flex flex-row justify-between" >
                    <div>Name </div>
                    <div className="w-1/3 border-2 border-gray-200 rounded text-base">
                    {loadingCompany? <Skeleton/>:<div>{company.name}</div>}
                    </div>
                </div>
                <div className="w-full h-full items-center p-2 m-2 flex flex-row justify-between" >
                    <div>Description </div>
                    <input value={company.description} className="border-2 border-black rounded w-1/3 p-1" disabled/>
                </div>
            </div>
            <div className="my-4 text-2xl font-bold">Company Summary</div>
            {loadingCompanySummary? 
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900">

            </div>
            :
            <>
                <div className="flex flex-row gap-4 mb-4 border-2 border-gray p-2 rounded-md">
                <div className="flex flex-col">
                    <div className="font-bold">Average Wage</div>
                    <div>{companySummary?.average_wage}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Average Hours</div>
                    <div>{companySummary?.average_hours}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Number of Work Records</div>
                    <div>{companySummary?.total_work_records}</div>
                </div>
                <div className="flex flex-col">
                    <div className="font-bold">Positions offered</div>
                    {companySummary?.positions_offered?.map((element)=>{
                        return <div>{element}</div>
                    })}
                </div>
            </div>
            </>}
            <div className="my-4 text-2xl font-bold">Company Records</div>
                <div className="font-bold flex flex-row gap-4 mb-4 border-2 border-gray p-2 rounded-md justify-between w-1/2">
                    <div className="w-1/2 text-left">Position</div>
                    <div className="w-1/4">Wage</div>
                    <div className="w-1/4">Hours</div>
                </div>
                {companyWorkRecords?.map((element)=>{
                    return(
                    <div className="flex flex-row gap-4 mb-4 border-2 border-gray p-2 rounded-md justify-between w-1/2">
                        <div className="w-1/2 text-left cursor-pointer" onClick={()=>navigate(`/position/${element.position}`)}>{positions?.find((pos)=>{return pos.uuid === element.position})?.name}</div>
                        <div className="w-1/4">{element.wage}</div>
                        <div className="w-1/4">{element.hours}</div>
                    </div>)
                })}
            {!showAddWorkRecord?<button className="btn-primary" onClick={() => setShowAddWorkRecord(!showAddWorkRecord)}>Add Work record</button>
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
                <button className="bg-blue-1" onClick={createWorkRecord}>Add</button>

                </>    
        }
        </div>
        </>
    )
}