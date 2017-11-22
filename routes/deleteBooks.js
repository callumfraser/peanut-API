'use strict';
const bookModel = require('../models/book.model');
const express = require('express');
const router = express.Router();

router.delete('/:_id', (req, res) => {
    let bookId = req.params._id;
    let code = res.statusCode;
    bookModel.findOneAndRemove({
            _id: bookId
        })
        .then((book) => {
            res.json({
                code,
                msg: 'Book delete',
                book
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
