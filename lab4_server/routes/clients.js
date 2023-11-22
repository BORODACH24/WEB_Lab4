let express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');

const multer = require('multer');
const Client = require('../models/Client.js');
const User = require('../models/User.js');
let router = express.Router();


mongoose.connect('mongodb://localhost:27017/WEB_Lab4', { useNewUrlParser: true, useUnifiedTopology: true });



/* GET users listing. */
router.get('/', async function (req, res, next) {

    try {
        // Find all elements in the database
        const elements = await Client.find();

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
        const element = await Client.findById(id);

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

router.delete('/:id', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const id = req.params.id;

    try {
        // Find the element by ID and delete it
        const result = await Client.deleteOne({ _id: id });

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

module.exports = router;
