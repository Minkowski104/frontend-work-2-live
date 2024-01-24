import axios from 'axios';
import { executePost } from '../base-crud';


export const addUser = async (data:any, callback=(function(data:any){})) => {
    console.log(data)
    executePost('/users/create', data, callback)
}

export const login= (data:any, callback=(function(data:any){})) => {
    executePost('/users/login', data, callback)
}


export const signUp = async(data:any, callback=(function(data:any){})) => {
    executePost('/users/sign-up', data, callback)
}