const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const Order = new Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    departure_date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Order', Order)