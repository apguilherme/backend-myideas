const mongoose = require("mongoose");

const IdeaSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String},
    category: {type: String},
    resources: {type: String},
    emails: {type: String},
    priority: {type: String},
    // adicionar campo de visible true/false para feed de ideias
}, {timestamps: true});

module.exports = mongoose.model("idea", IdeaSchema);