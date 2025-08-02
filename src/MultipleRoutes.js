
const express = require("express");
const app = express();

app.use("/user",
 (req, res , next) =>{
  console.log("1st responce");
  // res.send("responce!!");
  next();
}
,
 (req, res ,next) =>{
  console.log("2st responce");
//   res.send("2st responce");
  next();
}
,
 (req, res ,next) =>{
  console.log("3st responce");
  res.send("2st responce");
  next();
},
)

app.listen(7777, () => {
    console.log("server ok hai...")
});

// in this way i have to create multiple routes. only send responce at the last route then uh will get all the responce of middle all routes 