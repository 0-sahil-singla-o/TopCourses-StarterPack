const mongoose= require("mongoose");
const dotenv= require("dotenv").config()

const url=process.env.DataBase_Url;

const Connect= async ()=>{
    await mongoose.connect(url);
    console.log("connected to the database");
}

module.exports= Connect;