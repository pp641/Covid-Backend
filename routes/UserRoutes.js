const express = require("express");
const router = express.Router();
const {
  createnewUser,
  signIn,
  getUserById,
  logIn,
} = require("../controllers/Usercontrollers");
const {
  AddHelp,
  getAllHelpers,
  getHelpcontentByUserId,
  deleteHelperById,
  editHelperById,
  likePost,
  unlikePost,
} = require("../controllers/Helperschema");
const { isLoggedIn } = require("../middlewares/Isloggedin");
const Helper = require("../models/Helpermodel");

router.post("/createuser", createnewUser);
router.post("/logIn", logIn);
router.get("/getuserbyid/:id", getUserById);
router.post("/signin", signIn);
router.post("/createhelp", isLoggedIn, AddHelp);
router.get("/getallhelpers", getAllHelpers);
router.get("/gethelperbyid/:id", getHelpcontentByUserId);
router.delete("/deletehelperbyid/:id", deleteHelperById);
router.put("/updatehelperbyid/:id", editHelperById);
router.put("/like", likePost);
router.put("/unlike", unlikePost);
module.exports = router;
