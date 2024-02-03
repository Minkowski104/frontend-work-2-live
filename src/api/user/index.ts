import { executeGet, executePost, executePut } from '../base-crud';


export const addUser = async (data:any, callback?:(data: any) => void) => {
    console.log(data)
    executePost('/users/create', data, callback)
}

export const login= (data:any, callback?:(data: any) => void) => {
    executePost('/users/login', data, callback)
}


export const signUp = async(data:any, callback?:(data: any) => void) => {
    executePost('/users/sign-up', data, callback)
}

export const findUser = async (token:string, callback?:(data: any) => void) => {
    executeGet('/users/'+token, callback)
}

export const updateUser = async (token:string, data:any, callback?:(data: any) => void) => {
    executePut('/users/update/'+token, data, callback)
}