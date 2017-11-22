const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    author: String,
    bookName: String,
    genre: String,
    dateWritten: Number,
    recommendations: {
        type: Number,
        default: 0
    },
    timesTaken: {
        type: Number,
        default: 0
    },
    availability: {
        type: Boolean,
        default: true
    },
    currentUser: {
        type: String,
        default: "None"
    },
    about: String,
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const bookModel = mongoose.model('Books', BookSchema);

module.exports = bookModel;
