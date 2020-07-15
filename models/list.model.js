const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const listSchema = new Schema({
    items: [String],
    helper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senior: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isFree: {
        type: Boolean,
        default: true,
    },
});


const List = mongoose.model("List", listSchema);
module.exports = List;