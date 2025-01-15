import { useState ,useEffect} from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../MainProvider';
import {ColorRing} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
export default function SignupForm(){
    const {login}= useContext(MainContext)
    const [isStudent,setStudent]=useState(false);
    const [isInstructor,setInstructor]= useState(false);
    let role={Student:isStudent,Instructor:isInstructor};
    const [showpassword,setshowpassword]= useState(false);
    const [signupData,setsignupData]= useState({});
    const [loading,setLoading]= useState(true);
    const navigate = useNavigate();
    const [showconfirmpassword,setshowconfirmpassword]= useState(false);
   
    function passwordVisibility(){
        setshowpassword(!showpassword);
    }
    function confirmpasswordVisibility(){
        setshowconfirmpassword(!showconfirmpassword);
    }
    function Student(){
        if(isInstructor==isStudent){
            setStudent(true)
        }
        else{
            setStudent(true)
            setInstructor(false)
        }
       
    }
    
    function Instructor(){
        if(isInstructor==isStudent){
            setInstructor(true)
        }
        else{
            setInstructor(true)
            setStudent(false)
        }
    }

    
    const initialValues= {
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmpassword:""
    }
    const validations= yup.object({
        firstname: yup.string().required("firstname field is required").min(2,"firstname must contain atleast 2 characters").max(15,"firstname should be 2 to 15 characters long").matches(/^[A-Za-z]+$/,{message:"firstname should only contain alphabets"})
    })
    const formik= useFormik({
        initialValues:initialValues,
        validationSchema:validations,
        onSubmit: async (values, { setErrors,resetForm }) => {
            try {
              // Simulated API call
              values.role= role;
              fetch('http://localhost:8080/api/onaboarding/signup',{
                  method:"POST",
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify(values),
                  credentials:"include"
              })
              .then((response)=>{
                  if(response.ok){
                    response.json()
                    .then((result)=>{
                       login()
                       navigate("/dashbord");
                    })
                  }
                  else{
                    response.json()
                    .then((error)=>{
                        const { path, msg } = error.message; // Extract path and msg
                        console.log(error.message)
                        setErrors({ [path]: msg }); // Dynamically assign error to the respective field
                    })
                  }
              }).catch((error)=>{
                 console.log("error occured during the signupApi fetch request");
              })
          }catch(error){
            console.log("error ocuured during form submit-->",error)
          }
        
        } 
    })

    return (
        <>
        <form onSubmit={formik.handleSubmit} >
        <div className="loginform flex flex-col justify-center">
                <div className="UserButtons bg-neutral-800 border border-1 border-gray-400 rounded-r-full rounded-l-full px-[8rem] py-1 w-[12rem] flex items-center justify-center mb-5 mt-5">
                    <button id='Student' type='button' onClick={Student} className=' text-gray-400 py-[0.8rem] me-2 px-[1.8rem] ms-2 rounded-r-full rounded-l-full' style={isStudent ? {backgroundColor:"black"} : {backgroundColor:"rgba(0,0,0,0.1)"}} >Student</button>
                    <button id='Instructor' type='button' onClick={Instructor} className=' text-gray-400 py-[0.8rem] me-2 px-[1.8rem] rounded-r-full rounded-l-full' style={isInstructor ? {backgroundColor:"black"} : {backgroundColor:"rgba(0,0,0,0.1)"}} >Instructor</button>
                </div>
                       <div className="grid grid-cols-1 border-white mb-2 md:grid-cols-2 items-center gap-10 ">
                             <div className='flex flex-col justify-center'>
                                 <label className="text-white mb-1" htmlFor="firstname">First Name</label>
                                 <input className="bg-neutral-800 p-2 rounded text-white"  type="text" id="firstname" placeholder="Enter First Name" {...formik.getFieldProps("firstname")}/>
                                 {formik.touched.firstname && formik.errors.firstname && <span className='text-red-500'>{formik.errors.firstname}</span>}
                             </div>
                             <div className='flex flex-col justify-center'>
                                 <label className="text-white mb-1" htmlFor="lastname">Last Name</label>
                                 <input className="bg-neutral-800 p-2 rounded text-white"  type="text" id="lastname" placeholder="Enter Last Name" {...formik.getFieldProps("lastname")} />
                                 {formik.errors.firstname && <span className='text-red-500'>.</span>}
                             </div>
                       </div>
                       <div className="email flex flex-col justify-center mb-2">
                             <label className="text-white mb-1" htmlFor="email">Email Address</label>
                             <input className="bg-neutral-800 p-2 rounded text-white"  type="text" id="email" placeholder="Enter email address" {...formik.getFieldProps("email")} />
                             {formik.touched.email && formik.errors.email && <span className='text-red-500'>{formik.errors.email}</span>}
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
                             <div className='flex flex-col justify-center relative' > 
                                <label className="text-white mb-1" htmlFor="password">Password</label>
                                <input className="bg-neutral-800 p-2 rounded text-white mb-1" type={showpassword ? "text" : "password"}   id="password" placeholder="Enter Password" {...formik.getFieldProps("password")} />
                                {showpassword ? <VisibilityOffIcon onClick={passwordVisibility} style={{position:"absolute",color:'rgba(255,255,255,0.3)',right:"10",top:"37"}}/> : <VisibilityIcon onClick={passwordVisibility} style={{position:"absolute",color:'rgba(255,255,255,0.3)',right:"10",top:"37"}}/> }
                                {formik.touched.password && formik.errors.password && <span className='text-red-500'>{formik.errors.password}</span>}
                                { formik.errors.confirmpassword && <span className='text-red-500'>{formik.errors.confirmpassword}</span>}
                             </div>
                             <div className='flex flex-col justify-center relative'>
                                <label className="text-white mb-1" htmlFor="confirmpassword">Confirm Password</label>
                                <input className="bg-neutral-800 p-2 rounded text-white mb-1" type={showconfirmpassword ? "text" : "password"}   id="confirmpassword" placeholder="Enter Password" {...formik.getFieldProps("confirmpassword")} />
                                {showconfirmpassword ? <VisibilityOffIcon onClick={confirmpasswordVisibility} style={{position:"absolute",color:'rgba(255,255,255,0.3)',right:"10",top:"37"}}/> : <VisibilityIcon onClick={confirmpasswordVisibility} style={{position:"absolute",color:'rgba(255,255,255,0.3)',right:"10",top:"37"}}/> }
                                {formik.touched.confirmpassword && formik.errors.confirmpassword && <span className='text-red-500'>{formik.errors.confirmpassword}</span>}
                                { formik.errors.password && <span className='text-red-500'>{formik.errors.password}\</span>}
                             </div>
                       </div>
                      {formik.errors.server && <span className='text-red-500'>{formik.errors.server}</span>}
                            <button  className="bg-yellow-500 text-black font-medium w-full py-1 rounded mt-5 text-lg" type="submit">Create Account</button>
                                                   
                       <div className="flex items-center justify-center w-full mt-5">
                            <div className="w-[50%] border border-1 border-gray-700 me-1"></div>
                            <span className="text-gray-600 text-sm">OR</span>
                            <div className=" w-[50%] border border-1 border-gray-700 ms-1"></div>
                       </div>
            </div>
        </form>
        
        </>
    )
}