const express = require("express");
const connectionRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { ReturnDocument } = require("mongodb");
const { connection } = require("mongoose");

connectionRouter.post("/request/send/:status/:receiverUserId", userAuth, async (req,res,next)=>{
    try{        
        //  we should also ensure that one use cannot send the multiple request to another user And also that receiver cannot send the request back to the sender when sender is already sends the request.

        const senderId = req.user._id ;
        const receiverId = req.params.receiverUserId;
        const status = req.params.status;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        //  receiver's authentication is also important we need to consider that thing also
        if(!receiver){
            return res.status(404).json({message: "receiver is not exists"});
        }
        //  we need to check that sender and receiver are not same user
        // if(senderId.equals(receiverId)){
        //     return res.status(400).json({message: "You can't send the request to yourself"});
        // }    
        const allowedStatus = [ "interested", "ignored" ];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status: " + status});       //  if we don't use return then the next code is execute after this if statement.
        }

        //  check the request is already send And also receiver can't send the request back to the sender
        const existingRequest = await ConnectionRequest.find( { $or: [ { senderId, receiverId }, { senderId: receiverId, receiverId: senderId } ]});       //  this will give you array of object.
        if(existingRequest.length){
            return res.json({ message: "request is already exists" });
        }                 
        
        const connectionRequest = new ConnectionRequest({
            senderId: senderId, receiverId: receiverId, status: status
        })
        const data = await connectionRequest.save();
        res.json({
            message: `${sender.firstName}  ${sender.lastName} is ${status} in ${receiver.firstName} ${receiver.lastName} `,
            data: data
        })
    }catch(err){
        res.status(400).send("error: " + err.message);
    }
})

connectionRouter.post("/request/review/:status/:requestId", userAuth, async (req,res,next)=>{
    try{
        const { status, requestId } = req.params;
        const loggedInUser = req.user;

    //  validation for status
    const allowedStatus = [ "accepted", "rejected" ];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({ message: "Invalid status: " + status });
    }
    //  validation on SendRequestStatus, loggedInUser, requestId
    const connectionRequest = await ConnectionRequest.findOne({ receiverId: loggedInUser._id, _id: requestId, status: "interested" });
    if(!connectionRequest){
        return res.status(404).json({ message: "request is not exists" });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({
        message: `${loggedInUser.firstName} ${loggedInUser.lastName} has ${status} the request`
        },data)
    }catch(err){
        res.status(400).send("error: " + err.message);
    }
})



module.exports = connectionRouter;

