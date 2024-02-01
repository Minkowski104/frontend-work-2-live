import axios from 'axios';
import { executeGet, executeGetWithParams, executePost } from '../base-crud';

export const getCompanies = async (callback=(function(data:any){}),keyword="") => {
  executeGet('/companies/list/?name='+keyword, callback)
}

export const addCompany = async (data:any, callback=(function(data:any){})) => {
  executePost('/companies/create', data, callback)
}

export const findCompany = async (uuid:string, callback=(function(data:any){})) => {
  executeGet("/companies/"+uuid, callback)
}

export const getCompanySummary = async (company_uuid:string, callback=(function(data:any){})) => {
  executeGetWithParams("/companies/get-work-summary/",{company:company_uuid,token:localStorage.getItem('token')}, callback)
}