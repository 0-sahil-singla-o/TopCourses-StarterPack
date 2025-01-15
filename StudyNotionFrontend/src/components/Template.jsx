import frameimage from "../assets/frame.png";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import GoogleFont from "../assets/google.png"
export default function OnaboardTemplate({mainheading,heading1,heading2,image,formtype,setLoggedIn}){
    return (
        <>
             <div className="login  grid grid-col-1 sm:grid-cols-2 mt-[2rem]">
                <div className="loginDetails px-[1rem] sm:px-[1rem] xl:px-[8rem] 2xl:px-[8rem] md:py-2">
                         <p className="text-white text-3xl font-bold mb-5">{mainheading}</p>
                         <div className="mb-2">
                            <p className="text-gray-300">{heading1}</p>
                            <p className="text-blue-500 italic">{heading2}</p>
                         </div>
                         {formtype=="signup"? <SignupForm setLoggedIn={setLoggedIn}/>:<LoginForm setLoggedIn={setLoggedIn}/>}
                         <div >
                              <button className="w-full text-white font-medium px-1 py-2 border border-1 border-gray-600 mt-[2.5rem] relative rounded hover:bg-neutral-900">Sign in with Google</button>
                         </div>
                         
                </div>
                <div className="loginImage collapse sm:visible sm:px-[2rem] xl:px-[9rem] 2xl:px-[9rem] md:py-2 flex justify-center items-center">
                         <div className="relative">
                            <img src={frameimage}/>
                            <img className="absolute top-[-1rem] left-[-1rem]" src={image}/>
                         </div>
                </div>
                
            </div>
        </>
    )
}