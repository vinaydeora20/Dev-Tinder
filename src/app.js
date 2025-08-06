
const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation")
app.use(express.json());
// signup API
app.post("/signup-user", async (req, res) => {
  try {
   
    //1. validate the data
    validateSignUpData(req);
    const {  firstName,lastName, emailId,password} = req.body;
    //2.  encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // create new instance of user model
    // const user = new User(req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
    })

    await user.save();
    res.send("new User SignUp succesfully")
  } catch (err) {
    res.status(400).send("somthing went wrong" + err.message);
  }
});

app.post("/login", async (req, res) => {
  const user = req.body;
  try {

  } catch (err) {
    res.status(400).send("somthing went wrong")
  }
})


connectDB().then(() => {
  console.log("DataBase Connected SuccesFully");
  app.listen(7777, () => {
    console.log("server ok hai...")
  });

}).catch((err) => {
  console.error("Database cannot be connected!!")
})
