import frameimage from "../assets/frame.png";
import loginimage from "../assets/login.png";
import OnaboardTemplate from "../components/Template";
import { loginData } from "../dataFiles/loginData";
export default function Login({setLoggedIn}){
    return (
        <>    
            <OnaboardTemplate mainheading={loginData.mainheading} heading1={loginData.subheading.heading1} heading2={loginData.subheading.heading2} formtype={"login"} image={loginimage} setLoggedIn={setLoggedIn} />
        </>
    )
}