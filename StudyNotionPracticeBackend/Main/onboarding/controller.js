const passport = require("passport");
const User= require("../../models/UserModel");


const Signup= async (req,res,next)=>{
    try{
         let data= req.body;
         let role='';
         if(data.password!=data.confirmpassword){
            return res.status(400).send({status:"false",message:{path:"confirmpassword",msg:"confirm password does not matched"}});
         }
         if(data.role.Student){
            role= "Student"
         }
         else if(data.role.Instructor){
              role= "Instructor"
         }
        const user= new User({
            role:role,
            firstname:data.firstname,
            lastname:data.lastname,
            email:data.email,
        })
        
        const registeredUser= await User.register(user,data.password);
        req.login(registeredUser,(err)=>{
         if(err){
          return res.status(500).send({status:false,message:{path:"server",msg:err.message}})
         }
         return res.status(200).send({status:true,data:registeredUser});
        })
       
    }catch(err){
        return res.status(500).send({status:"false",message:{path:"server",msg:`server error during signup request-->${err.message}`,}});
    }
}

const Login = async (req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if(err){
           return res.status(500).send({status:false,message:{path:"server",msg:err.message}})
        }
        if(!user){
           return res.status(400).send({status:false,message:{path:"login",msg:info.name}})
        }
        req.login(user,(err)=>{
          
           if(err){
              return res.status(500).send({status:false,message:{path:"server",msg:err.message}})
           }
             
              return  res.status(200).send({status:true,message:"login succesful"})
        })
      
     })(req, res, next); // this is the middleware so we have to use this in the last..
}

module.exports= {Signup,Login}; 