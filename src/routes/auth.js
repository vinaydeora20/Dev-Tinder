// Using express.Router() for Modular Routing:
// ------------------------------------------
// - Instead of defining all routes directly on 'app' (express()), 
// - We now use 'express.Router()' to create separate route handlers.
// - Example: 'authRouter' handles authentication-related routes.
// - This keeps the code organized and modular.

const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("../utils/validation");

// signUp api:
authRouter.post("/signup-user", async (req, res) => {
  try {

    //1. validate the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //2.  encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // create new instance of user model
    // const user = new User(req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    })

    await user.save();
    res.send("new User SignUp succesfully")
  } catch (err) {
    res.status(400).send("somthing went wrong" + err.message);
  }
});

// Login APi:
authRouter.post("/login", async (req, res) => {

  try {
    const { password, emailId } = req.body;
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      throw new Error("Email not valid");
    } else {
      console.log('user myyyyy', user)
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = await jwt.sign({ _id: user._id }, "vinay@tinder$789" ,{expiresIn:"1d"})
      // console.log(token)
      // res.cookie("token", "dsjbfhjdsfhdsklfhkdwhfugfgewuibferwfiberncdsknckzshdhasdladskdwhfugfgewuibferwfiberncdsknckzkd")
      res.cookie("token", token);
      res.send("login SuccesFull");
    } else {
      throw new Error("password Not Correct")
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
});
// Logout Api:
authRouter.post("/logout", async (req, res)=>{
  // Logic to logout: we will directly expire the cookies when logout api hits:
  res.cookie("token", null, {
    expires:new Date(Date.now()),
  })
  res.send("Logout succesfull")
})
module.exports = authRouter;


// flow of login to logout api
//hit login api => cookie created => hit profile api (get profile data)=> hit logout api expire the cookie.