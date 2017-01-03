/**
 *
 *   login.js
 *
 * these route handles user authentication using json web tokens which
 * are sent out in the response to a post request to '/login/user'.
 *
 * User Data is stored in MongoDb collection "sentiment":
 * only one user right now:
 * {username:"Brandon", password: "test"}
 *
 *
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/**
 * [schemas exported mongoose schemas]
 * @type {[mongoose schemas: data models]}
 * @return {[userSchema:user model]}
 */
const schemas = require('../schemas');
/**
 * [config default configuration such as database url, token secret]
 * @type {[JSON]}'
 * @return{[url,tokenSecret]}
 */
const config = require('../config');

/**
 * [User Our User model based on userSchema]
 * @type {[mongoose schema]}
 */
var User = mongoose.model('User', schemas.userSchema);

/**
 * [makeToken creates our Json web token]
 * @param  {[string]} username [username of user attempting to login]
 * @return {[Object]}          [Json Web token]
 */
function makeToken(username) {
    return jwt.sign({
        'username': username
    }, config.tokenSecret, {
        expiresIn: '1h'
    });
};

/* allow users to post. */
/**
 * [https  post with username/password to login. Once user/pass is found, server
 * returns a JWT(json web token) as response with 1 hour expiration date]
 * @return {[response object(JWT)]}
 */
router.post('/user', (req, res) => {
    console.log(req.body);
    if (req.header('Authorization')) {
        res.status(401).send("Your already logged in...stop trying");
    } else {
        User.findOne({
            username: req.body.username,
            password: req.body.password
        }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(401).send("Couldn't find user or password is incorrect");
            } else {
                console.log("User " + req.body.username + " successfully logged in");
                res.status(200).send(makeToken(req.body.username));
            }
        });

    }
});

module.exports = router;
