const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        require:true,
        minLength:5,
        maxLength:50,
        
    },
      lastName :{
       type : String,
    },
      emailId :{
       type : String,
       lowercase:true,
       require:true,
       unique:true,
       trim:true,
       validate(value){
        if(!validator.isEmail(value)){
          throw new Error("invalid Email address" + value)
        }
       }
    }, 
    about:{
       type : String,
    } ,
      password :{
       type : String,
    },
       photoUrl :{
       type : String,
    },
      age :{
        type : Number,
    },
      gender :{
       type : String,
    },
        skills: {
        type: [String], // Array of strings
        default: []     // Default empty array
    }
});
module.exports = mongoose.model("User", userSchema);

