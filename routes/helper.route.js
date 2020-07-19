const router = require("express").Router();
const List = require("../models/list.model");
// const passport = require("../config/passportConfig");
// const isSignedIn = require("../config/signinBlocker");
// const User = require("../models/user.model");
// const moment = require("moment");

router.get("/", async (req, res) => {
    try {
        let lists = await List.find()
        res.render("helpers/view", {
            lists
        });
    } catch (err) {
        console.log(err);
    }

})
// router.get("/profile", isSignedIn, (request, response) => {
//     if (request.user.isSenior) {
//       //redirect if user is a senior
//       request.flash("error", "You are not allowed to view this page!");
//       response.redirect("/");
//     } else {
//       //find lists attached to signin User Only
//       List.find({ completedBy: request.user._id }).then(lists => {
//         response.render("dashboard/index", { lists });
//       });
//     }
//   });

module.exports = router;