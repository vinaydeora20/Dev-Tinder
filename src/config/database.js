
const mongoose = require("mongoose");

const connectDB = async ()=>{
 await mongoose.connect("mongodb+srv://namstenode:Vinay123@cluster0.4yquxuj.mongodb.net/devTinder");
};

module.exports =connectDB;
