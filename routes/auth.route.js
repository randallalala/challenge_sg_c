const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("../config/passportConfig");
const isLoggedIn = require("../config/signinBlocker");

//-- Login Route
router.post(
    "/auth/signin",
    passport.authenticate("local", {
        successRedirect: "/home", //after login success
        failureRedirect: "/auth/signin", //if fail
        failureFlash: "Invalid Username or Password",
        successFlash: "You have logged In!"
    })
);

//--- Logout Route
router.get("/auth/signout", (request, response) => {
    request.logout(); //clear and break session
    request.flash("success", "Dont leave please come back!");
    response.redirect("/auth/signin");
});

module.exports = router;