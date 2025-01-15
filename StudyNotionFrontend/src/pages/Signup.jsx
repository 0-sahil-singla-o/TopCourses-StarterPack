import OnaboardTemplate from "../components/Template"
import signupImage from "../assets/signup.png";
import { signupData } from "../dataFiles/loginData";
export default function Signup({setLoggedIn}){
    return (
        <>
           <OnaboardTemplate mainheading={signupData.mainheading} heading1={signupData.subheading.heading1} heading2={signupData.subheading.heading2} formtype={"signup"} image={signupImage} setLoggedIn={setLoggedIn}/>
        </>
    )
}