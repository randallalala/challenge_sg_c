const router = require("express").Router();
const List = require("../models/list.model");
// const isSignedIn = require("../config/signinBlocker");
// const User = require("../models/user.model");
// const moment = require("moment");

router.get("/", (req, res) => {
    res.render("seniors/create");
})

router.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        let {
            name,
            quantity,
            deliveryDate
        } = req.body;
        let items = []
        for (let index = 0; index < quantity.length; index++) {
            items.push({
                name: name[index],
                quantity: quantity[index],
            })
        }
        // let items = { items : [{name, quantity}], deliveryDate };
        console.log(items);
        let list = await new List({
            items,
            deliveryDate,
            status: "0"
        });
        let savedList = await list.save();
        if (savedList) {
            res.redirect("/");
        }
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;