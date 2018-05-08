var mongoose = require("mongoose");

var FiosCmp = mongoose.model("FiosCmp", {
    tactic: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    lob: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

module.exports = {FiosCmp};