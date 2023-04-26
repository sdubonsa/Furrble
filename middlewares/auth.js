exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/users/login');
    }
}