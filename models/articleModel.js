const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    article_type: {
        type: String,
        required: true
    },
    article_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    article_section: {
        type: String,
        required: true
    },
    article_title: {
        type: String,
        required: true
    },
    article_summary: {
        type: String,
        required: true
    },
    article_content: {
        type: String,
        required: true
    },
    article_image: {
        type: String,
        required: true
    },
    article_reference: {
        type: String,
        required: true
    }
});

module.exports = articleSchema;