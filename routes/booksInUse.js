'use strict';
const bookModel = require('../models/book.model');
const express = require('express');
const router = express.Router();

router.get('/userBooks/:user_id', (req, res) => {
    let code = res.statusCode;
    var userId = req.params.user_id;


    bookModel.find({
      "currentUser" : userId
    })
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
