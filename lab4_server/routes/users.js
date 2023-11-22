var express = require('express');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var router = express.Router();
const passport = require('../auth.js');
const cors = require('cors');
const News = require("../models/News");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  console.log("Test");
  try {
    // Create a new element using the create method
    const newElement = await User.create({
      "googleID": "103734490390423784133",
      "username": "BORODACH",
      // Add other fields as necessary
    });
    console.log(newElement);
  } catch (error) {
    // Handle errors, e.g., database connection issues or validation errors
    res.status(500).json({ error: error.message });
  }
  res.send('respond with a resource');
});
router.post('/login', async function (req, res)  {
  // const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;
  // Authenticate the user (you can replace this with your own authentication logic)
  const user = await User.findOne({ username });
  console.log('---User---');
  console.log(user);
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT
  const token = jwt.sign({ sub: user._id, username: user.username, authType: "password" }, 'your-secret-key', { expiresIn: '1h' });

  // Send the token in the response
  res.json({ token });
});
// Google OAuth route
router.get('/auth/google', cors(),
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', cors(),
    passport.authenticate('google', { session: false,
    failureRedirect: "/login/failed", }),
    async(req, res) => {

      // Successful Google OAuth authentication
      // Generate a JWT and send it as a response
        console.log("------User-------\n", req.user);
      //   console.log("------User-------\n", req.user.id);
      const user = await User.findOne({ googleID: req.user.id});

      if(user){
        // const user = req.user;
        const token = jwt.sign({ sub: req.user.id, username: req.user.displayName, authType: "google" }, 'your-secret-key', { expiresIn: '1h' });
        console.log("token: ",token);
        console.log('Requested URL:', req.url);
        // Send the token as a response
        // res.json( token );
        res.redirect(`http://localhost:3000/login/${token}`);
      }
      else{
        res.status(666).json({ error: "Error google auth" });
      }
    });
// Google OAuth route
router.get('/auth/facebook', cors(),
    passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', cors(),
    passport.authenticate('facebook', { session: false,
    failureRedirect: "/login/failed", }),
    async(req, res) => {

      const user = await User.findOne({ facebookID: req.user.id});
      console.log("Facebook: ", user);
      // Successful Google OAuth authentication


      // Generate a JWT and send it as a response
      console.log("------User-------\n", req.user);
      //   console.log("------User-------\n", req.user.id);
      // const user = req.user;
      if(user){
        const token = jwt.sign({ sub: req.user.id, username: req.user.displayName, authType: "facebook" }, 'your-secret-key', { expiresIn: '1h' });
        console.log("token: ",token);
        console.log('Requested URL:', req.url);
        // Send the token as a response
        // res.json( token );
        res.redirect(`http://localhost:3000/login/${token}`);
      }
      else {
        res.status(666).json({ error: "Error facebook auth" });
      }
    });

router.post('/add', async function (req, res, next) {
  console.log("Add User");

  try {
    // Create a new element using the create method
    const newElement = await User.create({
      googleID: "103734490390423784133",
      username: "BORODACH",
      // Add other fields as necessary
    });
    console.log(newElement);
  } catch (error) {
    // Handle errors, e.g., database connection issues or validation errors
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
