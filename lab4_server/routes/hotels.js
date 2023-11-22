let express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');

const multer = require('multer');
const Hotel = require('../models/Hotel.js');
let router = express.Router();

mongoose.connect('mongodb://localhost:27017/WEB_Lab4', { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/hotels'); // Specify the destination folder for storing images
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });


/* GET users listing. */
router.get('/', async function (req, res, next) {

    try {
        // Find all elements in the database
        const elements = await Hotel.find();

        // Send the elements as a JSON response
        res.json(elements);
    } catch (error) {
        // Handle errors, e.g., database connection issues
        res.status(500).json({error: error.message});
    }
});
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;

    try {
        // Find the element by ID in the database
        const element = await Hotel.findById(id);

        // Check if the element was found
        if (!element) {
            return res.status(404).json({error: 'Element not found'});
        }
        // Send the element as a JSON response
        // console.log(User.findById('655012383f2cf4c8c771d736'));

        res.json(element);
    } catch (error) {
        // Handle errors, e.g., database connection issues
        res.status(500).json({error: error.message});
    }
});
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), async function (req, res, next) {
    try {
        console.log("Hotel add");
        console.log(req.body);
        // Create a new element using the create method
        const newElement = await Hotel.create({
            name: req.body.name,
            stars: req.body.stars,
            cost_per_day: req.body.cost_per_day,
            country: req.body.country,
            description: req.body.description,
            imagePath: `/public/images/hotels/${req.file.filename}`
            // Add other fields as necessary
        });

        // Send the new element as a JSON response
        res.json(newElement);
    } catch (error) {
        // Handle errors, e.g., database connection issues or validation errors
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const id = req.params.id;

    try {
        // Find the element by ID and delete it
        const result = await Hotel.deleteOne({ _id: id });

        // Check if the element was found and deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Element not found' });
        }

        // Send a success message as a JSON response
        res.json({ message: 'Element deleted successfully' });
    } catch (error) {
        // Handle errors, e.g., database connection issues
        res.status(600).json({ error: error.message });
    }
});
// Update user endpoint
router.put('/:id',  passport.authenticate('jwt', { session: false }), upload.single('image'), async (req, res) => {
    const id = req.params.id;
    console.log("Update id: ", id);

    try {
        // Find the user in the database by ID
        const hotel = await Hotel.findById(id);

        // If the user is not found, return a 404 error
        if (!hotel) {
            return res.status(404).json({ message: 'Newsletter not found' });
        }

        console.log("Body", req.body);
        hotel.name = req.body.name || hotel.name;
        hotel.stars = req.body.stars || hotel.stars;
        hotel.cost_per_day = req.body.cost_per_day || hotel.cost_per_day;
        hotel.country = req.body.country || hotel.country;
        hotel.description = req.body.description || hotel.description;

        // Save the updated user to the database
        await hotel.save();

        // Return the updated user
        res.json({ message: 'Newsletter updated successfully', hotel });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
