
const mongoose = require("mongoose");

const url = "mongodb+srv://n38693842:mghjo8pafOUMzkJ2@namastenode.yoyad.mongodb.net/devTinder";

const connectDB = async ()=>{
    await mongoose.connect(url);
}

module.exports = connectDB;






















