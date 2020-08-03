const mongoose = require('mongoose')
const validator = require('validator')

const searchHistorySchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    keyword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("SearcHistory", searchHistorySchema);