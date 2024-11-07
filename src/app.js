const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');

const auth = require("./routers/auth");
const connectionRequest = require("./routers/connectionRequest");
const profile = require("./routers/profile");
const user = require("./routers/user");

app.use(express.json());            //  it converts the json object to js object.it will work for all the routes.
app.use(cookieParser());

app.use("/",auth);
app.use("/",connectionRequest);
app.use("/",profile);
app.use("/",user);

connectDB()
.then(()=>{
    console.log("database connected successfully...");          //  now first db is connect then server start listening requests
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    })
}).catch(err => {
    console.log("database connection cannot be established");
});










































