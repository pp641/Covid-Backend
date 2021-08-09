const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../valuekeys");
const Userschema = require("../models/Usermodel");
exports.isLoggedIn = (req, res, next) => {
  var { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "You must be logged in" });
  }
  const newtoken = authorization.replace("Bearer ", "");

  jwt.verify(newtoken, JWT_SECRET, (error, data) => {
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
