const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRegister, postRegister, getLogin, logout } = require("../controllers/auth");

router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/login", getLogin);
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/books",
        failureRedirect: "/login",
        failureFlash: true,
    })
);
router.get("/logout", logout);

module.exports = router;
