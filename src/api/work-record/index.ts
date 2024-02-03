import { executePost } from '../base-crud';

export const listWorkRecordsByCompany = async (companyUuid:string,callback?:(data: any) => void) => {
  let request = {
    "token": localStorage.getItem('token'),
    "filterKey":"company",
    "filterValue":companyUuid
  }
  executePost('/work-records/list', request, callback)
}

export const addWorkRecord = async (data:any, callback?:(data: any) => void) => {
  executePost('/work-records/create', data, callback)
}

export const listWorkRecordsByPosition = async (positionUuid:string,callback?:(data: any) => void) => {
  let request = {
    "token": localStorage.getItem('token'),
    "filterKey":"position",
    "filterValue":positionUuid
  }
  executePost('/work-records/list', request, callback)
}