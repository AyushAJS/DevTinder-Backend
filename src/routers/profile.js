const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile", userAuth, async (req,res,next)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(404).send("Error fetching the user: " + err.message);
    }
})
profileRouter.patch("/profile/edit", userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("invalid edit request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])

        // const userDetails = await User.findOneAndUpdate({_id: userId}, data, {returnDocument:  "before", runValidators: true});         //   $set is optional we donot neccessary to use this. and also yadi hum kissi aise field ko update karte hai jo hamare schema mein present nahi hai to vo consider nahi kiya jata hai.
        loggedInUser.save();
        res.json({message: `${loggedInUser.firstName} your profile updated successfully..`, data: loggedInUser});
    }catch(err){
        res.status(404).send("Error updating the user: " + err.message);
    }
})
profileRouter.delete("/profile/edit/password", async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.body.id);
        res.send("user data is deleted successfully...");
    }catch(err){
        res.status(404).send("Error deleting the user: " + err.message);
    }
})

module.exports = profileRouter;

