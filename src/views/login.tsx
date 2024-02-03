import { useState } from "react";
import {  login } from "../api/user";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const LoginUser = () => {
    const [loginFail, setLoginFail] = useState(false);
    const navigate = useNavigate();
    const responseMessage = (response:any) => {
        let data ={
            'google_id':response.clientId,
            'google_token':response.credential
        }
        login(data, (response:any)=>{
            console.log(response,"I AM HERE")
            if(response?.success === false)
            {
                toast.error("Login Failed");
                setLoginFail(true);
            }else if(response?.success === true){
                toast.success("Login Success");
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.id);
                localStorage.setItem('name', response.name);
                localStorage.setItem('email', response.email);
                navigate('/home')
            }
        })
    };
    const errorMessage = (error?:any) => {
        console.log(error);
    };
    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex flex-col w-2/4 items-center mt-12 gap-4">
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
                {loginFail && <div className="text-red-500">Login Failed</div>}
                <div>New User? <Link to={"/newuser"}>Sign Up</Link></div>
            </div>
        </div>
        </>
    )
}