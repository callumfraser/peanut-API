const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    author: String,
    bookName: String,
    image: {
      type: String,
      default: 'https://media.istockphoto.com/photos/books-picture-id486776676?k=6&m=486776676&s=612x612&w=0&h=cTLk-82mBko-tG-AtCuv1trKFBU6qmfSJEvjPbV5ezs='
    },
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
