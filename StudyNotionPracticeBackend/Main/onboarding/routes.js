const {Signup,Login}= require("./controller");
const {signupvalidation}= require("./validation");
const express= require("express");
const router= express.Router();

router.post("/signup",signupvalidation,Signup);

router.post("/login",Login);

module.exports= router;