const Helper = require("../models/Helpermodel");
const User = require("../models/Usermodel");
exports.AddHelp = (req, res) => {
  //console.log(req.body.body);
  const { description, amount, assets, helper } = req.body.body;
  console.log(req.seeker);
  const seeker = [
    req.seeker._id,
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
  Helper.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.editHelperById = (req, res) => {
  // console.log(req.body);
  const { description, amount, assets } = req.body.body;
  console.log(description, amount, assets);
  Helper.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body.body },
    { new: true }
  )
    .then((data) => {
      res.json(data);
      console.log("th3e new daata", data);
    })
    .catch((err) => res.json(err));
};

exports.likePost = (req, res) => {
  console.log("liked called");
  let ans = false;
  console.log(req.body.body.data.likes);
  //console.log(req.body.body.id);
  if (req.body.body.data.likes.includes(req.body.body.id)) {
    ans = true;
  }

  console.log(ans);

  Helper.findByIdAndUpdate(
    { _id: req.body.body.data._id },
    {
      $push: {
        likes: req.body.body.id,
      },
    },
    {
      new: true,
    }
  )
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

exports.unlikePost = (req, res) => {
  let ans = false;
  console.log(req.body.body.data.likes);
  //console.log(req.body.body.id);
  if (req.body.body.data.likes.includes(req.body.body.id)) {
    ans = true;
  }

  console.log(ans);

  Helper.findByIdAndUpdate(
    { _id: req.body.body.data._id },
    {
      $pull: {
        likes: req.body.body.id,
      },
    },
    {
      new: true,
    }
  )
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
