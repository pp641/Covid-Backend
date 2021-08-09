const Helper = require("../models/Helpermodel");
const User = require("../models/Usermodel");
exports.AddHelp = (req, res) => {
  const { description, amount, assets, helper } = req.body;
  const { seeker } = req;
  console.log(description, amount, assets, seeker, helper);
  if (!description || !amount || !assets || !seeker || !helper) {
    return res.json({ error: "Please Fill all the Details" });
  }
  const Newhelper = new Helper({
    description,
    amount,
    assets,
    seeker,
    helper,
  });
  Newhelper.save()
    .then((result) => {
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
  console.log(req.params.id);
  Helper.find({ seeker: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.deleteHelperById = (req, res) => {
  Helper.findByIdAndDelete({ seeker: req.seeker, _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
