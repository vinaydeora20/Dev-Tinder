
const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../midelware/auth");
const { validateEditProfileData } = require("../utils/validation");
const { contains } = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    // attatch the userAuth middleware here and get the user data from req
    const user = req.user;
    //  Now direct send user as responce 
    res.send(user)
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
});
// profile edit Api:
// profileRouter.patch("/profile/edit", async (req, res) => {
//   try {
//     // // Step 1: Validate incoming edit request data
//     // if (!validateEditProfileData(req)) {
//     //   throw new Error("Invalid Edit credentials");
//     // }

//     // Step 2: Get logged-in user from authenticated request
//     const loggedInUser = req.user;
//     console.log('loggedInUser', req)
//     // Step 3: Update user fields dynamically
//     // Loop through all properties in request body
//     // and update corresponding user fields
//     Object.keys(req.body).forEach((key) => {
//       loggedInUser[key] = req.body[key];
//     });

//     // Step 4: Save updated user to database
//     await loggedInUser.save();
//     // send direct responce if uh want:
//     // res.send(`${loggedInUser.firstName} , upur profile is updated`,)
//     //  send responce as a json formate:
//     res.json({
//       message:`${loggedInUser.firstName} , your profile is updated`,
//       data: loggedInUser
//     })
//     // Step 5: Send success response status (missing in original code)
//     res.status(200).send("Profile updated successfully");

//   } catch (err) {
//     // Error handling: Send 400 status with error message
//     res.status(400).send("ERROR: d" + err.message);
//   }
// });
// profileRouter.patch("/profile/edit",userAuth , async (req, res) => {
//   console.log(req.body)
//   try {
//     // if (!validateEditProfileData(req)) {
//     //   throw new Error("Invalid Edit cridential")
//     // }
//     const loggdedInUser = req.user;
//     // now i updated every keys by looping
// console.log('loggdedInUser', loggdedInUser)
//     Object.keys(req.body).forEach((key) => (loggdedInUser[key] = req.body[key]));
//     await loggdedInUser.save()

//   } catch (err) {
//     res.status(400).send("ERROR :" + err.message)
//   }
// })
module.exports = profileRouter;