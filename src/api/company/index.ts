import axios from 'axios';

export const getCompanies = async (callback=(function(data:any){})) => {
    let base = 'http://127.0.0.1:8000'
    await axios.get(base + '/').then((response) => {
      callback(response.data)  
    })
}