import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const  base = 'http://127.0.0.1:8000'


export const executePost = async (url:string, data:any, callback=(function(data:any){})) => {
  data['uuid'] = uuidv4();
  console.log(data)
    await axios.post(base + url, data).then((response) => {
      callback(response.data)  
    })
}

export const executeGet = async (url:string, callback=(function(data:any){})) => {
    await axios.get(base + url).then((response) => {
      callback(response.data)  
    })
}

export const executePut = async (url:string, data:any, callback=(function(data:any){})) => {
    await axios.put(base + url, data).then((response) => {
      callback(response.data)
    })
}
