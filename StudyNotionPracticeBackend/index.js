const express= require("express");
const app= express();
const mongoose= require("mongoose");
const path= require("path")
const passport= require("passport");
const LocalStrategy= require("passport-local")
const session = require("express-session");
const mongoStore= require("connect-mongo");
const Connect= require("./helper/dataconnect");
const onaboarding= require("./Main/onboarding/routes")
const isAuthenticated= require("./middlewares/isAuthenticate") 
const cors= require("cors");
const dotenv= require("dotenv").config()
const User= require("./models/UserModel");

app.use(express.json());
app.use(express.urlencoded({extended:false}));



// Allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Include credentials if necessary
  }));

Connect();
app.set('trust proxy', 1);

const store= mongoStore.create({
    mongoUrl:process.env.DataBase_Url,
    crypto:{
        secret:process.env.Secret
    },
    touchAfter: 24*3600
})  

const sessionOptions= {
    store,
    secret:process.env.Secret,
    resave: false,
    saveUninitialized:false,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000 ,// 7 days
        maxAge:  7*24*60*60*1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField:"email"},User.authenticate()))

passport.serializeUser((user,done)=>{
    console.log(user)
   done(null,user._id);
})

passport.deserializeUser(async (_id,done)=>{
    console.log(_id)
   const user= await User.findById(_id);
   done(null,user);
})

app.get("/api/isAuthenticated",(req,res,next)=>{
       if(req.isAuthenticated()){
           return res.status(200).send({message:"success"})
       }
    return res.status(500).send({status:false,message:{path:"isAuthenticated",msg:"you are not authenticated"}})
})

app.use("/api/onaboarding",onaboarding);
app.use(isAuthenticated);
app.get("/api/logout",(req,res,next)=>{
        try{
           req.logout((err)=>{
               if(err){
                  return res.status(400).send({stauts:"false",message:{path:"server",msg:err.message}})
               }
               return res.status(200).send({status:"true",messgae:"you are logged out"})
           })
        }catch(err){
            return res.status(500).send({status:false,message:{path:"server",msg:"server error during Logout request",error:err}})
        }

})


app.get("/api",(req,res,next)=>{
    try{
         res.status(200).send("everything works correct")
    }catch(err){
        res.status(500).send("server error==>",err);
    }
})

const port= 8080;
app.listen(port,()=>{
    console.log("connected to the server");
})