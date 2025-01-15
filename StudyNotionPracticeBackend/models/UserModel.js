const mongoose= require("mongoose");
const jwt= require("jsonwebtoken");
const passportlocalmongoose = require("passport-local-mongoose");
const userschema= new mongoose.Schema({
    role:{type:String,enum:["Student","Instructor"]},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
  },{timestamps:true});
 
userschema.plugin(passportlocalmongoose,{usernameField:"email"})


const User= mongoose.model("User",userschema);

module.exports= User;