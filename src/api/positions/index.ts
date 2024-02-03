import { executeGet, executeGetWithParams } from '../base-crud';

export const getPositions = async (callback?:(data: any) => void) => {
  executeGet('/positions/list/', callback)
}

export const findPosition = async (uuid:string, callback?:(data: any) => void) => {
  executeGet("/positions/"+uuid, callback)
}

export const getPositionSummary = async (position_uuid:string, callback?:(data: any) => void) => {
  executeGetWithParams("/positions/get-position-summary/",{position:position_uuid,token:localStorage.getItem('token')}, callback)
}
