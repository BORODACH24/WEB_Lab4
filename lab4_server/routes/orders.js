let express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');

const multer = require('multer');
const Order = require('../models/Order.js');
const Client = require('../models/Client.js');

const User = require('../models/User.js');
const Hotel = require("../models/Hotel");
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
        const elements = await Order.find();

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
        const element = await Order.findById(id);

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
router.post('/0', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    try {
        console.log("Order add");
        console.log(req.body);
        const newClient = await Client.create({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            patronymic: req.body.patronymic,
            email: req.body.email,
            phone_number: req.body.phone_number,
            date: req.body.date,
        });
        console.log(newClient);
        // Create a new element using the create method
        const newOrder = await Order.create({
            client: newClient._id, // Replace with the actual client ID
            hotel: req.body.hotel, // Replace with the actual hotel ID
            departure_date: req.body.departure_date,
        });

        // Send the new element as a JSON response
        res.json(newElement);
    } catch (error) {
        // Handle errors, e.g., database connection issues or validation errors
        res.status(500).json({ error: error.message });
    }
});
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), async function (req, res, next) {
    try {
        console.log("Order add");
        console.log(req.body);
        // Create a new element using the create method


        const newClient = await Client.create({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            patronymic: req.body.patronymic,
            email: req.body.email,
            phone_number: req.body.phone_number,
            date: req.body.date,
        });
        console.log(newClient);
        // Create a new element using the create method
        const newOrder = await Order.create({
            client: newClient._id, // Replace with the actual client ID
            hotel: req.body.hotel, // Replace with the actual hotel ID
            departure_date: req.body.departure_date,
        });

        // Send the new element as a JSON response
        res.json(newOrder);
    } catch (error) {
        // Handle errors, e.g., database connection issues or validation errors
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    const id = req.params.id;

    try {
        // Find the element by ID and delete it
        const result = await Order.deleteOne({ _id: id });

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
