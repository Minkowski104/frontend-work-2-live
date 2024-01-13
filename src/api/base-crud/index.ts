import axios from 'axios';


const  base = 'http://127.0.0.1:8000'


export const executePost = async (url:string, data:any, callback=(function(data:any){})) => {
    await axios.post(base + url, data).then((response) => {
      callback(response.data)  
    })
}

export const executeGet = async (url:string, callback=(function(data:any){})) => {
    await axios.get(base + url).then((response) => {
      callback(response.data)  
    })
}
