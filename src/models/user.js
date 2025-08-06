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
      password :{
       type : String,
    },
      age :{
        type : Number,
    },
      gender :{
       type : String,
    },
});
module.exports = mongoose.model("User", userSchema);

