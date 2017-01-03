const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const config = require('../config');
const unirest = require('unirest');

/**
 * [protected routes]
 *
 * Routes here require a jwt token added to the header to access.
 * Logged in users will recieve a Json web token allowing them to post a
 * sentence to sentiments API
 *
 */

//Using express-jwt library to protect route - confirms token is match
router.use('/', expressJwt({
    secret: config.tokenSecret
}));

/**
 * [http posts request with sentence property that goes to sentiments api
 * and returns the results which we send back if successful]
 *
 */
router.post('/send', (req, res) => {

    if (req.body.sentence) {
        unirest.post("https://community-sentiment.p.mashape.com/text/")
            .header("X-Mashape-Key", "RvYFQBJbfimshN7cK6GubdQlvTL1p1MGLYNjsncpy1xdC5l5LR")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("Accept", "application/json")
            .send('txt=' + req.body.sentence)
            .end(function (result) {
                if (result.error) {
                    console.log(result.error);
                    res.send(500).send(result.error);
                } else {
                    console.log(result.status + '\n' + result.body.result);
                    res.status(200).send(result.body.result);
                }
            })
    } else {
        res.status(400).send("you have no sentence entered or format is wrong");
    }
});

module.exports = router;
