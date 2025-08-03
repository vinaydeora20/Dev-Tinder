
const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup-user", async (req , res) => {

  // creating a new instance of the UserModel
  const user = new User(req.body);
  

  await user.save();
  res.send("User Added Succesfully001")
});

connectDB().then(()=>{
  console.log("DataBase Connected SuccesFully");
  app.listen(7777, () => {
    console.log("server ok hai...")
  });

}).catch((err)=>{
  console.error("Database cannot be connected!!")
})
