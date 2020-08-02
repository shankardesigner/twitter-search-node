const mongoose = require('mongoose')
const validator = require('validator')

const searchHistorySchema = new mongoose.Schema({
    createdAt: new Date(),
    keyword: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("SearcHistory", searchHistorySchema);