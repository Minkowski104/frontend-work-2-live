import { executeGet, executeGetWithParams, executePost } from '../base-crud';

export const getCompanies = async (callback?:(data: any) => void,keyword="") => {
  executeGet('/companies/list/?name='+keyword, callback)
}

export const addCompany = async (data:any, callback?:(data: any) => void) => {
  executePost('/companies/create', data, callback)
}

export const findCompany = async (uuid:string, callback?:(data: any) => void) => {
  executeGet("/companies/"+uuid, callback)
}

export const getCompanySummary = async (company_uuid:string, callback?:(data: any) => void) => {
  executeGetWithParams("/companies/get-work-summary/",{company:company_uuid,token:localStorage.getItem('token')}, callback)
}