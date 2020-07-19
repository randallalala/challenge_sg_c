const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    items: [{
        name: String,
        quantity: Number,
    }],
    deliveryDate: String,
    status: {
        type: String,
        enum: ["free", "inProgress", "fulfilled"], // 2 done 1 delivering 0 not accepted yet
        default: "free",
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    completedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    // timestamps: true
});


const List = mongoose.model("List", listSchema);
module.exports = List;