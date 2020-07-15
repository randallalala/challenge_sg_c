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
        enum: ["0", "1", "2"],  // 2 done 1 delivering 0 not accepted yet
    },
});


const List = mongoose.model("List", listSchema);
module.exports = List;