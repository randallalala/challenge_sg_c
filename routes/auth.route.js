const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("../config/passportConfig");
const isLoggedIn = require("../config/signinBlocker");
// const User = require("../models/user.model");
// const List = require("../models/list.model");

//-- Signup route
router.get("/signup", async (req, res) => {
    res.render("auth/signup")
})

router.post("/signup", async (req, res) => {
    // console.log(req.body);
    try {
        let {
            name,
            address,
            age,
            phone,
            password,
            hoomanType,
        } = req.body;
        //hash password dont save password in plain text
        let isAdmin = hoomanType == "Admin" ? true : false;
        let isSenior = hoomanType == "Senior" ? true : false;
        let isHelper = hoomanType == "Helper" ? true : false;

        let user = new User({
            name,
            address,
            age,
                phone,
            isAdmin,
            isSenior,
            isHelper,
            password,
        });
        console.log(user);
        console.log(hoomanType);
        let savedUser = await user.save();
        if (savedUser) {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
});

//-- Signin Route
router.get("/signin", (req, res) => {
    res.render("auth/signin");
});

router.post(
    "/signin",
    passport.authenticate("local", {
        successRedirect: "/", //after login success
        failureRedirect: "/auth/signin", //if fail
        failureFlash: "Invalid Username or Password",
        successFlash: "You have logged In!"
    })
);

//--- Signout Route
router.get("/signout", (request, response) => {
    // request.logout(); //clear and break session
    // request.flash("success", "Dont leave please come back!");
    response.render("/auth/signout");
});

module.exports = router;