const passport = require("passport");

const User = require("../models/user");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.signinGet = function (req, res) {
  res.render("signin");
};

exports.signinPost = function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        // console.log(req.user);
        res.redirect("/");
      });
    }
  });
};

// Signup

exports.signupGet = function (req, res) {
  res.render("signup");
};

exports.signupPost = function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
    } else {
      return res.redirect("/signin");
    }
  });
};

exports.signOut = function (req, res) {
  req.logout();
  res.redirect("/signin");
};

exports.isAuthenticated = function (req, res, next) {
  if (!req.user) {
    res.redirect("/signin");
  } else {
    next();
  }
};

exports.isAdmin = function (req, res, next) {
  let user = JSON.stringify(req.user);
  user = JSON.parse(user);
  if (!user.role) {
    res.send("You're Not An Admin.");
  } else {
    next();
  }
};
