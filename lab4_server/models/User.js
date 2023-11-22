const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    googleID: { type: String, unique: true },
    facebookID: { type: String, unique: true },
    authType: { type: String, required: true }
});

module.exports = mongoose.model('User', User)