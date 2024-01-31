import axios from 'axios';
import { executeGet, executePost } from '../base-crud';

export const listWorkRecords = async (callback=(function(data:any){}),keyword="") => {
  executeGet('/work-records/list/', callback)
}

export const addWorkRecord = async (data:any, callback=(function(data:any){})) => {
  executePost('/work-records/create', data, callback)
}
