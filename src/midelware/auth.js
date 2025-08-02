 const adminAuth = (req, res, next) => {
  const token = "xyzs";
  const isAdminVerify = token === "xyz";
  if (isAdminVerify) {
    res.send("user verifyed")
    // res.status(401).send("user not verify error")
  } else {
    next()
  }
}
module.exports ={
  adminAuth
}