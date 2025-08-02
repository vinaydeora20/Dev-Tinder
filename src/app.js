
const express = require("express");
const app = express();
const {adminAuth}= require('./midelware/auth')
app.use("/admin/getAllData",adminAuth , (req, res) => {
  res.send("user not verifyed")
});

app.use("/admin/getAllData", (req, res) => {
  res.send("user verifyed")
})
// app.use("/admin/getDeleteData", (req, res) => {
//   res.send("user delete")
// })
app.listen(7777, () => {
  console.log("server ok hai...")
});

// in this way i have to create multiple routes