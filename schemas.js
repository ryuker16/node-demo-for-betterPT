/**
 *  mongoose Schema
 */

var mongoose = require('mongoose');

exports.userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    }
});
