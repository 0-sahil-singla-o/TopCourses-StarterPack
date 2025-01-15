import { useState } from 'react'
import { useContext } from 'react';
import { MainContext } from '../MainProvider';
import * as Yup from "yup"
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import { use } from 'react';
export default function LoginForm(){
    const [showpassword,setshowpassowrd]= useState(false);
    const {login}= useContext(MainContext)
    const navigate= useNavigate();
    function passwordVisibility(){
        setshowpassowrd(!showpassword);
    }
    const initialValues={
        email:"",
        password:""
    }
    const validations= Yup.object({
        email: Yup.string().required("Your email field is emply!!"),
        password:Yup.string().required("Your password field is emply!!")
    }) 
    const formik= useFormik({
        initialValues:initialValues,
        validationSchema:validations,
        onSubmit:(values)=>{
            fetch("http://localhost:8080/api/onaboarding/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(values),
                credentials:"include"
            })
            .then((response)=>{
                if(response.ok){
                    toast.success('You are Logged In', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    login()
                    navigate("/dashbord")
                }
                else{
                    response.json()
                    .then((error)=>{
                        const { path, msg } = error.message; // Extract path and msg
                        console.log(error.message)
                        setErrors({ [path]: msg }); // Dynamically assign error to the respective field
                    })
                }
            })
          .catch((error)=>{
            toast.error(error.messaage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          })
          
        }
    })
    return (
        <>
            <div className="loginform">
                 <form onSubmit={formik.handleSubmit}>
                       <div className="email flex flex-col justify-center mb-2">
                             <label className="text-white mb-1" htmlFor="email">Email Address</label>
                             <input className="bg-neutral-800 p-2 rounded text-white"  type="text" id="email" placeholder="Enter email address" {...formik.getFieldProps("email")} />
                             {formik.touched.email && formik.errors.email && <span className='text-red-500 mt-2'>{formik.errors.email}</span>}
                       </div>
                       <div className="password flex flex-col justify-center relative">
                             <label className="text-white mb-1" htmlFor="password">Password</label>
                             <input className="bg-neutral-800 p-2 rounded text-white mb-1" type={showpassword ? "text" : "password"}   id="password" placeholder="Enter Password" {...formik.getFieldProps("password")} />
                             {formik.touched.password && formik.errors.password && <span className='text-red-500 mt-2' >{formik.errors.password}</span>}  
                             {showpassword ? <VisibilityOffIcon onClick={passwordVisibility} style={{position:"absolute",color:'rgba(255,255,255,0.3)',right:"10",top:"37"}}/> : <VisibilityIcon onClick={passwordVisibility} style={{position:"absolute",color:'rgba(255,255,255,0.3)',right:"10",top:"37"}}/> }
                             <p className="text-end text-blue-500 text-sm hover:underline hover:cursor-pointer">Forgot password</p>
                       </div>
                       <button className="bg-yellow-500 text-black font-medium w-full py-1 rounded mt-5 text-lg" type="submit">Sign in</button>
                       <div className="flex items-center justify-center w-full mt-5">
                            <div className="w-[50%] border border-1 border-gray-700 me-1"></div>
                            <span className="text-gray-600 text-sm">OR</span>
                            <div className=" w-[50%] border border-1 border-gray-700 ms-1"></div>
                       </div>
                       {formik.errors.server && <span className='text-red-500'>{formik.errors.server}</span>}
                 </form>
            </div>
        </>
    )
}