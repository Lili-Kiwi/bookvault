const auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to access that page.");
        return res.redirect("/login");
    }
    next();
};

module.exports = auth;
