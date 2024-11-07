const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"        //   reference to User Collection    -   by this we create link between User model and ConnectionRequest model.
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    status:{
        type: String,
        enum: {
            values: ["ignored", "interested" , "accepted", "rejected"],
            message: `{VALUE} is not supported`,
            required: true
        }      //  we use enum when we restrict users for some values
    }
},{ timestamps: true });

connectionRequestSchema.index({ senderId: 1, receiverId: 1 });      // now mongodb will take care of all the optimization and taking query fast. this is compound index it will make searching query fast by using both compounds

//  we are calling this pre middleware function which is execute before save() event handler occurs.
connectionRequestSchema.pre("save", function (next){ 
    const connectionRequest = this;
    //  we are checking if the senderId and receiverId are same
    if(connectionRequest.senderId.equals(connectionRequest.receiverId)){
        throw new Error("sender can't send the request itself");
    }
    next();         //  we need to write this next everytime otherwise this will not work
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;










