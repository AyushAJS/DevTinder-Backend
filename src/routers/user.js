const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");

//  get all pending connection request of loggeIn user
userRouter.get("/user/request/received", userAuth, async (req,res,next)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find( { receiverId: loggedInUser._id, status: "interested" })
        .populate("senderId", "firstName lastName");
        // .populate("senderId", [ "firstName", "lastName" ]);     //  if we don't write the filter data then it will give whole data which is map with senderId to User collection. we can also used populate after another populate because it follows chaining
        res.json({
            message: "data fetched successfully...",
            connectionRequests
        });
    }catch(err){
        res.status(400).json({ message: err.message });
    }
})

userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        //  loggedIn user can be receiver or sender also
        const findConnections = await ConnectionRequest.find({ 
            $or: [
                { receiverId: loggedInUser, status: "accepted" }, 
                { status: "accepted", senderId: loggedInUser }
            ] 
        })
        .populate("senderId", "firstName lastName")
        .populate("receiverId", "firstName lastName");
        console.log(findConnections);
        const data = findConnections.map((row)=> {
            if(row.senderId._id.toString() === loggedInUser._id.toString()){
                return row.receiverId;
            }
                return row.senderId; 
            } );        //  it will modify the findConnctions and return new array and will give only details of senderId related which we was populated.
        res.json({
            message: "data fetched successfully...",
            data
        })
    }catch(err){
        res.status(400).json({ message: err.message });
    }
})

userRouter.get("/user/feed", userAuth, async (req,res)=>{
    try{
        // user will not see own card
        // user will not see ignored or send connection requests cards or connected cards
        const loggedInUser = req.user;
        const pageNo = parseInt(req.query.page) || 1;      //  bidefault it will show page 1 data
        const limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit; 
        const skip = (pageNo-1) * limit;
        //  all the connection ( send + received )
        const connectionRequests = await ConnectionRequest.find({ $or: [ 
            { receiverId: loggedInUser._id },
            { senderId: loggedInUser._id }
        ]}).select("senderId receiverId");

        //  set is a Arry data structure which is basically add the unique values if duplicate values is come then it will ignore that value.
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.receiverId.toString());
            hideUsersFromFeed.add(req.senderId.toString());
        })
        const users = await User.find({
            $and: [
            { _id: { $nin : Array.from(hideUsersFromFeed) }},       //  this will remove the object which having id is equal to hideUser Array Or we can say that allows only those users their id cannot belongs to this hideUser array.
            { _id: { $ne: loggedInUser._id }  }
            ]
        }).select("firstName lastName").skip(skip).limit(limit);

        res.json({
            data: users
        });
    }catch(err){
        res.status(400).json({ message: err.message });
    }
})

module.exports = userRouter;
