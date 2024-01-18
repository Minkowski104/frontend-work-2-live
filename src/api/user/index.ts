import axios from 'axios';
import { executePost } from '../base-crud';


export const addUser = async (data:any, callback=(function(data:any){})) => {
    console.log(data)
    executePost('/users/create', data, callback)
}