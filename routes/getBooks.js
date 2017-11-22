'use strict';
const bookModel = require('../models/book.model');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let code = res.statusCode;
    bookModel.find({})
        .then((books) => {
            res.json({
                code,
                books
            });
        })
        .catch((err) => {
            res.json({
                code,
                err
            });
        })
});

module.exports = router;
