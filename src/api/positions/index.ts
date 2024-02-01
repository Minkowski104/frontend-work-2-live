import axios from 'axios';
import { executeGet, executeGetWithParams, executePost } from '../base-crud';

export const getPositions = async (callback=(function(data:any){}),keyword="") => {
  executeGet('/positions/list/', callback)
}

export const findPosition = async (uuid:string, callback=(function(data:any){})) => {
  executeGet("/positions/"+uuid, callback)
}

export const getPositionSummary = async (position_uuid:string, callback=(function(data:any){})) => {
  executeGetWithParams("/positions/get-position-summary/",{position:position_uuid,token:localStorage.getItem('token')}, callback)
}
