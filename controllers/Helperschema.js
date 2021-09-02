const Helper = require("../models/Helpermodel");
const User = require("../models/Usermodel");
exports.AddHelp = (req, res) => {
  //console.log(req.body.body);
  const { description, amount, assets, helper } = req.body.body;
  console.log(req.seeker);
  const seeker = [
    req.seeker.firstname,
    req.seeker.lastname,
    req.seeker.email,
    req.seeker.dob,
    req.seeker.gender,
  ];
  //console.log(description, amount, assets, seeker);
  if (!description || !amount || !assets || !seeker) {
    return res.json({ error: "Please Fill all the Details" });
  }
  const Newhelper = new Helper({
    description,
    amount,
    assets,
    seeker: seeker,
  });
  Newhelper.save()
    .then((result) => {
      console.log("lol", result);
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllHelpers = (req, res) => {
  Helper.find({})
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
exports.getHelpcontentByUserId = (req, res) => {
  console.log("this is seeker", req.params.id);
  Helper.find({ seeker: req.body.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.deleteHelperById = (req, res) => {
  Helper.findOneAndDelete({ seeker: req.seeker, _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.editHelperById = (req, res) => {
  Helper.findOneAndUpdate({ seeker: req.seeker, _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
