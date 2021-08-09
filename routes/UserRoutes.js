const express = require("express");
const router = express.Router();
const { createnewUser, signIn } = require("../controllers/Usercontrollers");
const {
  AddHelp,
  getAllHelpers,
  getHelpcontentByUserId,
  deleteHelperById,
} = require("../controllers/Helperschema");
const { isLoggedIn } = require("../middlewares/Isloggedin");
const Helper = require("../models/Helpermodel");

router.post("/createuser", createnewUser);
router.post("/signin", signIn);
router.post("/createhelp", isLoggedIn, AddHelp);
router.get("/getallhelpers", getAllHelpers);
router.get("/gethelperbyid/:id", getHelpcontentByUserId);
router.delete("/deletehelperbyid/:id", isLoggedIn, deleteHelperById);
module.exports = router;
