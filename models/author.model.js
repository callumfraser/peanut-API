const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    author: String,
    books: []
});

const authorsModel = mongoose.model('Authors', AuthorSchema);

module.exports = authorsModel;
