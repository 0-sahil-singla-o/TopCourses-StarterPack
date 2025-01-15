import { Children, useContext } from "react"
import { MainContext } from "./MainProvider"
import { Navigate } from "react-router-dom"
export default function PrivateRoute({children}){
    const {isAuthenticated} = useContext(MainContext)
    console.log(isAuthenticated)
    if(!isAuthenticated){
       return <Navigate to={"/login"}/>
    }

    return (
        <>
            {children}
        </>
    )
}