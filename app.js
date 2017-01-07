

/**
 *                    Sentence Sentiments
 *
 *  This API will let authorized users submit a sentence string to the
 *  Sentiments API(community-sentiment.p.mashape.com) and recieve a
 *  determination of content tone(Positive, Neutral, Negative).
 *
 * Users are authorized via Json Web Tokens(JWT) and need an Authorization header
 * with valid token to access routes within '/protected' to submit sentences.
 *
 * Users can recieve their token and login by making a post request to
 *  '/login/user' with valid username/password
 *
 * Currently I added one default user to the database that is valid
 * {username:"brandon", password: "test"}
 *
 * Database is Mongodb collection named "sentiments" and we're using mongoose ORM
 * to connect to it. Settings for Database URL, token Secret are in '/config.json'
 *
 * mocha/chai tests are in '/tests' and will test our API
 *
 * Terminal Commands(see package.json for more details)
 *
 * npm start - start api server and serve website('./dist')
 * npm test - run mocha tests - api server most be running first
 * npm run dev - run development build of website with webpack-dev-server
 * npm run webpack - build production optimized website output to dist
 *
 */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Our ORM to connect to our MongoDb
const mongoose = require('mongoose');
/**
 * [config default configuration such as database url, token secret]
 * @type {JSON}
 * @return{[url : mongodb url,tokenSecret]}
 */
const config = require('./config');
const cors = require('cors');


/**
 * connecting to mongodb database via mongoose and detecting any connections errors
 */
mongoose.connect(config.url);
mongoose.connection.on('error', function (err) {
    console.log(err);
    console.log('Error: Is MongoDb running or reachable?');
});

/**
 * routes routes for our API
 * - /login for user authentication via JWT
 * - /protect for authenticated users making calls to sentiments API
 */
const login = require('./routes/login');
const protect = require('./routes/protected');

// Express....duh
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
/**
 *  public directory where webpack outputs production builds
 */
app.use(express.static(path.join(__dirname, 'dist')));

/**
 *  Add our API routes
 */

// login routes
app.use('/login', login);
// Protected routes
app.use('/protected', protect);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers - default settings for error handling middleware

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
