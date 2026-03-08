const User = require("../models/User");

const getRegister = (req, res) => {
    res.render("register");
};

const postRegister = async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.flash("success", "Account created! Please log in.");
        res.redirect("/login");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
};

const getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("login");
};

const logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect("/login");
    });
};

module.exports = { getRegister, postRegister, getLogin, logout };
