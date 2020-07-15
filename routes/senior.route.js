const router = require("express").Router();
const List = require("../models/list.model");

router.get("/", (req, res) => {
    res.render("seniors/create");
})

router.post("/create", async (req, res) => {

    try {
        let { name, quantity, deliveryDate } = req.body;
        let items = { items : [{name, quantity}], deliveryDate };
        
        console.log(items);
        let list = await new List(items);
        let savedList = await list.save();
        if (savedList) {
            res.redirect("/");
        }
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;