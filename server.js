const session = require('express-session');
const bodyParser = require('body-parser');
const format = require('util').format;
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

// database connection
const DBConnect = require('./config/connection');
DBConnect();

// change mongoose promise library
mongoose.Promise = global.Promise;

// module routes
const getBooks = require('./routes/getBooks');
const getAllAuthors = require('./routes/getAuthors');
const newUser = require('./routes/newUsers');
const postBooks = require('./routes/postBooks');
const returnBooks = require('./routes/returnBooks');
const deleteBooks = require('./routes/deleteBooks');

// cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Methods', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

// express middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

// app routes
app.get('/', (req, res, next) => {
    let code = res.statusCode;
    res.json({
        code,
        routes: {
            getAllbooks: "/api/v1/books",
            getAllAuthors: "/api/v1/authors",
            postNewBooks: "/api/v1/books",
            returnBooks: "/api/v1/books/:_id",
            deleteBooks: "/api/v1/books/:_id"
        }
    });
});

// routes
app.use('/api/v1/books', getBooks);
app.use('/api/v1/authors', getAllAuthors);
app.use('/api/v1/books', postBooks);
app.use('/api/v1/books', returnBooks);
app.use('/api/v1/books', deleteBooks);

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Peanuts_app started on https://localhost:' + port)
});
