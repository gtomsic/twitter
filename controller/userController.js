const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");

module.exports.logoutGetController = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
};

module.exports.loginGetController = (req, res) => {
  const payload = {
    pageTitle: "Login",
  };
  res.status(200).render("login", payload);
};

module.exports.loginPostController = async (req, res) => {
  const payload = req.body;
  payload.pageTitle = "Login";
  if (req.body.logUsername && req.body.logPassword) {
    let user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ],
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = "Something went wrong try again later.";
      res.status(200).render("login", payload);
    });
    if (user != null) {
      var result = await bcrypt.compare(req.body.logPassword, user.password);
      if (result === true) {
        req.session.user = user;
        return res.redirect("/");
      }
    }
    payload.errorMessage = "Login credentials incorrect";
    return res.status(200).render("login", payload);
  }
  payload.errorMessage = "All fields need to have valid values.";
  res.status(200).render("login", payload);
};

module.exports.registerGetController = async (req, res) => {
  const payload = {
    pageTitle: "Register",
  };
  res.status(200).render("register", payload);
};

module.exports.registerPostController = async (req, res) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let username = req.body.username.trim();
  let email = req.body.email.trim();
  let password = req.body.password;

  let payload = req.body;

  if (firstName && lastName && username && email && password) {
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = "Something went wrong try again later.";
      res.status(200).render("register", payload);
    });
    if (user == null) {
      // No user found
      let data = req.body;
      data.password = await bcrypt.hash(password, 10);
      User.create(data).then((user) => {
        req.session.user = user;
        return res.redirect("/");
      });
    } else {
      // User found
      if (email === user.email) {
        payload.errorMessage = "Email already in use.";
      } else {
        payload.errorMessage = "Username already in use.";
      }
      res.status(200).render("register", payload);
    }
  } else {
    payload.errorMessage = "All fields need to have valid values.";
    res.status(200).render("register", payload);
  }
};
