import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const  base = 'http://127.0.0.1:8000'


export const executePost = async (url:string, payload:any, callback?:(data: any) => void) => {
  payload['uuid'] = uuidv4();
  console.log(payload)
    await axios.post(base + url, payload).then((response) => {
      if(callback)
      callback(response.data)  
    })
}

export const executeGet = async (url:string, callback?:(data: any) => void) => {
    await axios.get(base + url).then((response) => {
      if(callback)
      callback(response.data)  
    })
}

export const executeGetWithParams = async (url:string, params:any, callback?:(data: any) => void) => {
    await axios.get(base + url, {params}).then((response) => {
      if(callback)
      callback(response.data)  
    })
}

export const executePut = async (url:string, data:any, callback?:(data: any) => void) => {
    await axios.put(base + url, data).then((response) => {
      if(callback)
      callback(response.data)
    })
}
