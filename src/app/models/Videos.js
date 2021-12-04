const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
        // required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    publishTime: {
        type: Date
    }

},
);

module.exports = mongoose.model("Video", videoSchema, 'videos');