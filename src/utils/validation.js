const validator = require("validator")

const validateSignUpData = (req) => {
    console.log('req', req.body);
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("password is not strong");
    }
}
// Function to validate which profile fields can be edited
const validateEditProfileData = (req) => {
     // List of allowed fields that users can update
    const allowedEditFields = ["firstName", "lastName", "emailId","age", "photoUrl", "gender", "about", "skills"];
     // Check if EVERY field in the req.body exists in allowedEditFields
    const isEditAllowed = Object.keys(req.body).every((field)=>
    allowedEditFields.includes(field)
    );
     // Returns true if all fields are allowed, false if any field is not allowed
    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData,
}