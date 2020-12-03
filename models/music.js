const mongoose = require("mongoose");

const musicScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photoDetails: {
        type: Object,
        required: true
    },
    spotifyLink: {
     type: String
    },
    youtubeLink: {
        type: String
    },
    soundcloudLink: {
        type: String
    },
    applemusicLink: {
        type: String
    },
    releaseDate: {
        type: Date
    }
}, {timestamps: true});

const Music = mongoose.model("Music", musicScheme);

module.exports = Music;
