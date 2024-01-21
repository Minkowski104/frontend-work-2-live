import axios from 'axios';
import { executeGet, executePost } from '../base-crud';

export const getCompanies = async (callback=(function(data:any){})) => {
  executeGet('/companies/list', callback)
}

export const addCompany = async (data:any, callback=(function(data:any){})) => {
  executePost('/companies/create', data, callback)
}

export const findCompany = async (uuid:string, callback=(function(data:any){})) => {
  executeGet("/companies/"+uuid, callback)
}