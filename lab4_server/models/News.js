const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const News = new Schema({
    title: String,
    summary: String,
    main_part: String,
    imagePath: {
        type: String,
        default: '/public/images/default_image.png', // Set the default value to the current date and time
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
    },
    // Add other fields as necessary
});

module.exports = mongoose.model('News', News)