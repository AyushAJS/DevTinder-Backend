const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        // index: true,
        minLength: 4,
        maxLength: 20   
    },
    lastName: {
        type: String,
        trim: true,
        minLength: 0,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,       //  it will create index true and we make schema field indexed so that searching operations which are we will perform they becomes faster, if we don't do this then in case of scaling the app db will hang.
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please enter valid email address");
            }
        },
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(value.length < 10 || value.length > 10){
                throw new Error("enter a valid phone number");
            }
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password should be at least 8 characters long, and should have at least one capital, small and special characters @,#,$");
            }
        }
    },
},{
    timestamps: true,       //  whenever object is create or update in db date and time is stored along with automatically.

})     //  schema is a function on top of mongoose          jab bhi array type hota hai agar koi value nahi dete hai to mongodb automatically empty array create kar deta hai.

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "devTinder@01", {expiresIn: "7d"});
    return token;
}
userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const isValidPass = await bcrypt.compare(passwordInputByUser, user.password);
    return isValidPass;
}

module.exports = mongoose.model("User", userSchema);






























