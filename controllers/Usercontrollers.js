const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../valuekeys");
exports.createnewUser = (req, res) => {
  const { firstname, lastname, email, dob, gender, password } =
    req.body.body.details;
  console.log(req.body.body.details);
  if (!firstname || !email || !dob || !gender || !password) {
    return res.json({ message: "Please Fill All the Details" });
  }

  User.findOne({ email: email })
    .then((data2) => {
      if (data2) {
        console.log(data2);
        return res.send({ message: "User Already Exists" });
      }

      const Newuser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        dob: dob,
        password: password,
        gender: gender,
      });
      console.log(Newuser);

      Newuser.save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          return res.send(err);
        });
    })
    .catch((err) => {
      return res.send(err);
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body.body;
  console.log(req.body);
  if (
    email === "" ||
    password === "" ||
    email === undefined ||
    password === undefined
  ) {
    console.log("no");
    return res.json({ error: "Please Enter Email or Password" });
  }

  User.findOne({ email })
    .then((data) => {
      if (!data) {
        return res.json({ error: "This Account Does not Exist" });
      }
      if (data.password === password) {
        const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
          expiresIn: Date.now() + 9999,
        });
        const { _id, email } = data;
        res.json({ token, user: { _id, email } });
      } else {
        return res.json({ error: "Enter Correct Email or Password" });
      }
    })
    .catch((err) => {
      res.json({ error: err });
    });
};
