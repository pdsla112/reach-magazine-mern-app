const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_type: {
        type: String,
        required: true
    },
    user_join_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    user_fname: {
        type: String,
        required: true
    },
    user_lname: {
        type: String,
        required: true
    },
    user_birthdate: {
        type: String,
        required: true
    },
    user_username: {
        type: String,
        required: true,
        unique: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_email_subscription: {
        type: Boolean,
        required: true
    },
    user_mobile: {
        type: String,
        require: true
    }
});

module.exports = userSchema;