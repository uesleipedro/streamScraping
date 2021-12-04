const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },
    counter: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
    },
    company: {
        type: String,
    },
    pad: {
        type: String,
    },
    rocketName: {
        type: String,
    },
    missionName: {
        type: String,
    },
    description: {
        type: String,
    },
    missionType: {
        type: String,
    },
    locationName: {
        type: String,
    },
});

module.exports = mongoose.model("Launch", launchSchema, 'launch');