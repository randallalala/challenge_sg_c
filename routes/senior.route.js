const router = require("express").Router();
const List = require("../models/user.model");

router.get("/", (req, res)=>{
  res.render("seniors/create");
})

router.post("/create", async (req, res)=>{

  try {
    let list = await new List(req.body);
    let savedList = await list.save();
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;