const router = require("express").Router();
const List = require("../models/list.model");

router.get("/", async (req, res)=>{
  res.render("admin/home");
});

router.get("/admin", async (req, res)=>{
  try {
    let lists = await List.find()
    res.render("helpers/view", {lists});
  } catch (err) {
    console.log(err);
  }

})

module.exports = router;