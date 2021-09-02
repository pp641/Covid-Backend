const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../valuekeys");
const Userschema = require("../models/Usermodel");
exports.isLoggedIn = (req, res, next) => {
  console.log(req.body);
  var { authorization } = req.body.headers;
  
  //const newtoken = authorization.replace("Bearer ", "");
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  console.log(authorization)
  jwt.verify(authorization, JWT_SECRET, (error, data) => {
    if (error) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const { _id } = data;
    Userschema.findById({ _id }).then((userdata) => {
      req.seeker = userdata;
      next();
    });
  });
};
