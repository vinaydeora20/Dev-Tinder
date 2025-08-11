const User = require("../models/user");
const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
  try {
    // get token from req.cookies
    const { token } = req.cookies;
    // if token not found throw an error
    if(!token){
      throw new Error("Token Not Found")
    }
    // verify the token (import jwt) from jwtwebtoken 
    const decodedObj = await jwt.verify(token, "vinay@tinder$789");
    // extrate (_id) from decodedObj
    const { _id } = decodedObj;
    // Now i have id then find single user based on id
    const user = await User.findById(_id);
    // if user not available then throw error
    if (!user) {
      throw new Error("User Not Found")
    }
    // if i get the user then attatch the user inside the request so in future i will get the user data in req
    req.user = user;
    // if the token is valid and user is found then go to next
    next();
  } catch (err) {
    res.status(400).send("ERROR g2: " + err.message)
  }
}
module.exports = {
  userAuth
}