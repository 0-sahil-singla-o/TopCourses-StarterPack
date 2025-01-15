const {body,validationResult}= require("express-validator");

const result= async function(req,res,next){
     let result= await validationResult(req);
     if(result.isEmpty()){
        next();
     }
     else{
        return res.status(400).send({status:false,message:result.errors[0]});
     }
}


const signupvalidation= [
    body("role").custom((role)=>{if(role.Student || role.Instructor){return true}throw new Error("Role must be selected")}),
    result
]

module.exports={signupvalidation};