const validator = require("validator");
const User = require("../models/user");

const validateSignUp = (req) => {
    const { firstName, lastName, email ,password, phone } = req.body;
    if(!firstName || !lastName){
        throw new Error("missing firstName and lastName");
    }
    else if(!validator.isEmail(email)){
        throw new Error("invalid email address");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password");
    }
    else if(!validator.isMobilePhone(phone)){
        throw new Error("invalid phone number");
    }
}

const validateEditProfileData = async (req) => {
    const allowedEditData =  [ "firstName", "lastName", "phone", "email"];
    const isEditAllowed = await Object.keys(req.body).every(key => allowedEditData.includes(key));
    return isEditAllowed;
}

module.exports = {
    validateSignUp, validateEditProfileData
}



















