const userModel = require("../models/user");

// Send register form
exports.register = (req, res) => {
  res.render("./user/register");
};

// Send login form
exports.login = (req, res) => {
  res.render("./user/login");
};

// create user
exports.create = (req, res, next) => {
  let user = new userModel(req.body);
  user.likes = [];
  user
    .save()
    .then((user) => {
      req.flash("success", "User created successfully");
      res.redirect("/users/login");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        req.flash("error", err.message);
        return res.redirect("/users/register");
      }

      if (err.code === 11000) {
        req.flash("error", "Email address already exists");
        return res.redirect("/users/register");
      }
      next(err);
    });
};

// authenticate user
exports.authenticate = (req, res, next) => {
  userModel
    .findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        //compare password
        user.comparePassword(req.body.password).then((result) => {
          if (result) {
            req.session.user = user._id;
            req.flash("success", "You have logged in successfully");
            res.redirect("/users/profile");
          } else {
            req.flash("error", "Invalid password");
            res.redirect("/users/login");
          }
        });
      } else {
        req.flash("error", "Invalid email");
        res.redirect("/users/login");
      }
    })
    .catch((err) => next(err));
};

// send profile page
exports.profile = (req, res, next) => {
    userModel
      .findById(req.session.user)
      .then((user) => {
        res.render("./user/profile", { user: user });
      })
      .catch((err) => next(err));
};

exports.likes = (req, res, next) => {
  userModel.findById(req.session.user)
  .then((user) => {
    // JSON object to JSON string
    res.render("./user/likes", { user: user.likes });
  })
  .catch((err) => next(err));
};

// send card page
exports.swipe = (req, res, next) => {
  // get all the likes of the user
  userModel.findById(req.session.user)
  .then((user) => {
    // JSON object to JSON string
    let json = JSON.stringify(user.likes)
    res.render("./user/swipe", { user: json });
  })
  .catch((err) => next(err));
};

// logout user
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.like = (req, res, next) => {
  userModel.findById(req.session.user)
  .then((user) => {
    // convert JSON string to JSON object
    var obj = JSON.parse(req.body.pet);
    user.likes.push(obj);
    user.save()
    .then(() => {
      res.redirect("/users/swipe");
    })
    .catch((err) => next(err));
  })
  .catch((err) => next(err));
};