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
    const { firstName, lastName, emailId, password, about, skills, age, } = req.body;
    //2.  encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // create new instance of user model
    // const user = new User(req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      about,
      skills,
      age,

    })

    await user.save();
    res.send("new User SignUp succesfully")
  } catch (err) {
    res.status(400).send("somthing went wrong" + err.message);
  }
});

// Login API Endpoint - Handles user authentication
authRouter.post("/login", async (req, res) => {

  try {
    // STEP 1: Extract credentials from request body
    const { password, emailId } = req.body;
    // STEP 2: Check if user exists in database
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      throw new Error("Email not valid");// User not found with this email
    } else {
      console.log('User found:', user); // Logging for debugging
    }

    // STEP 3: Verify password
    // Compare provided password with hashed password in database
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // STEP 4: Create JWT token if password is correct
      // Token contains user ID and is signed with secret key
      const token = await jwt.sign(
        { _id: user._id },     // Payload (user identifier)
        "vinay@tinder$789",    // Secret key for signing
        { expiresIn: "1d" }    // Token expires in 1 day
      )
      // console.log(token)
      // res.cookie("token", "dsjbfhjdsfhdsklfhkdwhfugfgewuibferwfiberncdsknckzshdhasdladskdwhfugfgewuibferwfiberncdsknckzkd")
      // STEP 5: Set token as HTTP-only cookie
      res.cookie("token", token);    // Stores token in client's cookies
      res.send("login SuccesFull");  // Success response
    } else {
      throw new Error("password Not Correct"); // Password mismatch
    }
  } catch (err) {
    // Error Handling: Send 400 status with error message
    res.status(400).send("ERROR :" + err.message)
  }
});
// Logout Api:
authRouter.post("/logout", async (req, res) => {
  // Logic to logout: we will directly expire the cookies when logout api hits:
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })
  res.send("Logout succesfull")
})
module.exports = authRouter;


// flow of login to logout api
//hit login api => cookie created => hit profile api (get profile data)=> hit logout api expire the cookie.