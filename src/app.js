
const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user");

app.use(express.json());
// signup API
app.post("/signup-user", async (req, res) => {
  // creating a new instance of the UserModel
  const user = new User(req.body);
  await user.save();
  console.log('User00', User)
  res.send("User Added Succesfully001")
});

// get single record by emailId
app.get("/single-user", async (req, res) => {
  const userEmail = req.body.emailId
  try {
    const users = await User.find({ emailId: userEmail })
    res.send(users);
  } catch (err) {
    res.status(400).send("somthing went wrong");
  }
});

// get all record 
app.get("/feed", async (req, res) => {
  // const user
  try {
    const users = await User.find({})
    res.send(users);
  } catch (err) {
    res.status(400).send("somthing went wrong");
  }
});

app.delete("/user-delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //  const user = await User.findByIdAndDelete({ userId });
    res.send("user Delete succesfully");

  } catch (err) {
    res.status(400).send("somthing went wrong");
  }
});

app.patch("/user-update", async (req, res) => {
  const userId = req.body.userId;
    const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId });
    //  const user = await User.findByIdAndDelete({ userId });
    console.log(user)
    res.send("user update succesfully");

  } catch (err) {
    res.status(400).send("somthing went wrong");
  }
});

connectDB().then(() => {
  console.log("DataBase Connected SuccesFully");
  app.listen(7777, () => {
    console.log("server ok hai...")
  });

}).catch((err) => {
  console.error("Database cannot be connected!!")
})
