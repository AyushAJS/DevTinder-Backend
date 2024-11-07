const jwt = require("jsonwebtoken");
const User = require("../models/user");

//  Authentication by using middlewares
// const adminAuth = (req,res,next)=>{
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(isAdminAuthorized){
//         next();
//     }else{
//         res.status(401).send("Unauthorized admin");
//     }
// }

// const userAuth = (req,res,next)=>{
//     const token = "abc";
//     const isUserAuthorized = token === "abc";
//     if(isUserAuthorized){
//         next();
//     }else{
//         res.status(401).send("Unauthorized user");
//     }
// }
const userAuth = async (req,res,next)=>{
    try{
            //  read the token from req.cookies
                const { token } = req.cookies;
                if(!token){
                    throw new Error("invalid token");
                }
            //  validate the token
                const decodedMessage = await jwt.verify(token, "devTinder@01");
                const { _id } = decodedMessage;
            //  find the user
                const user = await User.findById(_id);
                if(!user){
                    throw new Error("user not found");
                }
                req.user = user;
                next();
    }catch(err){
        res.status(401).send(err.message);
    }
}
module.exports = { userAuth };

























