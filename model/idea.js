const mongoose = require("mongoose");

const IdeaSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    resources: {type: String},
    emails: {type: String},
    priority: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("idea", IdeaSchema);