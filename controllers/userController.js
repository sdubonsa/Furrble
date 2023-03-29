// Send register form
exports.register = (req, res) => {
  res.render("./user/register");
};

// Send login form
exports.login = (req, res) => {
  res.render("./user/login");
};
