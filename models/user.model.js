const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    booksRead: []
});

const usersModel = mongoose.model('Users', UserSchema);

module.exports = usersModel;
