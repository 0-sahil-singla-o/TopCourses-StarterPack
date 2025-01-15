import { useEffect, useState } from "react"
import { TailSpin } from 'react-loader-spinner'
import { toast } from "react-toastify";
import { createContext } from "react";
import { ChildCare } from "@mui/icons-material";
export const MainContext= createContext();
export default function MainProvider({children}){
    const [isAuthenticated,setAuthenticated]= useState(false);
    const [loading,setloading]=useState(true);
   
    useEffect(()=>{
        fetch("https://topcourses-starterpack.onrender.com/api/isAuthenticated",{
            method:"GET",
            credentials:"include"
        })
        .then((response)=>{
            if(response.ok){
                setAuthenticated(true)
                setloading(false)
            }
            else{
                setloading(false)
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
    },[])
    const login= ()=>{
        return setAuthenticated(true)
    }

    const logout=()=>{
        return setAuthenticated(false)
    }

    return (
        <>
            {loading ? <div><TailSpin/></div> : 
                                                <MainContext.Provider value={{isAuthenticated,login,logout}}>
                                                    {children}
                                                </MainContext.Provider>
                                             }
        </>
    )
}