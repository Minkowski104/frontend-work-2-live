import axios from 'axios';
import { executeGet, executePost } from '../base-crud';

export const listWorkRecordsByCompany = async (companyUuid:string,callback=(function(data:any){}),keyword="") => {
  let request = {
    "token": localStorage.getItem('token'),
    "filterKey":"company",
    "filterValue":companyUuid
  }
  executePost('/work-records/list', request, callback)
}

export const addWorkRecord = async (data:any, callback=(function(data:any){})) => {
  executePost('/work-records/create', data, callback)
}

export const listWorkRecordsByPosition = async (positionUuid:string,callback=(function(data:any){}),keyword="") => {
  let request = {
    "token": localStorage.getItem('token'),
    "filterKey":"position",
    "filterValue":positionUuid
  }
  executePost('/work-records/list', request, callback)
}