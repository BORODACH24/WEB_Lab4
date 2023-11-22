let express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');

const multer = require('multer');
const News = require('../models/News.js');
let router = express.Router();

const news = [
    {"id": 1, "title": "Global Markets Rally on New Trade Agreement", "summary": "Markets around the world responded with a strong rally after the announcement of a new trade agreement.", "main_part": "In a surprising turn of events, countries have come together to form a new trade pact..."},
    {"id": 2, "title": "Innovative Tech Startup Secures Record Funding", "summary": "A tech startup has secured a record amount of funding to develop its revolutionary new product.", "main_part": "The tech world is abuzz with the latest news of a startup that's set to change the face of technology..."},
    {"id": 3, "title": "Breakthrough in Renewable Energy", "summary": "A major breakthrough in renewable energy could change the future of environmental sustainability.", "main_part": "Scientists today announced a breakthrough in renewable energy technology that promises to..."},
    {"id": 4, "title": "Healthcare Advances: Hope for Rare Disease", "summary": "New advances in healthcare bring hope to those suffering from a rare disease.", "main_part": "In what's being hailed as a monumental step forward in healthcare, researchers have developed..."},
    {"id": 5, "title": "Education Reform: Shaping the Next Generation", "summary": "The government has announced a sweeping reform of the education system.", "main_part": "Today's children are tomorrow's leaders, and the new education reform is set to..."},
    {"id": 6, "title": "Exploring the Depths: New Submarine Record", "summary": "A new record has been set for the deepest submarine dive in history.", "main_part": "The ocean's depths hold many secrets, and a team of intrepid explorers has just set a new record for..."},
    {"id": 7, "title": "Artificial Intelligence: The Future is Now", "summary": "Artificial Intelligence is no longer just a concept of science fiction; it's a reality.", "main_part": "With AI becoming more integrated into our daily lives, experts are predicting that..."},
    {"id": 8, "title": "Space Exploration: Humans on Mars by 2040?", "summary": "The space agency has laid out an ambitious plan to have humans on Mars by 2040.", "main_part": "Mars has always captured the human imagination, and the possibility of setting foot on the Red Planet is..."},
    {"id": 9, "title": "Cybersecurity: Protecting Our Digital Lives", "summary": "Cybersecurity experts warn that protecting our digital lives has never been more crucial.", "main_part": "As we become ever more reliant on digital technologies, the need for robust cybersecurity measures is..."},
    {"id": 10, "title": "Wildlife Conservation Efforts Show Promise", "summary": "Recent efforts in wildlife conservation are showing promising results for endangered species.", "main_part": "The world's wildlife is under threat, but recent conservation efforts are starting to show that..."}
]
mongoose.connect('mongodb://localhost:27017/WEB_Lab4', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/news'); // Specify the destination folder for storing images
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
        const elements = await News.find();

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
        const element = await News.findById(id);

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
        // Create a new element using the create method
        const newElement = await News.create({
            title: req.body.title,
            summary: req.body.summary,
            main_part: req.body.main_part,
            imagePath: `/public/images/news/${req.file.filename}`
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
        const result = await News.deleteOne({ _id: id });

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
        const newsletter = await News.findById(id);

        // If the user is not found, return a 404 error
        if (!newsletter) {
            return res.status(404).json({ message: 'Newsletter not found' });
        }

        console.log("Body", req.body);
        newsletter.title = req.body.title || newsletter.title;
        newsletter.summary = req.body.summary || newsletter.summary;
        newsletter.main_part = req.body.main_part || newsletter.main_part;

        // Save the updated user to the database
        await newsletter.save();

        // Return the updated user
        res.json({ message: 'Newsletter updated successfully', newsletter });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
