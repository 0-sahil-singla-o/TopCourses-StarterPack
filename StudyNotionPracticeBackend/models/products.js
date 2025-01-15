const mongoose= require("mongoose");

const productschema= new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    url:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR905Tkp8MLUa9Z-kQ04XPNeODOHIM2WNJPIQ&s"},
    price:{type:String, required:true}
},{timestamps:true});

const Product= mongoose.model("Product",productschema);

module.exports= Product;