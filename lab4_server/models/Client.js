const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const Client = new Schema({

    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    patronymic: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        default: "+666(66)666-66-66",
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Client', Client)