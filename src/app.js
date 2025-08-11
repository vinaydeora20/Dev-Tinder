
const express = require("express");
const connectDB = require("./config/database")
const app = express();

const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

// Now i need to import my all express router here 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
// Express Routing Flow:
// ---------------------
// 1. Routes are checked in the order they are defined (top to bottom).
// 2. When a request comes in (e.g., '/login'):
//    - First, it checks inside 'authRouter' for a matching route.
//    - If found, it handles the request and stops further checks.
//    - If not found, it moves to the next router ('profileRouter').
// 3. The process repeats until a matching route is found or all routers are checked.
// Note: The order of 'app.use()' matters since the first match wins.

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter); 
// create dataBase connection and server created on port 7777:
connectDB().then(() => {
  console.log("DataBase Connected SuccesFully");
  app.listen(7777, () => {
    console.log("server ok hai...")
  });

}).catch((err) => {
  console.error("Database cannot be connected!!")
})
