import {NavLink} from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext } from 'react';
import { MainContext } from '../MainProvider';
import Button from '@mui/material/Button';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import logo from "../assets/Logo.svg";
export default function Navbar({isLoggedIn,setLoggedIn}){
    const navigate= useNavigate();
    const {isAuthenticated,logout}= useContext(MainContext)
    // a function to navigate to different routes-->
    function OnClick(path){
         navigate(path);
    } 
    // Logout function-->

    function Logout(){
        fetch("https://topcourses-starterpack.onrender.com/api/logout",{
            method:"GET",
            credentials:"include"
        })
        .then((response)=>{
           if(response.ok){ 
            toast.error('You are Logged Out', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            logout()
            navigate("/");
           }
           else{
              response.json()
              .then((error)=>{
                toast.error(error.message, {
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
        .catch((error)=>{
            toast.error(error.message, {
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

    // Log in function-->

    function Login(){
        navigate("/login")
    }
    function Signup(){
        navigate("/signup")
    }
    return (
        <>
            <div className="navbar container mx-auto w-[100%]">
                    <div className="tabs flex  p-3 w-[100%]">
                         <div className="icon flex items-center w-[50%] md:w-[33%] 2xl:w-[40%] ">
                            <img src={logo} className="h-[2rem]"/>
                         </div>
                         <nav className="md:flex justify-center w-[60%] md:w-[36%] 2xl:w-[20%] hidden">
                            <Tabs className="w-[100%] flex justify-center items-center  " style={{display:'flex',justifyContent:"center"}}>
                                <Tab style={{color:"white",fontSize:"0.8rem", width:"33.3%"}} label="Home" onClick={()=>{return OnClick("/")}}/>
                                <Tab style={{color:"white",fontSize:"0.8rem", width:"33.3%"}} label="About" onClick={()=>{return OnClick("/About")}}/>
                                <Tab style={{color:"white",fontSize:"0.8rem", width:"33.3%"}} label="Contact" onClick={()=>{return OnClick("/Contact")}} />
                            </Tabs>
                         </nav>
                         <div className="buttons  flex items-center justify-end w-[50%] md:w-[33%] 2xl:w-[40%] ">
                          {!isAuthenticated ? <>
                            <Button onClick={()=>{return Login()}} style={{backgroundColor:"rgba(255,255,255,0.1)",border:"1px solid white", color:"white"}} variant="outlined">Log in</Button>
                            <Button onClick={()=>{return Signup()}} style={{backgroundColor:"rgba(255,255,255,0.1)",border:"1px solid white", color:"white",marginLeft:"1rem"}} variant="outlined">Signup</Button>
                                              </>:
                                              <>
                                                  <Button onClick={()=>{return Logout()}} style={{backgroundColor:"rgba(255,255,255,0.1)",border:"1px solid white", color:"white",marginLeft:"1rem"}} variant="outlined">Logout</Button>
                                                  <Button onClick={()=>{return OnClick("/dashbord")}} style={{backgroundColor:"rgba(255,255,255,0.1)",border:"1px solid white", color:"white",marginLeft:"1rem"}} variant="outlined">Dashbord</Button>
                                              </>
                         }
                         </div>
                    </div>
            </div>
        </>
    )
}