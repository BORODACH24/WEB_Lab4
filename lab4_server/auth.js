const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new GoogleStrategy({
        clientID: '11419189821-faf0pqf0g6kmm54ac7f5n6cjs7kalp3d.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5000/api/users/auth/google/callback', // Adjust the callback URL
        scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
        // Use the profile information to create or update a user in your database
        // In a real-world scenario, you would save the user details to your database
        // For simplicity, we'll just return the user profile for now
        console.log("GoogleStrategy")
        done(null, profile);
    }));
passport.use(new FacebookStrategy({
        clientID: '858186292652910',
        clientSecret: 'b6fe284f4ab808ccdaafe2935334a1be',
        callbackURL: 'http://localhost:5000/api/users/auth/facebook/callback', // Adjust the callback URL
        scope: ["email"],
        profileFields: ['id', 'displayName', 'email'],
        enableProof: true
    },
    function (accessToken, refreshToken, profile, done) {
        // Use the profile information to create or update a user in your database
        // In a real-world scenario, you would save the user details to your database
        // For simplicity, we'll just return the user profile for now
        console.log("FacebookStrategy")
        done(null, profile);
    }));

module.exports = passport;
