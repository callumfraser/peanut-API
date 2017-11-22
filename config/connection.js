module.exports = function() {

    const mongoose = require('mongoose');
    const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/FundiswaLibrary";
    mongoose.connect(mongoURL, {
        useMongoClient: true
    });

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('We are connected');
    });

}
