const express = require("express");
const authRouter = express.Router();
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

authRouter.post("/signup", async (req,res)=>{
    try{
        //  validate the data
        validateSignUp(req);
        //  Encrypt the password
        const { firstName, lastName, email, phone, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash);

        const user = new User({
            firstName, lastName, password: passwordHash, phone, email
        });         //  create a new instance of user model.
            await user.save();
            res.send("user is successfully created");
    }catch(err){
        res.status(404).send("Error saving the user: " + err.message);
    }
})
authRouter.post("/login",async (req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("invalid credentials");
        }
        const isValidPass = await user.validatePassword(password);
        if(isValidPass){
            //      Create a JWT
            const token = await user.getJWT ();          //  logic is offloaded to userSchema method
            // add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8*3600000)
            });      //  cookie expires in 8 hours
            res.send("logged in successfully...");
        }else{
            throw new Error("invalid credentials");
        }
    }catch(err){
        res.status(404).send("Error fetching the user: " + err.message);
    }
})
authRouter.post("/logout", async(req,res)=>{
    try{
        res.cookie("token", null, {             //  no need for check auth because there is no risk of security concern
            expires: new Date(Date.now())
        })
        .send("logout successfully...");
    }catch(err){
        res.status(404).send("Error fetching the user: " + err.message);
    }
})

module.exports = authRouter;



