const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const Hotel = new Schema({
    name: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
    },
    cost_per_day: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        default: '/public/images/default_image.png', // Set the default value to the current date and time
    },
});

module.exports = mongoose.model('Hotel', Hotel)