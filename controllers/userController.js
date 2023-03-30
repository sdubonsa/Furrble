const userModel = require("../models");

// Send register form
exports.register = (req, res) => {
  res.render("./user/register");
};

// Send login form
exports.login = (req, res) => {
  res.render("./user/login");
};


exports.create = (req, res, next)=>{
  let user = new userModel(req.body);
  user.save()
  .then(user=>{
      req.flash('success', 'User created successfully');
      res.redirect('/');
  })
  .catch(err=>{
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
exports.authenticate = (req, res, next)=>{
    userModel.findOne({username: req.body.username})
    .then(user=>{
        if(user) {
            //compare password
            user.comparePassword(req.body.password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have logged in successfully');
                    res.redirect('/users/register');
                } else {
                    req.flash('error', 'Invalid password');
                    res.redirect('/users/login');
                }
            })
        } else {
            req.flash('error', 'Invalid email');
            res.redirect('/users/login');
        }
    })
    .catch(err=>next(err));
};