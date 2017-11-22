'use strict';
const bookModel = require('../models/book.model');
const authorModel = require('../models/author.model');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let newBook = req.body;
    let code = res.statusCode;

    bookModel.create({
            recommendations: newBook.recommendations,
            dateWritten: newBook.dateWritten,
            bookName: newBook.bookName,
            author: newBook.author,
            genre: newBook.genre,
            about: newBook.about
        })
        .then((book) => {
            res.json({
                code,
                book
            })
        })
        .then(() => {
            authorModel.findOne({
                    author: newBook.author
                })
                .then((author) => {
                    if (!author) {
                        authorModel.create({
                            author: newBook.author,
                            books: newBook.bookName
                        })
                        .then( (author) => {
                            res.json({
                                code,
                                author
                            });
                        })
                    } else {
                        authorModel.update({
                            author: newBook.author
                        }, {
                            $push: {
                                books: [newBook.bookName]
                            }
                        })
                        .then( (book) => {
                            res.json({
                                code,
                                book
                            });
                        })
                    }
                })
        })
        .catch((err) => {
            res.json({
                code,
                err
            });
        })
});

module.exports = router;
