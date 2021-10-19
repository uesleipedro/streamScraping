const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
       // required: true,
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

},
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

module.exports = mongoose.model("Video", videoSchema, 'videos');